import { IPager } from './contracts/IPager';
export declare class PagedPager implements IPager {
    private pageSizeInternal;
    private pageNumberInternal;
    totalCount: number;
    loadedCount: number;
    displayFrom: number;
    displayTo: number;
    pageCount: number;
    pageNumber: number;
    pageSize: number;
    processResponse(result: Object): void;
    reset(): void;
}