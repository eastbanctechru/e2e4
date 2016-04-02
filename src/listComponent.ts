import {Defaults} from './common/defaults';
import {Utility} from './common/utility';
import {SelectionManager} from './selectionManager';
import {FilterManager} from './filterManager';
import {ProgressState} from './common/progressState';
import {IStateManager} from './contracts/IStateManager';
import {IList} from './contracts/IList';
import {ISortManager} from './contracts/ISortManager';
import {SortManager} from './sortManager';
import {IFilterManager} from './contracts/IFilterManager';
import {ISelectionManager} from './contracts/ISelectionManager';

export abstract class ListComponent implements IList {
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
    constructor(stateManager: IStateManager) {
        this.stateManager = stateManager;
        SelectionManager.includeIn(this, 'items');
        FilterManager.includeIn(this);
        SortManager.includeIn(this);
        this.filterManager.registerFilterTarget(this.sortManager);
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

    ///IComponent overrides
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
        this.sortManager.dispose();
        this.filterManager.dispose();
        this.selectionManager.dispose();
    }
    ///IComponent overrides
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
    ///IList

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
    selectionManager: ISelectionManager;
    filterManager: IFilterManager;
    sortManager: ISortManager;
    abstract getDataReadPromise(): Promise<Object>;
}
