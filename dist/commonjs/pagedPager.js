"use strict";
var PagedPager = (function () {
    function PagedPager() {
        this.totalCount = 0;
        this.loadedCount = 0;
    }
    PagedPager.prototype.processResponse = function (result) { };
    PagedPager.prototype.reset = function () {
        throw new Error('Not implemented yet');
    };
    return PagedPager;
}());
exports.PagedPager = PagedPager;
