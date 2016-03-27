var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './baseComponent', './common/defaults', './common/utility', './selectionManager', './filterManager', './common/progressState', './sortManager'], function (require, exports, baseComponent_1, defaults_1, utility_1, selectionManager_1, filterManager_1, progressState_1, sortManager_1) {
    "use strict";
    var ListComponent = (function (_super) {
        __extends(ListComponent, _super);
        function ListComponent(stateManager) {
            _super.call(this);
            ///IListComponent
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
        ///IComponent overrides
        ListComponent.prototype.init = function (queryParams) {
            _super.prototype.init.call(this);
            var restoredState = this.getRestoredState(queryParams);
            this.filterManager.parseParams(restoredState);
        };
        ListComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
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
        ///IListComponent
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
    }(baseComponent_1.BaseComponent));
    exports.ListComponent = ListComponent;
});

//# sourceMappingURL=data:application/json;base64,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QyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELGlCQUFpQjtRQUVqQixvQkFBb0I7UUFDcEIsaURBQXlCLEdBQXpCLFVBQTBCLE9BQXdCLElBQVUsQ0FBQzs7UUFDN0Qsc0NBQWMsR0FBZCxjQUF5QixDQUFDOztRQUsxQix3Q0FBZ0IsR0FBaEI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFELENBQUM7O1FBQ0Qsc0NBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQzs7UUFDTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsTUFBYztZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBTUwsb0JBQUM7SUFBRCxDQS9HQSxBQStHQyxDQS9HMkMsNkJBQWEsR0ErR3hEO0lBL0dxQixxQkFBYSxnQkErR2xDLENBQUEiLCJmaWxlIjoibGlzdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi9iYXNlQ29tcG9uZW50JztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge1NlbGVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vc2VsZWN0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7RmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9maWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL2NvbW1vbi9wcm9ncmVzc1N0YXRlJztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtJTGlzdENvbXBvbmVudH0gZnJvbSAnLi9jb250cmFjdHMvSUxpc3RDb21wb25lbnQnO1xyXG5pbXBvcnQge0lTb3J0TWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtTb3J0TWFuYWdlcn0gZnJvbSAnLi9zb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7SUZpbHRlck1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgSUxpc3RDb21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2socmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdENvbXBvbmVudC5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0Q29tcG9uZW50LnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyID0gc3RhdGVNYW5hZ2VyO1xyXG4gICAgICAgIFNlbGVjdGlvbk1hbmFnZXIuaW5jbHVkZUluKHRoaXMsICdpdGVtcycpO1xyXG4gICAgICAgIEZpbHRlck1hbmFnZXIuaW5jbHVkZUluKHRoaXMpO1xyXG4gICAgICAgIFNvcnRNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIucmVnaXN0ZXJGaWx0ZXJUYXJnZXQodGhpcy5zb3J0TWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQgPSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSUNvbXBvbmVudCBvdmVycmlkZXNcclxuICAgIGluaXQocXVlcnlQYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzdG9yZWRTdGF0ZShxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnBhcnNlUGFyYW1zKHJlc3RvcmVkU3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkO1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICB0aGlzLnNvcnRNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLy9JQ29tcG9uZW50IG92ZXJyaWRlc1xyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdENvbXBvbmVudFxyXG4gICAgaXRlbXM6IE9iamVjdFtdID0gW107XHJcbiAgICB0b3RhbENvdW50ID0gMDtcclxuICAgIGxvYWRlZENvdW50ID0gMDtcclxuICAgIHRvUmVxdWVzdCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRSZXF1ZXN0KG51bGwpO1xyXG4gICAgfVxyXG4gICAgZ2V0TG9jYWxTdGF0ZSgpOiBPYmplY3Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRQZXJzaXN0ZWRTdGF0ZShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkRGF0YSBjYW4gYmUgY2FsbGVkIG9ubHkgYWZ0ZXIgYWN0aXZhdGlvbi4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuZ2V0RGF0YVJlYWRQcm9taXNlKCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2UpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQsIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZXF1ZXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdENvbXBvbmVudFxyXG5cclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICBhZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2U6IFByb21pc2U8T2JqZWN0Pik6IHZvaWQgeyB9O1xyXG4gICAgY2FuY2VsUmVxdWVzdHMoKTogdm9pZCB7IH07XHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgLy8vSUNvbXBvbmVudFdpdGhTdGF0ZVxyXG4gICAgdXNlTW9kZWxTdGF0ZSA9IHRydWU7XHJcbiAgICBzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXI7XHJcbiAgICBzYXZlUmVxdWVzdFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLmZsdXNoUmVxdWVzdFN0YXRlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgfTtcclxuICAgIHNhdmVMb2NhbFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBlcnNpc3RMb2NhbFN0YXRlKHRoaXMuZ2V0TG9jYWxTdGF0ZSgpKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFJlc3RvcmVkU3RhdGUocGFyYW1zOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5tZXJnZVN0YXRlcyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSUNvbXBvbmVudFdpdGhTdGF0ZVxyXG4gICAgc2VsZWN0aW9uTWFuYWdlcjogSVNlbGVjdGlvbk1hbmFnZXI7XHJcbiAgICBmaWx0ZXJNYW5hZ2VyOiBJRmlsdGVyTWFuYWdlcjtcclxuICAgIHNvcnRNYW5hZ2VyOiBJU29ydE1hbmFnZXI7XHJcbiAgICBhYnN0cmFjdCBnZXREYXRhUmVhZFByb21pc2UoKTogUHJvbWlzZTxPYmplY3Q+O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
