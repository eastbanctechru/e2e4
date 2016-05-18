import { FilterConfig } from './filterConfig';
import { IFilterManager } from './contracts/IFilterManager';
export declare class FilterManager implements IFilterManager {
    static coerceTypes: {
        'true': boolean;
        'false': boolean;
        'null': any;
    };
    static filterPropertiesMap: Map<any, FilterConfig[]>;
    static registerFilter(targetType: Object, propertyConfig: FilterConfig): void;
    static coerceValue(value: any): Object;
    static buildFilterValue(target: Object, value: any, config: FilterConfig): Object;
    private defaultsApplied;
    private appliedFiltersMap;
    dispose(): void;
    resetValues(): void;
    parseParams(params: Object): void;
    getRequestState(result?: Object): Object;
    getPersistedState(result?: Object): Object;
    registerFilterTarget(target: Object): void;
    constructor(target: Object);
}
