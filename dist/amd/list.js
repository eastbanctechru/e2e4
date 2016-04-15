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
    exports.List = List;
});

//# sourceMappingURL=data:application/json;base64,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ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL3NlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3RhYmxlfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0YWJsZSc7XHJcbmltcG9ydCB7RmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9maWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL2NvbW1vbi9wcm9ncmVzc1N0YXRlJztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtJTGlzdH0gZnJvbSAnLi9jb250cmFjdHMvSUxpc3QnO1xyXG5pbXBvcnQge0lTb3J0TWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtTb3J0TWFuYWdlcn0gZnJvbSAnLi9zb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7SUZpbHRlck1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3QgaW1wbGVtZW50cyBJTGlzdCB7XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIgPSBuZXcgU2VsZWN0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pdGVtc1NvdXJjZSA9IDxBcnJheTxJU2VsZWN0YWJsZT4+dGhpcy5pdGVtcztcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICBTb3J0TWFuYWdlci5pbmNsdWRlSW4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRoaXMuc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFGYWlsQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlOiBQcm9ncmVzc1N0YXRlID0gbnVsbDtcclxuXHJcbiAgICBnZXQgYnVzeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgIT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChxdWVyeVBhcmFtcz86IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCByZXN0b3JlZFN0YXRlID0gdGhpcy5nZXRSZXN0b3JlZFN0YXRlKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIucGFyc2VQYXJhbXMocmVzdG9yZWRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZDtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG4gICAgaXRlbXM6IE9iamVjdFtdID0gW107XHJcbiAgICB0b3RhbENvdW50ID0gMDtcclxuICAgIGxvYWRlZENvdW50ID0gMDtcclxuICAgIHRvUmVxdWVzdCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRSZXF1ZXN0KG51bGwpO1xyXG4gICAgfVxyXG4gICAgZ2V0TG9jYWxTdGF0ZSgpOiBPYmplY3Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRQZXJzaXN0ZWRTdGF0ZShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkRGF0YSBjYW4gYmUgY2FsbGVkIG9ubHkgYWZ0ZXIgYWN0aXZhdGlvbi4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuZ2V0RGF0YVJlYWRQcm9taXNlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgICAgIHRoaXMuYWRkVG9DYW5jZWxsYXRpb25TZXF1ZW5jZShwcm9taXNlKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkLCB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQpO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlUmVxdWVzdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUxvY2FsU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgfVxyXG4gICAgcmVsb2FkRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8vSUxpc3RcclxuXHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgYWRkVG9DYW5jZWxsYXRpb25TZXF1ZW5jZShwcm9taXNlOiBQcm9taXNlPE9iamVjdD4pOiB2b2lkIHsgfTtcclxuICAgIGNhbmNlbFJlcXVlc3RzKCk6IHZvaWQgeyB9O1xyXG4gICAgLy8vSVJlcXVlc3RDYW5jZWxsZXJcclxuICAgIC8vL0lPYmplY3RXaXRoU3RhdGVcclxuICAgIHVzZU1vZGVsU3RhdGUgPSB0cnVlO1xyXG4gICAgc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyO1xyXG4gICAgc2F2ZVJlcXVlc3RTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlci5mbHVzaFJlcXVlc3RTdGF0ZSh0aGlzLnRvUmVxdWVzdCgpKTtcclxuICAgIH07XHJcbiAgICBzYXZlTG9jYWxTdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlci5wZXJzaXN0TG9jYWxTdGF0ZSh0aGlzLmdldExvY2FsU3RhdGUoKSk7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBnZXRSZXN0b3JlZFN0YXRlKHBhcmFtczogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2RlbFN0YXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU1hbmFnZXIubWVyZ2VTdGF0ZXMocGFyYW1zKTtcclxuICAgIH1cclxuICAgIC8vL0lPYmplY3RXaXRoU3RhdGVcclxuICAgIHNlbGVjdGlvbk1hbmFnZXI6IElTZWxlY3Rpb25NYW5hZ2VyO1xyXG4gICAgZmlsdGVyTWFuYWdlcjogSUZpbHRlck1hbmFnZXI7XHJcbiAgICBzb3J0TWFuYWdlcjogSVNvcnRNYW5hZ2VyO1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF0YVJlYWRQcm9taXNlKHJlcXVlc3RQYXJhbXM6IGFueSk6IFByb21pc2U8T2JqZWN0PjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
