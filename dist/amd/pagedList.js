var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './list', './common/utility', './common/defaults', './filterAnnotation'], function (require, exports, list_1, utility_1, defaults_1, filterAnnotation_1) {
    "use strict";
    var PagedList = (function (_super) {
        __extends(PagedList, _super);
        function PagedList(stateManager) {
            _super.call(this, stateManager);
            this.pageSizeInternal = defaults_1.Defaults.pagedListSettings.defaultPageSize;
            this.pageNumberInternal = 1;
            this.displayFrom = 1;
            this.displayTo = 1;
            this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
        }
        PagedList.prototype.pagedLoadDataSuccessCallback = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
            this.displayFrom = result[defaults_1.Defaults.pagedListSettings.displayFromParameterName] || 1;
            this.displayTo = result[defaults_1.Defaults.pagedListSettings.displayToParameterName] || 1;
            return result;
        };
        PagedList.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            delete this.pagedLoadDataSuccessBinded;
        };
        Object.defineProperty(PagedList.prototype, "pageCount", {
            get: function () {
                return Math.ceil(this.totalCount / this.pageSizeInternal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagedList.prototype, "pageNumber", {
            get: function () {
                return this.pageNumberInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
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
        Object.defineProperty(PagedList.prototype, "pageSize", {
            get: function () {
                return this.pageSizeInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.pagedListSettings.defaultPageSize;
                if (pageSize > defaults_1.Defaults.pagedListSettings.maxPageSize) {
                    pageSize = defaults_1.Defaults.pagedListSettings.maxPageSize;
                }
                if (this.totalCount !== 0) {
                    if (pageSize > this.totalCount) {
                        pageSize = this.totalCount;
                    }
                    if (this.pageNumber * pageSize > this.totalCount) {
                        pageSize = Math.ceil(this.totalCount / this.pageNumber);
                        if (pageSize > defaults_1.Defaults.pagedListSettings.maxPageSize) {
                            pageSize = defaults_1.Defaults.pagedListSettings.maxPageSize;
                        }
                    }
                }
                if (pageSize < defaults_1.Defaults.pagedListSettings.minPageSize || pageSize === 0) {
                    pageSize = defaults_1.Defaults.pagedListSettings.defaultPageSize;
                }
                if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
                    pageSize = this.pageSizeInternal;
                }
                this.pageSizeInternal = pageSize;
            },
            enumerable: true,
            configurable: true
        });
        PagedList.prototype.loadData = function () {
            this.selectionManager.deselectAll();
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            utility_1.Utility.disposeAll(this.items);
            promise.then(this.pagedLoadDataSuccessBinded);
            return promise;
            var _a;
        };
        PagedList.prototype.goToFirstPage = function () {
            if (this.pageNumber > 1) {
                this.pageNumber = 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToPreviousPage = function () {
            if (this.pageNumber > 1) {
                this.pageNumber -= 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToNextPage = function () {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber += 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToLastPage = function () {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber = this.pageCount;
                this.loadData();
            }
        };
        __decorate([
            filterAnnotation_1.filter({ defaultValue: 1, parameterName: defaults_1.Defaults.pagedListSettings.pageNumberParameterName }), 
            __metadata('design:type', Number)
        ], PagedList.prototype, "pageNumber", null);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.pagedListSettings.defaultPageSize,
                parameterName: defaults_1.Defaults.pagedListSettings.pageSizeParameterName,
                persisted: defaults_1.Defaults.pagedListSettings.persistPageSize
            }), 
            __metadata('design:type', Number)
        ], PagedList.prototype, "pageSize", null);
        return PagedList;
    }(list_1.List));
    exports.PagedList = PagedList;
});

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELGdDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQWxGRDtZQUFDLHlCQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFtQixDQUFDOzttREFBQTtRQWdCaEg7WUFBQyx5QkFBTSxDQUFDO2dCQUNKLFlBQVksRUFBRSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLGVBQWU7Z0JBQ3hELGFBQWEsRUFBRSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQjtnQkFDL0QsU0FBUyxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZTthQUN4RCxDQUFDOztpREFBQTtRQStETixnQkFBQztJQUFELENBaEhBLEFBZ0hDLENBaEh1QyxXQUFJLEdBZ0gzQztJQWhIcUIsaUJBQVMsWUFnSDlCLENBQUEiLCJmaWxlIjoicGFnZWRMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0fSBmcm9tICcuL2xpc3QnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5pbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge0lTdGF0ZU1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTdGF0ZU1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VkTGlzdCBleHRlbmRzIExpc3Qge1xyXG4gICAgcHJpdmF0ZSBwYWdlU2l6ZUludGVybmFsID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVySW50ZXJuYWwgPSAxO1xyXG4gICAgcHJpdmF0ZSBwYWdlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDogKHJlc3VsdDogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBwcml2YXRlIHBhZ2VkTG9hZERhdGFTdWNjZXNzQ2FsbGJhY2socmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RnJvbSA9IHJlc3VsdFtEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kaXNwbGF5RnJvbVBhcmFtZXRlck5hbWVdIHx8IDE7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VG8gPSByZXN1bHRbRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGlzcGxheVRvUGFyYW1ldGVyTmFtZV0gfHwgMTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZGlzcGxheUZyb20gPSAxO1xyXG4gICAgZGlzcGxheVRvID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICBzdXBlcihzdGF0ZU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIEBmaWx0ZXIoeyBkZWZhdWx0VmFsdWU6IDEsIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBhZ2VOdW1iZXJQYXJhbWV0ZXJOYW1lIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIGdldCBwYWdlTnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZU51bWJlckludGVybmFsO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhZ2VOdW1iZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IDE7XHJcbiAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVySW50ZXJuYWwgPSBwYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplLFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBhZ2VTaXplUGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwZXJzaXN0ZWQ6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBlcnNpc3RQYWdlU2l6ZVxyXG4gICAgfSlcclxuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VTaXplID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcblxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA+IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciAqIHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA8IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1pblBhZ2VTaXplIHx8IHBhZ2VTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSB0aGlzLnBhZ2VDb3VudCAmJiBwYWdlU2l6ZSA+IHRoaXMucGFnZVNpemVJbnRlcm5hbCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVJbnRlcm5hbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZUludGVybmFsID0gcGFnZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgZ29Ub0ZpcnN0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub1ByZXZpb3VzUGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvVG9OZXh0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTGFzdFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
