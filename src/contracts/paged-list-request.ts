import { ListRequest } from './list-request';
/**
 * Опциональный контракт, олицетворяющий собой запрос на сервер для получения постраничного списка.
 * Предназначен для типизации конечного кода извлечения данных. 
 */
export interface PagedListRequest extends ListRequest {
    /**
     * Размер страницы данных, которую надо загрузить.
     */
    pageSize: number;
    /**
     * Номер страницы, которую надо загрузить.
     */
    pageNumber: number;
}
