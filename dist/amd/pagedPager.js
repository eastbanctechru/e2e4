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
            this.totalCount = 0;
            this.loadedCount = 0;
            this.displayFrom = 1;
            this.displayTo = 1;
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
        PagedPager.prototype.processResponse = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
            this.displayFrom = result[defaults_1.Defaults.pagedListSettings.displayFromParameterName] || 1;
            this.displayTo = result[defaults_1.Defaults.pagedListSettings.displayToParameterName] || 1;
        };
        PagedPager.prototype.reset = function () {
            this.totalCount = 0;
            this.pageNumber = 1;
            this.pageSize = defaults_1.Defaults.pagedListSettings.defaultPageSize;
        };
        __decorate([
            filterAnnotation_1.filter({ defaultValue: 1, parameterName: defaults_1.Defaults.pagedListSettings.pageNumberParameterName }), 
            __metadata('design:type', Number)
        ], PagedPager.prototype, "pageNumber", null);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.pagedListSettings.defaultPageSize,
                parameterName: defaults_1.Defaults.pagedListSettings.pageSizeParameterName,
                persisted: defaults_1.Defaults.pagedListSettings.persistPageSize
            }), 
            __metadata('design:type', Number)
        ], PagedPager.prototype, "pageSize", null);
        return PagedPager;
    }());
    exports.PagedPager = PagedPager;
});

//# sourceMappingURL=data:application/json;base64,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LElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7UUFDL0QsQ0FBQztRQS9ERDtZQUFDLHlCQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxtQkFBUSxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixFQUFtQixDQUFDOztvREFBQTtRQWVoSDtZQUFDLHlCQUFNLENBQUM7Z0JBQ0osWUFBWSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZTtnQkFDeEQsYUFBYSxFQUFFLG1CQUFRLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO2dCQUMvRCxTQUFTLEVBQUUsbUJBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlO2FBQ3hELENBQUM7O2tEQUFBO1FBNkNOLGlCQUFDO0lBQUQsQ0EzRUEsQUEyRUMsSUFBQTtJQTNFWSxrQkFBVSxhQTJFdEIsQ0FBQSIsImZpbGUiOiJwYWdlZFBhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge0lQYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVBhZ2VyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZWRQYWdlciBpbXBsZW1lbnRzIElQYWdlciB7XHJcbiAgICBwcml2YXRlIHBhZ2VTaXplSW50ZXJuYWwgPSBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcbiAgICBwcml2YXRlIHBhZ2VOdW1iZXJJbnRlcm5hbCA9IDE7XHJcblxyXG4gICAgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGxvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgZGlzcGxheUZyb20gPSAxO1xyXG4gICAgZGlzcGxheVRvID0gMTtcclxuICAgIGdldCBwYWdlQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxDb3VudCAvIHRoaXMucGFnZVNpemVJbnRlcm5hbCk7XHJcbiAgICB9XHJcbiAgICBAZmlsdGVyKHsgZGVmYXVsdFZhbHVlOiAxLCBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5wYWdlTnVtYmVyUGFyYW1ldGVyTmFtZSB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBnZXQgcGFnZU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VOdW1iZXJJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIHNldCBwYWdlTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVN0ciA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xyXG4gICAgICAgIGxldCBwYWdlTnVtYmVyID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiAxO1xyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyID4gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgcGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZU51bWJlciA8IDEpIHtcclxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZU51bWJlckludGVybmFsID0gcGFnZU51bWJlcjtcclxuICAgIH1cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplLFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBhZ2VTaXplUGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwZXJzaXN0ZWQ6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBlcnNpc3RQYWdlU2l6ZVxyXG4gICAgfSlcclxuICAgIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VTaXplSW50ZXJuYWw7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VTaXplID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcblxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA+IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciAqIHBhZ2VTaXplID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VTaXplID4gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1heFBhZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlU2l6ZSA8IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLm1pblBhZ2VTaXplIHx8IHBhZ2VTaXplID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSB0aGlzLnBhZ2VDb3VudCAmJiBwYWdlU2l6ZSA+IHRoaXMucGFnZVNpemVJbnRlcm5hbCkge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA9IHRoaXMucGFnZVNpemVJbnRlcm5hbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZUludGVybmFsID0gcGFnZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1Jlc3BvbnNlKHJlc3VsdDogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlGcm9tID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRpc3BsYXlGcm9tUGFyYW1ldGVyTmFtZV0gfHwgMTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlUbyA9IHJlc3VsdFtEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kaXNwbGF5VG9QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG5cclxuICAgIH1cclxuICAgIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
