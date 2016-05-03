import {IObjectWithState} from './IObjectWithState';
import {IRequestCanceller} from './IRequestCanceller';
export interface IList extends IObjectWithState, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
