import { IObjectWithState } from './IObjectWithState';
import { IObjectWithFilter } from './IObjectWithFilter';
import { IRequestCanceller } from './IRequestCanceller';
import { IObjectWithSort } from './IObjectWithSort';
export interface IList extends IObjectWithState, IObjectWithFilter, IObjectWithSort, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
