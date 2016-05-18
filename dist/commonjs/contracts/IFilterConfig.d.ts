export interface IFilterConfig {
    defaultValue?: Object;
    propertyName?: string;
    parameterName?: string;
    ignoreOnAutoMap?: boolean;
    emptyIsNull?: boolean;
    coerce?: boolean;
    persisted?: boolean;
    serializeFormatter?: (value: Object) => Object;
    parseFormatter?: (rawValue: Object, allValues?: Object) => Object;
}
