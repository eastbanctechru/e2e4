import { SortDirection } from './sortDirection';
export declare class SortParameter {
    constructor(fieldName: string, direction?: SortDirection);
    direction: SortDirection;
    fieldName: string;
    toggleDirection(): void;
    toRequest(): Object;
}
