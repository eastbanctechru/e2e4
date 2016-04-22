"use strict";
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
var list_1 = require('./list');
var utility_1 = require('./common/utility');
var defaults_1 = require('./common/defaults');
var filterAnnotation_1 = require('./filterAnnotation');
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
