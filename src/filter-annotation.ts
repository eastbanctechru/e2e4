import { FilterConfig } from './contracts/filter-config';
import { FiltersService } from './filters-service';
/**
 * Returns object literal that meets {@link FilterConfig} contract with next values:
 * ```Javascript
 * {
 *        coerce: true,
 *        defaultValue: undefined,
 *        emptyIsNull: false,
 *        ignoreOnAutoMap: false,
 *        parameterName: <value of 'propertyName' parameter>,
 *        parseFormatter: undefined,
 *        propertyName: <value of 'propertyName' parameter>,
 *        serializeFormatter: undefined
 * }
 * ```
 * @param propertyName name of the property in `target type`, for which configuration is created. This value will be used to set {@link FilterConfig.propertyName} and {@link FilterConfig.parameterName} values.
 * @see {@link FilterConfig}
 */
export function getDefaultFilterConfig(propertyName: string): FilterConfig {
    return {
        coerce: true,
        defaultValue: undefined,
        emptyIsNull: false,
        ignoreOnAutoMap: false,
        parameterName: propertyName,
        parseFormatter: undefined,
        propertyName,
        serializeFormatter: undefined
    } as FilterConfig;
}
/**
 * Annotation that can be used to configure type property as filter to use with {@link FiltersService}
 * @param targetOrNameOrConfig 
 *  - if annotation is applied without any parameters then value returned by {@link getDefaultFilterConfig} will be used. {@link FilterConfig.parameterName} value will be equal to annotated property name.
 *  - if annotation is applied with string parameter then value returned by {@link getDefaultFilterConfig} will be used. {@link FilterConfig.parameterName} value will be equal to applied parameter value.
 *  - if annotation is applied with object as parameter then value returned by {@link getDefaultFilterConfig} will be used. 
 * All properties which were specified in applied parameter would be applied to result configuration via Object.assign.
 * @param key specified by TypeScript automatically.
 * @see {@link FilterConfig}
 */
export function filter(targetOrNameOrConfig?: string | FilterConfig, key?: string): any {
    const decorateWithConfig = (target: Object, key2: string): void => {
        const config = getDefaultFilterConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        } else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return FiltersService.registerFilterConfig(target.constructor, config);
    };

    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return decorateWithConfig(targetTemp, key);
    }
    return decorateWithConfig;
}
