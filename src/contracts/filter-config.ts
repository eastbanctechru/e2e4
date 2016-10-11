/**
 * Represents settings which can be used to configure {@link FiltersService} behavior (via {@link filter} annotation for example).
 * 
 * Let's define several terms for better understanding.
 * 
 * ```JavaScript
 *      //Instance of this class is registered in filtersService via "registerFilterTarget" below. 
 *      //We call declarations like this "target type".
 *      class EndUserClass {
 *         //this property has @filter annotation. We call such properties "target property"
 *         @filter 
 *         public parameter1 = 'Hey';
 *         //this property doesn't. So, it's not "target property"
 *         public parameter2 = 'There';
 *      }
 *      let endUserClassInstance = new EndUserClass();
 *      let filterService = new FilterService();
 *
 *      // This means that filtersService will operate on this specific instance since it was registered with registerFilterTarget. 
 *      // We call objects like this "target object".    
 *      filterService.registerFilterTarget(endUserClassInstance);
 * ```
 */
export interface FilterConfig {
    /**
     * Default value that will be used to reset `target property` value via {@link FiltersService.resetValues} method call.
     * 
     * If this option wasn't specified, {@link FiltersService} writes to it value of `target property` at the moment of first call 
     * of {@link FiltersService.resetValues}, {@link FiltersService.applyParams} or {@link FiltersService.getRequestState}.
     */
    defaultValue?: Object;
    /**
     * Name of `target property` in 'target type' which will be used by {@link FiltersService} to read and write values.  
     * 
     * You don't need to specify this property when use {@link filter} annotation since {@link filter} sets it automatically.
     */
    propertyName?: string;
    /**
     * Name of parameter which will be used to build request object with {@link FiltersService.getRequestState}  
     * 
     * @note If you use {@link filter} annotation and this property wasn't specified then it will be equal to {@link propertyName}
     */
    parameterName?: string;
    /**
     * When `true` {@link FiltersService.applyParams} method skips value parsing and doesn't apply anything to `target property`.
     * 
     * Commonly this property is useful if you have some custom logic of building 'target property' value and you want to apply it by yourself.
     */
    ignoreOnAutoMap?: boolean;
    /**
     * Specifies that any falsy value (empty string for example) must be converted to null by {@link FiltersService.getRequestState} method.
     */
    emptyIsNull?: boolean;
    /**
     * Specifies that {@link FiltersService} must coerce values when serializes or parses data.
     * 
     * As example, 'null' string will be converted to null, 'true' string will be converted to boolean `true`, '1.0' string will be converted to 1.0 number etc.
     * To achieve this functionality {@link FiltersService} uses {@link coerceValue} function.
     * @note If you use {@link filter} annotation this parameter will be `true` by default.
     */
    coerce?: boolean;
    /**
     * Optional function to serialize `target property` value when build state object with {@link FiltersService.getRequestState}.
     */
    serializeFormatter?: (value: Object) => Object;
    /**
     * Optional function that will be called by {@link FiltersService.applyParams} to parse raw value before write it to `target property`.
     * 
     * Also, when this function is specified, it will be called by {@link FiltersService.resetValues} since {@link FiltersService.resetValues} clones default values as literals and resulted value can require parsing. 
     */
    parseFormatter?: (rawValue: Object, allValues?: Object) => Object;
}
