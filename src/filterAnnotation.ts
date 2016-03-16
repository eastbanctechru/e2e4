import {FilterConfig} from './filterConfig';
import {IFilterConfig} from './contracts/IFilterConfig';
/* tslint:disable:no-any */
export function filter(targetOrNameOrConfig?: string | IFilterConfig | any, key?: string, descriptor?: Object): any {
/* tslint:enable:no-any */
    const configurableDecorate = (target, key2, descriptor2) => {
        const actualTarget = key2 ? target.constructor : target;
        const config = {
            coerce: true,
            defaultValue: undefined,
            descriptor: undefined,
            emptyIsNull: false,
            ignoreOnAutoMap: false,
            parameterName: key2,
            persisted: false,
            propertyName: key2,
            valueParser: undefined,
            valueSerializer: undefined
        } as IFilterConfig;

        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        } else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new FilterConfig(config).register(actualTarget, descriptor2);
    };

    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key, descriptor);
    }
    return configurableDecorate;
}
