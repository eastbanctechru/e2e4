import { List } from './list';
import { IStateManager } from './contracts/IStateManager';
import { ISortManager } from './contracts/ISortManager';
export declare abstract class PagedList extends List {
    private pageSizeInternal;
    private pageNumberInternal;
    private pagedLoadDataSuccessBinded;
    private pagedLoadDataSuccessCallback(result);
    displayFrom: number;
    displayTo: number;
    constructor(stateManager: IStateManager, sortManager: ISortManager);
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
