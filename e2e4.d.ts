declare module "baseComponent" {
    import { ProgressState } from "ProgressState";
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
}
declare module "bufferedListComponent" {
    import { ListComponent } from "listComponent";
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
}
declare module "Defaults" {
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
}
declare module "filterDecorator" {
    import { IFilterConfig } from "contracts/IFilterConfig";
    export function filter(targetOrNameOrConfig?: string | IFilterConfig | any, key?: string, descriptor?: Object): any;
}
declare module "filterModel" {
    import { FilterProperty } from "filterProperty";
    import { IFilterModel } from "contracts/IFIlterModel";
    import { IComponentWithFilter } from "contracts/IComponentWithFilter";
    export class FilterModel implements IFilterModel {
        static coerceTypes: {
            'true': boolean;
            'false': boolean;
            'null': any;
        };
        static filterPropertiesMap: Map<Object, FilterProperty[]>;
        static registerFilter(targetType: Object, propertyConfig: FilterProperty): void;
        static includeIn(target: IComponentWithFilter): void;
        static coerceValue(value: any): Object;
        private target;
        private defaultsApplied;
        private targetConfig;
        private buildValue(value, config);
        dispose(): void;
        resetFilters(): void;
        parseParams(params: Object): void;
        buildRequest(result?: Object): Object;
        buildPersistedState(result?: Object): Object;
        constructor(target: Object);
    }
}
declare module "filterProperty" {
    import { IFilterConfig } from "contracts/IFilterConfig";
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
}
declare module "KeyCodes" {
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
}
declare module "listComponent" {
    import { BaseComponent } from "baseComponent";
    import { SortParameter } from "SortParameter";
    import { IStateManager } from "contracts/IStateManager";
    import { IListComponent } from "contracts/IListComponent";
    import { ISortableComponent } from "contracts/ISortableComponent";
    import { IRequestCanceller } from "contracts/IRequestCanceller";
    import { IComponentWithState } from "contracts/IComponentWithState";
    import { IComponentWithSelection } from "contracts/IComponentWithSelection";
    import { IComponentWithFilter } from "contracts/IComponentWithFilter";
    import { SelectionModel } from "selectionModel";
    import { FilterModel } from "filterModel";
    export abstract class ListComponent extends BaseComponent implements IListComponent, ISortableComponent, IRequestCanceller, IComponentWithState, IComponentWithSelection, IComponentWithFilter {
        private listLoadDataSuccessCallback(result);
        private listLoadDataFailCallback();
        private listLoadDataSuccessBinded;
        private listLoadDataFailBinded;
        private clearDataInternal();
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
        stateManagerKey: string;
        saveRequestState(): void;
        saveLocalState(): void;
        private getRestoredState(params);
        selectionModel: SelectionModel;
        filterModel: FilterModel;
        abstract getDataReadPromise(): Promise<Object>;
    }
}
declare module "MouseButtons" {
    export enum MouseButtons {
        None = 0,
        Left = 1,
        Middle = 2,
        Right = 3,
    }
}
declare module "pagedListComponent" {
    import { ListComponent } from "listComponent";
    export abstract class PagedListComponent extends ListComponent {
        private pageSizeInternal;
        private pageNumberInternal;
        private pagedLoadDataSuccessBinded;
        private pagedLoadDataSuccessCallback(result);
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
}
declare module "ProgressState" {
    export enum ProgressState {
        Initial = 0,
        Done = 1,
        Progress = 2,
        Fail = 3,
        Cancelled = 4,
    }
}
declare module "selectionModel" {
    import { ISelectable } from "contracts/ISelectable";
    import { ISelectionModel } from "contracts/ISelectionModel";
    import { IComponentWithSelection } from "contracts/IComponentWithSelection";
    export class SelectionModel implements ISelectionModel {
        static includeIn(target: IComponentWithSelection, itemsPropertyName: string): void;
        constructor(target: Object, itemsPropertyName: string);
        private selectionsList;
        private target;
        private itemsPropertyName;
        lastProcessedIndex: number;
        itemsSource: Array<ISelectable>;
        private deselectItem(selectionTuple, recursive?);
        private selectItem(selectionTuple, savePrevious?, recursive?);
        private canRecurse(recursive, item);
        private getSelectionTuple(index);
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
}
declare module "SortDirection" {
    export enum SortDirection {
        Asc = 0,
        Desc = 1,
    }
}
declare module "SortParameter" {
    import { SortDirection } from "SortDirection";
    export class SortParameter {
        constructor(fieldName: string, direction?: SortDirection);
        direction: SortDirection;
        fieldName: string;
        toggleDirection(): void;
        toRequest(): Object;
    }
}
declare module "StatusModel" {
    import { ProgressState } from "ProgressState";
    export class StatusModel {
        sid: number;
        status: ProgressState;
        title: string;
        constructor(status: ProgressState, title: string);
        className: string;
    }
}
declare module "statusTracker" {
    import { StatusModel } from "StatusModel";
    import { ProgressState } from "ProgressState";
    export class StatusTracker {
        static status: ProgressState;
        static modalDisplayed: boolean;
        static statusList: StatusModel[];
        static statusDisplayed: boolean;
        static isActive: boolean;
        static trackStatus(title: string): number;
        static resolveStatus(sid: number, status: ProgressState): void;
    }
}
declare module "Utility" {
    export class Utility {
        static disposeAll(collection: any[], async?: boolean): void;
    }
}
declare module "contracts/IComponentWithFilter" {
    import { IFilterModel } from "contracts/IFIlterModel";
    export interface IComponentWithFilter {
        filterModel: IFilterModel;
    }
}
declare module "contracts/IComponentWithSelection" {
    import { ISelectionModel } from "contracts/ISelectionModel";
    export interface IComponentWithSelection {
        selectionModel: ISelectionModel;
    }
}
declare module "contracts/IComponentWithState" {
    import { IStateManager } from "contracts/IStateManager";
    export interface IComponentWithState {
        stateManager: IStateManager;
        useModelState: boolean;
        stateManagerKey: string;
        saveRequestState(): void;
        saveLocalState(): void;
    }
}
declare module "contracts/IFilterConfig" {
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
}
declare module "contracts/IFIlterModel" {
    export interface IFilterModel {
        dispose(): void;
        resetFilters(): void;
        parseParams(params: Object): void;
        buildRequest(result?: Object): Object;
        buildPersistedState(result?: Object): Object;
    }
}
declare module "contracts/IListComponent" {
    export interface IListComponent {
        items: Object[];
        totalCount: number;
        loadedCount: number;
        clearData(): void;
        reloadData(): void;
        toRequest(): any;
    }
}
declare module "contracts/IListRequest" {
    import { SortParameter } from "SortParameter";
    export interface IListRequest {
        sort: Array<SortParameter>;
    }
}
declare module "contracts/IRequestCanceller" {
    export interface IRequestCanceller {
        addToCancellationSequence(promise: Promise<Object>): void;
        cancelRequests(): void;
    }
}
declare module "contracts/ISelectable" {
    export interface ISelectable {
        selected: boolean;
    }
}
declare module "contracts/ISelectionModel" {
    export interface ISelectionModel {
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
}
declare module "contracts/ISelectionTuple" {
    import { ISelectable } from "contracts/ISelectable";
    export interface ISelectionTuple {
        index: number;
        item: ISelectable;
    }
}
declare module "contracts/ISortableComponent" {
    import { SortParameter } from "SortParameter";
    export interface ISortableComponent {
        sortings: Array<SortParameter>;
        defaultSortings: SortParameter[];
        setSort(fieldName: string, savePrevious: boolean): void;
        onSortingsChanged(): void;
    }
}
declare module "contracts/IStateManager" {
    export interface IStateManager {
        flushRequestState(state: Object): void;
        persistLocalState(state: Object): void;
        mergeStates(params: Object): Object;
    }
}
