import {FilterConfig, getDefaultFilterConfig} from './contracts/filter-config';
import {FiltersService} from './filters-service';

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
