System.register(['./filterConfig'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var filterConfig_1;
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
                parseFormatter: undefined,
                persisted: false,
                propertyName: key2,
                serializeFormatter: undefined
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
    exports_1("filter", filter);
    return {
        setters:[
            function (filterConfig_1_1) {
                filterConfig_1 = filterConfig_1_1;
            }],
        execute: function() {
        }
    }
});
