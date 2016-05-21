import {FilterConfig} from './filterConfig';
import {Utility} from './common/utility';
import {IFilterManager} from './contracts/IFilterManager';

export class FilterManager implements IFilterManager {

    static filterPropertiesMap = new Map<any, Array<FilterConfig>>();
    static registerFilter(targetType: Object, propertyConfig: FilterConfig): void {
        const typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array<FilterConfig>();
        typeConfigs.push(propertyConfig);
        FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
    }

    static buildFilterValue(target: Object, value: any, config: FilterConfig): Object {
        if (config && config.serializeFormatter) {
            return config.serializeFormatter.call(target, value);
        }

        value = config && config.emptyIsNull ? value || null : value;

        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = FilterManager.buildFilterValue(target, value[i], null);
            }
            return temp;
        }
        return value;
    }

    private defaultsApplied = false;
    private appliedFiltersMapInternal = new Map<Object, Array<FilterConfig>>();

    dispose(): void {
        this.appliedFiltersMapInternal.clear();
        delete this.appliedFiltersMapInternal;
    }
    get appliedFiltersMap(): Map<Object, Array<FilterConfig>> {
        return this.appliedFiltersMapInternal;
    }
    resetValues(): void {
        this.appliedFiltersMapInternal.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(target) : config.defaultValue;
                const clonedObject = Utility.cloneLiteral({ defaultValue: defaultValue });
                target[config.propertyName] = config.parseFormatter ? config.parseFormatter(clonedObject.defaultValue) : clonedObject.defaultValue;
            }
        });
    }
    parseParams(params: Object): void {
        this.appliedFiltersMapInternal.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (false === this.defaultsApplied && config.defaultValue === undefined) {
                    config.defaultValue = Utility.cloneLiteral({ defaultValue: target[config.propertyName] }).defaultValue;
                }

                if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                    proposedVal = config.coerce ? Utility.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
        this.defaultsApplied = true;
    }
    getRequestState(result?: Object): Object {
        result = result || {};
        this.appliedFiltersMapInternal.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const proposedVal = target[config.propertyName];
                result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    getPersistedState(result?: Object): Object {
        result = result || {};
        this.appliedFiltersMapInternal.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (!config.persisted) {
                    continue;
                }
                let proposedVal = target[config.propertyName];
                if (proposedVal && proposedVal.toRequest) {
                    proposedVal = proposedVal.toRequest();
                }
                result[config.parameterName] = config.serializeFormatter
                    ? config.serializeFormatter.call(target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
            }
        });
        return result;
    }
    registerFilterTarget(target: Object): void {
        let targetConfig = this.appliedFiltersMapInternal.has(target) ? this.appliedFiltersMapInternal.get(target) : new Array<FilterConfig>();
        FilterManager.filterPropertiesMap.forEach((typeConfig, type) => {
            if (target instanceof type) {
                targetConfig = targetConfig.concat(typeConfig);
            }
        });
        if (targetConfig.length > 0) {
            this.appliedFiltersMapInternal.set(target, targetConfig);
        } else {
            this.appliedFiltersMapInternal.delete(target);
        }
    }
    constructor(target: Object) {
        this.registerFilterTarget(target);
    }
}
