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
    Utility.formatString = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    };
    return Utility;
}());
exports.Utility = Utility;
