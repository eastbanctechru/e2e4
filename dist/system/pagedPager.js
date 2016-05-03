System.register(['./common/defaults', './filterAnnotation'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var defaults_1, filterAnnotation_1;
    var PagedPager;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (filterAnnotation_1_1) {
                filterAnnotation_1 = filterAnnotation_1_1;
            }],
        execute: function() {
            PagedPager = (function () {
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
                    this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName] || 0;
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
            exports_1("PagedPager", PagedPager);
        }
    }
});