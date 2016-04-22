import { List } from './list';
import { IStateManager } from './contracts/IStateManager';
import { ISortManager } from './contracts/ISortManager';
export declare abstract class BufferedList extends List {
    private bufferedLoadDataSuccessBinded;
    private takeRowCountInternal;
    skip: number;
    takeRowCount: number;
    constructor(stateManager: IStateManager, sortManager: ISortManager);
    dispose(): void;
    bufferedLoadDataSuccess(result: Object): Object;
    loadData(): Promise<Object>;
    onSortChangesCompleted(): void;
}
