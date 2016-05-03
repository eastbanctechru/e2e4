define(["require", "exports", './common/defaults'], function (require, exports, defaults_1) {
    "use strict";
    var SimplePager = (function () {
        function SimplePager() {
            this.pageSizeInternal = defaults_1.Defaults.pagedListSettings.defaultPageSize;
            this.pageNumberInternal = 1;
            this.totalCount = 0;
            this.loadedCount = 0;
        }
        SimplePager.prototype.processResponse = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
        };
        SimplePager.prototype.reset = function () {
            this.totalCount = 0;
        };
        return SimplePager;
    }());
    exports.SimplePager = SimplePager;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZVBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0E7UUFBQTtZQUNZLHFCQUFnQixHQUFHLG1CQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1lBQzlELHVCQUFrQixHQUFHLENBQUMsQ0FBQztZQUUvQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1lBQ3ZCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBUzVCLENBQUM7UUFQRyxxQ0FBZSxHQUFmLFVBQWdCLE1BQWM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBUSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsMkJBQUssR0FBTDtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDTCxrQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZFksbUJBQVcsY0FjdkIsQ0FBQSIsImZpbGUiOiJzaW1wbGVQYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtJUGFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lQYWdlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltcGxlUGFnZXIgaW1wbGVtZW50cyBJUGFnZXIge1xyXG4gICAgcHJpdmF0ZSBwYWdlU2l6ZUludGVybmFsID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVySW50ZXJuYWwgPSAxO1xyXG5cclxuICAgIHRvdGFsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBsb2FkZWRDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcm9jZXNzUmVzcG9uc2UocmVzdWx0OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDA7XHJcbiAgICB9XHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
