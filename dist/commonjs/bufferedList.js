"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var simpleList_1 = require('./simpleList');
var BufferedList = (function (_super) {
    __extends(BufferedList, _super);
    function BufferedList(stateManager, pager) {
        _super.call(this, stateManager, pager);
    }
    return BufferedList;
}(simpleList_1.SimpleList));
exports.BufferedList = BufferedList;
