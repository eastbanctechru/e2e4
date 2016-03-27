import { ListComponent } from './listComponent';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class BufferedListComponent extends ListComponent {
    private bufferedLoadDataSuccessBinded;
    private takeRowCountInternal;
    skip: number;
    takeRowCount: number;
    constructor(stateManager: IStateManager);
    dispose(): void;
    bufferedLoadDataSuccess(result: Object): Object;
    loadData(): Promise<Object>;
    onSortChangesCompleted(): void;
}
