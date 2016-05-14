"use strict";
var filterConfig_1 = require('./filterConfig');
function filter(targetOrNameOrConfig, key, descriptor) {
    var configurableDecorate = function (target, key2, descriptor2) {
        var actualTarget = key2 ? target.constructor : target;
        var config = {
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
        };
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        }
        else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new filterConfig_1.FilterConfig(config).register(actualTarget, descriptor2);
    };
    if (key) {
        var targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key, descriptor);
    }
    return configurableDecorate;
}
exports.filter = filter;
