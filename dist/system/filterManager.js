System.register(['lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _;
    var FilterManager;
    return {
        setters:[
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            FilterManager = (function () {
                function FilterManager(target) {
                    this.defaultsApplied = false;
                    this.appliedFiltersMap = new Map();
                    this.registerFilterTarget(target);
                }
                FilterManager.registerFilter = function (targetType, propertyConfig) {
                    var typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array();
                    typeConfigs.push(propertyConfig);
                    FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
                };
                FilterManager.includeIn = function (target) {
                    target.filterManager = new FilterManager(target);
                };
                FilterManager.coerceValue = function (/* tslint:disable:no-any */ value /* tslint:enable:no-any */) {
                    if (typeof value === 'object' || Array.isArray(value)) {
                        for (var index in value) {
                            if (value.hasOwnProperty(index)) {
                                value[index] = FilterManager.coerceValue(value[index]);
                            }
                        }
                    }
                    else if (value && !isNaN(value)) {
                        value = +value;
                    }
                    else if (value === 'undefined') {
                        value = undefined;
                    }
                    else if (FilterManager.coerceTypes[value] !== undefined) {
                        value = FilterManager.coerceTypes[value];
                    }
                    return value;
                };
                FilterManager.buildFilterValue = function (target, /* tslint:disable:no-any */ value /* tslint:enable:no-any */, config) {
                    if (config && config.valueSerializer) {
                        return config.valueSerializer.call(target, value);
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
                    this.appliedFiltersMap.clear();
                    delete this.appliedFiltersMap;
                };
                FilterManager.prototype.resetFilters = function () {
                    this.appliedFiltersMap.forEach(function (targetConfig, target) {
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
                    this.appliedFiltersMap.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            if (false === _this.defaultsApplied && config.defaultValue === undefined) {
                                config.defaultValue = _.cloneDeep({ defaultValue: target[config.propertyName] }).defaultValue;
                            }
                            if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                                var proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                                proposedVal = config.coerce ? FilterManager.coerceValue(proposedVal) : proposedVal;
                                target[config.propertyName] = config.valueParser ? config.valueParser.call(target, proposedVal, params) : proposedVal;
                            }
                        }
                    });
                    this.defaultsApplied = true;
                };
                FilterManager.prototype.buildRequest = function (result) {
                    result = result || {};
                    this.appliedFiltersMap.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            var proposedVal = target[config.propertyName];
                            result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
                        }
                    });
                    return result;
                };
                FilterManager.prototype.buildPersistedState = function (result) {
                    result = result || {};
                    this.appliedFiltersMap.forEach(function (targetConfig, target) {
                        for (var i = 0; i < targetConfig.length; i++) {
                            var config = targetConfig[i];
                            if (!config.persisted) {
                                continue;
                            }
                            var proposedVal = target[config.propertyName];
                            if (proposedVal && proposedVal.toRequest) {
                                proposedVal = proposedVal.toRequest();
                            }
                            result[config.parameterName] = config.valueSerializer
                                ? config.valueSerializer.call(target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
                        }
                    });
                    return result;
                };
                FilterManager.prototype.registerFilterTarget = function (target) {
                    var targetConfig = this.appliedFiltersMap.has(target) ? this.appliedFiltersMap.get(target) : new Array();
                    FilterManager.filterPropertiesMap.forEach(function (typeConfig, type) {
                        if (target instanceof type) {
                            targetConfig = targetConfig.concat(_.cloneDeep(typeConfig));
                        }
                    });
                    if (targetConfig.length > 0) {
                        this.appliedFiltersMap.set(target, targetConfig);
                    }
                    else {
                        this.appliedFiltersMap.delete(target);
                    }
                };
                FilterManager.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
                FilterManager.filterPropertiesMap = new Map();
                return FilterManager;
            }());
            exports_1("FilterManager", FilterManager);
        }
    }
});
