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
        defaultTakeRowCount: 20,
        maxRowCount: 200,
        minRowCount: 0,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    Defaults.pagedListSettings = {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        maxPageSize: 200,
        minPageSize: 0,
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
