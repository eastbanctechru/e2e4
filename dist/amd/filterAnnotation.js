define(["require", "exports", './filterConfig'], function (require, exports, filterConfig_1) {
    "use strict";
    function filter(targetOrNameOrConfig, key) {
        var configurableDecorate = function (target, key2) {
            var config = filterConfig_1.FilterConfig.getDefaultConfig(key2);
            if (typeof targetOrNameOrConfig === 'string') {
                config.parameterName = targetOrNameOrConfig;
            }
            else {
                Object.assign(config, targetOrNameOrConfig);
            }
            return new filterConfig_1.FilterConfig(config).register(target.constructor);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQSxnQkFBdUIsb0JBQW1ELEVBQUUsR0FBWTtRQUNwRixJQUFNLG9CQUFvQixHQUFHLFVBQUMsTUFBTSxFQUFFLElBQUk7WUFDdEMsSUFBTSxNQUFNLEdBQUcsMkJBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7WUFDaEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLDJCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUM7WUFDeEMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztJQUNoQyxDQUFDO0lBakJlLGNBQU0sU0FpQnJCLENBQUEiLCJmaWxlIjoiZmlsdGVyQW5ub3RhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmlsdGVyQ29uZmlnfSBmcm9tICcuL2ZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIodGFyZ2V0T3JOYW1lT3JDb25maWc/OiBzdHJpbmcgfCBJRmlsdGVyQ29uZmlnIHwgYW55LCBrZXk/OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc3QgY29uZmlndXJhYmxlRGVjb3JhdGUgPSAodGFyZ2V0LCBrZXkyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gRmlsdGVyQ29uZmlnLmdldERlZmF1bHRDb25maWcoa2V5Mik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRPck5hbWVPckNvbmZpZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uZmlnLnBhcmFtZXRlck5hbWUgPSB0YXJnZXRPck5hbWVPckNvbmZpZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgdGFyZ2V0T3JOYW1lT3JDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEZpbHRlckNvbmZpZyhjb25maWcpLnJlZ2lzdGVyKHRhcmdldC5jb25zdHJ1Y3Rvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChrZXkpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRUZW1wID0gdGFyZ2V0T3JOYW1lT3JDb25maWc7XHJcbiAgICAgICAgdGFyZ2V0T3JOYW1lT3JDb25maWcgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZSh0YXJnZXRUZW1wLCBrZXkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbmZpZ3VyYWJsZURlY29yYXRlO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
