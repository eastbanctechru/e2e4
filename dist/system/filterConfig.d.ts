import { IFilterConfig } from './contracts/IFilterConfig';
export declare class FilterConfig implements IFilterConfig {
    defaultValue: Object;
    propertyName: string;
    parameterName: string;
    ignoreOnAutoMap: boolean;
    emptyIsNull: boolean;
    persisted: boolean;
    coerce: boolean;
    valueSerializer: (value: Object) => Object;
    valueParser: (rawValue: Object, allValues?: Object) => Object;
    descriptor: Object;
    constructor(config: IFilterConfig);
    register(target: Object, descriptor?: Object): void;
}
