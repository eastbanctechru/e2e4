import { ListRequest } from './list-request';

export interface PagedListRequest extends ListRequest {
    pageSize: number;
    pageNumber: number;
}
