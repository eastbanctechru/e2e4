"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var defaults_1 = require('./common/defaults');
var filterAnnotation_1 = require('./filterAnnotation');
var BufferedPager = (function () {
    function BufferedPager() {
        this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
        this.totalCount = 0;
        this.loadedCount = 0;
        this.skip = 0;
    }
    Object.defineProperty(BufferedPager.prototype, "takeRowCount", {
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
    BufferedPager.prototype.processResponse = function (result) {
        this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
        this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
    };
    BufferedPager.prototype.reset = function () {
        this.totalCount = 0;
        this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
        this.skip = 0;
    };
    __decorate([
        filterAnnotation_1.filter({
            defaultValue: 0,
            parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
            parseFormatter: function () { return 0; }
        }), 
        __metadata('design:type', Object)
    ], BufferedPager.prototype, "skip", void 0);
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
    ], BufferedPager.prototype, "takeRowCount", null);
    return BufferedPager;
}());
exports.BufferedPager = BufferedPager;
