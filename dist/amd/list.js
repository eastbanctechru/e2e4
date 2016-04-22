define(["require", "exports", './common/defaults', './common/utility', './filterManager', './common/progressState'], function (require, exports, defaults_1, utility_1, filterManager_1, progressState_1) {
    "use strict";
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
});

//# sourceMappingURL=data:application/json;base64,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R0FBVjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBQ0QsUUFBUTtRQUVSLG9CQUFvQjtRQUNwQix3Q0FBeUIsR0FBekIsVUFBMEIsT0FBd0IsSUFBVSxDQUFDOztRQUM3RCw2QkFBYyxHQUFkLGNBQXlCLENBQUM7O1FBSzFCLCtCQUFnQixHQUFoQjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQzs7UUFDRCw2QkFBYyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDOztRQUNPLCtCQUFnQixHQUF4QixVQUF5QixNQUFjO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFLTCxXQUFDO0lBQUQsQ0FwSEEsQUFvSEMsSUFBQTtJQXBIcUIsWUFBSSxPQW9IekIsQ0FBQSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge0ZpbHRlck1hbmFnZXJ9IGZyb20gJy4vZmlsdGVyTWFuYWdlcic7XHJcbmltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7SUxpc3R9IGZyb20gJy4vY29udHJhY3RzL0lMaXN0JztcclxuaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7SUZpbHRlck1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0IGltcGxlbWVudHMgSUxpc3Qge1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2socmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5GYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbEJpbmRlZDogKGVycm9yOiBPYmplY3QpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIGNsZWFyRGF0YUludGVybmFsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgVXRpbGl0eS5kaXNwb3NlQWxsKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyLCBzb3J0TWFuYWdlcjogSVNvcnRNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIgPSBzdGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5zb3J0TWFuYWdlciA9IHNvcnRNYW5hZ2VyO1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIuaW5jbHVkZUluKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5yZWdpc3RlckZpbHRlclRhcmdldCh0aGlzLnNvcnRNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhRmFpbENhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlZCA9IGZhbHNlO1xyXG4gICAgaW5pdGVkID0gZmFsc2U7XHJcbiAgICBzdGF0ZTogUHJvZ3Jlc3NTdGF0ZSA9IG51bGw7XHJcblxyXG4gICAgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlICE9PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQocXVlcnlQYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzdG9yZWRTdGF0ZShxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnBhcnNlUGFyYW1zKHJlc3RvcmVkU3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgIHRoaXMuc29ydE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcbiAgICBpdGVtczogT2JqZWN0W10gPSBbXTtcclxuICAgIHRvdGFsQ291bnQgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQgPSAwO1xyXG4gICAgdG9SZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFJlcXVlc3QobnVsbCk7XHJcbiAgICB9XHJcbiAgICBnZXRMb2NhbFN0YXRlKCk6IE9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFBlcnNpc3RlZFN0YXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWREYXRhIGNhbiBiZSBjYWxsZWQgb25seSBhZnRlciBhY3RpdmF0aW9uLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5nZXREYXRhUmVhZFByb21pc2UodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2UpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQsIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZXF1ZXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG5cclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICBhZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2U6IFByb21pc2U8T2JqZWN0Pik6IHZvaWQgeyB9O1xyXG4gICAgY2FuY2VsUmVxdWVzdHMoKTogdm9pZCB7IH07XHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgdXNlTW9kZWxTdGF0ZSA9IHRydWU7XHJcbiAgICBzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXI7XHJcbiAgICBzYXZlUmVxdWVzdFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLmZsdXNoUmVxdWVzdFN0YXRlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgfTtcclxuICAgIHNhdmVMb2NhbFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBlcnNpc3RMb2NhbFN0YXRlKHRoaXMuZ2V0TG9jYWxTdGF0ZSgpKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFJlc3RvcmVkU3RhdGUocGFyYW1zOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5tZXJnZVN0YXRlcyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgZmlsdGVyTWFuYWdlcjogSUZpbHRlck1hbmFnZXI7XHJcbiAgICBzb3J0TWFuYWdlcjogSVNvcnRNYW5hZ2VyO1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF0YVJlYWRQcm9taXNlKHJlcXVlc3RQYXJhbXM6IGFueSk6IFByb21pc2U8T2JqZWN0PjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
