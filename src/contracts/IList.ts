import {IRequestCanceller} from './IRequestCanceller';
export interface IList extends IRequestCanceller {
    items: Object[];
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
    onSortChangesCompleted(): void;
}
