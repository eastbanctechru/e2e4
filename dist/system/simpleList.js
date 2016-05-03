System.register(['./common/defaults', './common/utility', './filterManager', './common/progressState'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaults_1, utility_1, filterManager_1, progressState_1;
    var SimpleList;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (filterManager_1_1) {
                filterManager_1 = filterManager_1_1;
            },
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            }],
        execute: function() {
            SimpleList = (function () {
                function SimpleList(stateManager, pager) {
                    this.disposed = false;
                    this.inited = false;
                    this.state = progressState_1.ProgressState.Initial;
                    ///IList
                    this.items = [];
                    ///IRequestCanceller
                    ///IObjectWithState
                    this.useModelState = true;
                    this.stateManager = stateManager;
                    this.pager = pager;
                    this.filterManager = new filterManager_1.FilterManager(this);
                    this.filterManager.registerFilterTarget(this.pager);
                    this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
                    this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
                }
                SimpleList.prototype.listLoadDataSuccessCallback = function (result) {
                    this.pager.processResponse(result);
                    this.state = progressState_1.ProgressState.Done;
                    // In case when filter changed from last request and theres no data now
                    if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                        this.clearData();
                    }
                    return result;
                };
                SimpleList.prototype.listLoadDataFailCallback = function () {
                    this.state = progressState_1.ProgressState.Fail;
                };
                SimpleList.prototype.clearDataInternal = function () {
                    this.pager.totalCount = 0;
                    utility_1.Utility.disposeAll(this.items);
                };
                Object.defineProperty(SimpleList.prototype, "busy", {
                    get: function () {
                        return this.state === progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SimpleList.prototype, "ready", {
                    get: function () {
                        return this.state !== progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                SimpleList.prototype.init = function (queryParams) {
                    this.inited = true;
                    var restoredState = this.getRestoredState(queryParams);
                    this.filterManager.parseParams(restoredState);
                };
                SimpleList.prototype.dispose = function () {
                    this.disposed = true;
                    delete this.listLoadDataSuccessBinded;
                    delete this.listLoadDataFailBinded;
                    this.clearDataInternal();
                    this.filterManager.dispose();
                };
                SimpleList.prototype.onSortChangesCompleted = function () {
                    if (this.ready) {
                        this.clearDataInternal();
                        this.loadData();
                    }
                };
                SimpleList.prototype.toRequest = function () {
                    return this.filterManager.buildRequest(null);
                };
                SimpleList.prototype.getLocalState = function () {
                    return this.filterManager.buildPersistedState(null);
                };
                SimpleList.prototype.loadData = function () {
                    if (!this.inited) {
                        throw new Error('loadData can be called only after activation.');
                    }
                    this.pager.totalCount = 0;
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
                SimpleList.prototype.clearData = function () {
                    this.clearDataInternal();
                };
                SimpleList.prototype.reloadData = function () {
                    if (this.ready) {
                        this.clearData();
                        this.loadData();
                    }
                };
                ///IList
                ///IRequestCanceller
                SimpleList.prototype.addToCancellationSequence = function (promise) { };
                ;
                SimpleList.prototype.cancelRequests = function () { };
                ;
                SimpleList.prototype.saveRequestState = function () {
                    this.stateManager.flushRequestState(this.toRequest());
                };
                ;
                SimpleList.prototype.saveLocalState = function () {
                    this.stateManager.persistLocalState(this.getLocalState());
                };
                ;
                SimpleList.prototype.getRestoredState = function (params) {
                    if (this.useModelState === false) {
                        return params;
                    }
                    return this.stateManager.mergeStates(params);
                };
                return SimpleList;
            }());
            exports_1("SimpleList", SimpleList);
        }
    }
});
