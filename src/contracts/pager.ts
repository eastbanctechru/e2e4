export interface Pager {
    appendedOnLoad: boolean;
    totalCount: number;
    loadedCount: number;
    reset(): void;
    processResponse(result: Object): void;
}
