System.register(['lodash', './common/parseHelper'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _, parseHelper_1;
    var FilterManager;
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (parseHelper_1_1) {
                parseHelper_1 = parseHelper_1_1;
            }],
        execute: function() {
            FilterManager = (function () {
                function FilterManager(target) {
                    this.defaultsApplied = false;
                    this.appliedFiltersMapInternal = new Map();
                    this.registerFilterTarget(target);
                }
                FilterManager.registerFilter = function (targetType, propertyConfig) {
                    var typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array();
                    typeConfigs.push(propertyConfig);
                    FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
                };
                FilterManager.buildFilterValue = function (target, value, config) {
                    if (config && config.serializeFormatter) {
                        return config.serializeFormatter.call(target, value);
                    }
                    value = config && config.emptyIsNull ? value || null : value;
                    if (value && value.toRequest) {
                        return value.toRequest();
                    }
                    if (Array.isArray(value)) {
                        var temp = [];
                        for (var i = 0; i < value.length; i++) {
                            temp[i] = FilterManager.buildFilterValue(target, value[i], null);
                        }
                        return temp;
                    }
                    return value;
                };
                FilterManager.prototype.dispose = function () {
                    this.appliedFiltersMapInternal.clear();
                    delete this.appliedFiltersMapInternal;
                };
                Object.defineProperty(FilterManager.prototype, "appliedFiltersMap", {
                    get: function () {
                        return this.appliedFiltersMapInternal;
                    },
                    enumerable: true,
                    configurable: true
                });
                FilterManager.prototype.resetValues = function () {
                    this.appliedFiltersMapInternal.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            var defaultValue = (typeof config.defaultValue === 'function') ? config.defaultValue.call(target) : config.defaultValue;
                            var clonedObject = _.cloneDeep({ defaultValue: defaultValue });
                            target[config.propertyName] = clonedObject.defaultValue;
                        }
                    });
                };
                FilterManager.prototype.parseParams = function (params) {
                    var _this = this;
                    this.appliedFiltersMapInternal.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            if (false === _this.defaultsApplied && config.defaultValue === undefined) {
                                config.defaultValue = _.cloneDeep({ defaultValue: target[config.propertyName] }).defaultValue;
                            }
                            if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                                var proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                                proposedVal = config.coerce ? parseHelper_1.ParseHelper.coerceValue(proposedVal) : proposedVal;
                                target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                            }
                        }
                    });
                    this.defaultsApplied = true;
                };
                FilterManager.prototype.getRequestState = function (result) {
                    result = result || {};
                    this.appliedFiltersMapInternal.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            var proposedVal = target[config.propertyName];
                            result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
                        }
                    });
                    return result;
                };
                FilterManager.prototype.getPersistedState = function (result) {
                    result = result || {};
                    this.appliedFiltersMapInternal.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            if (!config.persisted) {
                                continue;
                            }
                            var proposedVal = target[config.propertyName];
                            if (proposedVal && proposedVal.toRequest) {
                                proposedVal = proposedVal.toRequest();
                            }
                            result[config.parameterName] = config.serializeFormatter
                                ? config.serializeFormatter.call(target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
                        }
                    });
                    return result;
                };
                FilterManager.prototype.registerFilterTarget = function (target) {
                    var targetConfig = this.appliedFiltersMapInternal.has(target) ? this.appliedFiltersMapInternal.get(target) : new Array();
                    FilterManager.filterPropertiesMap.forEach(function (typeConfig, type) {
                        if (target instanceof type) {
                            targetConfig = targetConfig.concat(_.cloneDeep(typeConfig));
                        }
                    });
                    if (targetConfig.length > 0) {
                        this.appliedFiltersMapInternal.set(target, targetConfig);
                    }
                    else {
                        this.appliedFiltersMapInternal.delete(target);
                    }
                };
                FilterManager.filterPropertiesMap = new Map();
                return FilterManager;
            }());
            exports_1("FilterManager", FilterManager);
        }
    }
});
