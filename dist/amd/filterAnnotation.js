define(["require", "exports", './filterConfig'], function (require, exports, filterConfig_1) {
    "use strict";
    function filter(targetOrNameOrConfig, key) {
        console.log(targetOrNameOrConfig);
        console.log(key);
        var configurableDecorate = function (target, key2) {
            var actualTarget = key2 ? target.constructor : target;
            var config = filterConfig_1.FilterConfig.getDefaultConfig(key2);
            if (typeof targetOrNameOrConfig === 'string') {
                config.parameterName = targetOrNameOrConfig;
            }
            else {
                Object.assign(config, targetOrNameOrConfig);
            }
            return new filterConfig_1.FilterConfig(config).register(actualTarget);
        };
        if (key) {
            var targetTemp = targetOrNameOrConfig;
            targetOrNameOrConfig = null;
            return configurableDecorate(targetTemp, key);
        }
        return configurableDecorate;
    }
    exports.filter = filter;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSxnQkFBdUIsb0JBQW1ELEVBQUUsR0FBWTtRQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFNLG9CQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUk7WUFDdEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQ3hELElBQU0sTUFBTSxHQUFHLDJCQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUM7WUFDeEMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztJQUNoQyxDQUFDO0lBdEJlLGNBQU0sU0FzQnJCLENBQUEiLCJmaWxlIjoiZmlsdGVyQW5ub3RhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsdGVyQ29uZmlnfSBmcm9tICcuL2ZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIodGFyZ2V0T3JOYW1lT3JDb25maWc/OiBzdHJpbmcgfCBJRmlsdGVyQ29uZmlnIHwgYW55LCBrZXk/OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc29sZS5sb2codGFyZ2V0T3JOYW1lT3JDb25maWcpO1xyXG4gICAgY29uc29sZS5sb2coa2V5KTtcclxuXHJcbiAgICBjb25zdCBjb25maWd1cmFibGVEZWNvcmF0ZSA9ICh0YXJnZXQsIGtleTIpID0+IHtcclxuICAgICAgICBjb25zdCBhY3R1YWxUYXJnZXQgPSBrZXkyID8gdGFyZ2V0LmNvbnN0cnVjdG9yIDogdGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IEZpbHRlckNvbmZpZy5nZXREZWZhdWx0Q29uZmlnKGtleTIpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldE9yTmFtZU9yQ29uZmlnID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWcucGFyYW1ldGVyTmFtZSA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCB0YXJnZXRPck5hbWVPckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyQ29uZmlnKGNvbmZpZykucmVnaXN0ZXIoYWN0dWFsVGFyZ2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFRlbXAgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB0YXJnZXRPck5hbWVPckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYWJsZURlY29yYXRlKHRhcmdldFRlbXAsIGtleSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
