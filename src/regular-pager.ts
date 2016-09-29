import { Pager } from './contracts/pager';
/**
 * Implements {@link Pager} contract and represents behavior of simple list without any paging mechanics.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class RegularPager implements Pager {
    /**
     * @see {@link Pager.appendedOnLoad}
     */
    public appendedOnLoad: boolean = false;

    /**
     * @see {@link Pager.totalCount}
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}
     */
    public loadedCount: number = 0;
    /**
     * @see {@link Pager.processResponse}
     */
    public processResponse(response: Object, loadedRecords?: Array<any>): void {
        this.loadedCount = (<any>response).loadedCount || (loadedRecords && loadedRecords.length ? loadedRecords.length : 0);
        this.totalCount = (<any>response).totalCount || 0;
    }
    /**
     * @see {@link Pager.reset}
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
    }
}
