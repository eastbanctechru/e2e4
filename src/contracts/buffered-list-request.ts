import { ListRequest } from './list-request';
/**
 * Represents request to the server for getting buffered list data.
 * 
 * You can use this contract in your end-user code for better code completion if you have no need to change default parameters names when use {@link BufferedPager}.
 */
export interface BufferedListRequest extends ListRequest {
    /**
     * How many items already loaded to the list and must be skipped on next request.
     */
    skip: number;
    /**
     * How many items must be loaded on next request.
     */
    take: number;
}
