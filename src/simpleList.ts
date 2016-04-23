import {Defaults} from './common/defaults';
import {Utility} from './common/utility';
import {FilterManager} from './filterManager';
import {ProgressState} from './common/progressState';
import {IStateManager} from './contracts/IStateManager';
import {IList} from './contracts/IList';
import {IFilterManager} from './contracts/IFilterManager';

export abstract class SimpleList implements IList {
    private listLoadDataSuccessCallback(result: Object): Object {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
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
        Utility.disposeAll(this.items);
    }
    constructor(stateManager: IStateManager) {
        this.stateManager = stateManager;
        FilterManager.includeIn(this);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    disposed = false;
    inited = false;
    state: ProgressState = null;

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
        this.clearDataInternal();
        this.filterManager.dispose();
    }
    onSortChangesCompleted(): void {
        if (this.ready) {
            this.clearDataInternal();
            this.loadData();
        }
    }
    ///IList
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
        const promise = this.getDataReadPromise(this.toRequest());
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
    abstract getDataReadPromise(requestParams: any): Promise<Object>;
}
