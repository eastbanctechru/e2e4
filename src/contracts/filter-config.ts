export interface FilterConfig {
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

export function getDefaultFilterConfig(propertyName: string): FilterConfig {
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
    } as FilterConfig;
}
