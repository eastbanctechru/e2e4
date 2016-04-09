define(["require", "exports", './common/defaults', './common/utility', './selectionManager', './filterManager', './common/progressState', './sortManager'], function (require, exports, defaults_1, utility_1, selectionManager_1, filterManager_1, progressState_1, sortManager_1) {
    "use strict";
    var List = (function () {
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
            selectionManager_1.SelectionManager.includeIn(this, 'items');
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
    exports.List = List;
});

//# sourceMappingURL=data:application/json;base64,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QyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0Qsd0JBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCx5QkFBVSxHQUFWO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDRCxRQUFRO1FBRVIsb0JBQW9CO1FBQ3BCLHdDQUF5QixHQUF6QixVQUEwQixPQUF3QixJQUFVLENBQUM7O1FBQzdELDZCQUFjLEdBQWQsY0FBeUIsQ0FBQzs7UUFLMUIsK0JBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDOztRQUNELDZCQUFjLEdBQWQ7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUM7O1FBQ08sK0JBQWdCLEdBQXhCLFVBQXlCLE1BQWM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQU1MLFdBQUM7SUFBRCxDQXhIQSxBQXdIQyxJQUFBO0lBeEhxQixZQUFJLE9Bd0h6QixDQUFBIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7VXRpbGl0eX0gZnJvbSAnLi9jb21tb24vdXRpbGl0eSc7XHJcbmltcG9ydCB7U2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9zZWxlY3Rpb25NYW5hZ2VyJztcclxuaW1wb3J0IHtGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2ZpbHRlck1hbmFnZXInO1xyXG5pbXBvcnQge1Byb2dyZXNzU3RhdGV9IGZyb20gJy4vY29tbW9uL3Byb2dyZXNzU3RhdGUnO1xyXG5pbXBvcnQge0lTdGF0ZU1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTdGF0ZU1hbmFnZXInO1xyXG5pbXBvcnQge0lMaXN0fSBmcm9tICcuL2NvbnRyYWN0cy9JTGlzdCc7XHJcbmltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge1NvcnRNYW5hZ2VyfSBmcm9tICcuL3NvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtJRmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlck1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0aW9uTWFuYWdlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGlzdCBpbXBsZW1lbnRzIElMaXN0IHtcclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQ2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb2dyZXNzU3RhdGUuRmFpbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZDogKHJlc3VsdDogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YUZhaWxCaW5kZWQ6IChlcnJvcjogT2JqZWN0KSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBjbGVhckRhdGFJbnRlcm5hbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEFsbCgpO1xyXG4gICAgICAgIFV0aWxpdHkuZGlzcG9zZUFsbCh0aGlzLml0ZW1zKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyID0gc3RhdGVNYW5hZ2VyO1xyXG4gICAgICAgIFNlbGVjdGlvbk1hbmFnZXIuaW5jbHVkZUluKHRoaXMsICdpdGVtcycpO1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIuaW5jbHVkZUluKHRoaXMpO1xyXG4gICAgICAgIFNvcnRNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIucmVnaXN0ZXJGaWx0ZXJUYXJnZXQodGhpcy5zb3J0TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQgPSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZWQgPSBmYWxzZTtcclxuICAgIGluaXRlZCA9IGZhbHNlO1xyXG4gICAgc3RhdGU6IFByb2dyZXNzU3RhdGUgPSBudWxsO1xyXG5cclxuICAgIGdldCBidXN5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWFkeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSAhPT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KHF1ZXJ5UGFyYW1zPzogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHJlc3RvcmVkU3RhdGUgPSB0aGlzLmdldFJlc3RvcmVkU3RhdGUocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5wYXJzZVBhcmFtcyhyZXN0b3JlZFN0YXRlKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IHRydWU7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkO1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICB0aGlzLnNvcnRNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcbiAgICBpdGVtczogT2JqZWN0W10gPSBbXTtcclxuICAgIHRvdGFsQ291bnQgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQgPSAwO1xyXG4gICAgdG9SZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFJlcXVlc3QobnVsbCk7XHJcbiAgICB9XHJcbiAgICBnZXRMb2NhbFN0YXRlKCk6IE9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFBlcnNpc3RlZFN0YXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWREYXRhIGNhbiBiZSBjYWxsZWQgb25seSBhZnRlciBhY3RpdmF0aW9uLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5nZXREYXRhUmVhZFByb21pc2UodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2UpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQsIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZXF1ZXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG5cclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICBhZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2U6IFByb21pc2U8T2JqZWN0Pik6IHZvaWQgeyB9O1xyXG4gICAgY2FuY2VsUmVxdWVzdHMoKTogdm9pZCB7IH07XHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgdXNlTW9kZWxTdGF0ZSA9IHRydWU7XHJcbiAgICBzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXI7XHJcbiAgICBzYXZlUmVxdWVzdFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLmZsdXNoUmVxdWVzdFN0YXRlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgfTtcclxuICAgIHNhdmVMb2NhbFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBlcnNpc3RMb2NhbFN0YXRlKHRoaXMuZ2V0TG9jYWxTdGF0ZSgpKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFJlc3RvcmVkU3RhdGUocGFyYW1zOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5tZXJnZVN0YXRlcyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgc2VsZWN0aW9uTWFuYWdlcjogSVNlbGVjdGlvbk1hbmFnZXI7XHJcbiAgICBmaWx0ZXJNYW5hZ2VyOiBJRmlsdGVyTWFuYWdlcjtcclxuICAgIHNvcnRNYW5hZ2VyOiBJU29ydE1hbmFnZXI7XHJcbiAgICBhYnN0cmFjdCBnZXREYXRhUmVhZFByb21pc2UocmVxdWVzdFBhcmFtczogYW55KTogUHJvbWlzZTxPYmplY3Q+O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
