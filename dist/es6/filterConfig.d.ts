import { IFilterConfig } from './contracts/IFilterConfig';
export declare class FilterConfig implements IFilterConfig {
    static getDefaultConfig(propertyName: string): IFilterConfig;
    defaultValue: Object;
    propertyName: string;
    parameterName: string;
    ignoreOnAutoMap: boolean;
    emptyIsNull: boolean;
    persisted: boolean;
    coerce: boolean;
    serializeFormatter: (value: Object) => Object;
    parseFormatter: (rawValue: Object, allValues?: Object) => Object;
    descriptor: Object;
    constructor(config: IFilterConfig);
    register(target: Object, descriptor?: Object): void;
}
