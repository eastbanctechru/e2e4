import { IPager } from './contracts/IPager';
export declare class SimplePager implements IPager {
    totalCount: number;
    loadedCount: number;
    processResponse(result: Object): void;
    reset(): void;
}
