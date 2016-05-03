System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PagedPager;
    return {
        setters:[],
        execute: function() {
            PagedPager = (function () {
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
            exports_1("PagedPager", PagedPager);
        }
    }
});
