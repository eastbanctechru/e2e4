define(['exports', 'lodash'], function (exports, _lodash) {
    'use strict';

    exports.__esModule = true;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    exports.filter = filter;

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var Defaults = function Defaults() {
        _classCallCheck(this, Defaults);
    };

    exports.Defaults = Defaults;

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

    var KeyCodes;
    exports.KeyCodes = KeyCodes;
    (function (KeyCodes) {
        KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
        KeyCodes[KeyCodes["Shift"] = 16] = "Shift";
        KeyCodes[KeyCodes["Ctrl"] = 17] = "Ctrl";
        KeyCodes[KeyCodes["Alt"] = 18] = "Alt";
        KeyCodes[KeyCodes["Esc"] = 27] = "Esc";
        KeyCodes[KeyCodes["ArrowUp"] = 38] = "ArrowUp";
        KeyCodes[KeyCodes["ArrowDown"] = 40] = "ArrowDown";
        KeyCodes[KeyCodes["A"] = 65] = "A";
    })(KeyCodes || (exports.KeyCodes = KeyCodes = {}));

    var MouseButtons;
    exports.MouseButtons = MouseButtons;
    (function (MouseButtons) {
        MouseButtons[MouseButtons["None"] = 0] = "None";
        MouseButtons[MouseButtons["Left"] = 1] = "Left";
        MouseButtons[MouseButtons["Middle"] = 2] = "Middle";
        MouseButtons[MouseButtons["Right"] = 3] = "Right";
    })(MouseButtons || (exports.MouseButtons = MouseButtons = {}));

    var ProgressState;
    exports.ProgressState = ProgressState;
    (function (ProgressState) {
        ProgressState[ProgressState["Initial"] = 0] = "Initial";
        ProgressState[ProgressState["Done"] = 1] = "Done";
        ProgressState[ProgressState["Progress"] = 2] = "Progress";
        ProgressState[ProgressState["Fail"] = 3] = "Fail";
        ProgressState[ProgressState["Cancelled"] = 4] = "Cancelled";
    })(ProgressState || (exports.ProgressState = ProgressState = {}));

    var SortDirection;
    exports.SortDirection = SortDirection;
    (function (SortDirection) {
        SortDirection[SortDirection["Asc"] = 0] = "Asc";
        SortDirection[SortDirection["Desc"] = 1] = "Desc";
    })(SortDirection || (exports.SortDirection = SortDirection = {}));

    var SortParameter = (function () {
        function SortParameter(fieldName) {
            var direction = arguments.length <= 1 || arguments[1] === undefined ? SortDirection.Asc : arguments[1];

            _classCallCheck(this, SortParameter);

            this.fieldName = null;
            this.fieldName = fieldName;
            this.direction = direction === undefined ? SortDirection.Asc : direction;
        }

        SortParameter.prototype.toggleDirection = function toggleDirection() {
            this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
        };

        SortParameter.prototype.toRequest = function toRequest() {
            return { direction: this.direction, fieldName: this.fieldName };
        };

        return SortParameter;
    })();

    exports.SortParameter = SortParameter;

    var StatusModel = (function () {
        function StatusModel(status, title) {
            _classCallCheck(this, StatusModel);

            this.status = status;
            this.title = title;
        }

        _createClass(StatusModel, [{
            key: 'className',
            get: function get() {
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
        }]);

        return StatusModel;
    })();

    exports.StatusModel = StatusModel;

    var Utility = (function () {
        function Utility() {
            _classCallCheck(this, Utility);
        }

        Utility.disposeAll = function disposeAll(collection) {
            var async = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            if (!collection) {
                return;
            }
            async = async === undefined ? true : async;
            var items = collection.splice(0, collection.length);
            if (async) {
                setTimeout(function () {
                    items.forEach(function (item) {
                        if (item.dispose) {
                            item.dispose();
                        }
                    });
                    items = null;
                }, 0);
            } else {
                items.forEach(function (item) {
                    if (item.dispose) {
                        item.dispose();
                    }
                });
            }
        };

        return Utility;
    })();

    exports.Utility = Utility;

    var FilterManager = (function () {
        function FilterManager(target) {
            _classCallCheck(this, FilterManager);

            this.defaultsApplied = false;
            this.appliedFiltersMap = new Map();
            this.registerFilterTarget(target);
        }

        FilterManager.registerFilter = function registerFilter(targetType, propertyConfig) {
            var typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array();
            typeConfigs.push(propertyConfig);
            FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
        };

        FilterManager.includeIn = function includeIn(target) {
            target.filterManager = new FilterManager(target);
        };

        FilterManager.coerceValue = function coerceValue(value) {
            if (typeof value === 'object' || Array.isArray(value)) {
                for (var index in value) {
                    if (value.hasOwnProperty(index)) {
                        value[index] = FilterManager.coerceValue(value[index]);
                    }
                }
            }
            if (value && !isNaN(value)) {
                value = +value;
            } else if (value === 'undefined') {
                value = undefined;
            } else if (FilterManager.coerceTypes[value] !== undefined) {
                value = FilterManager.coerceTypes[value];
            }
            return value;
        };

        FilterManager.buildFilterValue = function buildFilterValue(target, value, config) {
            if (config && config.valueSerializer) {
                return config.valueSerializer.call(target, value);
            }
            value = config && config.emptyIsNull ? value || null : value;
            if (value && value.toRequest) {
                return value.toRequest();
            }
            if (Array.isArray(value)) {
                var temp = [];
                for (var i = 0; i < value.length; i++) {
                    temp[i] = FilterManager.buildFilterValue(target, value[i], null);
                }
                return temp;
            }
            return value;
        };

        FilterManager.prototype.dispose = function dispose() {
            this.appliedFiltersMap.clear();
            delete this.appliedFiltersMap;
        };

        FilterManager.prototype.resetFilters = function resetFilters() {
            this.appliedFiltersMap.forEach(function (targetConfig, target) {
                for (var i = 0; i < targetConfig.length; i++) {
                    var config = targetConfig[i];
                    var defaultValue = typeof config.defaultValue === 'function' ? config.defaultValue.call(target) : config.defaultValue;
                    var clonedObject = _lodash.cloneDeep({ defaultValue: defaultValue });
                    target[config.propertyName] = clonedObject.defaultValue;
                }
            });
        };

        FilterManager.prototype.parseParams = function parseParams(params) {
            var _this = this;

            this.appliedFiltersMap.forEach(function (targetConfig, target) {
                for (var i = 0; i < targetConfig.length; i++) {
                    var config = targetConfig[i];
                    if (false === _this.defaultsApplied && config.defaultValue === undefined) {
                        config.defaultValue = _lodash.cloneDeep({ defaultValue: target[config.propertyName] }).defaultValue;
                    }
                    if (params && params[config.parameterName] !== undefined && false === config.ignoreOnAutoMap) {
                        var proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                        proposedVal = config.coerce ? FilterManager.coerceValue(proposedVal) : proposedVal;
                        target[config.propertyName] = config.valueParser ? config.valueParser.call(target, proposedVal, params) : proposedVal;
                    }
                }
            });
            this.defaultsApplied = true;
        };

        FilterManager.prototype.buildRequest = function buildRequest(result) {
            result = result || {};
            this.appliedFiltersMap.forEach(function (targetConfig, target) {
                for (var i = 0; i < targetConfig.length; i++) {
                    var config = targetConfig[i];
                    var proposedVal = target[config.propertyName];
                    result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
                }
            });
            return result;
        };

        FilterManager.prototype.buildPersistedState = function buildPersistedState(result) {
            result = result || {};
            this.appliedFiltersMap.forEach(function (targetConfig, target) {
                for (var i = 0; i < targetConfig.length; i++) {
                    var config = targetConfig[i];
                    if (!config.persisted) {
                        continue;
                    }
                    var proposedVal = target[config.propertyName];
                    if (proposedVal && proposedVal.toRequest) {
                        proposedVal = proposedVal.toRequest();
                    }
                    result[config.parameterName] = config.valueSerializer ? config.valueSerializer.call(target, proposedVal) : config.emptyIsNull ? proposedVal || null : proposedVal;
                }
            });
            return result;
        };

        FilterManager.prototype.registerFilterTarget = function registerFilterTarget(target) {
            var targetConfig = this.appliedFiltersMap.has(target) ? this.appliedFiltersMap.get(target) : new Array();
            FilterManager.filterPropertiesMap.forEach(function (typeConfig, type) {
                if (target instanceof type) {
                    targetConfig = targetConfig.concat(_lodash.cloneDeep(typeConfig));
                }
            });
            if (targetConfig.length > 0) {
                this.appliedFiltersMap.set(target, targetConfig);
            } else {
                this.appliedFiltersMap['delete'](target);
            }
        };

        return FilterManager;
    })();

    exports.FilterManager = FilterManager;

    FilterManager.coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    FilterManager.filterPropertiesMap = new Map();

    var FilterConfig = (function () {
        function FilterConfig(config) {
            _classCallCheck(this, FilterConfig);

            Object.assign(this, config);
        }

        FilterConfig.prototype.register = function register(target, descriptor) {
            this.descriptor = descriptor || undefined;
            FilterManager.registerFilter(target, this);
        };

        return FilterConfig;
    })();

    exports.FilterConfig = FilterConfig;

    function filter(targetOrNameOrConfig, key, descriptor) {
        var configurableDecorate = function configurableDecorate(target, key2, descriptor2) {
            var actualTarget = key2 ? target.constructor : target;
            var config = {
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
            } else {
                Object.assign(config, targetOrNameOrConfig);
            }
            return new FilterConfig(config).register(actualTarget, descriptor2);
        };
        if (key) {
            var targetTemp = targetOrNameOrConfig;
            targetOrNameOrConfig = null;
            return configurableDecorate(targetTemp, key, descriptor);
        }
        return configurableDecorate;
    }

    var BaseComponent = (function () {
        function BaseComponent() {
            _classCallCheck(this, BaseComponent);

            this.disposed = false;
            this.inited = false;
            this.title = null;
            this.state = null;
        }

        BaseComponent.prototype.init = function init() {
            this.inited = true;
        };

        BaseComponent.prototype.dispose = function dispose() {
            this.disposed = true;
        };

        _createClass(BaseComponent, [{
            key: 'busy',
            get: function get() {
                return this.state === ProgressState.Progress;
            }
        }, {
            key: 'ready',
            get: function get() {
                return this.state !== ProgressState.Progress;
            }
        }]);

        return BaseComponent;
    })();

    exports.BaseComponent = BaseComponent;

    ;

    var SelectionManager = (function () {
        function SelectionManager(target, itemsPropertyName) {
            _classCallCheck(this, SelectionManager);

            this.selectionsList = new Array();
            this.target = target;
            this.itemsPropertyName = itemsPropertyName;
        }

        SelectionManager.includeIn = function includeIn(target, itemsPropertyName) {
            target.selectionManager = new SelectionManager(target, itemsPropertyName);
        };

        SelectionManager.prototype.dispose = function dispose() {
            this.selectionsList.length = 0;
            delete this.selectionsList;
            delete this.target;
        };

        SelectionManager.prototype.deselectItem = function deselectItem(selectionTuple) {
            var recursive = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var index = this.selectionsList.findIndex(function (selectedItem) {
                return selectedItem.item === selectionTuple.item;
            });
            if (index !== -1) {
                this.selectionsList.splice(index, 1);
            }
            selectionTuple.item.selected = false;
            if (this.canRecurse(recursive, selectionTuple.item)) {
                selectionTuple.item.selectionManager.deselectAll(true);
            }
            this.lastProcessedIndex = selectionTuple.index;
        };

        SelectionManager.prototype.selectItem = function selectItem(selectionTuple) {
            var savePrevious = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var recursive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (savePrevious) {
                var index = this.selectionsList.findIndex(function (selectedItem) {
                    return selectedItem.item === selectionTuple.item;
                });
                if (index !== -1) {
                    selectionTuple.item.selected = false;
                    this.selectionsList.splice(index, 1);
                }
                this.selectionsList.push(selectionTuple);
                selectionTuple.item.selected = true;
            } else {
                var list = this.selectionsList.splice(0, this.selectionsList.length);
                list.forEach(function (selectedItem) {
                    selectedItem.item.selected = false;
                });
                this.selectionsList.push(selectionTuple);
                selectionTuple.item.selected = true;
            }
            if (this.canRecurse(recursive, selectionTuple.item)) {
                selectionTuple.item.selectionManager.selectAll(true);
            }
            this.lastProcessedIndex = selectionTuple.index;
        };

        SelectionManager.prototype.canRecurse = function canRecurse(recursive, item) {
            if (recursive && item.selectionManager && item.selectionManager instanceof SelectionManager) {
                return true;
            }
            return false;
        };

        SelectionManager.prototype.getSelectionTuple = function getSelectionTuple(index) {
            return {
                index: index,
                item: this.itemsSource[index]
            };
        };

        SelectionManager.prototype.deselectAll = function deselectAll() {
            var recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var list = this.selectionsList.splice(0, this.selectionsList.length);
            for (var i = 0; i < list.length; i++) {
                var item = list[i].item;
                item.selected = false;
                if (this.canRecurse(recursive, item)) {
                    item.selectionManager.deselectAll(true);
                }
            }
            this.lastProcessedIndex = null;
        };

        SelectionManager.prototype.selectAll = function selectAll() {
            var recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            this.selectRange(0, this.itemsSource.length - 1, recursive);
        };

        SelectionManager.prototype.selectRange = function selectRange(fromIndex, toIndex) {
            var _selectionsList;

            var recursive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (toIndex < 0 || this.itemsSource.length <= toIndex || fromIndex < 0 || this.itemsSource.length <= fromIndex) {
                return;
            }
            var startIndex = Math.min(fromIndex, toIndex);
            var endIndex = Math.max(fromIndex, toIndex);
            this.deselectAll();
            var tempData = new Array();
            for (var i = startIndex; i <= endIndex; i++) {
                var tuple = this.getSelectionTuple(i);
                tempData.push(tuple);
                tuple.item.selected = true;
                if (this.canRecurse(recursive, tuple.item)) {
                    tuple.item.selectionManager.selectAll(true);
                }
            }
            (_selectionsList = this.selectionsList).splice.apply(_selectionsList, [0, this.selectionsList.length].concat(tempData));
            this.lastProcessedIndex = endIndex;
        };

        SelectionManager.prototype.hasSelections = function hasSelections() {
            return this.selectionsList.length !== 0;
        };

        SelectionManager.prototype.isIndexSelected = function isIndexSelected(index) {
            if (index >= 0 && this.itemsSource.length > index) {
                return this.itemsSource[index].selected;
            }
            return false;
        };

        SelectionManager.prototype.getMinSelectedIndex = function getMinSelectedIndex() {
            var minIndex = null;
            this.selectionsList.forEach(function (item) {
                minIndex = minIndex === null || item.index < minIndex ? item.index : minIndex;
            });
            return minIndex;
        };

        SelectionManager.prototype.getMaxSelectedIndex = function getMaxSelectedIndex() {
            var maxIndex = null;
            this.selectionsList.forEach(function (item) {
                maxIndex = maxIndex === null || item.index > maxIndex ? item.index : maxIndex;
            });
            return maxIndex;
        };

        SelectionManager.prototype.selectFirst = function selectFirst() {
            if (this.itemsSource.length > 0) {
                this.selectItem(this.getSelectionTuple(0));
            }
        };

        SelectionManager.prototype.selectLast = function selectLast() {
            if (this.itemsSource.length > 0) {
                this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
            }
        };

        SelectionManager.prototype.selectIndex = function selectIndex(index) {
            var savePrevious = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var recursive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (index >= 0 && this.itemsSource.length > index) {
                this.selectItem(this.getSelectionTuple(index), savePrevious, recursive);
            }
        };

        SelectionManager.prototype.deselectIndex = function deselectIndex(index) {
            var recursive = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (index >= 0 && this.itemsSource.length > index) {
                this.deselectItem(this.getSelectionTuple(index), recursive);
            }
        };

        SelectionManager.prototype.toggleSelection = function toggleSelection(index) {
            var savePrevious = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var recursive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (index < 0 || this.itemsSource.length <= index) {
                return;
            }
            var tuple = this.getSelectionTuple(index);
            if (this.isIndexSelected(index)) {
                if (this.selectionsList.length === 1 || this.selectionsList.length > 1 && savePrevious) {
                    this.deselectItem(tuple, recursive);
                } else {
                    this.selectItem(tuple, savePrevious, recursive);
                }
                return;
            }
            this.selectItem(tuple, savePrevious, recursive);
        };

        SelectionManager.prototype.getSelections = function getSelections() {
            var recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (recursive) {
                var result = [];
                for (var i = 0; i < this.selectionsList.length; i++) {
                    var item = this.selectionsList[i].item;
                    result.push(item);
                    if (this.canRecurse(recursive, item)) {
                        result = result.concat(item.selectionManager.getSelections(true));
                    }
                }
            }
            return this.selectionsList.map(function (selectable) {
                return selectable.item;
            });
        };

        _createClass(SelectionManager, [{
            key: 'itemsSource',
            get: function get() {
                return this.target[this.itemsPropertyName];
            }
        }]);

        return SelectionManager;
    })();

    exports.SelectionManager = SelectionManager;

    var StatusTracker = (function () {
        function StatusTracker() {
            _classCallCheck(this, StatusTracker);
        }

        StatusTracker.trackStatus = function trackStatus(title) {
            var sid = setTimeout(function () {
                StatusTracker.status = ProgressState.Progress;
                if (title) {
                    var statusModel = new StatusModel(ProgressState.Progress, title);
                    statusModel.sid = sid;
                    StatusTracker.statusList.push(statusModel);
                }
            }, Defaults.uiSettings.progressDelayInterval);
            return sid;
        };

        StatusTracker.resolveStatus = function resolveStatus(sid, status) {
            if (sid) {
                clearTimeout(sid);
                var current = StatusTracker.statusList.find(function (item) {
                    return item.sid === sid;
                });
                if (current) {
                    current.status = status;
                }
            }
            setTimeout(function () {
                var undone = StatusTracker.statusList.find(function (item) {
                    return item.status === ProgressState.Progress;
                });
                if (undone === null) {
                    StatusTracker.statusList.length = 0;
                    StatusTracker.status = ProgressState.Done;
                } else {
                    _lodash.remove(StatusTracker.statusList, function (item) {
                        return item.sid === sid;
                    });
                }
            }, Defaults.uiSettings.elementVisibilityInterval);
        };

        _createClass(StatusTracker, null, [{
            key: 'statusDisplayed',
            get: function get() {
                return StatusTracker.status !== ProgressState.Done;
            }
        }, {
            key: 'isActive',
            get: function get() {
                return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
            }
        }]);

        return StatusTracker;
    })();

    exports.StatusTracker = StatusTracker;

    StatusTracker.status = ProgressState.Done;
    StatusTracker.modalDisplayed = false;
    StatusTracker.statusList = new Array();

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = undefined && undefined.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var ListComponent = (function (_BaseComponent) {
        _inherits(ListComponent, _BaseComponent);

        function ListComponent() {
            _classCallCheck(this, ListComponent);

            _BaseComponent.call(this);

            this.sortings = new Array();
            this.defaultSortingsPrivate = null;

            this.items = [];
            this.totalCount = 0;
            this.loadedCount = 0;

            this.useModelState = true;
            SelectionManager.includeIn(this, 'items');
            FilterManager.includeIn(this);
            this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
            this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
        }

        ListComponent.prototype.listLoadDataSuccessCallback = function listLoadDataSuccessCallback(result) {
            this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
            this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;
            this.state = ProgressState.Done;
            return result;
        };

        ListComponent.prototype.listLoadDataFailCallback = function listLoadDataFailCallback() {
            this.state = ProgressState.Fail;
        };

        ListComponent.prototype.clearDataInternal = function clearDataInternal() {
            this.totalCount = 0;
            this.selectionManager.deselectAll();
            Utility.disposeAll(this.items);
        };

        ListComponent.prototype.init = function init(queryParams) {
            _BaseComponent.prototype.init.call(this);
            var restoredState = this.getRestoredState(queryParams);
            this.filterManager.parseParams(restoredState);
        };

        ListComponent.prototype.dispose = function dispose() {
            _BaseComponent.prototype.dispose.call(this);
            delete this.listLoadDataSuccessBinded;
            delete this.listLoadDataFailBinded;
            delete this.defaultSortings;
            this.sortings.length = 0;
            this.clearDataInternal();
            this.filterManager.dispose();
            this.selectionManager.dispose();
        };

        ListComponent.prototype.setSort = function setSort(fieldName, savePrevious) {
            var newSort = new SortParameter(fieldName);
            for (var i = 0; i < this.sortings.length; i++) {
                if (this.sortings[i].fieldName === fieldName) {
                    var existedSort = this.sortings.splice(i, 1)[0];
                    newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
                    newSort.toggleDirection();
                    break;
                }
            }
            if (savePrevious) {
                this.sortings.push(newSort);
            } else {
                this.sortings.length = 0;
                this.sortings.push(newSort);
            }
        };

        ListComponent.prototype.onSortChangesCompleted = function onSortChangesCompleted() {
            if (this.ready) {
                this.clearDataInternal();
                this.loadData();
            }
        };

        ListComponent.prototype.toRequest = function toRequest() {
            return this.filterManager.buildRequest(null);
        };

        ListComponent.prototype.getLocalState = function getLocalState() {
            return this.filterManager.buildPersistedState(null);
        };

        ListComponent.prototype.loadData = function loadData() {
            if (!this.inited) {
                throw new Error('loadData can be called only after activation.');
            }
            this.totalCount = 0;
            this.state = ProgressState.Progress;
            var promise = this.getDataReadPromise();
            this.addToCancellationSequence(promise);
            promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
            if (this.useModelState) {
                this.saveRequestState();
                this.saveLocalState();
            }
            return promise;
        };

        ListComponent.prototype.clearData = function clearData() {
            this.clearDataInternal();
        };

        ListComponent.prototype.reloadData = function reloadData() {
            if (this.ready) {
                this.clearData();
                this.loadData();
            }
        };

        ListComponent.prototype.addToCancellationSequence = function addToCancellationSequence(promise) {};

        ListComponent.prototype.cancelRequests = function cancelRequests() {};

        ListComponent.prototype.saveRequestState = function saveRequestState() {
            this.stateManager.flushRequestState(this.toRequest());
        };

        ListComponent.prototype.saveLocalState = function saveLocalState() {
            this.stateManager.persistLocalState(this.getLocalState());
        };

        ListComponent.prototype.getRestoredState = function getRestoredState(params) {
            if (this.useModelState === false) {
                return params;
            }
            return this.stateManager.mergeStates(params);
        };

        _createClass(ListComponent, [{
            key: 'defaultSortings',
            get: function get() {
                return this.defaultSortingsPrivate;
            },
            set: function set(value) {
                this.defaultSortingsPrivate = value;
                if (this.sortings === null || this.sortings.length === 0) {
                    this.sortings = _lodash.cloneDeep(this.defaultSortingsPrivate);
                }
            }
        }]);

        return ListComponent;
    })(BaseComponent);

    exports.ListComponent = ListComponent;

    __decorate([filter({
        defaultValue: function defaultValue() {
            return this.defaultSortings ? _lodash.cloneDeep(this.defaultSortings) : [];
        },
        parameterName: Defaults.listComponent.sortParameterName,
        parseFormatter: function parseFormatter(proposedValue) {
            return Array.isArray(proposedValue) ? proposedValue.map(function (sort) {
                return new SortParameter(sort.fieldName, sort.direction * 1);
            }) : [];
        },
        persisted: Defaults.listComponent.persistSortings
    }), __metadata('design:type', Object)], ListComponent.prototype, "sortings", void 0);

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = undefined && undefined.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var BufferedListComponent = (function (_ListComponent) {
        _inherits(BufferedListComponent, _ListComponent);

        function BufferedListComponent() {
            _classCallCheck(this, BufferedListComponent);

            _ListComponent.call(this);
            this.takeRowCountInternal = Defaults.bufferedListComponent.defaultTakeRowCount;
            this.skip = 0;
            this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
        }

        BufferedListComponent.prototype.dispose = function dispose() {
            _ListComponent.prototype.dispose.call(this);
            delete this.bufferedLoadDataSuccessBinded;
        };

        BufferedListComponent.prototype.bufferedLoadDataSuccess = function bufferedLoadDataSuccess(result) {
            this.loadedCount = this.skip + result[Defaults.listComponent.loadedCountParameterName];
            this.skip += result[Defaults.listComponent.loadedCountParameterName];
            this.loadedCount = this.skip;

            if ((result[Defaults.listComponent.totalCountParameterName] || 0) === 0) {
                this.clearData();
            }
            return result;
        };

        BufferedListComponent.prototype.loadData = function loadData() {
            var _ListComponent$prototype$loadData;

            var promise = (_ListComponent$prototype$loadData = _ListComponent.prototype.loadData).call.apply(_ListComponent$prototype$loadData, [this].concat(Array.prototype.slice.call(arguments)));
            promise.then(this.bufferedLoadDataSuccessBinded);
            return promise;
        };

        BufferedListComponent.prototype.onSortChangesCompleted = function onSortChangesCompleted() {
            this.takeRowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
            this.skip = 0;
            _ListComponent.prototype.onSortChangesCompleted.call(this);
        };

        _createClass(BufferedListComponent, [{
            key: 'takeRowCount',
            get: function get() {
                return this.takeRowCountInternal;
            },
            set: function set(value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListComponent.defaultTakeRowCount;
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
        }]);

        return BufferedListComponent;
    })(ListComponent);

    exports.BufferedListComponent = BufferedListComponent;

    __decorate([filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListComponent.skipRowCountParameterName,
        parseFormatter: function parseFormatter() {
            return 0;
        }
    }), __metadata('design:type', Object)], BufferedListComponent.prototype, "skip", void 0);
    __decorate([filter({
        defaultValue: Defaults.bufferedListComponent.defaultTakeRowCount,
        parameterName: Defaults.bufferedListComponent.takeRowCountParameterName,
        parseFormatter: function parseFormatter(proposedParam, allParams) {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListComponent.defaultTakeRowCount;
        }
    }), __metadata('design:type', Number)], BufferedListComponent.prototype, "takeRowCount", null);

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = undefined && undefined.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var PagedListComponent = (function (_ListComponent2) {
        _inherits(PagedListComponent, _ListComponent2);

        function PagedListComponent() {
            _classCallCheck(this, PagedListComponent);

            _ListComponent2.call(this);
            this.pageSizeInternal = Defaults.pagedListComponent.defaultPageSize;
            this.pageNumberInternal = 1;
            this.displayFrom = 1;
            this.displayTo = 1;
            this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
        }

        PagedListComponent.prototype.pagedLoadDataSuccessCallback = function pagedLoadDataSuccessCallback(result) {
            this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
            this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;
            this.displayFrom = result[Defaults.pagedListComponent.displayFromParameterName] || 1;
            this.displayTo = result[Defaults.pagedListComponent.displayToParameterName] || 1;
            return result;
        };

        PagedListComponent.prototype.dispose = function dispose() {
            _ListComponent2.prototype.dispose.call(this);
            delete this.pagedLoadDataSuccessBinded;
        };

        PagedListComponent.prototype.loadData = function loadData() {
            var _ListComponent2$prototype$loadData;

            this.selectionManager.deselectAll();
            var promise = (_ListComponent2$prototype$loadData = _ListComponent2.prototype.loadData).call.apply(_ListComponent2$prototype$loadData, [this].concat(Array.prototype.slice.call(arguments)));
            Utility.disposeAll(this.items);
            promise.then(this.pagedLoadDataSuccessBinded);
            return promise;
        };

        PagedListComponent.prototype.goToFirstPage = function goToFirstPage() {
            if (this.pageNumber > 1) {
                this.pageNumber = 1;
                this.loadData();
            }
        };

        PagedListComponent.prototype.goToPreviousPage = function goToPreviousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber -= 1;
                this.loadData();
            }
        };

        PagedListComponent.prototype.goToNextPage = function goToNextPage() {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber += 1;
                this.loadData();
            }
        };

        PagedListComponent.prototype.goToLastPage = function goToLastPage() {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber = this.pageCount;
                this.loadData();
            }
        };

        _createClass(PagedListComponent, [{
            key: 'pageCount',
            get: function get() {
                return Math.ceil(this.totalCount / this.pageSizeInternal);
            }
        }, {
            key: 'pageNumber',
            get: function get() {
                return this.pageNumberInternal;
            },
            set: function set(value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
                if (pageNumber > this.pageCount) {
                    pageNumber = this.pageCount;
                }
                if (pageNumber < 1) {
                    pageNumber = 1;
                }
                this.pageNumberInternal = pageNumber;
            }
        }, {
            key: 'pageSize',
            get: function get() {
                return this.pageSizeInternal;
            },
            set: function set(value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.pagedListComponent.defaultPageSize;
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
        }]);

        return PagedListComponent;
    })(ListComponent);

    exports.PagedListComponent = PagedListComponent;

    __decorate([filter({ defaultValue: 1, parameterName: Defaults.pagedListComponent.pageNumberParameterName }), __metadata('design:type', Number)], PagedListComponent.prototype, "pageNumber", null);
    __decorate([filter({
        defaultValue: Defaults.pagedListComponent.defaultPageSize,
        parameterName: Defaults.pagedListComponent.pageSizeParameterName,
        persisted: Defaults.pagedListComponent.persistPageSize
    }), __metadata('design:type', Number)], PagedListComponent.prototype, "pageSize", null);
});