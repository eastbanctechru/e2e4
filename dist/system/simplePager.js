System.register(['./common/defaults'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaults_1;
    var SimplePager;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            }],
        execute: function() {
            SimplePager = (function () {
                function SimplePager() {
                    this.totalCount = 0;
                    this.loadedCount = 0;
                }
                SimplePager.prototype.processResponse = function (result) {
                    this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName] || 0;
                    this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
                };
                SimplePager.prototype.reset = function () {
                    this.totalCount = 0;
                };
                return SimplePager;
            }());
            exports_1("SimplePager", SimplePager);
        }
    }
});
