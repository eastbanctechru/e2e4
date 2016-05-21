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
        FilterConfig.prototype.register = function (target) {
            filterManager_1.FilterManager.registerFilter(target, this);
        };
        return FilterConfig;
    }());
    exports.FilterConfig = FilterConfig;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBO1FBdUJJLHNCQUFZLE1BQXFCO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUF4Qk0sNkJBQWdCLEdBQXZCLFVBQXdCLFlBQW9CO1lBQ3hDLE1BQU0sQ0FBQztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsU0FBUztnQkFDdkIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixhQUFhLEVBQUUsWUFBWTtnQkFDM0IsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsa0JBQWtCLEVBQUUsU0FBUzthQUNmLENBQUM7UUFDdkIsQ0FBQztRQWFELCtCQUFRLEdBQVIsVUFBUyxNQUFjO1lBQ25CLDZCQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQTdCQSxBQTZCQyxJQUFBO0lBN0JZLG9CQUFZLGVBNkJ4QixDQUFBIiwiZmlsZSI6ImZpbHRlckNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7RmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9maWx0ZXJNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJDb25maWcgaW1wbGVtZW50cyBJRmlsdGVyQ29uZmlnIHtcclxuICAgIHN0YXRpYyBnZXREZWZhdWx0Q29uZmlnKHByb3BlcnR5TmFtZTogc3RyaW5nKTogSUZpbHRlckNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29lcmNlOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZW1wdHlJc051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZ25vcmVPbkF1dG9NYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXJhbWV0ZXJOYW1lOiBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgIHBhcnNlRm9ybWF0dGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBlcnNpc3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemVGb3JtYXR0ZXI6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0gYXMgSUZpbHRlckNvbmZpZztcclxuICAgIH1cclxuICAgIGRlZmF1bHRWYWx1ZTogT2JqZWN0O1xyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICBwYXJhbWV0ZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBpZ25vcmVPbkF1dG9NYXA6IGJvb2xlYW47XHJcbiAgICBlbXB0eUlzTnVsbDogYm9vbGVhbjtcclxuICAgIHBlcnNpc3RlZDogYm9vbGVhbjtcclxuICAgIGNvZXJjZTogYm9vbGVhbjtcclxuICAgIHNlcmlhbGl6ZUZvcm1hdHRlcjogKHZhbHVlOiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHBhcnNlRm9ybWF0dGVyOiAocmF3VmFsdWU6IE9iamVjdCwgYWxsVmFsdWVzPzogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IElGaWx0ZXJDb25maWcpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlcih0YXJnZXQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIucmVnaXN0ZXJGaWx0ZXIodGFyZ2V0LCB0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
