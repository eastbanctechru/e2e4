"use strict";
var filterConfig_1 = require('./filterConfig');
function filter(targetOrNameOrConfig, key) {
    var configurableDecorate = function (target, key2) {
        var config = filterConfig_1.FilterConfig.getDefaultConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        }
        else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new filterConfig_1.FilterConfig(config).register(target.constructor);
    };
    if (key) {
        var targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key);
    }
    return configurableDecorate;
}
exports.filter = filter;
