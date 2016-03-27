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
define(["require", "exports", './listComponent', './common/utility', './common/defaults', './filterAnnotation'], function (require, exports, listComponent_1, utility_1, defaults_1, filterAnnotation_1) {
    "use strict";
    var PagedListComponent = (function (_super) {
        __extends(PagedListComponent, _super);
        function PagedListComponent(stateManager) {
            _super.call(this, stateManager);
            this.pageSizeInternal = defaults_1.Defaults.pagedListComponent.defaultPageSize;
            this.pageNumberInternal = 1;
            this.displayFrom = 1;
            this.displayTo = 1;
            this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
        }
        PagedListComponent.prototype.pagedLoadDataSuccessCallback = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listComponent.loadedCountParameterName];
            this.totalCount = result[defaults_1.Defaults.listComponent.totalCountParameterName] || 0;
            this.displayFrom = result[defaults_1.Defaults.pagedListComponent.displayFromParameterName] || 1;
            this.displayTo = result[defaults_1.Defaults.pagedListComponent.displayToParameterName] || 1;
            return result;
        };
        PagedListComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            delete this.pagedLoadDataSuccessBinded;
        };
        Object.defineProperty(PagedListComponent.prototype, "pageCount", {
            get: function () {
                return Math.ceil(this.totalCount / this.pageSizeInternal);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagedListComponent.prototype, "pageNumber", {
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
        Object.defineProperty(PagedListComponent.prototype, "pageSize", {
            get: function () {
                return this.pageSizeInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.pagedListComponent.defaultPageSize;
                if (pageSize > defaults_1.Defaults.pagedListComponent.maxPageSize) {
                    pageSize = defaults_1.Defaults.pagedListComponent.maxPageSize;
                }
                if (this.totalCount !== 0) {
                    if (pageSize > this.totalCount) {
                        pageSize = this.totalCount;
                    }
                    if (this.pageNumber * pageSize > this.totalCount) {
                        pageSize = Math.ceil(this.totalCount / this.pageNumber);
                        if (pageSize > defaults_1.Defaults.pagedListComponent.maxPageSize) {
                            pageSize = defaults_1.Defaults.pagedListComponent.maxPageSize;
                        }
                    }
                }
                if (pageSize < defaults_1.Defaults.pagedListComponent.minPageSize || pageSize === 0) {
                    pageSize = defaults_1.Defaults.pagedListComponent.defaultPageSize;
                }
                if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
                    pageSize = this.pageSizeInternal;
                }
                this.pageSizeInternal = pageSize;
            },
            enumerable: true,
            configurable: true
        });
        PagedListComponent.prototype.loadData = function () {
            this.selectionManager.deselectAll();
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            utility_1.Utility.disposeAll(this.items);
            promise.then(this.pagedLoadDataSuccessBinded);
            return promise;
            var _a;
        };
        PagedListComponent.prototype.goToFirstPage = function () {
            if (this.pageNumber > 1) {
                this.pageNumber = 1;
                this.loadData();
            }
        };
        PagedListComponent.prototype.goToPreviousPage = function () {
            if (this.pageNumber > 1) {
                this.pageNumber -= 1;
                this.loadData();
            }
        };
        PagedListComponent.prototype.goToNextPage = function () {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber += 1;
                this.loadData();
            }
        };
        PagedListComponent.prototype.goToLastPage = function () {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber = this.pageCount;
                this.loadData();
            }
        };
        __decorate([
            filterAnnotation_1.filter({ defaultValue: 1, parameterName: defaults_1.Defaults.pagedListComponent.pageNumberParameterName }), 
            __metadata('design:type', Number)
        ], PagedListComponent.prototype, "pageNumber", null);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.pagedListComponent.defaultPageSize,
                parameterName: defaults_1.Defaults.pagedListComponent.pageSizeParameterName,
                persisted: defaults_1.Defaults.pagedListComponent.persistPageSize
            }), 
            __metadata('design:type', Number)
        ], PagedListComponent.prototype, "pageSize", null);
        return PagedListComponent;
    }(listComponent_1.ListComponent));
    exports.PagedListComponent = PagedListComponent;
});

//# sourceMappingURL=data:application/json;base64,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Q3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELHlDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQWxGRDtZQUFDLHlCQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxtQkFBUSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixFQUFtQixDQUFDOzs0REFBQTtRQWdCakg7WUFBQyx5QkFBTSxDQUFDO2dCQUNKLFlBQVksRUFBRSxtQkFBUSxDQUFDLGtCQUFrQixDQUFDLGVBQWU7Z0JBQ3pELGFBQWEsRUFBRSxtQkFBUSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQjtnQkFDaEUsU0FBUyxFQUFFLG1CQUFRLENBQUMsa0JBQWtCLENBQUMsZUFBZTthQUN6RCxDQUFDOzswREFBQTtRQStETix5QkFBQztJQUFELENBaEhBLEFBZ0hDLENBaEhnRCw2QkFBYSxHQWdIN0Q7SUFoSHFCLDBCQUFrQixxQkFnSHZDLENBQUEiLCJmaWxlIjoicGFnZWRMaXN0Q29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0Q29tcG9uZW50fSBmcm9tICcuL2xpc3RDb21wb25lbnQnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5pbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge0lTdGF0ZU1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTdGF0ZU1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhZ2VkTGlzdENvbXBvbmVudCBleHRlbmRzIExpc3RDb21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBwYWdlU2l6ZUludGVybmFsID0gRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgIHByaXZhdGUgcGFnZU51bWJlckludGVybmFsID0gMTtcclxuICAgIHByaXZhdGUgcGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBwYWdlZExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RDb21wb25lbnQubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdENvbXBvbmVudC50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RnJvbSA9IHJlc3VsdFtEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQuZGlzcGxheUZyb21QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVRvID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdENvbXBvbmVudC5kaXNwbGF5VG9QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5RnJvbSA9IDE7XHJcbiAgICBkaXNwbGF5VG8gPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYWdlQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxDb3VudCAvIHRoaXMucGFnZVNpemVJbnRlcm5hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgQGZpbHRlcih7IGRlZmF1bHRWYWx1ZTogMSwgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50LnBhZ2VOdW1iZXJQYXJhbWV0ZXJOYW1lIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIGdldCBwYWdlTnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZU51bWJlckludGVybmFsO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhZ2VOdW1iZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IDE7XHJcbiAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVySW50ZXJuYWwgPSBwYWdlTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRQYWdlU2l6ZSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQucGFnZVNpemVQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50LnBlcnNpc3RQYWdlU2l6ZVxyXG4gICAgfSlcclxuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VTaXplID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQuZGVmYXVsdFBhZ2VTaXplO1xyXG5cclxuICAgICAgICBpZiAocGFnZVNpemUgPiBEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQubWF4UGFnZVNpemUpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSBEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQubWF4UGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciAqIHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50Lm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemUgPSBEZWZhdWx0cy5wYWdlZExpc3RDb21wb25lbnQubWF4UGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplIDwgRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50Lm1pblBhZ2VTaXplIHx8IHBhZ2VTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA9PT0gdGhpcy5wYWdlQ291bnQgJiYgcGFnZVNpemUgPiB0aGlzLnBhZ2VTaXplSW50ZXJuYWwpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZVNpemVJbnRlcm5hbCA9IHBhZ2VTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHN1cGVyLmxvYWREYXRhLmNhbGwodGhpcywgLi4uQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgVXRpbGl0eS5kaXNwb3NlQWxsKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGdvVG9GaXJzdFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvVG9QcmV2aW91c1BhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub0xhc3RQYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPCB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
