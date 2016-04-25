import { SimpleList } from './simpleList';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class BufferedList extends SimpleList {
    private bufferedLoadDataSuccessBinded;
    private takeRowCountInternal;
    skip: number;
    takeRowCount: number;
    constructor(stateManager: IStateManager);
    dispose(): void;
    bufferedLoadDataSuccess(result: Object): Object;
    clearData(): void;
    loadData(): Promise<Object>;
    onSortChangesCompleted(): void;
}
