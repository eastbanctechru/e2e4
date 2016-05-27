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
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, clonedObject.defaultValue) : clonedObject.defaultValue;
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
            var targetConfig = new Array();
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

//# sourceMappingURL=data:application/json;base64,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QixZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0wsQ0FBQztRQXhHTSxpQ0FBbUIsR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQTRHdEUsb0JBQUM7SUFBRCxDQTlHQSxBQThHQyxJQUFBO0lBOUdZLHFCQUFhLGdCQThHekIsQ0FBQSIsImZpbGUiOiJmaWx0ZXJNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtJRmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlck1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlck1hbmFnZXIgaW1wbGVtZW50cyBJRmlsdGVyTWFuYWdlciB7XHJcblxyXG4gICAgc3RhdGljIGZpbHRlclByb3BlcnRpZXNNYXAgPSBuZXcgTWFwPGFueSwgQXJyYXk8SUZpbHRlckNvbmZpZz4+KCk7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJGaWx0ZXIodGFyZ2V0VHlwZTogT2JqZWN0LCBwcm9wZXJ0eUNvbmZpZzogSUZpbHRlckNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHR5cGVDb25maWdzID0gRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLmhhcyh0YXJnZXRUeXBlKSA/IEZpbHRlck1hbmFnZXIuZmlsdGVyUHJvcGVydGllc01hcC5nZXQodGFyZ2V0VHlwZSkgOiBuZXcgQXJyYXk8SUZpbHRlckNvbmZpZz4oKTtcclxuICAgICAgICB0eXBlQ29uZmlncy5wdXNoKHByb3BlcnR5Q29uZmlnKTtcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmZpbHRlclByb3BlcnRpZXNNYXAuc2V0KHRhcmdldFR5cGUsIHR5cGVDb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYnVpbGRGaWx0ZXJWYWx1ZSh0YXJnZXQ6IE9iamVjdCwgdmFsdWU6IGFueSwgY29uZmlnOiBJRmlsdGVyQ29uZmlnKTogT2JqZWN0IHtcclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zZXJpYWxpemVGb3JtYXR0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5zZXJpYWxpemVGb3JtYXR0ZXIuY2FsbCh0YXJnZXQsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhbHVlID0gY29uZmlnICYmIGNvbmZpZy5lbXB0eUlzTnVsbCA/IHZhbHVlIHx8IG51bGwgOiB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLnRvUmVxdWVzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudG9SZXF1ZXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRlbXBbaV0gPSBGaWx0ZXJNYW5hZ2VyLmJ1aWxkRmlsdGVyVmFsdWUodGFyZ2V0LCB2YWx1ZVtpXSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRzQXBwbGllZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhcHBsaWVkRmlsdGVyc01hcEludGVybmFsID0gbmV3IE1hcDxPYmplY3QsIEFycmF5PElGaWx0ZXJDb25maWc+PigpO1xyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgYXBwbGllZEZpbHRlcnNNYXAoKTogTWFwPE9iamVjdCwgQXJyYXk8SUZpbHRlckNvbmZpZz4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsO1xyXG4gICAgfVxyXG4gICAgcmVzZXRWYWx1ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmZvckVhY2goKHRhcmdldENvbmZpZywgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0YXJnZXRDb25maWdbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSAodHlwZW9mIGNvbmZpZy5kZWZhdWx0VmFsdWUgPT09ICdmdW5jdGlvbicpID8gKGNvbmZpZy5kZWZhdWx0VmFsdWUgYXMgRnVuY3Rpb24pLmNhbGwodGFyZ2V0KSA6IGNvbmZpZy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRPYmplY3QgPSBVdGlsaXR5LmNsb25lTGl0ZXJhbCh7IGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdID0gY29uZmlnLnBhcnNlRm9ybWF0dGVyID8gY29uZmlnLnBhcnNlRm9ybWF0dGVyLmNhbGwodGFyZ2V0LCBjbG9uZWRPYmplY3QuZGVmYXVsdFZhbHVlKSA6IGNsb25lZE9iamVjdC5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHBhcnNlUGFyYW1zKHBhcmFtczogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmZvckVhY2goKHRhcmdldENvbmZpZywgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0YXJnZXRDb25maWdbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT09IHRoaXMuZGVmYXVsdHNBcHBsaWVkICYmIGNvbmZpZy5kZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5kZWZhdWx0VmFsdWUgPSBVdGlsaXR5LmNsb25lTGl0ZXJhbCh7IGRlZmF1bHRWYWx1ZTogdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdIH0pLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV0gIT09IHVuZGVmaW5lZCAmJiBmYWxzZSA9PT0gY29uZmlnLmlnbm9yZU9uQXV0b01hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wb3NlZFZhbCA9IGNvbmZpZy5lbXB0eUlzTnVsbCA/IHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV0gfHwgbnVsbCA6IHBhcmFtc1tjb25maWcucGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcG9zZWRWYWwgPSBjb25maWcuY29lcmNlID8gVXRpbGl0eS5jb2VyY2VWYWx1ZShwcm9wb3NlZFZhbCkgOiBwcm9wb3NlZFZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbY29uZmlnLnByb3BlcnR5TmFtZV0gPSBjb25maWcucGFyc2VGb3JtYXR0ZXIgPyBjb25maWcucGFyc2VGb3JtYXR0ZXIuY2FsbCh0YXJnZXQsIHByb3Bvc2VkVmFsLCBwYXJhbXMpIDogcHJvcG9zZWRWYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRzQXBwbGllZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXRSZXF1ZXN0U3RhdGUocmVzdWx0PzogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmZvckVhY2goKHRhcmdldENvbmZpZywgdGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0Q29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0YXJnZXRDb25maWdbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wb3NlZFZhbCA9IHRhcmdldFtjb25maWcucHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtjb25maWcucGFyYW1ldGVyTmFtZV0gPSBGaWx0ZXJNYW5hZ2VyLmJ1aWxkRmlsdGVyVmFsdWUodGFyZ2V0LCBwcm9wb3NlZFZhbCwgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXRQZXJzaXN0ZWRTdGF0ZShyZXN1bHQ/OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7fTtcclxuICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwSW50ZXJuYWwuZm9yRWFjaCgodGFyZ2V0Q29uZmlnLCB0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRDb25maWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRhcmdldENvbmZpZ1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLnBlcnNpc3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb3Bvc2VkVmFsID0gdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3Bvc2VkVmFsICYmIHByb3Bvc2VkVmFsLnRvUmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3Bvc2VkVmFsID0gcHJvcG9zZWRWYWwudG9SZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbY29uZmlnLnBhcmFtZXRlck5hbWVdID0gY29uZmlnLnNlcmlhbGl6ZUZvcm1hdHRlclxyXG4gICAgICAgICAgICAgICAgICAgID8gY29uZmlnLnNlcmlhbGl6ZUZvcm1hdHRlci5jYWxsKHRhcmdldCwgcHJvcG9zZWRWYWwpIDogKGNvbmZpZy5lbXB0eUlzTnVsbCA/IHByb3Bvc2VkVmFsIHx8IG51bGwgOiBwcm9wb3NlZFZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJGaWx0ZXJUYXJnZXQodGFyZ2V0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFyZ2V0Q29uZmlnID0gbmV3IEFycmF5PElGaWx0ZXJDb25maWc+KCk7XHJcbiAgICAgICAgRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLmZvckVhY2goKHR5cGVDb25maWcsIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldENvbmZpZyA9IHRhcmdldENvbmZpZy5jb25jYXQodHlwZUNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGFyZ2V0Q29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLnNldCh0YXJnZXQsIHRhcmdldENvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcEludGVybmFsLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldDogT2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckZpbHRlclRhcmdldCh0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
