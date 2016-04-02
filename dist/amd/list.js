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
            var promise = this.getDataReadPromise();
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

//# sourceMappingURL=data:application/json;base64,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QUM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFDRCx3QkFBUyxHQUFUO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUNELHlCQUFVLEdBQVY7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELFFBQVE7UUFFUixvQkFBb0I7UUFDcEIsd0NBQXlCLEdBQXpCLFVBQTBCLE9BQXdCLElBQVUsQ0FBQzs7UUFDN0QsNkJBQWMsR0FBZCxjQUF5QixDQUFDOztRQUsxQiwrQkFBZ0IsR0FBaEI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7O1FBQ0QsNkJBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQzs7UUFDTywrQkFBZ0IsR0FBeEIsVUFBeUIsTUFBYztZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBTUwsV0FBQztJQUFELENBeEhBLEFBd0hDLElBQUE7SUF4SHFCLFlBQUksT0F3SHpCLENBQUEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL3NlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0ZpbHRlck1hbmFnZXJ9IGZyb20gJy4vZmlsdGVyTWFuYWdlcic7XHJcbmltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7SUxpc3R9IGZyb20gJy4vY29udHJhY3RzL0lMaXN0JztcclxuaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7U29ydE1hbmFnZXJ9IGZyb20gJy4vc29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0lGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyTWFuYWdlcic7XHJcbmltcG9ydCB7SVNlbGVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3Rpb25NYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0IGltcGxlbWVudHMgSUxpc3Qge1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2socmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5GYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbEJpbmRlZDogKGVycm9yOiBPYmplY3QpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIGNsZWFyRGF0YUludGVybmFsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgVXRpbGl0eS5kaXNwb3NlQWxsKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIgPSBzdGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgU2VsZWN0aW9uTWFuYWdlci5pbmNsdWRlSW4odGhpcywgJ2l0ZW1zJyk7XHJcbiAgICAgICAgRmlsdGVyTWFuYWdlci5pbmNsdWRlSW4odGhpcyk7XHJcbiAgICAgICAgU29ydE1hbmFnZXIuaW5jbHVkZUluKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5yZWdpc3RlckZpbHRlclRhcmdldCh0aGlzLnNvcnRNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhRmFpbENhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlZCA9IGZhbHNlO1xyXG4gICAgaW5pdGVkID0gZmFsc2U7XHJcbiAgICBzdGF0ZTogUHJvZ3Jlc3NTdGF0ZSA9IG51bGw7XHJcblxyXG4gICAgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlICE9PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQocXVlcnlQYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzdG9yZWRTdGF0ZShxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnBhcnNlUGFyYW1zKHJlc3RvcmVkU3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgIHRoaXMuc29ydE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8vSUxpc3RcclxuICAgIGl0ZW1zOiBPYmplY3RbXSA9IFtdO1xyXG4gICAgdG90YWxDb3VudCA9IDA7XHJcbiAgICBsb2FkZWRDb3VudCA9IDA7XHJcbiAgICB0b1JlcXVlc3QoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUmVxdWVzdChudWxsKTtcclxuICAgIH1cclxuICAgIGdldExvY2FsU3RhdGUoKTogT2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUGVyc2lzdGVkU3RhdGUobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9hZERhdGEgY2FuIGJlIGNhbGxlZCBvbmx5IGFmdGVyIGFjdGl2YXRpb24uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmdldERhdGFSZWFkUHJvbWlzZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9DYW5jZWxsYXRpb25TZXF1ZW5jZShwcm9taXNlKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkLCB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQpO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlUmVxdWVzdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUxvY2FsU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8vSUxpc3RcclxuXHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgYWRkVG9DYW5jZWxsYXRpb25TZXF1ZW5jZShwcm9taXNlOiBQcm9taXNlPE9iamVjdD4pOiB2b2lkIHsgfTtcclxuICAgIGNhbmNlbFJlcXVlc3RzKCk6IHZvaWQgeyB9O1xyXG4gICAgLy8vSVJlcXVlc3RDYW5jZWxsZXJcclxuICAgIC8vL0lPYmplY3RXaXRoU3RhdGVcclxuICAgIHVzZU1vZGVsU3RhdGUgPSB0cnVlO1xyXG4gICAgc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyO1xyXG4gICAgc2F2ZVJlcXVlc3RTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlci5mbHVzaFJlcXVlc3RTdGF0ZSh0aGlzLnRvUmVxdWVzdCgpKTtcclxuICAgIH07XHJcbiAgICBzYXZlTG9jYWxTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlci5wZXJzaXN0TG9jYWxTdGF0ZSh0aGlzLmdldExvY2FsU3RhdGUoKSk7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBnZXRSZXN0b3JlZFN0YXRlKHBhcmFtczogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2RlbFN0YXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU1hbmFnZXIubWVyZ2VTdGF0ZXMocGFyYW1zKTtcclxuICAgIH1cclxuICAgIC8vL0lPYmplY3RXaXRoU3RhdGVcclxuICAgIHNlbGVjdGlvbk1hbmFnZXI6IElTZWxlY3Rpb25NYW5hZ2VyO1xyXG4gICAgZmlsdGVyTWFuYWdlcjogSUZpbHRlck1hbmFnZXI7XHJcbiAgICBzb3J0TWFuYWdlcjogSVNvcnRNYW5hZ2VyO1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF0YVJlYWRQcm9taXNlKCk6IFByb21pc2U8T2JqZWN0PjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
