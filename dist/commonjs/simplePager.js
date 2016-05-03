"use strict";
var defaults_1 = require('./common/defaults');
var SimplePager = (function () {
    function SimplePager() {
        this.pageSizeInternal = defaults_1.Defaults.pagedListSettings.defaultPageSize;
        this.pageNumberInternal = 1;
        this.totalCount = 0;
        this.loadedCount = 0;
    }
    SimplePager.prototype.processResponse = function (result) {
        this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
    };
    SimplePager.prototype.reset = function () {
        this.totalCount = 0;
    };
    return SimplePager;
}());
exports.SimplePager = SimplePager;
