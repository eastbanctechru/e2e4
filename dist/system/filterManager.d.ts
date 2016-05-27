import { IFilterConfig } from './contracts/IFilterConfig';
import { IFilterManager } from './contracts/IFilterManager';
export declare class FilterManager implements IFilterManager {
    static filterPropertiesMap: Map<any, IFilterConfig[]>;
    static registerFilter(targetType: Object, propertyConfig: IFilterConfig): void;
    static buildFilterValue(target: Object, value: any, config: IFilterConfig): Object;
    private defaultsApplied;
    private appliedFiltersMapInternal;
    dispose(): void;
    appliedFiltersMap: Map<Object, Array<IFilterConfig>>;
    resetValues(): void;
    parseParams(params: Object): void;
    getRequestState(result?: Object): Object;
    getPersistedState(result?: Object): Object;
    registerFilterTarget(target: Object): void;
    constructor(target: Object);
}
