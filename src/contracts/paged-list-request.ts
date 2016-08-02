import { ListRequest } from './list-request';
/**
 * Опциональный контракт, олицетворяющий собой запрос на сервер для получения постраничного списка.
 * Предназначен для типизации конечного кода извлечения данных. 
 */
export interface PagedListRequest extends ListRequest {
    pageSize: number;
    pageNumber: number;
}
