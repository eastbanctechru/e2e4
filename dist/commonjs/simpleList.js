"use strict";
var defaults_1 = require('./common/defaults');
var utility_1 = require('./common/utility');
var filterManager_1 = require('./filterManager');
var progressState_1 = require('./common/progressState');
var SimpleList = (function () {
    function SimpleList(stateManager, pager) {
        this.disposed = false;
        this.inited = false;
        this.state = progressState_1.ProgressState.Initial;
        ///IList
        this.items = [];
        this.totalCount = 0;
        this.loadedCount = 0;
        ///IRequestCanceller
        ///IObjectWithState
        this.useModelState = true;
        this.stateManager = stateManager;
        this.pager = pager;
        this.filterManager = new filterManager_1.FilterManager(this);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    SimpleList.prototype.listLoadDataSuccessCallback = function (result) {
        this.loadedCount = result[defaults_1.Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0;
        this.state = progressState_1.ProgressState.Done;
        return result;
    };
    SimpleList.prototype.listLoadDataFailCallback = function () {
        this.state = progressState_1.ProgressState.Fail;
    };
    SimpleList.prototype.clearDataInternal = function () {
        this.totalCount = 0;
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
exports.SimpleList = SimpleList;
