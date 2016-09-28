/**
 * Represents server response which is returned on regular list data request.
 * 
 * You can use this contract in your end-user code for better code completion if you have no need to change default parameters names when use {@link RegularPager}. 
 */
export interface ListResponse<TItem> {
    /**
     * Returned collection of records.
     */
    items: Array<TItem>;
    /**
     * Total count of records in remote data source after filters from last request was applied, but without paging applied.
     * This property is used internally by pagers (to calculate total pages count in ({@link PagedPager} for example) and can be used to display on UI.
     */
    totalCount: number;
    /**
     * Count of records that was loaded by last request.
     * Typically this is the same as {@link items}.length value. But it's placed in to separate property since it can differ for grouped lists, for example.
     */
    loadedCount?: number;
}
