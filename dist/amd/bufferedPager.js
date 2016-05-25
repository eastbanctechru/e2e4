var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './common/defaults', './filterAnnotation'], function (require, exports, defaults_1, filterAnnotation_1) {
    "use strict";
    var BufferedPager = (function () {
        function BufferedPager() {
            this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultRowCount;
            this.totalCount = 0;
            this.loadedCount = 0;
            this.defaultRowCount = defaults_1.Defaults.bufferedListSettings.defaultRowCount;
            this.minRowCount = defaults_1.Defaults.bufferedListSettings.minRowCount;
            this.maxRowCount = defaults_1.Defaults.bufferedListSettings.maxRowCount;
            this.skip = 0;
        }
        Object.defineProperty(BufferedPager.prototype, "takeRowCount", {
            get: function () {
                return this.takeRowCountInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultRowCount;
                if (rowCount < this.minRowCount) {
                    rowCount = this.defaultRowCount;
                }
                if (rowCount > this.maxRowCount) {
                    rowCount = this.maxRowCount;
                }
                if (this.totalCount !== 0) {
                    if (this.skip + rowCount > this.totalCount) {
                        rowCount = this.totalCount - this.skip;
                    }
                }
                this.takeRowCountInternal = rowCount;
            },
            enumerable: true,
            configurable: true
        });
        BufferedPager.prototype.processResponse = function (result) {
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
            this.skip = (result[defaults_1.Defaults.listSettings.loadedCountParameterName] === null || result[defaults_1.Defaults.listSettings.loadedCountParameterName] === undefined) ?
                0 : this.skip + result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.loadedCount = this.skip;
        };
        BufferedPager.prototype.reset = function () {
            this.totalCount = 0;
            this.takeRowCount = this.defaultRowCount;
            this.skip = 0;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: function () { return this.defaultRowCount; },
                parameterName: defaults_1.Defaults.bufferedListSettings.takeRowCountParameterName,
                parseFormatter: function (rawValue, allValues) {
                    var result;
                    if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                        result = (allValues.skip || 0) + (allValues.take || 0);
                    }
                    return result || this.defaultRowCount;
                }
            }), 
            __metadata('design:type', Object)
        ], BufferedPager.prototype, "takeRowCountInternal", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedPager.prototype, "skip", void 0);
        return BufferedPager;
    }());
    exports.BufferedPager = BufferedPager;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1ZmZlcmVkUGFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFLQTtRQUFBO1lBWVkseUJBQW9CLEdBQUcsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUM7WUFFN0UsZUFBVSxHQUFXLENBQUMsQ0FBQztZQUN2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztZQUN4QixvQkFBZSxHQUFXLG1CQUFRLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDO1lBQ3hFLGdCQUFXLEdBQVcsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUM7WUFDaEUsZ0JBQVcsR0FBVyxtQkFBUSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQztZQU9oRSxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBbUNiLENBQUM7UUFqQ0csc0JBQUksdUNBQVk7aUJBQWhCO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDckMsQ0FBQztpQkFFRCxVQUFpQixLQUFhO2dCQUMxQixJQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDdEYsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDcEMsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNoQyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQzNDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDO1lBQ3pDLENBQUM7OztXQWpCQTtRQW1CRCx1Q0FBZSxHQUFmLFVBQWdCLE1BQWM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBUSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQ2pKLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBUSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDO1FBRUQsNkJBQUssR0FBTDtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBMUREO1lBQUMseUJBQU0sQ0FBQztnQkFDSixZQUFZLEVBQUUsY0FBc0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxhQUFhLEVBQUUsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUI7Z0JBQ3RFLGNBQWMsRUFBRSxVQUFVLFFBQWEsRUFBRSxTQUFjO29CQUNuRCxJQUFJLE1BQU0sQ0FBQztvQkFDWCxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDMUMsQ0FBQzthQUNhLENBQUM7O21FQUFBO1FBU25CO1lBQUMseUJBQU0sQ0FBQztnQkFDSixZQUFZLEVBQUUsQ0FBQztnQkFDZixhQUFhLEVBQUUsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUI7Z0JBQ3RFLGNBQWMsRUFBRSxjQUFzQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQyxDQUFDOzttREFBQTtRQW9DdkIsb0JBQUM7SUFBRCxDQTVEQSxBQTREQyxJQUFBO0lBNURZLHFCQUFhLGdCQTREekIsQ0FBQSIsImZpbGUiOiJidWZmZXJlZFBhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge0lQYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVBhZ2VyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVmZmVyZWRQYWdlciBpbXBsZW1lbnRzIElQYWdlciB7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kZWZhdWx0Um93Q291bnQ7IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogZnVuY3Rpb24gKHJhd1ZhbHVlOiBhbnksIGFsbFZhbHVlczogYW55KTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKGFsbFZhbHVlcyAmJiAhaXNOYU4oYWxsVmFsdWVzLnNraXApICYmICFpc05hTihhbGxWYWx1ZXMudGFrZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IChhbGxWYWx1ZXMuc2tpcCB8fCAwKSArIChhbGxWYWx1ZXMudGFrZSB8fCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0IHx8IHRoaXMuZGVmYXVsdFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0Um93Q291bnQ7XHJcblxyXG4gICAgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGxvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgZGVmYXVsdFJvd0NvdW50OiBudW1iZXIgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0Um93Q291bnQ7XHJcbiAgICBtaW5Sb3dDb3VudDogbnVtYmVyID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWluUm93Q291bnQ7XHJcbiAgICBtYXhSb3dDb3VudDogbnVtYmVyID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWF4Um93Q291bnQ7XHJcblxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLnNraXBSb3dDb3VudFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IGZ1bmN0aW9uICgpOiBudW1iZXIgeyByZXR1cm4gMDsgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc2tpcCA9IDA7XHJcblxyXG4gICAgZ2V0IHRha2VSb3dDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRha2VSb3dDb3VudEludGVybmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0YWtlUm93Q291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHJvd0NvdW50ID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiB0aGlzLmRlZmF1bHRSb3dDb3VudDtcclxuICAgICAgICBpZiAocm93Q291bnQgPCB0aGlzLm1pblJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gdGhpcy5kZWZhdWx0Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb3dDb3VudCA+IHRoaXMubWF4Um93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NSZXNwb25zZShyZXN1bHQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDA7XHJcbiAgICAgICAgdGhpcy5za2lwID0gKHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXSA9PT0gbnVsbCB8fCByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV0gPT09IHVuZGVmaW5lZCkgP1xyXG4gICAgICAgICAgICAwIDogdGhpcy5za2lwICsgcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSB0aGlzLnNraXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudCA9IHRoaXMuZGVmYXVsdFJvd0NvdW50O1xyXG4gICAgICAgIHRoaXMuc2tpcCA9IDA7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
