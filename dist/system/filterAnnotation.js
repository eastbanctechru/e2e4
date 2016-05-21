System.register(['./filterConfig'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var filterConfig_1;
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
