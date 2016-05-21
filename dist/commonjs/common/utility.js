"use strict";
var Utility = (function () {
    function Utility() {
    }
    Utility.disposeAll = function (collection, async) {
        if (async === void 0) { async = true; }
        if (!Array.isArray(collection)) {
            return;
        }
        var items = collection.splice(0, collection.length);
        if (async) {
            setTimeout(function () {
                items.forEach(function (item) {
                    if (item.dispose) {
                        item.dispose();
                    }
                });
                items = null;
            }, 0);
        }
        else {
            items.forEach(function (item) {
                if (item.dispose) {
                    item.dispose();
                }
            });
        }
    };
    Utility.cloneLiteral = function (value) {
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return undefined;
        }
        if (Array.isArray(value)) {
            return value.map(function (i) { return Utility.cloneLiteral(i); });
        }
        if (typeof value === 'object') {
            var result = {};
            for (var index in value) {
                if (value.hasOwnProperty(index) && (typeof value[index] !== 'function')) {
                    result[index] = Utility.cloneLiteral(value[index]);
                }
            }
            return result;
        }
        return value;
    };
    Utility.coerceValue = function (value) {
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return undefined;
        }
        if (typeof value === 'object' || Array.isArray(value)) {
            for (var index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = Utility.coerceValue(value[index]);
                }
            }
        }
        else if (value && !isNaN(value)) {
            value = +value;
        }
        else if (value === 'undefined') {
            value = undefined;
        }
        else if (Utility.coerceTypes[value] !== undefined) {
            value = Utility.coerceTypes[value];
        }
        return value;
    };
    Utility.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    return Utility;
}());
exports.Utility = Utility;
