define(["require", "exports", './filterManager'], function (require, exports, filterManager_1) {
    "use strict";
    var FilterConfig = (function () {
        function FilterConfig(config) {
            Object.assign(this, config);
        }
        FilterConfig.prototype.register = function (target, descriptor) {
            this.descriptor = descriptor || undefined;
            filterManager_1.FilterManager.registerFilter(target, this);
        };
        return FilterConfig;
    }());
    exports.FilterConfig = FilterConfig;
});
//# sourceMappingURL=filterConfig.js.map