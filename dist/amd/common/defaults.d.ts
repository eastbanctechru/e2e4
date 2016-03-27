export declare class Defaults {
    static sortAttribute: {
        ascClassName: string;
        descClassName: string;
        sortableClassName: string;
    };
    static listComponent: {
        contextAreaSelector: string;
        loadedCountParameterName: string;
        persistSortings: boolean;
        sortParameterName: string;
        totalCountParameterName: string;
    };
    static bufferedListComponent: {
        defaultTakeRowCount: number;
        maxRowCount: number;
        minRowCount: number;
        skipRowCountParameterName: string;
        takeRowCountParameterName: string;
    };
    static pagedListComponent: {
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
