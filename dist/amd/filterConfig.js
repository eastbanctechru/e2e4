define(["require", "exports", './filterManager'], function (require, exports, filterManager_1) {
    "use strict";
    var FilterConfig = (function () {
        function FilterConfig(config) {
            Object.assign(this, config);
        }
        FilterConfig.getDefaultConfig = function (propertyName) {
            return {
                coerce: true,
                defaultValue: undefined,
                emptyIsNull: false,
                ignoreOnAutoMap: false,
                parameterName: propertyName,
                parseFormatter: undefined,
                persisted: false,
                propertyName: propertyName,
                serializeFormatter: undefined
            };
        };
        FilterConfig.prototype.register = function (target, descriptor) {
            filterManager_1.FilterManager.registerFilter(target, this);
        };
        return FilterConfig;
    }());
    exports.FilterConfig = FilterConfig;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBO1FBd0JJLHNCQUFZLE1BQXFCO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUF6Qk0sNkJBQWdCLEdBQXZCLFVBQXdCLFlBQW9CO1lBQ3hDLE1BQU0sQ0FBQztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsU0FBUztnQkFDdkIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixhQUFhLEVBQUUsWUFBWTtnQkFDM0IsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsa0JBQWtCLEVBQUUsU0FBUzthQUNmLENBQUM7UUFDdkIsQ0FBQztRQWNELCtCQUFRLEdBQVIsVUFBUyxNQUFjLEVBQUUsVUFBbUI7WUFDeEMsNkJBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDTCxtQkFBQztJQUFELENBOUJBLEFBOEJDLElBQUE7SUE5Qlksb0JBQVksZUE4QnhCLENBQUEiLCJmaWxlIjoiZmlsdGVyQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2ZpbHRlck1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbmZpZyBpbXBsZW1lbnRzIElGaWx0ZXJDb25maWcge1xyXG4gICAgc3RhdGljIGdldERlZmF1bHRDb25maWcocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBJRmlsdGVyQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2VyY2U6IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBlbXB0eUlzTnVsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlnbm9yZU9uQXV0b01hcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcmFtZXRlck5hbWU6IHByb3BlcnR5TmFtZSxcclxuICAgICAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcGVyc2lzdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZUZvcm1hdHRlcjogdW5kZWZpbmVkXHJcbiAgICAgICAgfSBhcyBJRmlsdGVyQ29uZmlnO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdFZhbHVlOiBPYmplY3Q7XHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIHBhcmFtZXRlck5hbWU6IHN0cmluZztcclxuICAgIGlnbm9yZU9uQXV0b01hcDogYm9vbGVhbjtcclxuICAgIGVtcHR5SXNOdWxsOiBib29sZWFuO1xyXG4gICAgcGVyc2lzdGVkOiBib29sZWFuO1xyXG4gICAgY29lcmNlOiBib29sZWFuO1xyXG4gICAgc2VyaWFsaXplRm9ybWF0dGVyOiAodmFsdWU6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcGFyc2VGb3JtYXR0ZXI6IChyYXdWYWx1ZTogT2JqZWN0LCBhbGxWYWx1ZXM/OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIGRlc2NyaXB0b3I6IE9iamVjdDtcclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogSUZpbHRlckNvbmZpZykge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyKHRhcmdldDogT2JqZWN0LCBkZXNjcmlwdG9yPzogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgRmlsdGVyTWFuYWdlci5yZWdpc3RlckZpbHRlcih0YXJnZXQsIHRoaXMpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
