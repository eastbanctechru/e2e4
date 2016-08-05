import {FilterConfig} from './contracts/filter-config';
import {FiltersService} from './filters-service';
/**
 * Возвращает конфигурацию {@link FilterConfig} следующего вида:
 * {
 *        coerce: true,
 *        defaultValue: undefined,
 *        emptyIsNull: false,
 *        ignoreOnAutoMap: false,
 *        parameterName: <значение параметра @param propertyName>,
 *        parseFormatter: undefined,
 *        persisted: false,
 *        propertyName:  <значение параметра @param propertyName>,
 *        serializeFormatter: undefined
 * }
 * @internal
 * @param propertyName имя свойства, для которого создается конфигурация. Будет проставлено в {@link FilterConfig.propertyName}
 */
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
/**
 * Аннотация, с помощью которой можно в упрощенной манере конфигурировать свойство типа как фильтр в {@link FiltersService} 
 * @param targetOrNameOrConfig
 *  - если аннотация объявлена без параметров, то будет создана конфигурация при помощи метода {@link getDefaultFilterConfig}. Свойство {@link FilterConfig.parameterName} будет равно имени свойства, к которому применена аннотация.
 *  - если аннотация объявлена с параметром-строкой, то будет создана конфигурация при помощи метода {@link getDefaultFilterConfig}. Свойство {@link FilterConfig.parameterName} будет равно переданному параметру.
 *  - если аннотация объявлена с параметром-объектом, то будет создана конфигурация при помощи метода {@link getDefaultFilterConfig}. Далее, все свойства, переданные в параметре-объекте, будут присвоены полученной конфигурации.
 * @param key: данный параметр заполянется компилятором TypeScript автоматически
 */
export function filter(targetOrNameOrConfig?: string | FilterConfig, key?: string): any {
    const configurableDecorate = (target: Object, key2: string): void => {
        const config = getDefaultFilterConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        } else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return FiltersService.registerFilter(target.constructor, config);
    };

    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key);
    }
    return configurableDecorate;
}
