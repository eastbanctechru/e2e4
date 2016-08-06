import {FilterConfig} from './contracts/filter-config';
import {Utility} from './utility';
/**
 * Используется для декларативного построения объектов-запросов, представляющих собой значимое состояние объекта. Поскольку звучит это достаточно абстрактно, рассмотрим на конкретном примере.
 * Типичный сценарий использования выглядит следующим образом: 
 * ```JavaScript
 *      class EndUserClass {
 *         @filter
 *         public parameter1 = 'Hey';
 *         @filter
 *         public parameter2 = 'There';
 *      }
 *      let endUserClassInstance = new EndUserClass();
 *      let filterService = new FilterService(endUserClassInstance);
 * ```
 * Теперь мы можем использовать созданный filterService следующим образом:
 *  - вызвав метод {@link FiltersService.getRequestState} сгенерировать объект-литерал вида
 * ```JavaScript
 *      {
 *         parameter1: 'Hey',
 *         parameter2: 'There'
 *      }
 * ```
 *  - вызвав метод {@link FiltersService.resetValues} восстановить исходные (или настроенные при помощи {@link FilterConfig.defaultValue}) значения полей объекта. 
 *  - вызвав метод {@link FiltersService.applyParams} автоматичеcки применить значения к полям объекта из переданных параметров (например, можно передать параметры из queryString, и они будут автоматически применены к полям объекта). 
 *  - вызвав метод {@link FiltersService.getPersistedState} сгенерировать объект-литерал аналогично {@link getRequestState}. Однако, в него будут записаны только свойства, отмеченные при помощи свойства {@link FilterConfig.persisted}.
 * (Например, вы можете сохранить полученный литерал в localStorage или на сервере, а в следующий раз применить к объекту при помощи {@link FiltersService.applyParams}, восстановив его последнее состояние.) 
 */
export class FiltersService {
    public static filterPropertiesMap: Map<any, Array<FilterConfig>> = new Map<any, Array<FilterConfig>>();
    protected appliedFiltersMapInternal: Map<Object, Array<FilterConfig>> = new Map<Object, Array<FilterConfig>>();
    protected filtersMapBuilded: boolean = false;

    public static registerFilter(targetType: Object, propertyConfig: FilterConfig): void {
        const typeConfigs = FiltersService.filterPropertiesMap.has(targetType) ? FiltersService.filterPropertiesMap.get(targetType) : new Array<FilterConfig>();
        typeConfigs.push(propertyConfig);
        FiltersService.filterPropertiesMap.set(targetType, typeConfigs);
    }
    public static buildFilterValue(target: Object, value: any, config: FilterConfig): Object {
        if (config && config.serializeFormatter) {
            return config.serializeFormatter.call(target, value);
        }

        value = config && config.emptyIsNull ? value || null : value;
        value = config && config.coerce ? Utility.coerceValue(value) : value;
        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = FiltersService.buildFilterValue(target, value[i], null);
            }
            return temp;
        }
        return value;
    }

    public dispose(): void {
        this.appliedFiltersMapInternal.clear();
    }
    public get appliedFiltersMap(): Map<Object, Array<FilterConfig>> {
        if (!this.filtersMapBuilded) {
            this.buildFiltersMap();
        }
        return this.appliedFiltersMapInternal;
    }
    public resetValues(): void {
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(target) : config.defaultValue;
                const clonedObject = Utility.cloneLiteral({ defaultValue: defaultValue });
                target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, clonedObject.defaultValue) : clonedObject.defaultValue;
            }
        });
    }
    public applyParams(params: Object): void {
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const parameterName = this.getParameterName(target, config);
                if (params && params.hasOwnProperty(parameterName) && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[parameterName] || null : params[parameterName];
                    proposedVal = config.coerce ? Utility.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
    }
    public getRequestState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const proposedVal = target[config.propertyName];
                result[this.getParameterName(target, config)] = FiltersService.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public getPersistedState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const persisted = (typeof config.persisted === 'function') ? (config.persisted as any).call(target) : config.persisted;
                if (!persisted) {
                    continue;
                }
                const proposedVal = target[config.propertyName];
                const parameterName = this.getParameterName(target, config);
                result[parameterName] = FiltersService.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public registerFilterTarget(...targets: Object[]): void {
        targets.forEach((target: Object) => {
            this.appliedFiltersMapInternal.set(target, null);
        });
    }
    private getParameterName(target: Object, config: FilterConfig): string {
        return (typeof config.parameterName === 'function') ? (config.parameterName as any).call(target) : config.parameterName;
    }
    private buildFiltersMap(): void {
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<FilterConfig>, target: Object) => {
            targetConfig = new Array<FilterConfig>();
            FiltersService.filterPropertiesMap.forEach((typeConfig: Array<FilterConfig>, type: any) => {
                if (target instanceof type) {
                    targetConfig = targetConfig.concat(typeConfig);
                    for (let i = 0; i < targetConfig.length; i++) {
                        let config = targetConfig[i];
                        if (config.defaultValue === undefined) {
                            config.defaultValue = Utility.cloneLiteral({ defaultValue: target[config.propertyName] }).defaultValue;
                        }
                    }
                }
            });
            if (targetConfig.length > 0) {
                this.appliedFiltersMapInternal.set(target, targetConfig);
            } else {
                this.appliedFiltersMapInternal.delete(target);
            }
        });
        this.filtersMapBuilded = true;
    }
    constructor(target?: Object) {
        if (target) {
            this.registerFilterTarget(target);
        }
    }
}
