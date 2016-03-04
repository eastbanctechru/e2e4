import {IFilterConfig} from './contracts/IFilterConfig';
import {FilterModel} from './filterModel';

export class FilterProperty implements IFilterConfig {
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
    constructor(config: IFilterConfig) {
        Object.assign(this, config);
    }
    register(target: Object, descriptor?: Object): void {
        this.descriptor = descriptor || undefined;
        FilterModel.registerFilter(target, this);
    }
}
