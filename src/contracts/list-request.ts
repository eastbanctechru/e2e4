import { SortParameter } from '../sortings-service';
/**
 * Represents request to the server for list.
 */
export interface ListRequest {
    /**
     * Sortings, which must be applied to the data on next request.
     */
    sort: Array<SortParameter>;
}
