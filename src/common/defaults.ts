export class Defaults {
    static sortAttribute =
    {
        ascClassName: 'arrow-up',
        descClassName: 'arrow-down',
        sortableClassName: 'sortable'
    };
    static listSettings =
    {
        contextAreaSelector: '#contextMenu',
        loadedCountParameterName: 'loadedCount',
        persistSortings: true,
        sortParameterName: 'sort',
        totalCountParameterName: 'totalCount'
    };
    static bufferedListComponent =
    {
        defaultTakeRowCount: 20,
        maxRowCount: 200,
        minRowCount: 0,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    static pagedListSettings =
    {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        maxPageSize: 200,
        minPageSize: 0,
        pageNumberParameterName: 'pageNumber',
        pageSizeParameterName: 'pageSize',
        persistPageSize: true
    };
    static eventNames = {
        selectableItemClicked: 'selectable-item-clicked'
    };
    static uiSettings = {
        elementVisibilityInterval: 500,
        progressDelayInterval: 500
    };
}
