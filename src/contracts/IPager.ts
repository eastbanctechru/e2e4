export interface IPager {
    reset(): void;
    processResponse(result: Object): void;
    totalCount: number;
    loadedCount: number;
}
