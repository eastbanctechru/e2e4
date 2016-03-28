import * as _ from 'lodash';
export class FilterManager {
    constructor(target) {
        this.defaultsApplied = false;
        this.appliedFiltersMap = new Map();
        this.registerFilterTarget(target);
    }
    static registerFilter(targetType, propertyConfig) {
        const typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array();
        typeConfigs.push(propertyConfig);
        FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
    }
    static includeIn(target) {
        target.filterManager = new FilterManager(target);
    }
    static coerceValue(/* tslint:disable:no-any */ value /* tslint:enable:no-any */) {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
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
    }
    static buildFilterValue(target, /* tslint:disable:no-any */ value /* tslint:enable:no-any */, config) {
        if (config && config.valueSerializer) {
            return config.valueSerializer.call(target, value);
        }
        value = config && config.emptyIsNull ? value || null : value;
        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = FilterManager.buildFilterValue(target, value[i], null);
            }
            return temp;
        }
        return value;
    }
    dispose() {
        this.appliedFiltersMap.clear();
        delete this.appliedFiltersMap;
    }
    resetFilters() {
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? config.defaultValue.call(target) : config.defaultValue;
                const clonedObject = _.cloneDeep({ defaultValue: defaultValue });
                target[config.propertyName] = clonedObject.defaultValue;
            }
        });
    }
    parseParams(params) {
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (false === this.defaultsApplied && config.defaultValue === undefined) {
                    config.defaultValue = _.cloneDeep({ defaultValue: target[config.propertyName] }).defaultValue;
                }
                if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                    proposedVal = config.coerce ? FilterManager.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.valueParser ? config.valueParser.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
        this.defaultsApplied = true;
    }
    buildRequest(result) {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const proposedVal = target[config.propertyName];
                result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    buildPersistedState(result) {
        result = result || {};
        this.appliedFiltersMap.forEach((targetConfig, target) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (!config.persisted) {
                    continue;
                }
                let proposedVal = target[config.propertyName];
                if (proposedVal && proposedVal.toRequest) {
                    proposedVal = proposedVal.toRequest();
                }
                result[config.parameterName] = config.valueSerializer
                    ? config.valueSerializer.call(target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
            }
        });
        return result;
    }
    registerFilterTarget(target) {
        let targetConfig = this.appliedFiltersMap.has(target) ? this.appliedFiltersMap.get(target) : new Array();
        FilterManager.filterPropertiesMap.forEach((typeConfig, type) => {
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
    }
}
FilterManager.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
FilterManager.filterPropertiesMap = new Map();

//# sourceMappingURL=data:application/json;base64,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O1FBQ0gsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNMLENBQUM7QUFJTCxDQUFDO0FBN0hVLHlCQUFXLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUN4RCxpQ0FBbUIsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0E0SG5FIiwiZmlsZSI6ImZpbHRlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7RmlsdGVyQ29uZmlnfSBmcm9tICcuL2ZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SUZpbHRlck1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtJQ29tcG9uZW50V2l0aEZpbHRlcn0gZnJvbSAnLi9jb250cmFjdHMvSUNvbXBvbmVudFdpdGhGaWx0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlck1hbmFnZXIgaW1wbGVtZW50cyBJRmlsdGVyTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgY29lcmNlVHlwZXMgPSB7ICd0cnVlJzogITAsICdmYWxzZSc6ICExLCAnbnVsbCc6IG51bGwgfTtcclxuICAgIHN0YXRpYyBmaWx0ZXJQcm9wZXJ0aWVzTWFwID0gbmV3IE1hcDxhbnksIEFycmF5PEZpbHRlckNvbmZpZz4+KCk7XHJcbiAgICBzdGF0aWMgcmVnaXN0ZXJGaWx0ZXIodGFyZ2V0VHlwZTogT2JqZWN0LCBwcm9wZXJ0eUNvbmZpZzogRmlsdGVyQ29uZmlnKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdHlwZUNvbmZpZ3MgPSBGaWx0ZXJNYW5hZ2VyLmZpbHRlclByb3BlcnRpZXNNYXAuaGFzKHRhcmdldFR5cGUpID8gRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLmdldCh0YXJnZXRUeXBlKSA6IG5ldyBBcnJheTxGaWx0ZXJDb25maWc+KCk7XHJcbiAgICAgICAgdHlwZUNvbmZpZ3MucHVzaChwcm9wZXJ0eUNvbmZpZyk7XHJcbiAgICAgICAgRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLnNldCh0YXJnZXRUeXBlLCB0eXBlQ29uZmlncyk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5jbHVkZUluKHRhcmdldDogSUNvbXBvbmVudFdpdGhGaWx0ZXIpOiB2b2lkIHtcclxuICAgICAgICB0YXJnZXQuZmlsdGVyTWFuYWdlciA9IG5ldyBGaWx0ZXJNYW5hZ2VyKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29lcmNlVmFsdWUoLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovdmFsdWU6IGFueS8qIHRzbGludDplbmFibGU6bm8tYW55ICovKTogT2JqZWN0IHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW2luZGV4XSA9IEZpbHRlck1hbmFnZXIuY29lcmNlVmFsdWUodmFsdWVbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9IGVsc2UgaWYgKEZpbHRlck1hbmFnZXIuY29lcmNlVHlwZXNbdmFsdWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBGaWx0ZXJNYW5hZ2VyLmNvZXJjZVR5cGVzW3ZhbHVlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGJ1aWxkRmlsdGVyVmFsdWUodGFyZ2V0OiBPYmplY3QsIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL3ZhbHVlOiBhbnkvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqLywgY29uZmlnOiBGaWx0ZXJDb25maWcpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnZhbHVlU2VyaWFsaXplcikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnZhbHVlU2VyaWFsaXplci5jYWxsKHRhcmdldCwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFsdWUgPSBjb25maWcgJiYgY29uZmlnLmVtcHR5SXNOdWxsID8gdmFsdWUgfHwgbnVsbCA6IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUudG9SZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1JlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGVtcFtpXSA9IEZpbHRlck1hbmFnZXIuYnVpbGRGaWx0ZXJWYWx1ZSh0YXJnZXQsIHZhbHVlW2ldLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVmYXVsdHNBcHBsaWVkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGFwcGxpZWRGaWx0ZXJzTWFwID0gbmV3IE1hcDxPYmplY3QsIEFycmF5PEZpbHRlckNvbmZpZz4+KCk7XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwLmNsZWFyKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYXBwbGllZEZpbHRlcnNNYXA7XHJcbiAgICB9XHJcbiAgICByZXNldEZpbHRlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcC5mb3JFYWNoKCh0YXJnZXRDb25maWcsIHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldENvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGFyZ2V0Q29uZmlnW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gKHR5cGVvZiBjb25maWcuZGVmYXVsdFZhbHVlID09PSAnZnVuY3Rpb24nKSA/IChjb25maWcuZGVmYXVsdFZhbHVlIGFzIEZ1bmN0aW9uKS5jYWxsKHRhcmdldCkgOiBjb25maWcuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkT2JqZWN0ID0gXy5jbG9uZURlZXAoeyBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtjb25maWcucHJvcGVydHlOYW1lXSA9IGNsb25lZE9iamVjdC5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHBhcnNlUGFyYW1zKHBhcmFtczogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcC5mb3JFYWNoKCh0YXJnZXRDb25maWcsIHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldENvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGFyZ2V0Q29uZmlnW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhbHNlID09PSB0aGlzLmRlZmF1bHRzQXBwbGllZCAmJiBjb25maWcuZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcuZGVmYXVsdFZhbHVlID0gXy5jbG9uZURlZXAoeyBkZWZhdWx0VmFsdWU6IHRhcmdldFtjb25maWcucHJvcGVydHlOYW1lXSB9KS5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXNbY29uZmlnLnBhcmFtZXRlck5hbWVdICE9PSB1bmRlZmluZWQgJiYgZmFsc2UgPT09IGNvbmZpZy5pZ25vcmVPbkF1dG9NYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcG9zZWRWYWwgPSBjb25maWcuZW1wdHlJc051bGwgPyBwYXJhbXNbY29uZmlnLnBhcmFtZXRlck5hbWVdIHx8IG51bGwgOiBwYXJhbXNbY29uZmlnLnBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3Bvc2VkVmFsID0gY29uZmlnLmNvZXJjZSA/IEZpbHRlck1hbmFnZXIuY29lcmNlVmFsdWUocHJvcG9zZWRWYWwpIDogcHJvcG9zZWRWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdID0gY29uZmlnLnZhbHVlUGFyc2VyID8gY29uZmlnLnZhbHVlUGFyc2VyLmNhbGwodGFyZ2V0LCBwcm9wb3NlZFZhbCwgcGFyYW1zKSA6IHByb3Bvc2VkVmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0c0FwcGxpZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgYnVpbGRSZXF1ZXN0KHJlc3VsdD86IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xyXG4gICAgICAgIHRoaXMuYXBwbGllZEZpbHRlcnNNYXAuZm9yRWFjaCgodGFyZ2V0Q29uZmlnLCB0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRDb25maWcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRhcmdldENvbmZpZ1tpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3Bvc2VkVmFsID0gdGFyZ2V0W2NvbmZpZy5wcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2NvbmZpZy5wYXJhbWV0ZXJOYW1lXSA9IEZpbHRlck1hbmFnZXIuYnVpbGRGaWx0ZXJWYWx1ZSh0YXJnZXQsIHByb3Bvc2VkVmFsLCBjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGJ1aWxkUGVyc2lzdGVkU3RhdGUocmVzdWx0PzogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwge307XHJcbiAgICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyc01hcC5mb3JFYWNoKCh0YXJnZXRDb25maWcsIHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldENvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGFyZ2V0Q29uZmlnW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcucGVyc2lzdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcG9zZWRWYWwgPSB0YXJnZXRbY29uZmlnLnByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcG9zZWRWYWwgJiYgcHJvcG9zZWRWYWwudG9SZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcG9zZWRWYWwgPSBwcm9wb3NlZFZhbC50b1JlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdFtjb25maWcucGFyYW1ldGVyTmFtZV0gPSBjb25maWcudmFsdWVTZXJpYWxpemVyXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjb25maWcudmFsdWVTZXJpYWxpemVyLmNhbGwodGFyZ2V0LCBwcm9wb3NlZFZhbCkgOiAoY29uZmlnLmVtcHR5SXNOdWxsID8gcHJvcG9zZWRWYWwgfHwgbnVsbCA6IHByb3Bvc2VkVmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZWdpc3RlckZpbHRlclRhcmdldCh0YXJnZXQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0YXJnZXRDb25maWcgPSB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwLmhhcyh0YXJnZXQpID8gdGhpcy5hcHBsaWVkRmlsdGVyc01hcC5nZXQodGFyZ2V0KSA6IG5ldyBBcnJheTxGaWx0ZXJDb25maWc+KCk7XHJcbiAgICAgICAgRmlsdGVyTWFuYWdlci5maWx0ZXJQcm9wZXJ0aWVzTWFwLmZvckVhY2goKHR5cGVDb25maWcsIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldENvbmZpZyA9IHRhcmdldENvbmZpZy5jb25jYXQoXy5jbG9uZURlZXAodHlwZUNvbmZpZykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRhcmdldENvbmZpZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbGllZEZpbHRlcnNNYXAuc2V0KHRhcmdldCwgdGFyZ2V0Q29uZmlnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJzTWFwLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldDogT2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckZpbHRlclRhcmdldCh0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
