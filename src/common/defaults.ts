export class Defaults {
    public static listSettings: any =
    {
        loadedCountParameterName: 'loadedCount',
        persistSortings: true,
        sortParameterName: 'sort',
        totalCountParameterName: 'totalCount'
    };
    public static bufferedListSettings: any =
    {
        defaultRowCount: 20,
        maxRowCount: 200,
        minRowCount: 1,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take'
    };
    public static pagedListSettings: any =
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
    public static uiSettings: any = {
        elementVisibilityInterval: 500,
        progressDelayInterval: 500
    };
}
