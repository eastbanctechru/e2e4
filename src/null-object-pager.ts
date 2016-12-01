import { ListResponse } from './contracts/list-response';
import { Pager } from './contracts/pager';
/**
 * Implements {@link Pager} contract and represents list without any paging mechanics.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class NullObjectPager implements Pager {
    /**
     * @inheritdoc
     */
    public appendedOnLoad: boolean = false;

    /**
     * @inheritdoc
     */
    public totalCount: number = 0;
    /**
     * @inheritdoc
     */
    public loadedCount: number = 0;
    /**
     * @inheritdoc
     */
    public processResponse(response: ListResponse<any>): void {
        this.loadedCount = response.loadedCount || (response.items && response.items.length ? response.items.length : 0);
        this.totalCount = response.totalCount || 0;
    }
    /**
     * @inheritdoc
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
    }
}
