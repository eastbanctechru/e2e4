import * as _ from 'lodash';
import {FilterConfig} from './filterConfig';
import {IFilterManager} from './contracts/IFilterManager';

export class FilterManager implements IFilterManager {
    static coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    static filterPropertiesMap = new Map<any, Array<FilterConfig>>();
    static registerFilter(targetType: Object, propertyConfig: FilterConfig): void {
        const typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array<FilterConfig>();
        typeConfigs.push(propertyConfig);
        FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
    }
    static coerceValue(value: any): Object {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = FilterManager.coerceValue(value[index]);
                }
            }
        } else if (value && !isNaN(value)) {
            value = +value;
        } else if (value === 'undefined') {
            value = undefined;
        } else if (FilterManager.coerceTypes[value] !== undefined) {
            value = FilterManager.coerceTypes[value];
        }
        return value;
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
    private appliedFiltersMap = new Map<Object, Array<FilterConfig>>();

    dispose(): void {
        this.appliedFiltersMap.clear();
        delete this.appliedFiltersMap;
    }
    resetValues(): void {
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(target) : config.defaultValue;
                const clonedObject = _.cloneDeep({ defaultValue: defaultValue });
                target[config.propertyName] = clonedObject.defaultValue;
            }
        });
    }
    parseParams(params: Object): void {
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (false === this.defaultsApplied && config.defaultValue === undefined) {
                    config.defaultValue = _.cloneDeep({ defaultValue: target[config.propertyName] }).defaultValue;
                }

                if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                    proposedVal = config.coerce ? FilterManager.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
        this.defaultsApplied = true;
    }
    getRequestState(result?: Object): Object {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig, target) => {
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
        this.appliedFiltersMap.forEach((targetConfig, target) => {
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
        let targetConfig = this.appliedFiltersMap.has(target) ? this.appliedFiltersMap.get(target) : new Array<FilterConfig>();
        FilterManager.filterPropertiesMap.forEach((typeConfig, type) => {
            if (target instanceof type) {
                targetConfig = targetConfig.concat(_.cloneDeep(typeConfig));
            }
        });
        if (targetConfig.length > 0) {
            this.appliedFiltersMap.set(target, targetConfig);
        } else {
            this.appliedFiltersMap.delete(target);
        }
    }
    constructor(target: Object) {
        this.registerFilterTarget(target);
    }
}
