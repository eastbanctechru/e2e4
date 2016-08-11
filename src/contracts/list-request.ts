import { SortParameter } from '../sort-parameter';
/**
 * Represents request to the server for getting data for regular list.
 *
 * You can use this contract in your end-user code for better code completion if you have no need to change default parameters names when use {@link RegularPager}. 
 */
export interface ListRequest {
    /**
     * Sortings, which must be applied to the data on next request.
     */
    sort: Array<SortParameter>;
}
