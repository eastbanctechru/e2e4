import { SimpleList } from './simpleList';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class PagedList extends SimpleList {
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
    clearData(): void;
    goToFirstPage(): void;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
}
