import {SimpleList} from './simpleList';
import {PagedPager} from './pagedPager';
import {Utility} from './common/utility';
import {Defaults} from './common/defaults';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';
import {IStateManager} from './contracts/IStateManager';

export abstract class PagedList extends SimpleList {
    constructor(stateManager: IStateManager, pager: PagedPager) {
        super(stateManager, pager);
    }

    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        Utility.disposeAll(this.items);
        return promise;
    }
    goToFirstPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber = 1;
            this.loadData();
        }
    }
    goToPreviousPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber -= 1;
            this.loadData();
        }
    }
    goToNextPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber += 1;
            this.loadData();
        }
    }
    goToLastPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber = (<PagedPager>this.pager).pageCount;
            this.loadData();
        }
    }
}
