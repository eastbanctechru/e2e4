import { SortParameter } from '../sort-parameter';
/**
 * Represents request to the server for getting reguar list data.
 * If you don't need to change default parameters names when use {@link RegularPager}, you can use this contract in your end-user code for better code completion. 
 */
export interface ListRequest {
    /**
     * Sortings, wich must be applied to the data on next request.
     */
    sort: Array<SortParameter>;
}
