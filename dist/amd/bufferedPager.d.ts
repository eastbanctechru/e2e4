import { IPager } from './contracts/IPager';
export declare class BufferedPager implements IPager {
    private takeRowCountInternal;
    totalCount: number;
    loadedCount: number;
    defaultRowCount: number;
    minRowCount: number;
    maxRowCount: number;
    skip: number;
    takeRowCount: number;
    processResponse(result: Object): void;
    reset(): void;
}
