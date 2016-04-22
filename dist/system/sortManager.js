System.register(['./common/defaults', './common/sortParameter', './filterAnnotation', 'lodash'], function(exports_1, context_1) {
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
    var defaults_1, sortParameter_1, filterAnnotation_1, _;
    var SortManager;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (sortParameter_1_1) {
                sortParameter_1 = sortParameter_1_1;
            },
            function (filterAnnotation_1_1) {
                filterAnnotation_1 = filterAnnotation_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            SortManager = (function () {
                function SortManager() {
                    this.sortings = new Array();
                    this.defaultSortingsPrivate = null;
                }
                Object.defineProperty(SortManager.prototype, "defaultSortings", {
                    get: function () {
                        return this.defaultSortingsPrivate;
                    },
                    set: function (value) {
                        this.defaultSortingsPrivate = value;
                        if (this.sortings === null || this.sortings.length === 0) {
                            this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                SortManager.prototype.setSort = function (fieldName, savePrevious) {
                    var newSort = new sortParameter_1.SortParameter(fieldName);
                    for (var i = 0; i < this.sortings.length; i++) {
                        if (this.sortings[i].fieldName === fieldName) {
                            var existedSort = this.sortings.splice(i, 1)[0];
                            newSort = new sortParameter_1.SortParameter(existedSort.fieldName, existedSort.direction);
                            newSort.toggleDirection();
                            break;
                        }
                    }
                    if (savePrevious) {
                        this.sortings.push(newSort);
                    }
                    else {
                        this.sortings.length = 0;
                        this.sortings.push(newSort);
                    }
                };
                SortManager.prototype.dispose = function () {
                    delete this.defaultSortings;
                    this.sortings.length = 0;
                };
                __decorate([
                    filterAnnotation_1.filter({
                        defaultValue: function () { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
                        parameterName: defaults_1.Defaults.listSettings.sortParameterName,
                        parseFormatter: function (proposedValue) {
                            return Array.isArray(proposedValue) ? proposedValue.map(function (sort) { return new sortParameter_1.SortParameter(sort.fieldName, sort.direction * 1); }) : [];
                        },
                        persisted: defaults_1.Defaults.listSettings.persistSortings
                    }), 
                    __metadata('design:type', Object)
                ], SortManager.prototype, "sortings", void 0);
                return SortManager;
            }());
            exports_1("SortManager", SortManager);
        }
    }
});
