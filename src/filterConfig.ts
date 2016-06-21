import {IFilterConfig} from './contracts/IFilterConfig';
import {FilterManager} from './filterManager';

export class FilterConfig implements IFilterConfig {

    public defaultValue: Object;
    public propertyName: string;
    public parameterName: string;
    public ignoreOnAutoMap: boolean;
    public emptyIsNull: boolean;
    public persisted: boolean;
    public coerce: boolean;
    public serializeFormatter: (value: Object) => Object;
    public parseFormatter: (rawValue: Object, allValues?: Object) => Object;
    public static getDefaultConfig(propertyName: string): IFilterConfig {
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
    constructor(config: IFilterConfig) {
        Object.assign(this, config);
    }
    public register(target: Object): void {
        FilterManager.registerFilter(target, this);
    }
}
