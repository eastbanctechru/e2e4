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
        function PagedList(stateManager, sortManager) {
            _super.call(this, stateManager, sortManager);
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
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.pagedListSettings.defaultPageSize,
                parameterName: defaults_1.Defaults.pagedListSettings.pageSizeParameterName,
                persisted: defaults_1.Defaults.pagedListSettings.persistPageSize
            }), 
            __metadata('design:type', Object)
        ], PagedList.prototype, "pageSizeInternal", void 0);
        __decorate([
            filterAnnotation_1.filter({ defaultValue: 1, parameterName: defaults_1.Defaults.pagedListSettings.pageNumberParameterName }), 
            __metadata('design:type', Object)
        ], PagedList.prototype, "pageNumberInternal", void 0);
        return PagedList;
    }(list_1.List));
    exports.PagedList = PagedList;
});

//# sourceMappingURL=data:application/json;base64,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QUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELGdDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQS9HRDtZQUFDLHlCQUFNLENBQUM7Z0JBQ0osWUFBWSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZTtnQkFDeEQsYUFBYSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2dCQUMvRCxTQUFTLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlO2FBQ3hELENBQUM7OzJEQUFBO1FBR0Y7WUFBQyx5QkFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBbUIsQ0FBQzs7NkRBQUE7UUF5R3BILGdCQUFDO0lBQUQsQ0FqSEEsQUFpSEMsQ0FqSHVDLFdBQUksR0FpSDNDO0lBakhxQixpQkFBUyxZQWlIOUIsQ0FBQSIsImZpbGUiOiJwYWdlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7VXRpbGl0eX0gZnJvbSAnLi9jb21tb24vdXRpbGl0eSc7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VkTGlzdCBleHRlbmRzIExpc3Qge1xyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemUsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGFnZVNpemVQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGVyc2lzdFBhZ2VTaXplXHJcbiAgICB9KVxyXG4gICAgcHJpdmF0ZSBwYWdlU2l6ZUludGVybmFsID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG5cclxuICAgIEBmaWx0ZXIoeyBkZWZhdWx0VmFsdWU6IDEsIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBhZ2VOdW1iZXJQYXJhbWV0ZXJOYW1lIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHByaXZhdGUgcGFnZU51bWJlckludGVybmFsID0gMTtcclxuXHJcbiAgICBwcml2YXRlIHBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgcGFnZWRMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlGcm9tID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRpc3BsYXlGcm9tUGFyYW1ldGVyTmFtZV0gfHwgMTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlUbyA9IHJlc3VsdFtEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kaXNwbGF5VG9QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5RnJvbSA9IDE7XHJcbiAgICBkaXNwbGF5VG8gPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXI6IElTb3J0TWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYWdlTnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZU51bWJlckludGVybmFsO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhZ2VOdW1iZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IDE7XHJcbiAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVySW50ZXJuYWwgPSBwYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VTaXplID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcblxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA+IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciAqIHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA8IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1pblBhZ2VTaXplIHx8IHBhZ2VTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSB0aGlzLnBhZ2VDb3VudCAmJiBwYWdlU2l6ZSA+IHRoaXMucGFnZVNpemVJbnRlcm5hbCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVJbnRlcm5hbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZUludGVybmFsID0gcGFnZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgZ29Ub0ZpcnN0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub1ByZXZpb3VzUGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvVG9OZXh0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTGFzdFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
