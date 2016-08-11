import { ListRequest } from './list-request';
/**
 * Represents request to the server for getting paged list data.
 * 
 * You can use this contract in your end-user code for better code completion if you have no need to change default parameters names when use {@link PagedPager}.
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
