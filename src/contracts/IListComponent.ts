import {IComponentWithState} from './contracts/IComponentWithState';
import {IComponentWithSelection} from './contracts/IComponentWithSelection';
import {IComponentWithFilter} from './contracts/IComponentWithFilter';
import {IRequestCanceller} from './contracts/IRequestCanceller';
import {IComponentWithSort} from './contracts/IComponentWithSort';
export interface IListComponent extends IComponentWithState, IComponentWithSelection, IComponentWithFilter,
    IComponentWithSort, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
}
