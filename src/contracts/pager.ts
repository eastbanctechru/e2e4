/**
 * Base contract that must be implemented by specific pagers.
 */
export interface Pager {
    /**
     * Must be true for those pager implementations which destroys previously loaded data only on full reload, but keeps data on next chunk loading.
     * This is the case for {@link BufferedPager} for example.
     */
    appendedOnLoad: boolean;
    /**
     * Total count of records in remote data source after filters from last request was applied, but without paging applied.
     * Application-defined {@link Pager} implementations must set this value in {@link processResponse} implementation from server response.
     * @see {@link ListResponse}
     */
    totalCount: number;
    /**
     * Count of records that was loaded by last request to the server.
     * Application-defined {@link Pager} implementations must set this value in {@link processResponse} implementation from server response.
     * @see {@link ListResponse}
     */
    loadedCount: number;
    /**
     * Performs application-defined logic associated with cleaning of pager state.
     */
    reset(): void;
    /**
     * Performs application-defined logic associated with parsing of server response returned on data request. 
     * At least must set response values to {@link totalCount} and {@link loadedCount} properties.
     * @param result server response to process.
     */
    processResponse(result: Object): void;
}
