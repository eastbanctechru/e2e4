define(["require", "exports", './filterConfig'], function (require, exports, filterConfig_1) {
    "use strict";
    function filter(targetOrNameOrConfig, key, descriptor) {
        var configurableDecorate = function (target, key2, descriptor2) {
            var actualTarget = key2 ? target.constructor : target;
            var config = filterConfig_1.FilterConfig.getDefaultConfig(key2);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSxnQkFBdUIsb0JBQW1ELEVBQUUsR0FBWSxFQUFFLFVBQW1CO1FBQ3pHLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVc7WUFDbkQsSUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQ3hELElBQU0sTUFBTSxHQUFHLDJCQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ3hDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUM1QixNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFuQmUsY0FBTSxTQW1CckIsQ0FBQSIsImZpbGUiOiJmaWx0ZXJBbm5vdGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGaWx0ZXJDb25maWd9IGZyb20gJy4vZmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcih0YXJnZXRPck5hbWVPckNvbmZpZz86IHN0cmluZyB8IElGaWx0ZXJDb25maWcgfCBhbnksIGtleT86IHN0cmluZywgZGVzY3JpcHRvcj86IE9iamVjdCk6IGFueSB7XHJcbiAgICBjb25zdCBjb25maWd1cmFibGVEZWNvcmF0ZSA9ICh0YXJnZXQsIGtleTIsIGRlc2NyaXB0b3IyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsVGFyZ2V0ID0ga2V5MiA/IHRhcmdldC5jb25zdHJ1Y3RvciA6IHRhcmdldDtcclxuICAgICAgICBjb25zdCBjb25maWcgPSBGaWx0ZXJDb25maWcuZ2V0RGVmYXVsdENvbmZpZyhrZXkyKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRPck5hbWVPckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnLnBhcmFtZXRlck5hbWUgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgdGFyZ2V0T3JOYW1lT3JDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEZpbHRlckNvbmZpZyhjb25maWcpLnJlZ2lzdGVyKGFjdHVhbFRhcmdldCwgZGVzY3JpcHRvcjIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VGVtcCA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIHRhcmdldE9yTmFtZU9yQ29uZmlnID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGUodGFyZ2V0VGVtcCwga2V5LCBkZXNjcmlwdG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
