import { SortParameter } from '../sort-parameter';
/**
 * Опциональный контракт, олицетворяющий собой запрос на сервер для получения простого списка.
 * Предназначен для типизации конечного кода извлечения данных. 
 */
export interface ListRequest {
    sort: Array<SortParameter>;
}
