import { ListResponse } from './list-response';
/**
 * Optional contract which represents server response to paged list data request.
 * If you don't need to change default parameters names when use {@link PagedPager}, you can use this contract in your end-user code for better code completion. 
 */
export interface PagedListResponse<TItem> extends ListResponse<TItem> {
    /**
     * Returned collection of records.
     */
    items: Array<TItem>;
    /**
     * Number of record from which data was loaded on last request. It will be 21 when loads second page of list with page size of 20, for example.
     */
    displayFrom: number;
    /**
     * Number of record to which data was loaded on last request. 
     * For example, it will be equal to 40 when loads second page of list with page size of 20. Or it will be equal to total count of available records if records count is less than 40.
     */
    displayTo: number;
}
