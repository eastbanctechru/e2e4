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
    var PagedPager = (function () {
        function PagedPager() {
            this.pageSizeInternal = defaults_1.Defaults.pagedListSettings.defaultPageSize;
            this.pageNumberInternal = 1;
            this.defaultPageSize = defaults_1.Defaults.pagedListSettings.defaultPageSize;
            this.maxPageSize = defaults_1.Defaults.pagedListSettings.maxPageSize;
            this.minPageSize = defaults_1.Defaults.pagedListSettings.minPageSize;
            this.totalCount = 0;
            this.loadedCount = 0;
            this.displayFrom = 0;
            this.displayTo = 0;
        }
        Object.defineProperty(PagedPager.prototype, "pageCount", {
            get: function () {
                return Math.ceil(this.totalCount / this.pageSizeInternal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagedPager.prototype, "pageNumber", {
            get: function () {
                return this.pageNumberInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9]/g, '');
                var pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
                if (pageNumber > this.pageCount) {
                    pageNumber = this.pageCount;
                }
                if (pageNumber < 1) {
                    pageNumber = 1;
                }
                this.pageNumberInternal = pageNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagedPager.prototype, "pageSize", {
            get: function () {
                return this.pageSizeInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9]/g, '');
                var pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultPageSize;
                if (pageSize > this.maxPageSize) {
                    pageSize = this.maxPageSize;
                }
                if (this.totalCount !== 0) {
                    if (pageSize > this.totalCount) {
                        pageSize = this.totalCount;
                    }
                    if (this.pageNumber * pageSize > this.totalCount) {
                        pageSize = Math.ceil(this.totalCount / this.pageNumber);
                        if (pageSize > this.maxPageSize) {
                            pageSize = this.maxPageSize;
                        }
                    }
                }
                if (pageSize < this.minPageSize || pageSize === 0) {
                    pageSize = this.defaultPageSize;
                }
                if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
                    pageSize = this.pageSizeInternal;
                }
                this.pageSizeInternal = pageSize;
            },
            enumerable: true,
            configurable: true
        });
        PagedPager.prototype.processResponse = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName] || 0;
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
            this.displayFrom = result[defaults_1.Defaults.pagedListSettings.displayFromParameterName] || 0;
            this.displayTo = result[defaults_1.Defaults.pagedListSettings.displayToParameterName] || 0;
        };
        PagedPager.prototype.reset = function () {
            this.totalCount = 0;
            this.pageNumber = 1;
            this.pageSize = this.defaultPageSize;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 1,
                parameterName: defaults_1.Defaults.pagedListSettings.pageNumberParameterName,
                parseFormatter: function (rawValue) {
                    return isNaN(rawValue) || !rawValue ? 1 : rawValue;
                }
            }), 
            __metadata('design:type', Object)
        ], PagedPager.prototype, "pageNumberInternal", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: function () { return this.defaultPageSize; },
                parameterName: defaults_1.Defaults.pagedListSettings.pageSizeParameterName,
                parseFormatter: function (rawValue) {
                    return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
                },
                persisted: defaults_1.Defaults.pagedListSettings.persistPageSize
            }), 
            __metadata('design:type', Number)
        ], PagedPager.prototype, "pageSize", null);
        return PagedPager;
    }());
    exports.PagedPager = PagedPager;
});

//# sourceMappingURL=data:application/json;base64,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QUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN6QyxDQUFDO1FBckZEO1lBQUMseUJBQU0sQ0FBQztnQkFDSixZQUFZLEVBQUUsQ0FBQztnQkFDZixhQUFhLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUI7Z0JBQ2pFLGNBQWMsRUFBRSxVQUFVLFFBQWE7b0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDdkQsQ0FBQzthQUNhLENBQUM7OzhEQUFBO1FBNEJuQjtZQUFDLHlCQUFNLENBQUM7Z0JBQ0osWUFBWSxFQUFFLGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsYUFBYSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2dCQUMvRCxjQUFjLEVBQUUsVUFBVSxRQUFhO29CQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO2dCQUMxRSxDQUFDO2dCQUNELFNBQVMsRUFBRSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLGVBQWU7YUFDeEQsQ0FBQzs7a0RBQUE7UUE2Q04saUJBQUM7SUFBRCxDQXpGQSxBQXlGQyxJQUFBO0lBekZZLGtCQUFVLGFBeUZ0QixDQUFBIiwiZmlsZSI6InBhZ2VkUGFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SVBhZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JUGFnZXInO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlZFBhZ2VyIGltcGxlbWVudHMgSVBhZ2VyIHtcclxuICAgIHByaXZhdGUgcGFnZVNpemVJbnRlcm5hbCA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZTtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDEsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGFnZU51bWJlclBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IGZ1bmN0aW9uIChyYXdWYWx1ZTogYW55KTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHJhd1ZhbHVlKSB8fCAhcmF3VmFsdWUgPyAxIDogcmF3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVySW50ZXJuYWwgPSAxO1xyXG5cclxuICAgIGRlZmF1bHRQYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgIG1heFBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemU7XHJcbiAgICBtaW5QYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1pblBhZ2VTaXplO1xyXG4gICAgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGxvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgZGlzcGxheUZyb20gPSAwO1xyXG4gICAgZGlzcGxheVRvID0gMDtcclxuXHJcbiAgICBnZXQgcGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHBhZ2VOdW1iZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlTnVtYmVySW50ZXJuYWw7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFnZU51bWJlcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcGFnZU51bWJlciA9IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgPyBwYXJzZUludCh2YWx1ZVN0ciwgMTApIDogMTtcclxuICAgICAgICBpZiAocGFnZU51bWJlciA+IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPCAxKSB7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VOdW1iZXJJbnRlcm5hbCA9IHBhZ2VOdW1iZXI7XHJcbiAgICB9XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kZWZhdWx0UGFnZVNpemU7IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGFnZVNpemVQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiBmdW5jdGlvbiAocmF3VmFsdWU6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc05hTihyYXdWYWx1ZSkgfHwgIXJhd1ZhbHVlID8gdGhpcy5kZWZhdWx0UGFnZVNpemUgOiByYXdWYWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGVyc2lzdFBhZ2VTaXplXHJcbiAgICB9KVxyXG4gICAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVNpemVJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIHNldCBwYWdlU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcGFnZVNpemUgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IHRoaXMuZGVmYXVsdFBhZ2VTaXplO1xyXG5cclxuICAgICAgICBpZiAocGFnZVNpemUgPiB0aGlzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gdGhpcy5tYXhQYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxDb3VudCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAocGFnZVNpemUgPiB0aGlzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gdGhpcy50b3RhbENvdW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyICogcGFnZVNpemUgPiB0aGlzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gTWF0aC5jZWlsKHRoaXMudG90YWxDb3VudCAvIHRoaXMucGFnZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZVNpemUgPiB0aGlzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLm1heFBhZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA8IHRoaXMubWluUGFnZVNpemUgfHwgcGFnZVNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA9PT0gdGhpcy5wYWdlQ291bnQgJiYgcGFnZVNpemUgPiB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZVNpemVJbnRlcm5hbCA9IHBhZ2VTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NSZXNwb25zZShyZXN1bHQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlGcm9tID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRpc3BsYXlGcm9tUGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLmRpc3BsYXlUbyA9IHJlc3VsdFtEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kaXNwbGF5VG9QYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG5cclxuICAgIH1cclxuICAgIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5kZWZhdWx0UGFnZVNpemU7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
