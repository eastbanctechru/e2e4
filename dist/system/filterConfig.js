System.register(['./filterManager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var filterManager_1;
    var FilterConfig;
    return {
        setters:[
            function (filterManager_1_1) {
                filterManager_1 = filterManager_1_1;
            }],
        execute: function() {
            FilterConfig = (function () {
                function FilterConfig(config) {
                    Object.assign(this, config);
                }
                FilterConfig.prototype.register = function (target, descriptor) {
                    this.descriptor = descriptor || undefined;
                    filterManager_1.FilterManager.registerFilter(target, this);
                };
                return FilterConfig;
            }());
            exports_1("FilterConfig", FilterConfig);
        }
    }
});
