export interface IFilterConfig {
    defaultValue?: Object;
    propertyName?: string;
    parameterName?: string;
    ignoreOnAutoMap?: boolean;
    emptyIsNull?: boolean;
    coerce?: boolean;
    persisted?: boolean;
    valueSerializer?: (value: Object) => Object;
    valueParser?: (rawValue: Object, allValues?: Object) => Object;
}
