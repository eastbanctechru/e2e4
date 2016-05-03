import { IPager } from './contracts/IPager';
export declare class SimplePager implements IPager {
    private pageSizeInternal;
    private pageNumberInternal;
    totalCount: number;
    loadedCount: number;
    processResponse(result: Object): void;
    reset(): void;
}
