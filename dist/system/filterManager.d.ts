import { FilterConfig } from './filterConfig';
import { IFilterManager } from './contracts/IFilterManager';
import { IObjectWithFilter } from './contracts/IObjectWithFilter';
export declare class FilterManager implements IFilterManager {
    static coerceTypes: {
        'true': boolean;
        'false': boolean;
        'null': any;
    };
    static filterPropertiesMap: Map<any, FilterConfig[]>;
    static registerFilter(targetType: Object, propertyConfig: FilterConfig): void;
    static includeIn(target: IObjectWithFilter): void;
    static coerceValue(value: any): Object;
    static buildFilterValue(target: Object, value: any, config: FilterConfig): Object;
    private defaultsApplied;
    private appliedFiltersMap;
    dispose(): void;
    resetFilters(): void;
    parseParams(params: Object): void;
    buildRequest(result?: Object): Object;
    buildPersistedState(result?: Object): Object;
    registerFilterTarget(target: Object): void;
    constructor(target: Object);
}
