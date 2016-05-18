System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ParseHelper;
    return {
        setters:[],
        execute: function() {
            ParseHelper = (function () {
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
            exports_1("ParseHelper", ParseHelper);
        }
    }
});
