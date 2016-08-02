import { ListRequest } from './list-request';
/**
 * Опциональный контракт, олицетворяющий собой запрос на сервер для получения буферного списка.
 * Предназначен для типизации конечного кода извлечения данных. 
 */
export interface BufferedListRequest extends ListRequest {
    skip: number;
    take: number;
}
