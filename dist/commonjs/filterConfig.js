"use strict";
var filterManager_1 = require('./filterManager');
var FilterConfig = (function () {
    function FilterConfig(config) {
        Object.assign(this, config);
    }
    FilterConfig.getDefaultConfig = function (propertyName) {
        return {
            coerce: true,
            defaultValue: undefined,
            descriptor: undefined,
            emptyIsNull: false,
            ignoreOnAutoMap: false,
            parameterName: propertyName,
            parseFormatter: undefined,
            persisted: false,
            propertyName: propertyName,
            serializeFormatter: undefined
        };
    };
    FilterConfig.prototype.register = function (target, descriptor) {
        this.descriptor = descriptor || undefined;
        filterManager_1.FilterManager.registerFilter(target, this);
    };
    return FilterConfig;
}());
exports.FilterConfig = FilterConfig;
