import { IObjectWithState } from './IObjectWithState';
import { IObjectWithSelection } from './IObjectWithSelection';
import { IObjectWithFilter } from './IObjectWithFilter';
import { IRequestCanceller } from './IRequestCanceller';
import { IObjectWithSort } from './IObjectWithSort';
export interface IList extends IObjectWithState, IObjectWithSelection, IObjectWithFilter, IObjectWithSort, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
