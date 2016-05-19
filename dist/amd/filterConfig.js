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
                descriptor: undefined,
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
            this.descriptor = descriptor || undefined;
            filterManager_1.FilterManager.registerFilter(target, this);
        };
        return FilterConfig;
    }());
    exports.FilterConfig = FilterConfig;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUdBO1FBeUJJLHNCQUFZLE1BQXFCO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUExQk0sNkJBQWdCLEdBQXZCLFVBQXdCLFlBQW9CO1lBQ3hDLE1BQU0sQ0FBQztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsU0FBUztnQkFDdkIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixlQUFlLEVBQUUsS0FBSztnQkFDdEIsYUFBYSxFQUFFLFlBQVk7Z0JBQzNCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixTQUFTLEVBQUUsS0FBSztnQkFDaEIsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLGtCQUFrQixFQUFFLFNBQVM7YUFDZixDQUFDO1FBQ3ZCLENBQUM7UUFjRCwrQkFBUSxHQUFSLFVBQVMsTUFBYyxFQUFFLFVBQW1CO1lBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLFNBQVMsQ0FBQztZQUMxQyw2QkFBYSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtJQWhDWSxvQkFBWSxlQWdDeEIsQ0FBQSIsImZpbGUiOiJmaWx0ZXJDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge0ZpbHRlck1hbmFnZXJ9IGZyb20gJy4vZmlsdGVyTWFuYWdlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29uZmlnIGltcGxlbWVudHMgSUZpbHRlckNvbmZpZyB7XHJcbiAgICBzdGF0aWMgZ2V0RGVmYXVsdENvbmZpZyhwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IElGaWx0ZXJDb25maWcge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZXJjZTogdHJ1ZSxcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3I6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZW1wdHlJc051bGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBpZ25vcmVPbkF1dG9NYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBwYXJhbWV0ZXJOYW1lOiBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgIHBhcnNlRm9ybWF0dGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHBlcnNpc3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICBzZXJpYWxpemVGb3JtYXR0ZXI6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0gYXMgSUZpbHRlckNvbmZpZztcclxuICAgIH1cclxuICAgIGRlZmF1bHRWYWx1ZTogT2JqZWN0O1xyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICBwYXJhbWV0ZXJOYW1lOiBzdHJpbmc7XHJcbiAgICBpZ25vcmVPbkF1dG9NYXA6IGJvb2xlYW47XHJcbiAgICBlbXB0eUlzTnVsbDogYm9vbGVhbjtcclxuICAgIHBlcnNpc3RlZDogYm9vbGVhbjtcclxuICAgIGNvZXJjZTogYm9vbGVhbjtcclxuICAgIHNlcmlhbGl6ZUZvcm1hdHRlcjogKHZhbHVlOiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHBhcnNlRm9ybWF0dGVyOiAocmF3VmFsdWU6IE9iamVjdCwgYWxsVmFsdWVzPzogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBkZXNjcmlwdG9yOiBPYmplY3Q7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IElGaWx0ZXJDb25maWcpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlcih0YXJnZXQ6IE9iamVjdCwgZGVzY3JpcHRvcj86IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRvciA9IGRlc2NyaXB0b3IgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIucmVnaXN0ZXJGaWx0ZXIodGFyZ2V0LCB0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
