import {Defaults} from './common/defaults';
import {Utility} from './common/utility';
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
        Utility.disposeAll(this.items);
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
        const restoredState = this.getRestoredState(queryParams);
        this.filterManager.parseParams(restoredState);
    }
    dispose(): void {
        this.disposed = true;
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        this.clearData();
        this.filterManager.dispose();
    }
    ///IList
    items: Object[] = [];
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

        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise(this.toRequest());
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        if (this.useModelState) {
            this.saveRequestState();
            this.saveLocalState();
        }
        return promise;
    }
    reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    ///IList

    ///IRequestCanceller
    addToCancellationSequence(promise: Promise<Object>): void { };
    cancelRequests(): void { };
    ///IRequestCanceller
    ///IObjectWithState
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
    ///IObjectWithState
    filterManager: IFilterManager;
    pager: IPager;
    abstract getDataReadPromise(requestParams: any): Promise<Object>;
}
