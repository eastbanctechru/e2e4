import { SortParameter } from '../sortings-service';
/**
 * Represents request to the server for list.
 * 
 * You can use this contract in your end-user code for better code completion.
 */
export interface ListRequest {
    /**
     * Sortings, which must be applied to the data on next request.
     */
    sortings: Array<SortParameter>;
}
