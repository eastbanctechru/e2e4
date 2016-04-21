define(["require", "exports", './common/defaults', './common/utility', './filterManager', './common/progressState', './sortManager'], function (require, exports, defaults_1, utility_1, filterManager_1, progressState_1, sortManager_1) {
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

//# sourceMappingURL=data:application/json;base64,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WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELFFBQVE7UUFFUixvQkFBb0I7UUFDcEIsd0NBQXlCLEdBQXpCLFVBQTBCLE9BQXdCLElBQVUsQ0FBQzs7UUFDN0QsNkJBQWMsR0FBZCxjQUF5QixDQUFDOztRQUsxQiwrQkFBZ0IsR0FBaEI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7O1FBQ0QsNkJBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQzs7UUFDTywrQkFBZ0IsR0FBeEIsVUFBeUIsTUFBYztZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBS0wsV0FBQztJQUFELENBcEhBLEFBb0hDLElBQUE7SUFwSHFCLFlBQUksT0FvSHpCLENBQUEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2ZpbHRlck1hbmFnZXInO1xyXG5pbXBvcnQge1Byb2dyZXNzU3RhdGV9IGZyb20gJy4vY29tbW9uL3Byb2dyZXNzU3RhdGUnO1xyXG5pbXBvcnQge0lTdGF0ZU1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTdGF0ZU1hbmFnZXInO1xyXG5pbXBvcnQge0lMaXN0fSBmcm9tICcuL2NvbnRyYWN0cy9JTGlzdCc7XHJcbmltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge1NvcnRNYW5hZ2VyfSBmcm9tICcuL3NvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtJRmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlck1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3QgaW1wbGVtZW50cyBJTGlzdCB7XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICBTb3J0TWFuYWdlci5pbmNsdWRlSW4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRoaXMuc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFGYWlsQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlOiBQcm9ncmVzc1N0YXRlID0gbnVsbDtcclxuXHJcbiAgICBnZXQgYnVzeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgIT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChxdWVyeVBhcmFtcz86IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCByZXN0b3JlZFN0YXRlID0gdGhpcy5nZXRSZXN0b3JlZFN0YXRlKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIucGFyc2VQYXJhbXMocmVzdG9yZWRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZDtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8vSUxpc3RcclxuICAgIGl0ZW1zOiBPYmplY3RbXSA9IFtdO1xyXG4gICAgdG90YWxDb3VudCA9IDA7XHJcbiAgICBsb2FkZWRDb3VudCA9IDA7XHJcbiAgICB0b1JlcXVlc3QoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUmVxdWVzdChudWxsKTtcclxuICAgIH1cclxuICAgIGdldExvY2FsU3RhdGUoKTogT2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUGVyc2lzdGVkU3RhdGUobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9hZERhdGEgY2FuIGJlIGNhbGxlZCBvbmx5IGFmdGVyIGFjdGl2YXRpb24uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmdldERhdGFSZWFkUHJvbWlzZSh0aGlzLnRvUmVxdWVzdCgpKTtcclxuICAgICAgICB0aGlzLmFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCwgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkKTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2RlbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVJlcXVlc3RTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVMb2NhbFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY2xlYXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcblxyXG4gICAgLy8vSVJlcXVlc3RDYW5jZWxsZXJcclxuICAgIGFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZTogUHJvbWlzZTxPYmplY3Q+KTogdm9pZCB7IH07XHJcbiAgICBjYW5jZWxSZXF1ZXN0cygpOiB2b2lkIHsgfTtcclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICAvLy9JT2JqZWN0V2l0aFN0YXRlXHJcbiAgICB1c2VNb2RlbFN0YXRlID0gdHJ1ZTtcclxuICAgIHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcjtcclxuICAgIHNhdmVSZXF1ZXN0U3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuZmx1c2hSZXF1ZXN0U3RhdGUodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICB9O1xyXG4gICAgc2F2ZUxvY2FsU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIucGVyc2lzdExvY2FsU3RhdGUodGhpcy5nZXRMb2NhbFN0YXRlKCkpO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgZ2V0UmVzdG9yZWRTdGF0ZShwYXJhbXM6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVNYW5hZ2VyLm1lcmdlU3RhdGVzKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICAvLy9JT2JqZWN0V2l0aFN0YXRlXHJcbiAgICBmaWx0ZXJNYW5hZ2VyOiBJRmlsdGVyTWFuYWdlcjtcclxuICAgIHNvcnRNYW5hZ2VyOiBJU29ydE1hbmFnZXI7XHJcbiAgICBhYnN0cmFjdCBnZXREYXRhUmVhZFByb21pc2UocmVxdWVzdFBhcmFtczogYW55KTogUHJvbWlzZTxPYmplY3Q+O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
