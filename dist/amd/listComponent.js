define(["require", "exports", './common/defaults', './common/utility', './selectionManager', './filterManager', './common/progressState', './sortManager'], function (require, exports, defaults_1, utility_1, selectionManager_1, filterManager_1, progressState_1, sortManager_1) {
    "use strict";
    var ListComponent = (function () {
        function ListComponent(stateManager) {
            this.disposed = false;
            this.inited = false;
            this.state = null;
            ///IList
            this.items = [];
            this.totalCount = 0;
            this.loadedCount = 0;
            ///IRequestCanceller
            ///IComponentWithState
            this.useModelState = true;
            this.stateManager = stateManager;
            selectionManager_1.SelectionManager.includeIn(this, 'items');
            filterManager_1.FilterManager.includeIn(this);
            sortManager_1.SortManager.includeIn(this);
            this.filterManager.registerFilterTarget(this.sortManager);
            this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
            this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
        }
        ListComponent.prototype.listLoadDataSuccessCallback = function (result) {
            this.loadedCount = result[defaults_1.Defaults.listComponent.loadedCountParameterName];
            this.totalCount = result[defaults_1.Defaults.listComponent.totalCountParameterName] || 0;
            this.state = progressState_1.ProgressState.Done;
            return result;
        };
        ListComponent.prototype.listLoadDataFailCallback = function () {
            this.state = progressState_1.ProgressState.Fail;
        };
        ListComponent.prototype.clearDataInternal = function () {
            this.totalCount = 0;
            this.selectionManager.deselectAll();
            utility_1.Utility.disposeAll(this.items);
        };
        Object.defineProperty(ListComponent.prototype, "busy", {
            get: function () {
                return this.state === progressState_1.ProgressState.Progress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "ready", {
            get: function () {
                return this.state !== progressState_1.ProgressState.Progress;
            },
            enumerable: true,
            configurable: true
        });
        ///IComponent overrides
        ListComponent.prototype.init = function (queryParams) {
            this.inited = true;
            var restoredState = this.getRestoredState(queryParams);
            this.filterManager.parseParams(restoredState);
        };
        ListComponent.prototype.dispose = function () {
            this.disposed = true;
            delete this.listLoadDataSuccessBinded;
            delete this.listLoadDataFailBinded;
            this.clearDataInternal();
            this.sortManager.dispose();
            this.filterManager.dispose();
            this.selectionManager.dispose();
        };
        ///IComponent overrides
        ListComponent.prototype.onSortChangesCompleted = function () {
            if (this.ready) {
                this.clearDataInternal();
                this.loadData();
            }
        };
        ListComponent.prototype.toRequest = function () {
            return this.filterManager.buildRequest(null);
        };
        ListComponent.prototype.getLocalState = function () {
            return this.filterManager.buildPersistedState(null);
        };
        ListComponent.prototype.loadData = function () {
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
        ListComponent.prototype.clearData = function () {
            this.clearDataInternal();
        };
        ListComponent.prototype.reloadData = function () {
            if (this.ready) {
                this.clearData();
                this.loadData();
            }
        };
        ///IList
        ///IRequestCanceller
        ListComponent.prototype.addToCancellationSequence = function (promise) { };
        ;
        ListComponent.prototype.cancelRequests = function () { };
        ;
        ListComponent.prototype.saveRequestState = function () {
            this.stateManager.flushRequestState(this.toRequest());
        };
        ;
        ListComponent.prototype.saveLocalState = function () {
            this.stateManager.persistLocalState(this.getLocalState());
        };
        ;
        ListComponent.prototype.getRestoredState = function (params) {
            if (this.useModelState === false) {
                return params;
            }
            return this.stateManager.mergeStates(params);
        };
        return ListComponent;
    }());
    exports.ListComponent = ListComponent;
});

//# sourceMappingURL=data:application/json;base64,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eEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFDRCxpQ0FBUyxHQUFUO1lBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUNELGtDQUFVLEdBQVY7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELFFBQVE7UUFFUixvQkFBb0I7UUFDcEIsaURBQXlCLEdBQXpCLFVBQTBCLE9BQXdCLElBQVUsQ0FBQzs7UUFDN0Qsc0NBQWMsR0FBZCxjQUF5QixDQUFDOztRQUsxQix3Q0FBZ0IsR0FBaEI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7O1FBQ0Qsc0NBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQzs7UUFDTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsTUFBYztZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBTUwsb0JBQUM7SUFBRCxDQTFIQSxBQTBIQyxJQUFBO0lBMUhxQixxQkFBYSxnQkEwSGxDLENBQUEiLCJmaWxlIjoibGlzdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL3NlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0ZpbHRlck1hbmFnZXJ9IGZyb20gJy4vZmlsdGVyTWFuYWdlcic7XHJcbmltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7SUxpc3R9IGZyb20gJy4vY29udHJhY3RzL0lMaXN0JztcclxuaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7U29ydE1hbmFnZXJ9IGZyb20gJy4vc29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0lGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyTWFuYWdlcic7XHJcbmltcG9ydCB7SVNlbGVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3Rpb25NYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgSUxpc3Qge1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2socmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdENvbXBvbmVudC5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0Q29tcG9uZW50LnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICBTZWxlY3Rpb25NYW5hZ2VyLmluY2x1ZGVJbih0aGlzLCAnaXRlbXMnKTtcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICBTb3J0TWFuYWdlci5pbmNsdWRlSW4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRoaXMuc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFGYWlsQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlOiBQcm9ncmVzc1N0YXRlID0gbnVsbDtcclxuXHJcbiAgICBnZXQgYnVzeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgIT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vSUNvbXBvbmVudCBvdmVycmlkZXNcclxuICAgIGluaXQocXVlcnlQYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzdG9yZWRTdGF0ZShxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnBhcnNlUGFyYW1zKHJlc3RvcmVkU3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgIHRoaXMuc29ydE1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICAgIC8vL0lDb21wb25lbnQgb3ZlcnJpZGVzXHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcbiAgICBpdGVtczogT2JqZWN0W10gPSBbXTtcclxuICAgIHRvdGFsQ291bnQgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQgPSAwO1xyXG4gICAgdG9SZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFJlcXVlc3QobnVsbCk7XHJcbiAgICB9XHJcbiAgICBnZXRMb2NhbFN0YXRlKCk6IE9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFBlcnNpc3RlZFN0YXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWREYXRhIGNhbiBiZSBjYWxsZWQgb25seSBhZnRlciBhY3RpdmF0aW9uLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5nZXREYXRhUmVhZFByb21pc2UoKTtcclxuICAgICAgICB0aGlzLmFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCwgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkKTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2RlbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVJlcXVlc3RTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVMb2NhbFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY2xlYXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcblxyXG4gICAgLy8vSVJlcXVlc3RDYW5jZWxsZXJcclxuICAgIGFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZTogUHJvbWlzZTxPYmplY3Q+KTogdm9pZCB7IH07XHJcbiAgICBjYW5jZWxSZXF1ZXN0cygpOiB2b2lkIHsgfTtcclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICAvLy9JQ29tcG9uZW50V2l0aFN0YXRlXHJcbiAgICB1c2VNb2RlbFN0YXRlID0gdHJ1ZTtcclxuICAgIHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcjtcclxuICAgIHNhdmVSZXF1ZXN0U3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuZmx1c2hSZXF1ZXN0U3RhdGUodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICB9O1xyXG4gICAgc2F2ZUxvY2FsU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIucGVyc2lzdExvY2FsU3RhdGUodGhpcy5nZXRMb2NhbFN0YXRlKCkpO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgZ2V0UmVzdG9yZWRTdGF0ZShwYXJhbXM6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVNYW5hZ2VyLm1lcmdlU3RhdGVzKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICAvLy9JQ29tcG9uZW50V2l0aFN0YXRlXHJcbiAgICBzZWxlY3Rpb25NYW5hZ2VyOiBJU2VsZWN0aW9uTWFuYWdlcjtcclxuICAgIGZpbHRlck1hbmFnZXI6IElGaWx0ZXJNYW5hZ2VyO1xyXG4gICAgc29ydE1hbmFnZXI6IElTb3J0TWFuYWdlcjtcclxuICAgIGFic3RyYWN0IGdldERhdGFSZWFkUHJvbWlzZSgpOiBQcm9taXNlPE9iamVjdD47XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
