System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Defaults;
    return {
        setters:[],
        execute: function() {
            Defaults = (function () {
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
                Defaults.eventNames = {
                    selectableItemClicked: 'selectable-item-clicked'
                };
                Defaults.uiSettings = {
                    elementVisibilityInterval: 500,
                    progressDelayInterval: 500
                };
                return Defaults;
            }());
            exports_1("Defaults", Defaults);
        }
    }
});
