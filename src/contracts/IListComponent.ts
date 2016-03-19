import {IComponentWithState} from './contracts/IComponentWithState';
import {IComponentWithSelection} from './contracts/IComponentWithSelection';
import {IComponentWithFilter} from './contracts/IComponentWithFilter';
import {IRequestCanceller} from './contracts/IRequestCanceller';
import {ISortableComponent} from './contracts/ISortableComponent';
export interface IListComponent extends IComponentWithState, IComponentWithSelection, IComponentWithFilter,
    ISortableComponent, IRequestCanceller {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
}
