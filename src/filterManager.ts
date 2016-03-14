import * as _ from 'lodash';
import {FilterProperty} from './filterProperty';
import {IFilterManager} from './contracts/IFilterManager';
import {IComponentWithFilter} from './contracts/IComponentWithFilter';

export class FilterManager implements IFilterManager {
    static coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    static filterPropertiesMap = new Map<Object, Array<FilterProperty>>();
    static registerFilter(targetType: Object, propertyConfig: FilterProperty): void {
        const typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array<FilterProperty>();
        typeConfigs.push(propertyConfig);
        FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
    }
    static includeIn(target: IComponentWithFilter): void {
        target.filterManager = new FilterManager(target);
    }
    static coerceValue(/* tslint:disable:no-any */value: any/* tslint:enable:no-any */): Object {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = FilterManager.coerceValue(value[index]);
                }
            }
        }
        if (value && !isNaN(value)) {
            value = +value;
        } else if (value === 'undefined') {
            value = undefined;
        } else if (FilterManager.coerceTypes[value] !== undefined) {
            value = FilterManager.coerceTypes[value];
        }
        return value;
    }
    static buildFilterValue(target: Object, /* tslint:disable:no-any */value: any/* tslint:enable:no-any */, config: FilterProperty): Object {
        if (config && config.valueSerializer) {
            return config.valueSerializer.call(target, value);
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
    private target: Object;
    private defaultsApplied = false;
    private targetConfig = new Array<FilterProperty>();

    dispose(): void {
        this.targetConfig.length = 0;
        delete this.target;
        delete this.targetConfig;
    }
    resetFilters(): void {
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(this.target) : config.defaultValue;
            const clonedObject = _.cloneDeep({ defaultValue: defaultValue });
            this.target[config.propertyName] = clonedObject.defaultValue;
        }
    }
    parseParams(params: Object): void {
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            if (false === this.defaultsApplied && config.defaultValue === undefined) {
                config.defaultValue = _.cloneDeep({ defaultValue: this.target[config.propertyName] }).defaultValue;
            }

            if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                proposedVal = config.coerce ? FilterManager.coerceValue(proposedVal) : proposedVal;
                this.target[config.propertyName] = config.valueParser ? config.valueParser.call(this.target, proposedVal, params) : proposedVal;
            }
        }
        this.defaultsApplied = true;
    }
    buildRequest(result?: Object): Object {
        result = result || {};
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            const proposedVal = this.target[config.propertyName];
            result[config.parameterName] = FilterManager.buildFilterValue(this.target, proposedVal, config);
        }
        return result;
    }
    buildPersistedState(result?: Object): Object {
        result = result || {};
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            if (!config.persisted) {
                continue;
            }
            let proposedVal = this.target[config.propertyName];
            if (proposedVal && proposedVal.toRequest) {
                proposedVal = proposedVal.toRequest();
            }
            result[config.parameterName] = config.valueSerializer
                ? config.valueSerializer.call(this.target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
        }
        return result;
    }

    constructor(target: Object) {
        this.target = target;
        FilterManager.filterPropertiesMap.forEach(((typeConfig, type) => {
            if (target instanceof type) {
                this.targetConfig = this.targetConfig.concat(_.cloneDeep(typeConfig));
            }
        }).bind(this));
    }
}
