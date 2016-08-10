/**
 * Represents settings which can be used to configure {@link FiltersService} behavior (via {@link filter} annotation for example).
 * Let's define several terms for better understanding.
 * 
 * ```JavaScript
 *      //Instance of this class is registered in filtersService via "registerFilterTarget" later. 
 *      //We call this "target type".
 *      class EndUserClass {
 *         //this property is annotated with @filter annotation. We call this "target property"
 *         @filter 
 *         public parameter1 = 'Hey';
 *         //this property doesn't. So, it's not "target property"
 *         public parameter2 = 'There';
 *      }
 *      let endUserClassInstance = new EndUserClass();
 *      let filterService = new FilterService();
 *
 *      // This means that filtersService will operate on this specific instance. 
 *      // We call that "target object".    
 *      filterService.registerFilterTarget(endUserClassInstance);
 * ```
 */
export interface FilterConfig {
    /**
     * Default value that will'be used to reset `target property` value via {@link FiltersService.resetValues} method call.
     * If this option wasn't specified, {@link FiltersService} gets value of `target property` on first use of {@link FiltersService} methods ({@link FiltersService.applyParams} or {@link FiltersService.getRequestState} for example)
     * and remembers this value as default.
     */
    defaultValue?: Object;
    /**
     * Name of `target property` in 'target type' which will be used by {@link FiltersService} to read and write values.  
     * You don't need to specify this property when use {@link filter} annotation since {@link filter} sets it automatically.
     */
    propertyName?: string;
    /**
     * String or function that returns name of parameter which will be used to build request object with {@link FiltersService.getRequestState} or {@link FiltersService.getPersistedState}  
     * If this option wasn't specified with {@link filter} annotation, then paramater name will be equal to {@link propertyName}. 
     */
    parameterName?: string | (() => string);
    /**
     * If true then {@link FiltersService.applyParams} method skips value parsing and doesn't apply anything to `target property`.
     * Commonly this property is usefull if you have some custom logic of building 'target property' value and you want to apply it by yourself.
     */
    ignoreOnAutoMap?: boolean;
    /**
     * Specifies that any falsie value (empty string for example) must be converted to null by {@link FiltersService.getRequestState} and {@link FiltersService.getPersistedState} methods.
     */
    emptyIsNull?: boolean;
    /**
     * Specifies that {@link FiltersService} must coerce values when builds or parses data.
     * This means that 'null' string, for example, will be converted to null, 'true' string to boolean `true` value, '1.0' string to 1.0 number etc.
     * To achieve this functionality {@link FiltersService} uses {@link coerceValue} function.
     * If you use {@link filter} annotatin this parameter will be `true` by default.
     */
    coerce?: boolean;
    /**
     * Specifies that {@link FiltersService.getPersistedState} must write this property value to result object.
     * In this library this property doesn't used since persistance implementation depends on requirements and must be implemented in end user code.
     */
    persisted?: boolean | (() => boolean);
    /**
     * Optional function to serialize `target property` value when build state object with {@link FiltersService.getRequestState} or {@link FiltersService.getPersistedState}.
     */
    serializeFormatter?: (value: Object) => Object;
    /**
     * Optional function to parse value for `target property` when parse params with {@link FiltersService.applyParams}.
     * Also, when this function specified, it would be called by {@link FiltersService.resetValues} since {@link FiltersService.resetValues} clones default values as literals and resulted value can require parsing. 
     */
    parseFormatter?: (rawValue: Object, allValues?: Object) => Object;
}
