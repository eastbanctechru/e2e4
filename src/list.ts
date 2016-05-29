import {Defaults} from './common/defaults';
import {FilterManager} from './filterManager';
import {ProgressState} from './common/progressState';
import {IStateManager} from './contracts/IStateManager';
import {IPager} from './contracts/IPager';
import {IFilterManager} from './contracts/IFilterManager';

export abstract class List {
    private listLoadDataSuccessCallback(result: Object): Object {
        this.pager.processResponse(result);
        this.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listSettings.totalCountParameterName] || 0) === 0) {
            this.clearData();
        }
        return result;
    }
    private listLoadDataFailCallback(): void {
        this.state = ProgressState.Fail;
    }
    private listLoadDataSuccessBinded: (result: Object) => Object;
    private listLoadDataFailBinded: (error: Object) => void;
    clearData(): void {
        this.pager.reset();
    }
    constructor(stateManager: IStateManager, pager: IPager) {
        this.stateManager = stateManager;
        this.pager = pager;
        this.filterManager = new FilterManager(this);
        this.filterManager.registerFilterTarget(this.pager);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    disposed = false;
    inited = false;
    state: ProgressState = ProgressState.Initial;

    get busy(): boolean {
        return this.state === ProgressState.Progress;
    }

    get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }

    init(queryParams?: Object): void {
        this.inited = true;
        const restoredState = this.stateManager.mergeStates(queryParams);
        this.filterManager.parseParams(restoredState);
    }
    dispose(): void {
        this.disposed = true;
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        this.clearData();
        this.filterManager.dispose();
    }
    toRequest(): any {
        return this.filterManager.getRequestState(null);
    }
    getLocalState(): Object {
        return this.filterManager.getPersistedState(null);
    }

    loadData(): Promise<Object> {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }

        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise(this.toRequest());
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
    }
    reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    addToCancellationSequence(promise: Promise<Object>): void { };
    cancelRequests(): void { };
    stateManager: IStateManager;
    filterManager: IFilterManager;
    pager: IPager;
    abstract getDataReadPromise(requestParams: any): Promise<Object>;
}
