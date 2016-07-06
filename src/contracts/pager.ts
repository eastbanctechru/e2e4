export interface Pager {
    totalCount: number;
    loadedCount: number;
    reset(): void;
    processResponse(result: Object): void;
}
