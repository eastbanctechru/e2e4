import { List } from './list';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class PagedListComponent extends List {
    private pageSizeInternal;
    private pageNumberInternal;
    private pagedLoadDataSuccessBinded;
    private pagedLoadDataSuccessCallback(result);
    displayFrom: number;
    displayTo: number;
    constructor(stateManager: IStateManager);
    dispose(): void;
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    loadData(): Promise<Object>;
    goToFirstPage(): void;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
}
