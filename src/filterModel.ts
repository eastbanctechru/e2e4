import * as _ from 'lodash';
import {FilterProperty} from './filterProperty';
import {IFilterModel} from './contracts/IFilterModel';
import {IComponentWithFilter} from './contracts/IComponentWithFilter';

export class FilterModel implements IFilterModel {
    static coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    static filterPropertiesMap = new Map<Object, Array<FilterProperty>>();
    static registerFilter(targetType: Object, propertyConfig: FilterProperty): void {
        const typeConfigs = FilterModel.filterPropertiesMap.has(targetType) ? FilterModel.filterPropertiesMap.get(targetType) : new Array<FilterProperty>();
        typeConfigs.push(propertyConfig);
        FilterModel.filterPropertiesMap.set(targetType, typeConfigs);
    }
    static includeIn(target: IComponentWithFilter): void {
        target.filterModel = new FilterModel(target);
    }
    static coerceValue(/* tslint:disable:no-any */value: any/* tslint:enable:no-any */): Object {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = FilterModel.coerceValue(value[index]);
                }
            }
        }
        if (value && !isNaN(value)) {
            value = +value;
        } else if (value === 'undefined') {
            value = undefined;
        } else if (FilterModel.coerceTypes[value] !== undefined) {
            value = FilterModel.coerceTypes[value];
        }
        return value;
    }
    private target: Object;
    private defaultsApplied = false;
    private targetConfig = new Array<FilterProperty>();
    private buildValue(/* tslint:disable:no-any */value: any/* tslint:enable:no-any */, config: FilterProperty): Object {
        if (config && config.valueSerializer) {
            return config.valueSerializer.call(this.target, value);
        }

        value = config && config.emptyIsNull ? value || null : value;

        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = this.buildValue(value[i], null);
            }
            return temp;
        }
        return value;
    }

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
                proposedVal = config.coerce ? FilterModel.coerceValue(proposedVal) : proposedVal;
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
            result[config.parameterName] = this.buildValue(proposedVal, config);
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
        FilterModel.filterPropertiesMap.forEach(((typeConfig, type) => {
            if (target instanceof type) {
                this.targetConfig = this.targetConfig.concat(_.cloneDeep(typeConfig));
            }
        }).bind(this));
    }
}
