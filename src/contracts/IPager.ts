export interface IPager {
    totalCount: number;
    loadedCount: number;
    reset(): void;
    processResponse(result: Object): void;
}
