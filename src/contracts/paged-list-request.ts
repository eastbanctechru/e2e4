import { ListRequest } from './list-request';
/**
 * Optional contract which represents request to the server for getting paged list data.
 * If you don't need to change default parameters names when use {@link PagedPager}, you can use this contract in your end-user code for better code completion.
 */
export interface PagedListRequest extends ListRequest {
    /**
     * Size of page that must be loaded to the list on next request.
     */
    pageSize: number;
    /**
     * Number of page that must be loaded to the list on next request.
     */
    pageNumber: number;
}
