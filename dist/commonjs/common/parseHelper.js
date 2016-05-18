"use strict";
var ParseHelper = (function () {
    function ParseHelper() {
    }
    ParseHelper.coerceValue = function (value) {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (var index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = ParseHelper.coerceValue(value[index]);
                }
            }
        }
        else if (value && !isNaN(value)) {
            value = +value;
        }
        else if (value === 'undefined') {
            value = undefined;
        }
        else if (ParseHelper.coerceTypes[value] !== undefined) {
            value = ParseHelper.coerceTypes[value];
        }
        return value;
    };
    ParseHelper.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    return ParseHelper;
}());
exports.ParseHelper = ParseHelper;
