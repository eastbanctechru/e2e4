import {FilterConfig} from './filterConfig';
import {IFilterConfig} from './contracts/IFilterConfig';
export function filter(targetOrNameOrConfig?: string | IFilterConfig, key?: string): any {
    const configurableDecorate = (target, key2) => {
        const config = FilterConfig.getDefaultConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        } else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new FilterConfig(config).register(target.constructor);
    };

    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key);
    }
    return configurableDecorate;
}
