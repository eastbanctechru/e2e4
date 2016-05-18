System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utility;
    return {
        setters:[],
        execute: function() {
            Utility = (function () {
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
                return Utility;
            }());
            exports_1("Utility", Utility);
        }
    }
});
