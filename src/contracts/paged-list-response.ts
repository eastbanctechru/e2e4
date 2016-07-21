import { ListResponse } from './list-response';
export interface PagedListResponse<TItem> extends ListResponse<TItem> {
    items: Array<TItem>;
    displayFrom: number;
    displayTo: number;
}
