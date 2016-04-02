"use strict";
var Defaults = (function () {
    function Defaults() {
    }
    Defaults.sortAttribute = {
        ascClassName: 'arrow-up',
        descClassName: 'arrow-down',
        sortableClassName: 'sortable'
    };
    Defaults.listSettings = {
        contextAreaSelector: '#contextMenu',
        loadedCountParameterName: 'loadedCount',
        persistSortings: true,
        sortParameterName: 'sort',
        totalCountParameterName: 'totalCount'
    };
    Defaults.bufferedListComponent = {
        defaultTakeRowCount: 20,
        maxRowCount: 200,
        minRowCount: 0,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    Defaults.pagedListComponent = {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        maxPageSize: 200,
        minPageSize: 0,
        pageNumberParameterName: 'pageNumber',
        pageSizeParameterName: 'pageSize',
        persistPageSize: true
    };
    Defaults.eventNames = {
        selectableItemClicked: 'selectable-item-clicked'
    };
    Defaults.uiSettings = {
        elementVisibilityInterval: 500,
        progressDelayInterval: 500
    };
    return Defaults;
}());
exports.Defaults = Defaults;
