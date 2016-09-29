/**
 * Base contract to implement by specific pagers.
 */
export interface Pager {
    /**
     * Must be `true` for such pager implementations which destroys previously loaded data only on full reload, but keeps data on next chunk loading.
     * 
     * This is the case for {@link BufferedPager} for example.
     */
    appendedOnLoad: boolean;
    /**
     * Total count of records in remote data source after filters from last request was applied, but without paging applied.
     * 
     * @see {@link ListResponse}
     */
    totalCount: number;
    /**
     * Count of records which were loaded by last request to the server.
     * 
     * @see {@link ListResponse}
     */
    loadedCount: number;
    /**
     * Performs application-defined logic associated with pager state reset.
     */
    reset(): void;
    /**
     * Performs application-defined logic associated with parsing of server response returned on data request. 
     * 
     * @param result server response to process.
     */
    processResponse(response: Object, loadedRecords?: Array<any>): void;
}
