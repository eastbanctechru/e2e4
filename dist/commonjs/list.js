"use strict";
var defaults_1 = require('./common/defaults');
var utility_1 = require('./common/utility');
var filterManager_1 = require('./filterManager');
var progressState_1 = require('./common/progressState');
var List = (function () {
    function List(stateManager, sortManager) {
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
        this.sortManager = sortManager;
        filterManager_1.FilterManager.includeIn(this);
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
exports.List = List;
