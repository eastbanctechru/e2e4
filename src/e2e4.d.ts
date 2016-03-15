declare module 'e2e4' {
    export abstract class BaseComponent {
        disposed: boolean;
        inited: boolean;
        title: string;
        state: ProgressState;
        busy: boolean;
        ready: boolean;
        init(...args: Object[]): void;
        dispose(): void;
    }

    export abstract class BufferedListComponent extends ListComponent {
        private bufferedLoadDataSuccessBinded;
        private takeRowCountInternal;
        skip: number;
        takeRowCount: number;
        constructor();
        dispose(): void;
        bufferedLoadDataSuccess(result: Object): Object;
        loadData(): Promise<Object>;
        onSortingsChanged(): void;
    }

    export class Defaults {
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

    export function filter(targetOrNameOrConfig?: string | IFilterConfig | any, key?: string, descriptor?: Object): any;

    export class FilterManager implements IFilterManager {
        static coerceTypes: {
            'true': boolean;
            'false': boolean;
            'null': any;
        };
        static filterPropertiesMap: Map<any, FilterProperty[]>;
        static registerFilter(targetType: Object, propertyConfig: FilterProperty): void;
        static includeIn(target: IComponentWithFilter): void;
        static coerceValue(value: any): Object;
        static buildFilterValue(target: Object, value: any, config: FilterProperty): Object;
        private defaultsApplied;
        private appliedFiltersMap;
        dispose(): void;
        resetFilters(): void;
        parseParams(params: Object): void;
        buildRequest(result?: Object): Object;
        buildPersistedState(result?: Object): Object;
        registerFilterTarget(target: Object): void;
        constructor(target: Object);
    }

    export class FilterProperty implements IFilterConfig {
        defaultValue: Object;
        propertyName: string;
        parameterName: string;
        ignoreOnAutoMap: boolean;
        emptyIsNull: boolean;
        persisted: boolean;
        coerce: boolean;
        valueSerializer: (value: Object) => Object;
        valueParser: (rawValue: Object, allValues?: Object) => Object;
        descriptor: Object;
        constructor(config: IFilterConfig);
        register(target: Object, descriptor?: Object): void;
    }

    export enum KeyCodes {
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Esc = 27,
        ArrowUp = 38,
        ArrowDown = 40,
        A = 65,
    }

    export abstract class ListComponent extends BaseComponent
        implements IListComponent, ISortableComponent, IRequestCanceller, IComponentWithState, IComponentWithSelection, IComponentWithFilter {
        private listLoadDataSuccessCallback(result: Object): Object;
        private listLoadDataFailCallback(): void;
        private listLoadDataSuccessBinded;
        private listLoadDataFailBinded;
        private clearDataInternal(): void;
        constructor();
        init(queryParams?: Object): void;
        dispose(): void;
        sortings: SortParameter[];
        private defaultSortingsPrivate;
        defaultSortings: SortParameter[];
        setSort(fieldName: string, savePrevious: boolean): void;
        onSortingsChanged(): void;
        items: Object[];
        totalCount: number;
        loadedCount: number;
        toRequest(): any;
        getLocalState(): Object;
        loadData(): Promise<Object>;
        clearData(): void;
        reloadData(): void;
        addToCancellationSequence(promise: Promise<Object>): void;
        cancelRequests(): void;
        useModelState: boolean;
        stateManager: IStateManager;
        saveRequestState(): void;
        saveLocalState(): void;
        private getRestoredState(params: Object): Object;
        selectionManager: SelectionManager;
        filterManager: FilterManager;
        abstract getDataReadPromise(): Promise<Object>;
    }

    export enum MouseButtons {
        None = 0,
        Left = 1,
        Middle = 2,
        Right = 3,
    }

    export abstract class PagedListComponent extends ListComponent {
        private pageSizeInternal;
        private pageNumberInternal;
        private pagedLoadDataSuccessBinded;
        private pagedLoadDataSuccessCallback(result: Object): Object;
        displayFrom: number;
        displayTo: number;
        constructor();
        dispose(): void;
        pageCount: number;
        pageNumber: number;
        pageSize: number;
        loadData(): Promise<Object>;
        goToFirstPage(): void;
        goToPreviousPage(): void;
        goToNextPage(): void;
        goToLastPage(): void;
    }

    export enum ProgressState {
        Initial = 0,
        Done = 1,
        Progress = 2,
        Fail = 3,
        Cancelled = 4,
    }

    export class SelectionManager implements ISelectionManager {
        static includeIn(target: IComponentWithSelection, itemsPropertyName: string): void;
        constructor(target: Object, itemsPropertyName: string);
        private selectionsList;
        private target;
        private itemsPropertyName;
        lastProcessedIndex: number;
        itemsSource: Array<ISelectable>;
        private deselectItem(selectionTuple: ISelectionTuple, recursive?: boolean): void;
        private selectItem(selectionTuple: ISelectionTuple, savePrevious?: boolean, recursive?: boolean): void;
        private canRecurse(recursive: boolean, /* tslint:disable:no-any */item: any/* tslint:enable:no-any */): boolean;
        private getSelectionTuple(index: number): ISelectionTuple;
        deselectAll(recursive?: boolean): void;
        selectAll(recursive?: boolean): void;
        selectRange(fromIndex: number, toIndex: number, recursive?: boolean): void;
        hasSelections(): boolean;
        isIndexSelected(index: number): boolean;
        getMinSelectedIndex(): number;
        getMaxSelectedIndex(): number;
        selectFirst(): void;
        selectLast(): void;
        selectIndex(index: number, savePrevious?: boolean, recursive?: boolean): void;
        deselectIndex(index: number, recursive?: boolean): void;
        toggleSelection(index: number, savePrevious?: boolean, recursive?: boolean): void;
        getSelections(recursive?: boolean): Array<Object>;
    }

    export enum SortDirection {
        Asc = 0,
        Desc = 1,
    }

    export class SortParameter {
        constructor(fieldName: string, direction?: SortDirection);
        direction: SortDirection;
        fieldName: string;
        toggleDirection(): void;
        toRequest(): Object;
    }

    export class StatusModel {
        sid: number;
        status: ProgressState;
        title: string;
        constructor(status: ProgressState, title: string);
        className: string;
    }

    export class StatusTracker {
        static status: ProgressState;
        static modalDisplayed: boolean;
        static statusList: StatusModel[];
        static statusDisplayed: boolean;
        static isActive: boolean;
        static trackStatus(title: string): number;
        static resolveStatus(sid: number, status: ProgressState): void;
    }

    export class Utility {
        static disposeAll(collection: any[], async?: boolean): void;
    }

    export interface IComponentWithFilter {
        filterManager: IFilterManager;
    }

    export interface IComponentWithSelection {
        selectionManager: ISelectionManager;
    }

    export interface IComponentWithState {
        stateManager: IStateManager;
        useModelState: boolean;
        saveRequestState(): void;
        saveLocalState(): void;
    }

    export interface IFilterConfig {
        defaultValue?: Object;
        propertyName?: string;
        parameterName?: string;
        ignoreOnAutoMap?: boolean;
        emptyIsNull?: boolean;
        coerce?: boolean;
        persisted?: boolean;
        valueSerializer?: (value: Object) => Object;
        valueParser?: (rawValue: Object, allValues?: Object) => Object;
    }

    export interface IFilterManager {
        dispose(): void;
        resetFilters(): void;
        parseParams(params: Object): void;
        buildRequest(result?: Object): Object;
        buildPersistedState(result?: Object): Object;
    }

    export interface IListComponent {
        items: Object[];
        totalCount: number;
        loadedCount: number;
        clearData(): void;
        reloadData(): void;
        toRequest(): any;
    }

    export interface IRequestCanceller {
        addToCancellationSequence(promise: Promise<Object>): void;
        cancelRequests(): void;
    }

    export interface ISelectable {
        selected: boolean;
    }

    export interface ISelectionManager {
        lastProcessedIndex: number;
        deselectAll(recursive: boolean): void;
        selectAll(recursive: boolean): void;
        selectRange(fromIndex: number, toIndex: number, recursive: boolean): void;
        hasSelections(): boolean;
        isIndexSelected(index: number): boolean;
        getMinSelectedIndex(): number;
        getMaxSelectedIndex(): number;
        selectFirst(): void;
        selectLast(): void;
        selectIndex(index: number, savePrevious: boolean, recursive: boolean): void;
        deselectIndex(index: number, recursive: boolean): void;
        toggleSelection(index: number, savePrevious: boolean, recursive: boolean): void;
        getSelections(recursive: boolean): Array<Object>;
    }

    export interface ISelectionTuple {
        index: number;
        item: ISelectable;
    }

    export interface ISortableComponent {
        sortings: Array<SortParameter>;
        defaultSortings: SortParameter[];
        setSort(fieldName: string, savePrevious: boolean): void;
        onSortingsChanged(): void;
    }

    export interface IStateManager {
        flushRequestState(state: Object): void;
        persistLocalState(state: Object): void;
        mergeStates(params: Object): Object;
    }
}
