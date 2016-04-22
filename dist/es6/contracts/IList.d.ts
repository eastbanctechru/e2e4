import { IObjectWithState } from './IObjectWithState';
import { IObjectWithFilter } from './IObjectWithFilter';
import { IRequestCanceller } from './IRequestCanceller';
export interface IList extends IObjectWithState, IObjectWithFilter, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
