import { ListResponse } from './contracts/list-response';
import { Pager } from './contracts/pager';
/**
 * Implements {@link Pager} contract and represents list without any paging mechanics.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class NullObjectPager implements Pager {
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
    public processResponse(response: ListResponse<any>): void {
        this.loadedCount = response.loadedCount || (response.items && response.items.length ? response.items.length : 0);
        this.totalCount = response.totalCount || 0;
    }
    /**
     * @see {@link Pager.reset}
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
    }
}
