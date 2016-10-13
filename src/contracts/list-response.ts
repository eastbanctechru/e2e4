/**
 * Represents server response which is returned on list data request.
 * 
 * You can use this contract in your end-user code for better code completion. 
 */
export interface ListResponse<TItem> {
    /**
     * Returned collection of records.
     */
    items: Array<TItem>;
    /**
     * Total count of records in remote data source.
     * This property is used internally by pagers (e.g. to calculate total pages count in ({@link PagedPager}) and can be used to display total records count on UI.
     */
    totalCount: number;
    /**
     * Count of records that was loaded at last request.
     * 
     * Typically it's equal to `items.length` value. But it can differ for grouped lists, for example, so it's placed to a separate property.
     */
    loadedCount?: number;
}
