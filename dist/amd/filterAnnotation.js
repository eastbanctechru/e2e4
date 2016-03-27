define(["require", "exports", './filterConfig'], function (require, exports, filterConfig_1) {
    "use strict";
    /* tslint:disable:no-any */
    function filter(targetOrNameOrConfig, key, descriptor) {
        /* tslint:enable:no-any */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSwyQkFBMkI7SUFDM0IsZ0JBQXVCLG9CQUFtRCxFQUFFLEdBQVksRUFBRSxVQUFtQjtRQUM3RywwQkFBMEI7UUFDdEIsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVztZQUNuRCxJQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDeEQsSUFBTSxNQUFNLEdBQUc7Z0JBQ1gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixlQUFlLEVBQUUsU0FBUzthQUNaLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ3hDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUM1QixNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUEvQmUsY0FBTSxTQStCckIsQ0FBQSIsImZpbGUiOiJmaWx0ZXJBbm5vdGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWx0ZXJDb25maWd9IGZyb20gJy4vZmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIodGFyZ2V0T3JOYW1lT3JDb25maWc/OiBzdHJpbmcgfCBJRmlsdGVyQ29uZmlnIHwgYW55LCBrZXk/OiBzdHJpbmcsIGRlc2NyaXB0b3I/OiBPYmplY3QpOiBhbnkge1xyXG4vKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG4gICAgY29uc3QgY29uZmlndXJhYmxlRGVjb3JhdGUgPSAodGFyZ2V0LCBrZXkyLCBkZXNjcmlwdG9yMikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdHVhbFRhcmdldCA9IGtleTIgPyB0YXJnZXQuY29uc3RydWN0b3IgOiB0YXJnZXQ7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBjb2VyY2U6IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGVtcHR5SXNOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgaWdub3JlT25BdXRvTWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyYW1ldGVyTmFtZToga2V5MixcclxuICAgICAgICAgICAgcGVyc2lzdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBrZXkyLFxyXG4gICAgICAgICAgICB2YWx1ZVBhcnNlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB2YWx1ZVNlcmlhbGl6ZXI6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0gYXMgSUZpbHRlckNvbmZpZztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRPck5hbWVPckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnLnBhcmFtZXRlck5hbWUgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgdGFyZ2V0T3JOYW1lT3JDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEZpbHRlckNvbmZpZyhjb25maWcpLnJlZ2lzdGVyKGFjdHVhbFRhcmdldCwgZGVzY3JpcHRvcjIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VGVtcCA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIHRhcmdldE9yTmFtZU9yQ29uZmlnID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGUodGFyZ2V0VGVtcCwga2V5LCBkZXNjcmlwdG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
