System.register(['./simpleList', './bufferedPager', './common/defaults', './filterAnnotation'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var simpleList_1, bufferedPager_1, defaults_1, filterAnnotation_1;
    var BufferedList;
    return {
        setters:[
            function (simpleList_1_1) {
                simpleList_1 = simpleList_1_1;
            },
            function (bufferedPager_1_1) {
                bufferedPager_1 = bufferedPager_1_1;
            },
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (filterAnnotation_1_1) {
                filterAnnotation_1 = filterAnnotation_1_1;
            }],
        execute: function() {
            BufferedList = (function (_super) {
                __extends(BufferedList, _super);
                function BufferedList(stateManager) {
                    _super.call(this, stateManager, new bufferedPager_1.BufferedPager());
                    this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                    this.skip = 0;
                    this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
                }
                Object.defineProperty(BufferedList.prototype, "takeRowCount", {
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
                BufferedList.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    delete this.bufferedLoadDataSuccessBinded;
                };
                BufferedList.prototype.bufferedLoadDataSuccess = function (result) {
                    this.loadedCount = this.skip + result[defaults_1.Defaults.listSettings.loadedCountParameterName];
                    this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
                    this.loadedCount = this.skip;
                    // In case when filter changed from last request and theres no data now
                    if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                        this.clearData();
                    }
                    return result;
                };
                BufferedList.prototype.clearData = function () {
                    _super.prototype.clearData.call(this);
                    this.skip = 0;
                    this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                };
                BufferedList.prototype.loadData = function () {
                    var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
                    promise.then(this.bufferedLoadDataSuccessBinded);
                    return promise;
                    var _a;
                };
                BufferedList.prototype.onSortChangesCompleted = function () {
                    this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                    this.skip = 0;
                    _super.prototype.onSortChangesCompleted.call(this);
                };
                __decorate([
                    filterAnnotation_1.filter({
                        defaultValue: 0,
                        parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                        parseFormatter: function () { return 0; }
                    }), 
                    __metadata('design:type', Object)
                ], BufferedList.prototype, "skip", void 0);
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
                ], BufferedList.prototype, "takeRowCount", null);
                return BufferedList;
            }(simpleList_1.SimpleList));
            exports_1("BufferedList", BufferedList);
        }
    }
});
