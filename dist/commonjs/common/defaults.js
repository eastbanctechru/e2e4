"use strict";
var Defaults = (function () {
    function Defaults() {
    }
    Defaults.listSettings = {
        loadedCountParameterName: 'loadedCount',
        persistSortings: true,
        sortParameterName: 'sort',
        totalCountParameterName: 'totalCount'
    };
    Defaults.bufferedListSettings = {
        defaultRowCount: 20,
        maxRowCount: 200,
        minRowCount: 1,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    Defaults.pagedListSettings = {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        maxPageSize: 200,
        minPageSize: 1,
        pageNumberParameterName: 'pageNumber',
        pageSizeParameterName: 'pageSize',
        persistPageSize: true
    };
    Defaults.uiSettings = {
        elementVisibilityInterval: 500,
        progressDelayInterval: 500
    };
    return Defaults;
}());
exports.Defaults = Defaults;
