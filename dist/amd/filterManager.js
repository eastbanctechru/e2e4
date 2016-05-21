define(["require", "exports", './common/utility'], function (require, exports, utility_1) {
    "use strict";
    var FilterManager = (function () {
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
                    var clonedObject = utility_1.Utility.cloneLiteral({ defaultValue: defaultValue });
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter(clonedObject.defaultValue) : clonedObject.defaultValue;
                }
            });
        };
        FilterManager.prototype.parseParams = function (params) {
            var _this = this;
            this.appliedFiltersMapInternal.forEach(function (targetConfig, target) {
                for (var i = 0; i < targetConfig.length; i++) {
                    var config = targetConfig[i];
                    if (false === _this.defaultsApplied && config.defaultValue === undefined) {
                        config.defaultValue = utility_1.Utility.cloneLiteral({ defaultValue: target[config.propertyName] }).defaultValue;
                    }
                    if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                        var proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                        proposedVal = config.coerce ? utility_1.Utility.coerceValue(proposedVal) : proposedVal;
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
                    targetConfig = targetConfig.concat(typeConfig);
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
    exports.FilterManager = FilterManager;
});

//# sourceMappingURL=data:application/json;base64,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QWEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVLEVBQUUsSUFBSTtnQkFDdkQsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDTCxDQUFDO1FBekdNLGlDQUFtQixHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBNkdyRSxvQkFBQztJQUFELENBL0dBLEFBK0dDLElBQUE7SUEvR1kscUJBQWEsZ0JBK0d6QixDQUFBIiwiZmlsZSI6ImZpbHRlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbHRlckNvbmZpZ30gZnJvbSAnLi9maWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge0lGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyTWFuYWdlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsdGVyTWFuYWdlciBpbXBsZW1lbnRzIElGaWx0ZXJNYW5hZ2VyIHtcclxuXHJcbiAgICBzdGF0aWMgZmlsdGVyUHJvcGVydGllc01hcCA9IG5ldyBNYXA8YW55LCBBcnJheTxGaWx0ZXJDb25maWc+PigpO1xyXG4gICAgc3RhdGljIHJlZ2lzdGVyRmlsdGVyKHRhcmdldFR5cGU6IE9iamVjdCwgcHJvcGVydHlDb25maWc6IEZpbHRlckNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHR5cGVDb25maWdzID0gRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLmhhcyh0YXJnZXRUeXBlKSA/IEZpbHRlck1hbmFnZXIuZmlsdGVyUHJvcGVydGllc01hcC5nZXQodGFyZ2V0VHlwZSkgOiBuZXcgQXJyYXk8RmlsdGVyQ29uZmlnPigpO1xyXG4gICAgICAgIHR5cGVDb25maWdzLnB1c2gocHJvcGVydHlDb25maWcpO1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIuZmlsdGVyUHJvcGVydGllc01hcC5zZXQodGFyZ2V0VHlwZSwgdHlwZUNvbmZpZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBidWlsZEZpbHRlclZhbHVlKHRhcmdldDogT2JqZWN0LCB2YWx1ZTogYW55LCBjb25maWc6IEZpbHRlckNvbmZpZyk6IE9iamVjdCB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc2VyaWFsaXplRm9ybWF0dGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuc2VyaWFsaXplRm9ybWF0dGVyLmNhbGwodGFyZ2V0LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YWx1ZSA9IGNvbmZpZyAmJiBjb25maWcuZW1wdHlJc051bGwgPyB2YWx1ZSB8fCBudWxsIDogdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50b1JlcXVlc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvUmVxdWVzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wW2ldID0gRmlsdGVyTWFuYWdlci5idWlsZEZpbHRlclZhbHVlKHRhcmdldCwgdmFsdWVbaV0sIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0c0FwcGxpZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYXBwbGllZEZpbHRlcnNNYXBJbnRlcm5hbCA9IG5ldyBNYXA8T2JqZWN0LCBBcnJheTxGaWx0ZXJDb25maWc+PigpO1xyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmNsZWFyKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYXBwbGllZEZpbHRlcnNNYXBJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIGdldCBhcHBsaWVkRmlsdGVyc01hcCgpOiBNYXA8T2JqZWN0LCBBcnJheTxGaWx0ZXJDb25maWc+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGllZEZpbHRlcnNNYXBJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIHJlc2V0VmFsdWVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXBwbGllZEZpbHRlcnNNYXBJbnRlcm5hbC5mb3JFYWNoKCh0YXJnZXRDb25maWcsIHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldENvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGFyZ2V0Q29uZmlnW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gKHR5cGVvZiBjb25maWcuZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nKSA/IChjb25maWcuZGVmYXVsdFZhbHVlIGFzIEZ1bmN0aW9uKS5jYWxsKHRhcmdldCkgOiBjb25maWcuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkT2JqZWN0ID0gVXRpbGl0eS5jbG9uZUxpdGVyYWwoeyBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtjb25maWcucHJvcGVydHlOYW1lXSA9IGNvbmZpZy5wYXJzZUZvcm1hdHRlciA/IGNvbmZpZy5wYXJzZUZvcm1hdHRlcihjbG9uZWRPYmplY3QuZGVmYXVsdFZhbHVlKSA6IGNsb25lZE9iamVjdC5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHBhcnNlUGFyYW1zKHBhcmFtczogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmZvckVhY2goKHRhcmdldENvbmZpZywgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0YXJnZXRDb25maWdbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT09IHRoaXMuZGVmYXVsdHNBcHBsaWVkICYmIGNvbmZpZy5kZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0VmFsdWUgPSBVdGlsaXR5LmNsb25lTGl0ZXJhbCh7IGRlZmF1bHRWYWx1ZTogdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdIH0pLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV0gIT09IHVuZGVmaW5lZCAmJiBmYWxzZSA9PT0gY29uZmlnLmlnbm9yZU9uQXV0b01hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wb3NlZFZhbCA9IGNvbmZpZy5lbXB0eUlzTnVsbCA/IHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV0gfHwgbnVsbCA6IHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcG9zZWRWYWwgPSBjb25maWcuY29lcmNlID8gVXRpbGl0eS5jb2VyY2VWYWx1ZShwcm9wb3NlZFZhbCkgOiBwcm9wb3NlZFZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbY29uZmlnLnByb3BlcnR5TmFtZV0gPSBjb25maWcucGFyc2VGb3JtYXR0ZXIgPyBjb25maWcucGFyc2VGb3JtYXR0ZXIuY2FsbCh0YXJnZXQsIHByb3Bvc2VkVmFsLCBwYXJhbXMpIDogcHJvcG9zZWRWYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRzQXBwbGllZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXRSZXF1ZXN0U3RhdGUocmVzdWx0PzogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmZvckVhY2goKHRhcmdldENvbmZpZywgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0YXJnZXRDb25maWdbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wb3NlZFZhbCA9IHRhcmdldFtjb25maWcucHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtjb25maWcucGFyYW1ldGVyTmFtZV0gPSBGaWx0ZXJNYW5hZ2VyLmJ1aWxkRmlsdGVyVmFsdWUodGFyZ2V0LCBwcm9wb3NlZFZhbCwgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXRQZXJzaXN0ZWRTdGF0ZShyZXN1bHQ/OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcclxuICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwSW50ZXJuYWwuZm9yRWFjaCgodGFyZ2V0Q29uZmlnLCB0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRDb25maWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRhcmdldENvbmZpZ1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLnBlcnNpc3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb3Bvc2VkVmFsID0gdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3Bvc2VkVmFsICYmIHByb3Bvc2VkVmFsLnRvUmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3Bvc2VkVmFsID0gcHJvcG9zZWRWYWwudG9SZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbY29uZmlnLnBhcmFtZXRlck5hbWVdID0gY29uZmlnLnNlcmlhbGl6ZUZvcm1hdHRlclxyXG4gICAgICAgICAgICAgICAgICAgID8gY29uZmlnLnNlcmlhbGl6ZUZvcm1hdHRlci5jYWxsKHRhcmdldCwgcHJvcG9zZWRWYWwpIDogKGNvbmZpZy5lbXB0eUlzTnVsbCA/IHByb3Bvc2VkVmFsIHx8IG51bGwgOiBwcm9wb3NlZFZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJGaWx0ZXJUYXJnZXQodGFyZ2V0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFyZ2V0Q29uZmlnID0gdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmhhcyh0YXJnZXQpID8gdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmdldCh0YXJnZXQpIDogbmV3IEFycmF5PEZpbHRlckNvbmZpZz4oKTtcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmZpbHRlclByb3BlcnRpZXNNYXAuZm9yRWFjaCgodHlwZUNvbmZpZywgdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q29uZmlnID0gdGFyZ2V0Q29uZmlnLmNvbmNhdCh0eXBlQ29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb25maWcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwSW50ZXJuYWwuc2V0KHRhcmdldCwgdGFyZ2V0Q29uZmlnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwSW50ZXJuYWwuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBPYmplY3QpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
