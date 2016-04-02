import { IComponentWithState } from './IComponentWithState';
import { IComponentWithSelection } from './IComponentWithSelection';
import { IComponentWithFilter } from './IComponentWithFilter';
import { IRequestCanceller } from './IRequestCanceller';
import { IComponentWithSort } from './IComponentWithSort';
export interface IList extends IComponentWithState, IComponentWithSelection, IComponentWithFilter, IComponentWithSort, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
