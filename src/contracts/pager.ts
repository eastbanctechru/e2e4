import { ListResponse } from './list-response';
/**
 * Base contract of pager.
 */
export interface Pager {
    /**
     * Must be `true` for such pager implementations which destroy previously loaded data only on full reload and keep data on next chunk loading.
     * 
     * This is the case for {@link BufferedPager}, for example.
     */
    appendedOnLoad: boolean;
    /**
     * Total count of records in remote data source.
     * 
     * @see {@link ListResponse}
     */
    totalCount: number;
    /**
     * Count of records that was loaded at last request.
     * 
     * @see {@link ListResponse}
     */
    loadedCount: number;
    /**
     * Performs logic associated with pager state reset.
     */
    reset(): void;
    /**
     * Performs logic associated with parsing of server response returned at data request. 
     * 
     * @param response server response to process.
     */
    processResponse(response: ListResponse<any>): void;
}
