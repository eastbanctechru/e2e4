import { ListRequest } from './list-request';

export interface BufferedListRequest extends ListRequest {
    skip: number;
    take: number;
}
