import * as _ from 'lodash';

export class Defaults {
}
Defaults.sortAttribute = {
    ascClassName: 'arrow-up',
    descClassName: 'arrow-down',
    sortableClassName: 'sortable'
};
Defaults.listComponent = {
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

export var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
    KeyCodes[KeyCodes["Shift"] = 16] = "Shift";
    KeyCodes[KeyCodes["Ctrl"] = 17] = "Ctrl";
    KeyCodes[KeyCodes["Alt"] = 18] = "Alt";
    KeyCodes[KeyCodes["Esc"] = 27] = "Esc";
    KeyCodes[KeyCodes["ArrowUp"] = 38] = "ArrowUp";
    KeyCodes[KeyCodes["ArrowDown"] = 40] = "ArrowDown";
    KeyCodes[KeyCodes["A"] = 65] = "A";
})(KeyCodes || (KeyCodes = {}));

export var MouseButtons;
(function (MouseButtons) {
    MouseButtons[MouseButtons["None"] = 0] = "None";
    MouseButtons[MouseButtons["Left"] = 1] = "Left";
    MouseButtons[MouseButtons["Middle"] = 2] = "Middle";
    MouseButtons[MouseButtons["Right"] = 3] = "Right";
})(MouseButtons || (MouseButtons = {}));

export var ProgressState;
(function (ProgressState) {
    ProgressState[ProgressState["Initial"] = 0] = "Initial";
    ProgressState[ProgressState["Done"] = 1] = "Done";
    ProgressState[ProgressState["Progress"] = 2] = "Progress";
    ProgressState[ProgressState["Fail"] = 3] = "Fail";
    ProgressState[ProgressState["Cancelled"] = 4] = "Cancelled";
})(ProgressState || (ProgressState = {}));

export var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Asc"] = 0] = "Asc";
    SortDirection[SortDirection["Desc"] = 1] = "Desc";
})(SortDirection || (SortDirection = {}));

export class SortParameter {
    constructor(fieldName, direction = SortDirection.Asc) {
        this.fieldName = null;
        this.fieldName = fieldName;
        this.direction = direction === undefined ? SortDirection.Asc : direction;
    }
    toggleDirection() {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }
    toRequest() {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}

export class StatusModel {
    constructor(status, title) {
        this.status = status;
        this.title = title;
    }
    get className() {
        switch (this.status) {
            case ProgressState.Done:
                return 'status status-resolved';
            case ProgressState.Progress:
                return 'status status-progress';
            case ProgressState.Fail:
                return 'status status-fail';
            default:
                return '';
        }
    }
}

export class Utility {
    /* tslint:disable:no-any */
    static disposeAll(collection, async = true) {
        /* tslint:enable:no-any */
        if (!collection) {
            return;
        }
        async = async === undefined ? true : async;
        let items = collection.splice(0, collection.length);
        if (async) {
            setTimeout(() => {
                items.forEach(item => {
                    if (item.dispose) {
                        item.dispose();
                    }
                });
                items = null;
            }, 0);
        }
        else {
            items.forEach(item => {
                if (item.dispose) {
                    item.dispose();
                }
            });
        }
    }
}

export class FilterModel {
    constructor(target) {
        this.defaultsApplied = false;
        this.targetConfig = new Array();
        this.target = target;
        FilterModel.filterPropertiesMap.forEach(((typeConfig, type) => {
            if (target instanceof type) {
                this.targetConfig = this.targetConfig.concat(_.cloneDeep(typeConfig));
            }
        }).bind(this));
    }
    static registerFilter(targetType, propertyConfig) {
        const typeConfigs = FilterModel.filterPropertiesMap.has(targetType) ? FilterModel.filterPropertiesMap.get(targetType) : new Array();
        typeConfigs.push(propertyConfig);
        FilterModel.filterPropertiesMap.set(targetType, typeConfigs);
    }
    static includeIn(target) {
        target.filterModel = new FilterModel(target);
    }
    static coerceValue(/* tslint:disable:no-any */ value /* tslint:enable:no-any */) {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = FilterModel.coerceValue(value[index]);
                }
            }
        }
        if (value && !isNaN(value)) {
            value = +value;
        }
        else if (value === 'undefined') {
            value = undefined;
        }
        else if (FilterModel.coerceTypes[value] !== undefined) {
            value = FilterModel.coerceTypes[value];
        }
        return value;
    }
    buildValue(/* tslint:disable:no-any */ value /* tslint:enable:no-any */, config) {
        if (config && config.valueSerializer) {
            return config.valueSerializer.call(this.target, value);
        }
        value = config && config.emptyIsNull ? value || null : value;
        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = this.buildValue(value[i], null);
            }
            return temp;
        }
        return value;
    }
    dispose() {
        this.targetConfig.length = 0;
        delete this.target;
        delete this.targetConfig;
    }
    resetFilters() {
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            const defaultValue = (typeof config.defaultValue === 'function') ? config.defaultValue.call(this.target) : config.defaultValue;
            const clonedObject = _.cloneDeep({ defaultValue: defaultValue });
            this.target[config.propertyName] = clonedObject.defaultValue;
        }
    }
    parseParams(params) {
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            if (false === this.defaultsApplied && config.defaultValue === undefined) {
                config.defaultValue = _.cloneDeep({ defaultValue: this.target[config.propertyName] }).defaultValue;
            }
            if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                proposedVal = config.coerce ? FilterModel.coerceValue(proposedVal) : proposedVal;
                this.target[config.propertyName] = config.valueParser ? config.valueParser.call(this.target, proposedVal, params) : proposedVal;
            }
        }
        this.defaultsApplied = true;
    }
    buildRequest(result) {
        result = result || {};
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            const proposedVal = this.target[config.propertyName];
            result[config.parameterName] = this.buildValue(proposedVal, config);
        }
        return result;
    }
    buildPersistedState(result) {
        result = result || {};
        for (let i = 0; i < this.targetConfig.length; i++) {
            const config = this.targetConfig[i];
            if (!config.persisted) {
                continue;
            }
            let proposedVal = this.target[config.propertyName];
            if (proposedVal && proposedVal.toRequest) {
                proposedVal = proposedVal.toRequest();
            }
            result[config.parameterName] = config.valueSerializer
                ? config.valueSerializer.call(this.target, proposedVal) : (config.emptyIsNull ? proposedVal || null : proposedVal);
        }
        return result;
    }
}
FilterModel.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
FilterModel.filterPropertiesMap = new Map();

export class FilterProperty {
    constructor(config) {
        Object.assign(this, config);
    }
    register(target, descriptor) {
        this.descriptor = descriptor || undefined;
        FilterModel.registerFilter(target, this);
    }
}

/* tslint:disable:no-any */
export function filter(targetOrNameOrConfig, key, descriptor) {
    /* tslint:enable:no-any */
    const configurableDecorate = (target, key2, descriptor2) => {
        const actualTarget = key2 ? target.constructor : target;
        const config = {
            coerce: true,
            defaultValue: undefined,
            descriptor: undefined,
            emptyIsNull: false,
            ignoreOnAutoMap: false,
            parameterName: key2,
            persisted: false,
            propertyName: key2,
            valueParser: undefined,
            valueSerializer: undefined
        };
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        }
        else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new FilterProperty(config).register(actualTarget, descriptor2);
    };
    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key, descriptor);
    }
    return configurableDecorate;
}

export class BaseComponent {
    constructor() {
        this.disposed = false;
        this.inited = false;
        this.title = null;
        this.state = null;
    }
    get busy() {
        return this.state === ProgressState.Progress;
    }
    get ready() {
        return this.state !== ProgressState.Progress;
    }
    init(...args) {
        this.inited = true;
    }
    dispose() {
        this.disposed = true;
    }
}
;

export class SelectionModel {
    constructor(target, itemsPropertyName) {
        this.selectionsList = new Array();
        this.target = target;
        this.itemsPropertyName = itemsPropertyName;
    }
    static includeIn(target, itemsPropertyName) {
        target.selectionModel = new SelectionModel(target, itemsPropertyName);
    }
    get itemsSource() {
        return this.target[this.itemsPropertyName];
    }
    deselectItem(selectionTuple, recursive = false) {
        const index = this.selectionsList.findIndex(selectedItem => (selectedItem.item === selectionTuple.item));
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        selectionTuple.item.selected = false;
        if (this.canRecurse(recursive, selectionTuple.item)) {
            /* tslint:disable:no-any */
            selectionTuple.item.selectionModel.deselectAll(true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    }
    selectItem(selectionTuple, savePrevious = false, recursive = false) {
        if (savePrevious) {
            const index = this.selectionsList.findIndex(selectedItem => (selectedItem.item === selectionTuple.item));
            if (index !== -1) {
                selectionTuple.item.selected = false;
                this.selectionsList.splice(index, 1);
            }
            this.selectionsList.push(selectionTuple);
            selectionTuple.item.selected = true;
        }
        else {
            const list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach(selectedItem => { selectedItem.item.selected = false; });
            this.selectionsList.push(selectionTuple);
            selectionTuple.item.selected = true;
        }
        if (this.canRecurse(recursive, selectionTuple.item)) {
            /* tslint:disable:no-any */
            selectionTuple.item.selectionModel.selectAll(true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    }
    canRecurse(recursive, /* tslint:disable:no-any */ item /* tslint:enable:no-any */) {
        if (recursive && item.selectionModel && item.selectionModel instanceof SelectionModel) {
            return true;
        }
        return false;
    }
    getSelectionTuple(index) {
        return {
            index: index,
            item: this.itemsSource[index]
        };
    }
    deselectAll(recursive = false) {
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (let i = 0; i < list.length; i++) {
            const item = list[i].item;
            item.selected = false;
            if (this.canRecurse(recursive, item)) {
                /* tslint:disable:no-any */
                item.selectionModel.deselectAll(true);
            }
        }
        this.lastProcessedIndex = null;
    }
    selectAll(recursive = false) {
        this.selectRange(0, this.itemsSource.length - 1, recursive);
    }
    selectRange(fromIndex, toIndex, recursive = false) {
        if (toIndex < 0 || this.itemsSource.length <= toIndex || fromIndex < 0 || this.itemsSource.length <= fromIndex) {
            return;
        }
        const startIndex = Math.min(fromIndex, toIndex);
        const endIndex = Math.max(fromIndex, toIndex);
        this.deselectAll();
        const tempData = new Array();
        for (let i = startIndex; i <= endIndex; i++) {
            const tuple = this.getSelectionTuple(i);
            tempData.push(tuple);
            tuple.item.selected = true;
            if (this.canRecurse(recursive, tuple.item)) {
                /* tslint:disable:no-any */
                tuple.item.selectionModel.selectAll(true);
            }
        }
        this.selectionsList.splice(0, this.selectionsList.length, ...tempData);
        this.lastProcessedIndex = endIndex;
    }
    hasSelections() {
        return this.selectionsList.length !== 0;
    }
    isIndexSelected(index) {
        if (index >= 0 && this.itemsSource.length > index) {
            return this.itemsSource[index].selected;
        }
        return false;
    }
    getMinSelectedIndex() {
        let minIndex = null;
        this.selectionsList.forEach(item => {
            minIndex = (minIndex === null || item.index < minIndex) ? item.index : minIndex;
        });
        return minIndex;
    }
    getMaxSelectedIndex() {
        let maxIndex = null;
        this.selectionsList.forEach(item => {
            maxIndex = (maxIndex === null || item.index > maxIndex) ? item.index : maxIndex;
        });
        return maxIndex;
    }
    selectFirst() {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    selectLast() {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
        }
    }
    selectIndex(index, savePrevious = false, recursive = false) {
        if (index >= 0 && this.itemsSource.length > index) {
            this.selectItem(this.getSelectionTuple(index), savePrevious, recursive);
        }
    }
    deselectIndex(index, recursive = false) {
        if (index >= 0 && this.itemsSource.length > index) {
            this.deselectItem(this.getSelectionTuple(index), recursive);
        }
    }
    toggleSelection(index, savePrevious = false, recursive = false) {
        if (index < 0 || this.itemsSource.length <= index) {
            return;
        }
        const tuple = this.getSelectionTuple(index);
        if (this.isIndexSelected(index)) {
            if (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious)) {
                this.deselectItem(tuple, recursive);
            }
            else {
                this.selectItem(tuple, savePrevious, recursive);
            }
            return;
        }
        this.selectItem(tuple, savePrevious, recursive);
    }
    getSelections(recursive = false) {
        if (recursive) {
            let result = [];
            for (let i = 0; i < this.selectionsList.length; i++) {
                const item = this.selectionsList[i].item;
                result.push(item);
                if (this.canRecurse(recursive, item)) {
                    /* tslint:disable:no-any */
                    result = result.concat(item.selectionModel.getSelections(true));
                }
            }
        }
        return this.selectionsList.map((selectable) => selectable.item);
    }
}

export class StatusTracker {
    static get statusDisplayed() {
        return StatusTracker.status !== ProgressState.Done;
    }
    static get isActive() {
        return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
    }
    static trackStatus(title) {
        const sid = setTimeout(() => {
            StatusTracker.status = ProgressState.Progress;
            if (title) {
                const statusModel = new StatusModel(ProgressState.Progress, title);
                statusModel.sid = sid;
                StatusTracker.statusList.push(statusModel);
            }
        }, Defaults.uiSettings.progressDelayInterval);
        return sid;
    }
    static resolveStatus(sid, status) {
        if (sid) {
            clearTimeout(sid);
            const current = StatusTracker.statusList.find(item => {
                return item.sid === sid;
            });
            if (current) {
                current.status = status;
            }
        }
        setTimeout(() => {
            const undone = StatusTracker.statusList.find(item => {
                return item.status === ProgressState.Progress;
            });
            if (undone === null) {
                StatusTracker.statusList.length = 0;
                StatusTracker.status = ProgressState.Done;
            }
            else {
                _.remove(StatusTracker.statusList, item => {
                    return item.sid === sid;
                });
            }
        }, Defaults.uiSettings.elementVisibilityInterval);
    }
    ;
}
StatusTracker.status = ProgressState.Done;
StatusTracker.modalDisplayed = false;
StatusTracker.statusList = new Array();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
export class ListComponent extends BaseComponent {
    constructor() {
        super();
        ///IComponent overrides
        ///ISortableComponent
        this.sortings = new Array();
        this.defaultSortingsPrivate = null;
        ///ISortableComponent
        ///IListComponent
        this.items = [];
        this.totalCount = 0;
        this.loadedCount = 0;
        ///IRequestCanceller
        ///IComponentWithState
        this.useModelState = true;
        SelectionModel.includeIn(this, 'items');
        FilterModel.includeIn(this);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    listLoadDataSuccessCallback(result) {
        this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
        this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;
        this.state = ProgressState.Done;
        return result;
    }
    listLoadDataFailCallback() {
        this.state = ProgressState.Fail;
    }
    clearDataInternal() {
        this.totalCount = 0;
        this.selectionModel.deselectAll();
        Utility.disposeAll(this.items);
    }
    ///IComponent overrides
    init(queryParams) {
        super.init();
        const restoredState = this.getRestoredState(queryParams);
        this.filterModel.parseParams(restoredState);
    }
    dispose() {
        super.dispose();
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        delete this.defaultSortings;
        this.sortings.length = 0;
        this.clearDataInternal();
        this.filterModel.dispose();
    }
    get defaultSortings() {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value) {
        this.defaultSortingsPrivate = value;
        if (this.sortings === null || this.sortings.length === 0) {
            this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
        }
    }
    setSort(fieldName, savePrevious) {
        let newSort = new SortParameter(fieldName);
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
                newSort.toggleDirection();
                break;
            }
        }
        if (savePrevious) {
            this.sortings.push(newSort);
        }
        else {
            this.sortings.length = 0;
            this.sortings.push(newSort);
        }
    }
    onSortingsChanged() {
        if (this.ready) {
            this.clearDataInternal();
            this.loadData();
        }
    }
    toRequest() {
        return this.filterModel.buildRequest(null);
    }
    getLocalState() {
        return this.filterModel.buildPersistedState(null);
    }
    loadData() {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise();
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        if (this.useModelState) {
            this.saveRequestState();
            this.saveLocalState();
        }
        return promise;
    }
    clearData() {
        this.clearDataInternal();
    }
    reloadData() {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    ///IListComponent
    ///IRequestCanceller
    addToCancellationSequence(promise) { }
    ;
    cancelRequests() { }
    ;
    saveRequestState() {
        this.stateManager.flushRequestState(this.toRequest());
    }
    ;
    saveLocalState() {
        this.stateManager.persistLocalState(this.getLocalState());
    }
    ;
    getRestoredState(params) {
        if (this.useModelState === false) {
            return params;
        }
        return this.stateManager.mergeStates(params);
    }
}
__decorate([
    filter({
        defaultValue: function () { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
        parameterName: Defaults.listComponent.sortParameterName,
        parseFormatter: (proposedValue) => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listComponent.persistSortings
    }), 
    __metadata('design:type', Object)
], ListComponent.prototype, "sortings", void 0);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
export class BufferedListComponent extends ListComponent {
    constructor() {
        super();
        this.takeRowCountInternal = Defaults.bufferedListComponent.defaultTakeRowCount;
        this.skip = 0;
        this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
    }
    get takeRowCount() {
        return this.takeRowCountInternal;
    }
    set takeRowCount(value) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListComponent.defaultTakeRowCount;
        if (rowCount < Defaults.bufferedListComponent.minRowCount) {
            rowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        }
        if (rowCount > Defaults.bufferedListComponent.maxRowCount) {
            rowCount = Defaults.bufferedListComponent.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }
    dispose() {
        super.dispose();
        delete this.bufferedLoadDataSuccessBinded;
    }
    bufferedLoadDataSuccess(result) {
        this.loadedCount = this.skip + result[Defaults.listComponent.loadedCountParameterName];
        this.skip += result[Defaults.listComponent.loadedCountParameterName];
        this.loadedCount = this.skip;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listComponent.totalCountParameterName] || 0) === 0) {
            this.clearData();
        }
        return result;
    }
    loadData() {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        promise.then(this.bufferedLoadDataSuccessBinded);
        return promise;
    }
    onSortingsChanged() {
        this.takeRowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        this.skip = 0;
        super.onSortingsChanged();
    }
}
__decorate([
    filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListComponent.skipRowCountParameterName,
        parseFormatter: () => { return 0; }
    }), 
    __metadata('design:type', Object)
], BufferedListComponent.prototype, "skip", void 0);
__decorate([
    filter({
        defaultValue: Defaults.bufferedListComponent.defaultTakeRowCount,
        parameterName: Defaults.bufferedListComponent.takeRowCountParameterName,
        parseFormatter: (proposedParam, allParams) => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListComponent.defaultTakeRowCount;
        }
    }), 
    __metadata('design:type', Number)
], BufferedListComponent.prototype, "takeRowCount", null);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
export class PagedListComponent extends ListComponent {
    constructor() {
        super();
        this.pageSizeInternal = Defaults.pagedListComponent.defaultPageSize;
        this.pageNumberInternal = 1;
        this.displayFrom = 1;
        this.displayTo = 1;
        this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
    }
    pagedLoadDataSuccessCallback(result) {
        this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
        this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;
        this.displayFrom = result[Defaults.pagedListComponent.displayFromParameterName] || 1;
        this.displayTo = result[Defaults.pagedListComponent.displayToParameterName] || 1;
        return result;
    }
    dispose() {
        super.dispose();
        delete this.pagedLoadDataSuccessBinded;
    }
    get pageCount() {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    get pageNumber() {
        return this.pageNumberInternal;
    }
    set pageNumber(value) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
        if (pageNumber > this.pageCount) {
            pageNumber = this.pageCount;
        }
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        this.pageNumberInternal = pageNumber;
    }
    get pageSize() {
        return this.pageSizeInternal;
    }
    set pageSize(value) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.pagedListComponent.defaultPageSize;
        if (pageSize > Defaults.pagedListComponent.maxPageSize) {
            pageSize = Defaults.pagedListComponent.maxPageSize;
        }
        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }
            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
                if (pageSize > Defaults.pagedListComponent.maxPageSize) {
                    pageSize = Defaults.pagedListComponent.maxPageSize;
                }
            }
        }
        if (pageSize < Defaults.pagedListComponent.minPageSize || pageSize === 0) {
            pageSize = Defaults.pagedListComponent.defaultPageSize;
        }
        if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
            pageSize = this.pageSizeInternal;
        }
        this.pageSizeInternal = pageSize;
    }
    loadData() {
        this.selectionModel.deselectAll();
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        Utility.disposeAll(this.items);
        promise.then(this.pagedLoadDataSuccessBinded);
        return promise;
    }
    goToFirstPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = 1;
            this.loadData();
        }
    }
    goToPreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            this.loadData();
        }
    }
    goToNextPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber += 1;
            this.loadData();
        }
    }
    goToLastPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageCount;
            this.loadData();
        }
    }
}
__decorate([
    filter({ defaultValue: 1, parameterName: Defaults.pagedListComponent.pageNumberParameterName }), 
    __metadata('design:type', Number)
], PagedListComponent.prototype, "pageNumber", null);
__decorate([
    filter({
        defaultValue: Defaults.pagedListComponent.defaultPageSize,
        parameterName: Defaults.pagedListComponent.pageSizeParameterName,
        persisted: Defaults.pagedListComponent.persistPageSize
    }), 
    __metadata('design:type', Number)
], PagedListComponent.prototype, "pageSize", null);
