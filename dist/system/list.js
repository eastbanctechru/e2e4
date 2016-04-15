System.register(['./common/defaults', './common/utility', './selectionManager', './filterManager', './common/progressState', './sortManager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaults_1, utility_1, selectionManager_1, filterManager_1, progressState_1, sortManager_1;
    var List;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (selectionManager_1_1) {
                selectionManager_1 = selectionManager_1_1;
            },
            function (filterManager_1_1) {
                filterManager_1 = filterManager_1_1;
            },
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            },
            function (sortManager_1_1) {
                sortManager_1 = sortManager_1_1;
            }],
        execute: function() {
            List = (function () {
                function List(stateManager) {
                    this.disposed = false;
                    this.inited = false;
                    this.state = null;
                    ///IList
                    this.items = [];
                    this.totalCount = 0;
                    this.loadedCount = 0;
                    ///IRequestCanceller
                    ///IObjectWithState
                    this.useModelState = true;
                    this.stateManager = stateManager;
                    this.selectionManager = new selectionManager_1.SelectionManager();
                    this.selectionManager.itemsSource = this.items;
                    filterManager_1.FilterManager.includeIn(this);
                    sortManager_1.SortManager.includeIn(this);
                    this.filterManager.registerFilterTarget(this.sortManager);
                    this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
                    this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
                }
                List.prototype.listLoadDataSuccessCallback = function (result) {
                    this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
                    this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
                    this.state = progressState_1.ProgressState.Done;
                    return result;
                };
                List.prototype.listLoadDataFailCallback = function () {
                    this.state = progressState_1.ProgressState.Fail;
                };
                List.prototype.clearDataInternal = function () {
                    this.totalCount = 0;
                    this.selectionManager.deselectAll();
                    utility_1.Utility.disposeAll(this.items);
                };
                Object.defineProperty(List.prototype, "busy", {
                    get: function () {
                        return this.state === progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(List.prototype, "ready", {
                    get: function () {
                        return this.state !== progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                List.prototype.init = function (queryParams) {
                    this.inited = true;
                    var restoredState = this.getRestoredState(queryParams);
                    this.filterManager.parseParams(restoredState);
                };
                List.prototype.dispose = function () {
                    this.disposed = true;
                    delete this.listLoadDataSuccessBinded;
                    delete this.listLoadDataFailBinded;
                    this.clearDataInternal();
                    this.sortManager.dispose();
                    this.filterManager.dispose();
                    this.selectionManager.dispose();
                };
                List.prototype.onSortChangesCompleted = function () {
                    if (this.ready) {
                        this.clearDataInternal();
                        this.loadData();
                    }
                };
                List.prototype.toRequest = function () {
                    return this.filterManager.buildRequest(null);
                };
                List.prototype.getLocalState = function () {
                    return this.filterManager.buildPersistedState(null);
                };
                List.prototype.loadData = function () {
                    if (!this.inited) {
                        throw new Error('loadData can be called only after activation.');
                    }
                    this.totalCount = 0;
                    this.state = progressState_1.ProgressState.Progress;
                    var promise = this.getDataReadPromise(this.toRequest());
                    this.addToCancellationSequence(promise);
                    promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
                    if (this.useModelState) {
                        this.saveRequestState();
                        this.saveLocalState();
                    }
                    return promise;
                };
                List.prototype.clearData = function () {
                    this.clearDataInternal();
                };
                List.prototype.reloadData = function () {
                    if (this.ready) {
                        this.clearData();
                        this.loadData();
                    }
                };
                ///IList
                ///IRequestCanceller
                List.prototype.addToCancellationSequence = function (promise) { };
                ;
                List.prototype.cancelRequests = function () { };
                ;
                List.prototype.saveRequestState = function () {
                    this.stateManager.flushRequestState(this.toRequest());
                };
                ;
                List.prototype.saveLocalState = function () {
                    this.stateManager.persistLocalState(this.getLocalState());
                };
                ;
                List.prototype.getRestoredState = function (params) {
                    if (this.useModelState === false) {
                        return params;
                    }
                    return this.stateManager.mergeStates(params);
                };
                return List;
            }());
            exports_1("List", List);
        }
    }
});
