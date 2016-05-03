define(["require", "exports"], function (require, exports) {
    "use strict";
    var PagedPager = (function () {
        function PagedPager() {
            this.totalCount = 0;
            this.loadedCount = 0;
        }
        PagedPager.prototype.processResponse = function (result) { };
        PagedPager.prototype.reset = function () {
            throw new Error('Not implemented yet');
        };
        return PagedPager;
    }());
    exports.PagedPager = PagedPager;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VkUGFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFDQTtRQUFBO1lBQ0ksZUFBVSxHQUFXLENBQUMsQ0FBQztZQUN2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUs1QixDQUFDO1FBSkcsb0NBQWUsR0FBZixVQUFnQixNQUFjLElBQVUsQ0FBQztRQUN6QywwQkFBSyxHQUFMO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDTCxpQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksa0JBQVUsYUFPdEIsQ0FBQSIsImZpbGUiOiJwYWdlZFBhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUGFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lQYWdlcic7XHJcbmV4cG9ydCBjbGFzcyBQYWdlZFBhZ2VyIGltcGxlbWVudHMgSVBhZ2VyIHtcclxuICAgIHRvdGFsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBsb2FkZWRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIHByb2Nlc3NSZXNwb25zZShyZXN1bHQ6IE9iamVjdCk6IHZvaWQgeyB9XHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCB5ZXQnKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
