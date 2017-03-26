import { AsyncSubscriber } from './async-subscriber';
import { FilterConfig } from './contracts/filter-config';
import { ListResponse } from './contracts/list-response';
import { Pager } from './contracts/pager';
import { FiltersService } from './filters-service';
import { NullObjectPager } from './null-object-pager';
import { OperationStatus } from './operation-status';
import { SortingsService } from './sortings-service';
import { StateService } from './state-service';
import { destroyAll } from './utilities';

export class List {
    /**
     * Method for getting data. This parameter is required and its configuration is necessary.
     *
     * This method get one parameter with the settings of the request implementing {@link ListRequest} contract for the simple lists and {@link PagedListRequest} one for the paged lists.
     * The return value of this method should be any subscribable object which can be handled by {@link AsyncSubscriber}.
     * For the simple lists the response should contain array with the records. As for the paged ones, it should implement {@link ListResponse} contract.
     */
    public fetchMethod: (requestParams: any) => any;
    /**
     * Array of elements transferred in the {@link ListResponse.items} property.
     */
    public items: any[] = new Array<any>();
    /**
     * Array of registered {@link StateService} instances.
     */
    public stateServices: StateService[] = new Array<StateService>();

    protected pagerInternal: Pager;
    protected statusInternal: OperationStatus = OperationStatus.Initial;
    protected destroyedInternal: boolean = false;
    protected initedInternal: boolean = false;
    /**
     * Configured {@link Pager} service.
     */
    public get pager(): Pager {
        return this.pagerInternal;
    }
    public set pager(value: Pager) {
        this.filtersService.removeFilterTarget(this.pagerInternal);
        this.pagerInternal = value;
        this.filtersService.registerFilterTarget(this.pagerInternal);
    }
    /**
     * True if the service was already destroyed via {@link destroy} call.
     */
    public get destroyed(): boolean {
        return this.destroyedInternal;
    }
    /**
     * True if the service was already initialized via {@link init} call.
     */
    public get inited(): boolean {
        return this.initedInternal;
    }
    /**
     * Current execution status of the list.
     */
    public get status(): OperationStatus {
        return this.statusInternal;
    }
    /**
     * returns `true`, if there is a data request executed at the moment (i.e. {@link state} is equal to {@link ProgressState.Progress})
     */
    public get busy(): boolean {
        return this.status === OperationStatus.Progress;
    }
    /**
     * returns `true`, if there is no data request executed at the moment (i.e. {@link state} is NOT equal to {@link ProgressState.Progress})
     */
    public get ready(): boolean {
        return this.status !== OperationStatus.Progress;
    }
    constructor(protected asyncSubscriber: AsyncSubscriber, stateServices: StateService | StateService[], protected sortingsService: SortingsService, protected filtersService: FiltersService) {
        if (stateServices != null) {
            if (Array.isArray(stateServices)) {
                this.stateServices.push(...stateServices as StateService[]);
            } else {
                this.stateServices.push(stateServices);
            }
        }
        this.pager = new NullObjectPager();
    }
    /**
     * Performs initialization logic of the service. This method must be called before first use of the service.
     */
    public init(): void {
        if (this.inited) {
            return;
        }
        this.filtersService.registerFilterTarget(this.pager, this.sortingsService);
        const restoredState = {};
        Object.assign(restoredState, ...this.stateServices.map((service: StateService) => service.getState() || {}));
        this.filtersService.applyParams(restoredState);
        this.initedInternal = true;
    }
    /**
     * Performs destroy logic of the list itself and all of the inner services.
     */
    public destroy(): void {
        this.asyncSubscriber.destroy();
        this.filtersService.destroy();
        this.sortingsService.destroy();
        this.clearData();
        this.destroyedInternal = true;
    }
    /**
     * Performs data loading by calling specified {@link fetchMethod} delegate.
     * @return result of {@link fetchMethod} execution.
     */
    public loadData(): any {
        if (this.busy) {
            return;
        }
        this.statusInternal = OperationStatus.Progress;
        const requestState = this.filtersService.getRequestState();
        const subscribable = this.fetchMethod(requestState);
        if (this.pager.appendedOnLoad === false) {
            destroyAll(this.items);
            this.items = [];
        }
        this.asyncSubscriber.attach(subscribable, this.loadSuccessCallback, this.loadFailCallback);
        this.stateServices.forEach((service: StateService) => service.persistState(this.filtersService));
        return subscribable;
    }
    /**
     * Resets paging parameters and performs data loading by calling {@link loadData} if list not in {@link OperationStatus.Progress} state.
     * @return result of {@link fetchMethod} if it was called. `null` otherwise.
     */
    public reloadData(): any {
        if (this.ready) {
            this.clearData();
            return this.loadData();
        }
        return null;
    }
    /**
     * Cancels the request executed at the moment.
     */
    public cancelRequests(): void {
        if (this.busy) {
            this.asyncSubscriber.detach();
            this.statusInternal = OperationStatus.Cancelled;
        }
    }
    /**
     * Registers passed object(s) as state service to manage the list state.
     */
    public registerStateService(...services: StateService[]): void {
        services.forEach((service: StateService) => {
            this.stateServices.push(service);
        });
    }
    /**
     * Removes passed object(s) from state services collection of the list.
     */
    public removeStateService(...services: StateService[]): void {
        services.forEach((service: StateService) => {
            const index = this.stateServices.findIndex((s: StateService) => s === service);
            if (index !== -1) {
                this.stateServices.splice(index, 1);
            }
        });
    }
    /**
     * Registers passed object(s) as filter targets in underlying {@link FiltersService} to include their configured properties as parameters to the data request.
     * @see {@link FiltersService.registerFilterTarget}
     */
    public registerFilterTarget(...targets: Array<object>): void {
        this.filtersService.registerFilterTarget(...targets);
    }
    /**
     * @see {@link FiltersService.removeFilterTarget}
     */
    public removeFilterTarget(...targets: Array<object>): void {
        this.filtersService.removeFilterTarget(...targets);
    }
    /**
     * @see {@link FiltersService.getRequestState}
     */
    public getRequestState(filterFn?: (config: FilterConfig, proposedValue: any, targetObject: object) => boolean): any {
        return this.filtersService.getRequestState(filterFn);
    }
    /**
     * Resets the list parameters (sortings, paging, filters) to their default values.
     */
    public resetSettings(): void {
        this.filtersService.resetValues();
    }
    /**
     * Callback which is executed if {@link fetchMethod} execution finished successfully.
     */
    public loadSuccessCallback = (result: ListResponse<any> | any[]): ListResponse<any> | any[] => {
        const items = Array.isArray(result) ? result : result.items;
        this.items = this.items.concat(items);
        this.pager.processResponse(result);
        // In case when filter changed from last request and there's no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
            this.pager.reset();
        }
        this.statusInternal = this.pager.totalCount === 0 ? OperationStatus.NoData : OperationStatus.Done;
        return result;
    }
    /**
     * Callback which is executed if {@link fetchMethod} execution finished with error.
     */
    public loadFailCallback = (): void => {
        this.statusInternal = OperationStatus.Fail;
    }
    /**
     * Calls {@link Pager.reset} method and clears {@link items} array. Calls {@link destroyAll} method for {@link items} array to perform optional destroy logic of the elements.
     * {@see destroyAll}
     */
    public clearData(): void {
        this.pager.reset();
        destroyAll(this.items);
        this.items = [];
    }
}
