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
                persisted: false,
                propertyName: key2,
                valueParser: undefined,
                valueSerializer: undefined
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSxnQkFBdUIsb0JBQW1ELEVBQUUsR0FBWSxFQUFFLFVBQW1CO1FBQ3pHLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVc7WUFDbkQsSUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQ3hELElBQU0sTUFBTSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxTQUFTO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsZUFBZSxFQUFFLFNBQVM7YUFDWixDQUFDO1lBRW5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sb0JBQW9CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztZQUNoRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksMkJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQztZQUN4QyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7WUFDNUIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztJQUNoQyxDQUFDO0lBOUJlLGNBQU0sU0E4QnJCLENBQUEiLCJmaWxlIjoiZmlsdGVyQW5ub3RhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsdGVyQ29uZmlnfSBmcm9tICcuL2ZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIodGFyZ2V0T3JOYW1lT3JDb25maWc/OiBzdHJpbmcgfCBJRmlsdGVyQ29uZmlnIHwgYW55LCBrZXk/OiBzdHJpbmcsIGRlc2NyaXB0b3I/OiBPYmplY3QpOiBhbnkge1xyXG4gICAgY29uc3QgY29uZmlndXJhYmxlRGVjb3JhdGUgPSAodGFyZ2V0LCBrZXkyLCBkZXNjcmlwdG9yMikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdHVhbFRhcmdldCA9IGtleTIgPyB0YXJnZXQuY29uc3RydWN0b3IgOiB0YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBjb2VyY2U6IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGVtcHR5SXNOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgaWdub3JlT25BdXRvTWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyYW1ldGVyTmFtZToga2V5MixcclxuICAgICAgICAgICAgcGVyc2lzdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBrZXkyLFxyXG4gICAgICAgICAgICB2YWx1ZVBhcnNlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB2YWx1ZVNlcmlhbGl6ZXI6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0gYXMgSUZpbHRlckNvbmZpZztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRPck5hbWVPckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnLnBhcmFtZXRlck5hbWUgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgdGFyZ2V0T3JOYW1lT3JDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEZpbHRlckNvbmZpZyhjb25maWcpLnJlZ2lzdGVyKGFjdHVhbFRhcmdldCwgZGVzY3JpcHRvcjIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VGVtcCA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIHRhcmdldE9yTmFtZU9yQ29uZmlnID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGUodGFyZ2V0VGVtcCwga2V5LCBkZXNjcmlwdG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
