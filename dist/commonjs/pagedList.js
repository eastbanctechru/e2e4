"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var simpleList_1 = require('./simpleList');
var utility_1 = require('./common/utility');
var PagedList = (function (_super) {
    __extends(PagedList, _super);
    function PagedList(stateManager, pager) {
        _super.call(this, stateManager, pager);
    }
    PagedList.prototype.loadData = function () {
        var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
        utility_1.Utility.disposeAll(this.items);
        return promise;
        var _a;
    };
    PagedList.prototype.goToFirstPage = function () {
        if (this.pager.pageNumber > 1) {
            this.pager.pageNumber = 1;
            this.loadData();
        }
    };
    PagedList.prototype.goToPreviousPage = function () {
        if (this.pager.pageNumber > 1) {
            this.pager.pageNumber -= 1;
            this.loadData();
        }
    };
    PagedList.prototype.goToNextPage = function () {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber += 1;
            this.loadData();
        }
    };
    PagedList.prototype.goToLastPage = function () {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber = this.pager.pageCount;
            this.loadData();
        }
    };
    return PagedList;
}(simpleList_1.SimpleList));
exports.PagedList = PagedList;
