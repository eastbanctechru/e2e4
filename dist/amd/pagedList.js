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

//# sourceMappingURL=data:application/json;base64,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QUNELGdDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQS9HRDtZQUFDLHlCQUFNLENBQUM7Z0JBQ0osWUFBWSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZTtnQkFDeEQsYUFBYSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2dCQUMvRCxTQUFTLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlO2FBQ3hELENBQUM7OzJEQUFBO1FBR0Y7WUFBQyx5QkFBTSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBbUIsQ0FBQzs7NkRBQUE7UUF5R3BILGdCQUFDO0lBQUQsQ0FqSEEsQUFpSEMsQ0FqSHVDLFdBQUksR0FpSDNDO0lBakhxQixpQkFBUyxZQWlIOUIsQ0FBQSIsImZpbGUiOiJwYWdlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7VXRpbGl0eX0gZnJvbSAnLi9jb21tb24vdXRpbGl0eSc7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFnZWRMaXN0IGV4dGVuZHMgTGlzdCB7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5wYWdlU2l6ZVBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGVyc2lzdGVkOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5wZXJzaXN0UGFnZVNpemVcclxuICAgIH0pXHJcbiAgICBwcml2YXRlIHBhZ2VTaXplSW50ZXJuYWwgPSBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcblxyXG4gICAgQGZpbHRlcih7IGRlZmF1bHRWYWx1ZTogMSwgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGFnZU51bWJlclBhcmFtZXRlck5hbWUgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgcHJpdmF0ZSBwYWdlTnVtYmVySW50ZXJuYWwgPSAxO1xyXG5cclxuICAgIHByaXZhdGUgcGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBwYWdlZExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDA7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheUZyb20gPSByZXN1bHRbRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGlzcGxheUZyb21QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVRvID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRpc3BsYXlUb1BhcmFtZXRlck5hbWVdIHx8IDE7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGRpc3BsYXlGcm9tID0gMTtcclxuICAgIGRpc3BsYXlUbyA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhZ2VDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbENvdW50IC8gdGhpcy5wYWdlU2l6ZUludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFnZU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VOdW1iZXJJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIHNldCBwYWdlTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVN0ciA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXjAtOVxcLl0vZywgJycpO1xyXG4gICAgICAgIGxldCBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiAxO1xyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyID4gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZU51bWJlciA8IDEpIHtcclxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZU51bWJlckludGVybmFsID0gcGFnZU51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlU2l6ZUludGVybmFsO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhZ2VTaXplKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVN0ciA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXjAtOVxcLl0vZywgJycpO1xyXG4gICAgICAgIGxldCBwYWdlU2l6ZSA9IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgPyBwYXJzZUludCh2YWx1ZVN0ciwgMTApIDogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG5cclxuICAgICAgICBpZiAocGFnZVNpemUgPiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5tYXhQYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdlU2l6ZSA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLnRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgKiBwYWdlU2l6ZSA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemUgPSBNYXRoLmNlaWwodGhpcy50b3RhbENvdW50IC8gdGhpcy5wYWdlTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYWdlU2l6ZSA+IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemUgPSBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5tYXhQYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZVNpemUgPCBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5taW5QYWdlU2l6ZSB8fCBwYWdlU2l6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA9PT0gdGhpcy5wYWdlQ291bnQgJiYgcGFnZVNpemUgPiB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZVNpemVJbnRlcm5hbCA9IHBhZ2VTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHN1cGVyLmxvYWREYXRhLmNhbGwodGhpcywgLi4uQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgVXRpbGl0eS5kaXNwb3NlQWxsKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGdvVG9GaXJzdFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvVG9QcmV2aW91c1BhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub0xhc3RQYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPCB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
