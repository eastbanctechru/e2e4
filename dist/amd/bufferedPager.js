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
            this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.totalCount = 0;
            this.loadedCount = 0;
            this.skip = 0;
        }
        Object.defineProperty(BufferedPager.prototype, "takeRowCount", {
            get: function () {
                return this.takeRowCountInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                if (rowCount < defaults_1.Defaults.bufferedListSettings.minRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
                if (rowCount > defaults_1.Defaults.bufferedListSettings.maxRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.maxRowCount;
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
            this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName] || 0;
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
            this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.loadedCount = this.skip;
        };
        BufferedPager.prototype.reset = function () {
            this.totalCount = 0;
            this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.skip = 0;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedPager.prototype, "skip", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount,
                parameterName: defaults_1.Defaults.bufferedListSettings.takeRowCountParameterName,
                parseFormatter: function (proposedParam, allParams) {
                    if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                        return allParams.skip + allParams.take;
                    }
                    return defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
            }), 
            __metadata('design:type', Number)
        ], BufferedPager.prototype, "takeRowCount", null);
        return BufferedPager;
    }());
    exports.BufferedPager = BufferedPager;
});

//# sourceMappingURL=data:application/json;base64,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QW1CO2dCQUMvRCxhQUFhLEVBQUUsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUI7Z0JBQ3RFLGNBQWMsRUFBRSxVQUFDLGFBQWtCLEVBQUUsU0FBYztvQkFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxNQUFNLENBQUMsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDN0QsQ0FBQzthQUNhLENBQUM7O3lEQUFBO1FBa0N2QixvQkFBQztJQUFELENBdkRBLEFBdURDLElBQUE7SUF2RFkscUJBQWEsZ0JBdUR6QixDQUFBIiwiZmlsZSI6ImJ1ZmZlcmVkUGFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SVBhZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JUGFnZXInO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCdWZmZXJlZFBhZ2VyIGltcGxlbWVudHMgSVBhZ2VyIHtcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGxvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5za2lwUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDA7IH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNraXAgPSAwO1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbTogYW55LCBhbGxQYXJhbXM6IGFueSk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgaWYgKHJvd0NvdW50IDwgRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NSZXNwb25zZShyZXN1bHQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc2tpcCArPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
