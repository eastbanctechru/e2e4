import { SimpleList } from './simpleList';
import { PagedPager } from './pagedPager';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class PagedList extends SimpleList {
    constructor(stateManager: IStateManager, pager: PagedPager);
    loadData(): Promise<Object>;
    goToFirstPage(): void;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
}
