export declare class Defaults {
    static sortAttribute: {
        ascClassName: string;
        descClassName: string;
        sortableClassName: string;
    };
    static listSettings: {
        contextAreaSelector: string;
        loadedCountParameterName: string;
        persistSortings: boolean;
        sortParameterName: string;
        totalCountParameterName: string;
    };
    static bufferedListSettings: {
        defaultTakeRowCount: number;
        maxRowCount: number;
        minRowCount: number;
        skipRowCountParameterName: string;
        takeRowCountParameterName: string;
    };
    static pagedListSettings: {
        defaultPageSize: number;
        displayFromParameterName: string;
        displayToParameterName: string;
        maxPageSize: number;
        minPageSize: number;
        pageNumberParameterName: string;
        pageSizeParameterName: string;
        persistPageSize: boolean;
    };
    static eventNames: {
        selectableItemClicked: string;
    };
    static uiSettings: {
        elementVisibilityInterval: number;
        progressDelayInterval: number;
    };
}
