System.register(['./sortDirection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var sortDirection_1;
    var SortParameter;
    return {
        setters:[
            function (sortDirection_1_1) {
                sortDirection_1 = sortDirection_1_1;
            }],
        execute: function() {
            SortParameter = (function () {
                function SortParameter(fieldName, direction) {
                    if (direction === void 0) { direction = sortDirection_1.SortDirection.Asc; }
                    this.fieldName = null;
                    this.fieldName = fieldName;
                    this.direction = direction === undefined ? sortDirection_1.SortDirection.Asc : direction;
                }
                SortParameter.prototype.toggleDirection = function () {
                    this.direction = this.direction === sortDirection_1.SortDirection.Asc ? sortDirection_1.SortDirection.Desc : sortDirection_1.SortDirection.Asc;
                };
                SortParameter.prototype.toRequest = function () {
                    return { direction: this.direction, fieldName: this.fieldName };
                };
                return SortParameter;
            }());
            exports_1("SortParameter", SortParameter);
        }
    }
});
