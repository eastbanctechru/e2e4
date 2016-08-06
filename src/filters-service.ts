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
 *  - вызвав метод {@link getRequestState} сгенерировать объект-литерал вида
 * ```JavaScript
 *      {
 *         parameter1: 'Hey',
 *         parameter2: 'There'
 *      }
 * ```
 *  - вызвав метод {@link resetValues} восстановить исходные (или настроенные при помощи {@link FilterConfig.defaultValue}) значения полей объекта. 
 *  - вызвав метод {@link applyParams} автоматичеcки применить значения к полям объекта из переданных параметров (например, можно передать параметры из queryString, и они будут автоматически применены к полям объекта). 
 *  - вызвав метод {@link getPersistedState} сгенерировать объект-литерал аналогично {@link getRequestState}. Однако, в него будут записаны только свойства, отмеченные при помощи свойства {@link FilterConfig.persisted}.
 * (Например, вы можете сохранить полученный литерал в localStorage или на сервере, а в следующий раз применить к объекту при помощи {@link applyParams}, восстановив его последнее состояние.)
 *  - вызвав метод {@link registerFilterTarget} добавить любое количество других объектов. В результате, методы {@link resetValues}, {@link applyParams}, {@link getPersistedState}, {@link getRequestState} будут работать для всех них.
 */
export class FiltersService {
    /**
     * Глобальная коллекция настроек фильтров, из которой осуществляется подбор подходящих настроек для целевого объекта.
     * Помимо настроек самого объекта, применяются настройки его базовых классов, поскольку проверка, являются ли настройки подходящими для переданного объекта, выполняется при помощи оператора instanceof. 
     */
    public static filterPropertiesMap: Map<any, Array<FilterConfig>> = new Map<any, Array<FilterConfig>>();
    /**
     * Внутренняя реализация {@link appliedFiltersMap} 
     */
    protected appliedFiltersMapInternal: Map<Object, Array<FilterConfig>> = new Map<Object, Array<FilterConfig>>();
    /**
     * Признак того, что настройки фильтров для целевых объектов уже построены. 
     * Смотри {@link appliedFiltersMap} 
     */
    protected filtersMapBuilded: boolean = false;
    /**
     * Используется для регистрации конфигурации в коллекции {@link filterPropertiesMap} для последующего использования. 
     * Например, используется аннотацией {@link filter}
     * @param targetType тип объекта, в котором объявлено конфигурироемое свойство
     * @param propertyConfig объект с настройками фильтра
     */
    public static registerFilterConfig(targetType: Object, propertyConfig: FilterConfig): void {
        const typeConfigs = FiltersService.filterPropertiesMap.has(targetType) ? FiltersService.filterPropertiesMap.get(targetType) : new Array<FilterConfig>();
        typeConfigs.push(propertyConfig);
        FiltersService.filterPropertiesMap.set(targetType, typeConfigs);
    }
    /**
     * Используется для построения значения конкретного значения на основе переданного {@link FilterConfig}.
     * Вызывается методами {@link getRequestState} и {@link getPersistedState}, а так же вызывает сам себя на случай свойств-массивов.
     * 
     * Так же, помимо настроек {@link FilterConfig} используется конвенция, предполагающая, что если целевое поле имеет метод ```toRequest()```, то для построения итогового значения будет вызван данный метод.
     * Это имеет смысл в следующих случаях:
     *  - Сериализация сложного объекта его методом, вместо использования копипаст-кода для декларации метода {@link FilterConfig.serializeFormatter} в типах, использующих данный сложный объект. 
     * Например, именно так реализован класс {@link SortParameter}
     *  - Работающим (но очень хаковым) будет решение объявить метод toRequest в прототипе Date. 
     * Это позволит передавать дату на сервер при запросах в том формате, который сервер может распознать, или, например, всегда сдвигая дату в UTC для поддержки множества часовых поясов.
     * Однако, десять раз подумайте стоит ли расширять прототип встроенных типов данных. 
     * 
     * @param target объект, в котором объявлено сериализуемое свойство. Используется для передачи в качестве this в метод {@link FilterConfig.serializeFormatter}. 
     * @param value "сырое" значение поля в целевом объекте.
     * @param config объект с настройками фильтра.
     */
    protected static buildFilterValue(target: Object, value: any, config: FilterConfig): Object {
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
    /**
     * Подготавливает класс к уничтожению.
     */
    public dispose(): void {
        this.appliedFiltersMapInternal.clear();
    }
    /**
     * Коллекция настроек фильтров, построенная на основе типов, зарегистрированных при помощи {@link registerFilterTarget} 
     * и использующаяся методами {@link resetValues}, {@link applyParams}, {@link getPersistedState}, {@link getRequestState}.
     * Данная коллекция заполняется "лениво" при первой попытке обращения к ней посредством вызова метода {@link buildFiltersMap}.
     */
    public get appliedFiltersMap(): Map<Object, Array<FilterConfig>> {
        if (!this.filtersMapBuilded) {
            this.buildFiltersMap();
        }
        return this.appliedFiltersMapInternal;
    }
    /**
     * Сбрасывает в зарегистрированных объектах значения полей, помеченных как фильтры, в значения по умолчанию. 
     * Значение по умолчанию вычисляется по следующей логике:
     *  - Если в настройках было указано значение {@link FilterConfig.defaultValue}, то будет использовано оно.
     *  - В противном случае в качестве значения по умолчанию запоминается значение поля на момент первого вызова любого из методов 
     * {@link resetValues}, {@link applyParams}, {@link getPersistedState}, {@link getRequestState} и для сброса используется оно.
     * Логика работы метода следующая:
     *  - Если указанное в {@link FilterConfig.defaultValue} значение является функцией, то она будет вызвана без параметров, с объектом-владельцем поля в качестве this. 
     * В противном случае, будет использовано само значение {@link FilterConfig.defaultValue}.
     *  - Полученное значение клонируется посредством вызова {@link Utility.cloneLiteral} для устранения проблем со ссылочными типами.
     *  - Полученное значение либо обрабатывается посредством {@link FilterConfig.parseFormatter}, если он был указан в настройках, либо сразу записывается в целевое поле. 
     */
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
