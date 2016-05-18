define(["require", "exports", './filterConfig'], function (require, exports, filterConfig_1) {
    "use strict";
    function filter(targetOrNameOrConfig, key, descriptor) {
        var configurableDecorate = function (target, key2, descriptor2) {
            var actualTarget = key2 ? target.constructor : target;
            var config = {
                coerce: true,
                defaultValue: undefined,
                descriptor: undefined,
                emptyIsNull: false,
                ignoreOnAutoMap: false,
                parameterName: key2,
                parseFormatter: undefined,
                persisted: false,
                propertyName: key2,
                serializeFormatter: undefined
            };
            if (typeof targetOrNameOrConfig === 'string') {
                config.parameterName = targetOrNameOrConfig;
            }
            else {
                Object.assign(config, targetOrNameOrConfig);
            }
            return new filterConfig_1.FilterConfig(config).register(actualTarget, descriptor2);
        };
        if (key) {
            var targetTemp = targetOrNameOrConfig;
            targetOrNameOrConfig = null;
            return configurableDecorate(targetTemp, key, descriptor);
        }
        return configurableDecorate;
    }
    exports.filter = filter;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSxnQkFBdUIsb0JBQW1ELEVBQUUsR0FBWSxFQUFFLFVBQW1CO1FBQ3pHLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVc7WUFDbkQsSUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQ3hELElBQU0sTUFBTSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxTQUFTO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsa0JBQWtCLEVBQUUsU0FBUzthQUNmLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ3hDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUM1QixNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUE5QmUsY0FBTSxTQThCckIsQ0FBQSIsImZpbGUiOiJmaWx0ZXJBbm5vdGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWx0ZXJDb25maWd9IGZyb20gJy4vZmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcih0YXJnZXRPck5hbWVPckNvbmZpZz86IHN0cmluZyB8IElGaWx0ZXJDb25maWcgfCBhbnksIGtleT86IHN0cmluZywgZGVzY3JpcHRvcj86IE9iamVjdCk6IGFueSB7XHJcbiAgICBjb25zdCBjb25maWd1cmFibGVEZWNvcmF0ZSA9ICh0YXJnZXQsIGtleTIsIGRlc2NyaXB0b3IyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsVGFyZ2V0ID0ga2V5MiA/IHRhcmdldC5jb25zdHJ1Y3RvciA6IHRhcmdldDtcclxuICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIGNvZXJjZTogdHJ1ZSxcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3I6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZW1wdHlJc051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZ25vcmVPbkF1dG9NYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXJhbWV0ZXJOYW1lOiBrZXkyLFxyXG4gICAgICAgICAgICBwYXJzZUZvcm1hdHRlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBwZXJzaXN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IGtleTIsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZUZvcm1hdHRlcjogdW5kZWZpbmVkXHJcbiAgICAgICAgfSBhcyBJRmlsdGVyQ29uZmlnO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldE9yTmFtZU9yQ29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWcucGFyYW1ldGVyTmFtZSA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB0YXJnZXRPck5hbWVPckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyQ29uZmlnKGNvbmZpZykucmVnaXN0ZXIoYWN0dWFsVGFyZ2V0LCBkZXNjcmlwdG9yMik7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRUZW1wID0gdGFyZ2V0T3JOYW1lT3JDb25maWc7XHJcbiAgICAgICAgdGFyZ2V0T3JOYW1lT3JDb25maWcgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZSh0YXJnZXRUZW1wLCBrZXksIGRlc2NyaXB0b3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbmZpZ3VyYWJsZURlY29yYXRlO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
