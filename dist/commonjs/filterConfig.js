"use strict";
var filterManager_1 = require('./filterManager');
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
