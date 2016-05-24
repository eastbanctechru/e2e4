export class Defaults {
    static listSettings =
    {
        loadedCountParameterName: 'loadedCount',
        persistSortings: true,
        sortParameterName: 'sort',
        totalCountParameterName: 'totalCount'
    };
    static bufferedListSettings =
    {
        defaultRowCount: 20,
        maxRowCount: 200,
        minRowCount: 1,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    static pagedListSettings =
    {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        maxPageSize: 200,
        minPageSize: 1,
        pageNumberParameterName: 'pageNumber',
        pageSizeParameterName: 'pageSize',
        persistPageSize: true
    };
    static uiSettings = {
        elementVisibilityInterval: 500,
        progressDelayInterval: 500
    };
}
