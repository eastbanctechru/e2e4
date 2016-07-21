export interface ListResponse<TItem> {
    items: Array<TItem>;
    totalCount: number;
    loadedCount: number;
}
