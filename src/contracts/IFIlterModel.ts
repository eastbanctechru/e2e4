import {IFilterConfig} from './IFilterConfig';

export interface IFilterModel {
    dispose(): void;
    resetFilters(): void;
    parseParams(params: Object): void;
    buildRequest(result?: Object): Object;
    buildPersistedState(result?: Object): Object;
}
