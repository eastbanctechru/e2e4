import { ListComponent } from './listComponent';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class PagedListComponent extends ListComponent {
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
