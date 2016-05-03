define(["require", "exports", './common/defaults'], function (require, exports, defaults_1) {
    "use strict";
    var SimplePager = (function () {
        function SimplePager() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZVBhZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBR0E7UUFBQTtZQUNJLGVBQVUsR0FBVyxDQUFDLENBQUM7WUFDdkIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFTNUIsQ0FBQztRQVBHLHFDQUFlLEdBQWYsVUFBZ0IsTUFBYztZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBUSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFRLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFDRCwyQkFBSyxHQUFMO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxtQkFBVyxjQVd2QixDQUFBIiwiZmlsZSI6InNpbXBsZVBhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge0lQYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVBhZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVQYWdlciBpbXBsZW1lbnRzIElQYWdlciB7XHJcbiAgICB0b3RhbENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJvY2Vzc1Jlc3BvbnNlKHJlc3VsdDogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgfVxyXG4gICAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
