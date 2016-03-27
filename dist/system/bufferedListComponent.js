System.register(['./listComponent', './common/defaults', './filterAnnotation'], function(exports_1, context_1) {
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
    var listComponent_1, defaults_1, filterAnnotation_1;
    var BufferedListComponent;
    return {
        setters:[
            function (listComponent_1_1) {
                listComponent_1 = listComponent_1_1;
            },
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (filterAnnotation_1_1) {
                filterAnnotation_1 = filterAnnotation_1_1;
            }],
        execute: function() {
            BufferedListComponent = (function (_super) {
                __extends(BufferedListComponent, _super);
                function BufferedListComponent(stateManager) {
                    _super.call(this, stateManager);
                    this.takeRowCountInternal = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                    this.skip = 0;
                    this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
                }
                Object.defineProperty(BufferedListComponent.prototype, "takeRowCount", {
                    get: function () {
                        return this.takeRowCountInternal;
                    },
                    set: function (value) {
                        var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                        var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                        if (rowCount < defaults_1.Defaults.bufferedListComponent.minRowCount) {
                            rowCount = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                        }
                        if (rowCount > defaults_1.Defaults.bufferedListComponent.maxRowCount) {
                            rowCount = defaults_1.Defaults.bufferedListComponent.maxRowCount;
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
                BufferedListComponent.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    delete this.bufferedLoadDataSuccessBinded;
                };
                BufferedListComponent.prototype.bufferedLoadDataSuccess = function (result) {
                    this.loadedCount = this.skip + result[defaults_1.Defaults.listComponent.loadedCountParameterName];
                    this.skip += result[defaults_1.Defaults.listComponent.loadedCountParameterName];
                    this.loadedCount = this.skip;
                    // In case when filter changed from last request and theres no data now
                    if ((result[defaults_1.Defaults.listComponent.totalCountParameterName] || 0) === 0) {
                        this.clearData();
                    }
                    return result;
                };
                BufferedListComponent.prototype.loadData = function () {
                    var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
                    promise.then(this.bufferedLoadDataSuccessBinded);
                    return promise;
                    var _a;
                };
                BufferedListComponent.prototype.onSortChangesCompleted = function () {
                    this.takeRowCount = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                    this.skip = 0;
                    _super.prototype.onSortChangesCompleted.call(this);
                };
                __decorate([
                    filterAnnotation_1.filter({
                        defaultValue: 0,
                        parameterName: defaults_1.Defaults.bufferedListComponent.skipRowCountParameterName,
                        parseFormatter: function () { return 0; }
                    }), 
                    __metadata('design:type', Object)
                ], BufferedListComponent.prototype, "skip", void 0);
                __decorate([
                    filterAnnotation_1.filter({
                        defaultValue: defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount,
                        parameterName: defaults_1.Defaults.bufferedListComponent.takeRowCountParameterName,
                        parseFormatter: function (proposedParam, allParams) {
                            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                                return allParams.skip + allParams.take;
                            }
                            return defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                        }
                    }), 
                    __metadata('design:type', Number)
                ], BufferedListComponent.prototype, "takeRowCount", null);
                return BufferedListComponent;
            }(listComponent_1.ListComponent));
            exports_1("BufferedListComponent", BufferedListComponent);
        }
    }
});
