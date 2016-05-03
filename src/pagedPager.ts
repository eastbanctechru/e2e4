import {IPager} from './contracts/IPager';
export class PagedPager implements IPager {
    totalCount: number = 0;
    loadedCount: number = 0;
    processResponse(result: Object): void { }
    reset(): void {
        throw new Error('Not implemented yet');
    }
}
