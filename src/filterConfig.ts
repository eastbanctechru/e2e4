import {IFilterConfig} from './contracts/IFilterConfig';
import {FilterManager} from './filterManager';

export class FilterConfig implements IFilterConfig {
    static getDefaultConfig(propertyName: string): IFilterConfig {
        return {
            coerce: true,
            defaultValue: undefined,
            emptyIsNull: false,
            ignoreOnAutoMap: false,
            parameterName: propertyName,
            parseFormatter: undefined,
            persisted: false,
            propertyName: propertyName,
            serializeFormatter: undefined
        } as IFilterConfig;
    }
    defaultValue: Object;
    propertyName: string;
    parameterName: string;
    ignoreOnAutoMap: boolean;
    emptyIsNull: boolean;
    persisted: boolean;
    coerce: boolean;
    serializeFormatter: (value: Object) => Object;
    parseFormatter: (rawValue: Object, allValues?: Object) => Object;
    constructor(config: IFilterConfig) {
        Object.assign(this, config);
    }
    register(target: Object): void {
        FilterManager.registerFilter(target, this);
    }
}
