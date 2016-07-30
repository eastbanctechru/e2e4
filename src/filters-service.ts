import {FilterConfig} from './contracts/filter-config';
import {Utility} from './utility';

export class FiltersService {
    public static filterPropertiesMap: Map<any, Array<FilterConfig>> = new Map<any, Array<FilterConfig>>();
    protected appliedFiltersMapInternal: Map<Object, Array<FilterConfig>> = new Map<Object, Array<FilterConfig>>();
    protected filtersMapBuilded: boolean = false;

    public static registerFilter(targetType: Object, propertyConfig: FilterConfig): void {
        const typeConfigs = FiltersService.filterPropertiesMap.has(targetType) ? FiltersService.filterPropertiesMap.get(targetType) : new Array<FilterConfig>();
        typeConfigs.push(propertyConfig);
        FiltersService.filterPropertiesMap.set(targetType, typeConfigs);
    }
    public static buildFilterValue(target: Object, value: any, config: FilterConfig): Object {
        if (config && config.serializeFormatter) {
            return config.serializeFormatter.call(target, value);
        }

        value = config && config.emptyIsNull ? value || null : value;
        value = config && config.coerce ? Utility.coerceValue(value) : value;
        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = FiltersService.buildFilterValue(target, value[i], null);
            }
            return temp;
        }
        return value;
    }

    public dispose(): void {
        this.appliedFiltersMapInternal.clear();
    }
    public get appliedFiltersMap(): Map<Object, Array<FilterConfig>> {
        if (!this.filtersMapBuilded) {
            this.buildFiltersMap();
        }
        return this.appliedFiltersMapInternal;
    }
    public resetValues(): void {
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(target) : config.defaultValue;
                const clonedObject = Utility.cloneLiteral({ defaultValue: defaultValue });
                target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, clonedObject.defaultValue) : clonedObject.defaultValue;
            }
        });
    }
    public applyParams(params: Object): void {
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (params && params.hasOwnProperty(config.parameterName) && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                    proposedVal = config.coerce ? Utility.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
    }
    public getRequestState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const proposedVal = target[config.propertyName];
                result[config.parameterName] = FiltersService.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public getPersistedState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (!config.persisted) {
                    continue;
                }
                let proposedVal = target[config.propertyName];
                result[config.parameterName] = FiltersService.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public registerFilterTarget(...targets: Object[]): void {
        targets.forEach((target: Object) => {
            this.appliedFiltersMapInternal.set(target, null);
        });
    }
    private buildFiltersMap(): void {
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            targetConfig = new Array<FilterConfig>();
            FiltersService.filterPropertiesMap.forEach((typeConfig: Array<FilterConfig>, type: any) => {
                if (target instanceof type) {
                    targetConfig = targetConfig.concat(typeConfig);
                    for (let i = 0; i < targetConfig.length; i++) {
                        let config = targetConfig[i];
                        if (config.defaultValue === undefined) {
                            config.defaultValue = Utility.cloneLiteral({ defaultValue: target[config.propertyName] }).defaultValue;
                        }
                    }
                }
            });
            if (targetConfig.length > 0) {
                this.appliedFiltersMapInternal.set(target, targetConfig);
            } else {
                this.appliedFiltersMapInternal.delete(target);
            }
        });
        this.filtersMapBuilded = true;
    }
    constructor(target?: Object) {
        if (target) {
            this.registerFilterTarget(target);
        }
    }
}
