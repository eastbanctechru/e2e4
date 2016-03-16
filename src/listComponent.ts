import {BaseComponent} from './baseComponent';
import {SortParameter} from './SortParameter';
import {Defaults} from './Defaults';
import {Utility} from './Utility';
import {IStateManager} from './contracts/IStateManager';
import {IListComponent} from './contracts/IListComponent';
import {ISortableComponent} from './contracts/ISortableComponent';
import {IRequestCanceller} from './contracts/IRequestCanceller';
import {IComponentWithState} from './contracts/IComponentWithState';
import {IComponentWithSelection} from './contracts/IComponentWithSelection';
import {IComponentWithFilter} from './contracts/IComponentWithFilter';
import {SelectionManager} from './selectionManager';
import {FilterManager} from './filterManager';
import {filter} from './filterAnnotation';
import {ProgressState} from './ProgressState';
import {IFilterConfig} from './contracts/IFilterConfig';
import * as _ from 'lodash';

export abstract class ListComponent extends BaseComponent implements IListComponent,
    ISortableComponent, IRequestCanceller, IComponentWithState, IComponentWithSelection, IComponentWithFilter {
    private listLoadDataSuccessCallback(result: Object): Object {
        this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
        this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;
        this.state = ProgressState.Done;
        return result;
    }
    private listLoadDataFailCallback(): void {
        this.state = ProgressState.Fail;
    }
    private listLoadDataSuccessBinded: (result: Object) => Object;
    private listLoadDataFailBinded: (error: Object) => void;
    private clearDataInternal(): void {
        this.totalCount = 0;
        this.selectionManager.deselectAll();
        Utility.disposeAll(this.items);
    }
    constructor() {
        super();
        SelectionManager.includeIn(this, 'items');
        FilterManager.includeIn(this);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    ///IComponent overrides
    init(queryParams?: Object): void {
        super.init();
        const restoredState = this.getRestoredState(queryParams);
        this.filterManager.parseParams(restoredState);
    }
    dispose(): void {
        super.dispose();
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        delete this.defaultSortings;
        this.sortings.length = 0;
        this.clearDataInternal();
        this.filterManager.dispose();
        this.selectionManager.dispose();
    }
    ///IComponent overrides

    ///ISortableComponent
    @filter({
        defaultValue: function(): Array<SortParameter> { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
        parameterName: Defaults.listComponent.sortParameterName,
        parseFormatter: (proposedValue): Array<Object> => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listComponent.persistSortings
    } as IFilterConfig)
    sortings = new Array<SortParameter>();

    private defaultSortingsPrivate: SortParameter[] = null;
    get defaultSortings(): SortParameter[] {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsPrivate = value;
        if (this.sortings === null || this.sortings.length === 0) {
            this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
        }
    }
    setSort(fieldName: string, savePrevious: boolean): void {
        let newSort = new SortParameter(fieldName);
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
                newSort.toggleDirection();
                break;
            }
        }
        if (savePrevious) {
            this.sortings.push(newSort);
        } else {
            this.sortings.length = 0;
            this.sortings.push(newSort);
        }
    }
    onSortingsChanged(): void {
        if (this.ready) {
            this.clearDataInternal();
            this.loadData();
        }
    }
    ///ISortableComponent
    ///IListComponent
    items: Object[] = [];
    totalCount = 0;
    loadedCount = 0;
    toRequest(): any {
        return this.filterManager.buildRequest(null);
    }
    getLocalState(): Object {
        return this.filterManager.buildPersistedState(null);
    }

    loadData(): Promise<Object> {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }

        this.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise();
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        if (this.useModelState) {
            this.saveRequestState();
            this.saveLocalState();
        }
        return promise;
    }
    clearData(): void {
        this.clearDataInternal();
    }
    reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    ///IListComponent

    ///IRequestCanceller
    addToCancellationSequence(promise: Promise<Object>): void { };
    cancelRequests(): void { };
    ///IRequestCanceller
    ///IComponentWithState
    useModelState = true;
    stateManager: IStateManager;
    saveRequestState(): void {
        this.stateManager.flushRequestState(this.toRequest());
    };
    saveLocalState(): void {
        this.stateManager.persistLocalState(this.getLocalState());
    };
    private getRestoredState(params: Object): Object {
        if (this.useModelState === false) {
            return params;
        }
        return this.stateManager.mergeStates(params);
    }
    ///IComponentWithState
    selectionManager: SelectionManager;
    filterManager: FilterManager;
    abstract getDataReadPromise(): Promise<Object>;
}
