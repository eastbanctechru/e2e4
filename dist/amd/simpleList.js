define(["require", "exports", './common/defaults', './common/utility', './filterManager', './common/progressState'], function (require, exports, defaults_1, utility_1, filterManager_1, progressState_1) {
    "use strict";
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
});

//# sourceMappingURL=data:application/json;base64,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QUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBQ0QsUUFBUTtRQUVSLG9CQUFvQjtRQUNwQiw4Q0FBeUIsR0FBekIsVUFBMEIsT0FBd0IsSUFBVSxDQUFDOztRQUM3RCxtQ0FBYyxHQUFkLGNBQXlCLENBQUM7O1FBSzFCLHFDQUFnQixHQUFoQjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQzs7UUFDRCxtQ0FBYyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM5RCxDQUFDOztRQUNPLHFDQUFnQixHQUF4QixVQUF5QixNQUFjO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFLTCxpQkFBQztJQUFELENBbEhBLEFBa0hDLElBQUE7SUFsSHFCLGtCQUFVLGFBa0gvQixDQUFBIiwiZmlsZSI6InNpbXBsZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7VXRpbGl0eX0gZnJvbSAnLi9jb21tb24vdXRpbGl0eSc7XHJcbmltcG9ydCB7RmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9maWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL2NvbW1vbi9wcm9ncmVzc1N0YXRlJztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtJUGFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lQYWdlcic7XHJcbmltcG9ydCB7SUxpc3R9IGZyb20gJy4vY29udHJhY3RzL0lMaXN0JztcclxuaW1wb3J0IHtJRmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlck1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUxpc3QgaW1wbGVtZW50cyBJTGlzdCB7XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIsIHBhZ2VyOiBJUGFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLnBhZ2VyID0gcGFnZXI7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyID0gbmV3IEZpbHRlck1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQgPSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZWQgPSBmYWxzZTtcclxuICAgIGluaXRlZCA9IGZhbHNlO1xyXG4gICAgc3RhdGU6IFByb2dyZXNzU3RhdGUgPSBQcm9ncmVzc1N0YXRlLkluaXRpYWw7XHJcblxyXG4gICAgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlICE9PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQocXVlcnlQYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzdG9yZWRTdGF0ZShxdWVyeVBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnBhcnNlUGFyYW1zKHJlc3RvcmVkU3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YUZhaWxCaW5kZWQ7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGFJbnRlcm5hbCgpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcbiAgICBpdGVtczogT2JqZWN0W10gPSBbXTtcclxuICAgIHRvdGFsQ291bnQgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQgPSAwO1xyXG4gICAgdG9SZXF1ZXN0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFJlcXVlc3QobnVsbCk7XHJcbiAgICB9XHJcbiAgICBnZXRMb2NhbFN0YXRlKCk6IE9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTWFuYWdlci5idWlsZFBlcnNpc3RlZFN0YXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWREYXRhIGNhbiBiZSBjYWxsZWQgb25seSBhZnRlciBhY3RpdmF0aW9uLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5nZXREYXRhUmVhZFByb21pc2UodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2UpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQsIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZXF1ZXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG5cclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICBhZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2U6IFByb21pc2U8T2JqZWN0Pik6IHZvaWQgeyB9O1xyXG4gICAgY2FuY2VsUmVxdWVzdHMoKTogdm9pZCB7IH07XHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgdXNlTW9kZWxTdGF0ZSA9IHRydWU7XHJcbiAgICBzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXI7XHJcbiAgICBzYXZlUmVxdWVzdFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLmZsdXNoUmVxdWVzdFN0YXRlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgfTtcclxuICAgIHNhdmVMb2NhbFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBlcnNpc3RMb2NhbFN0YXRlKHRoaXMuZ2V0TG9jYWxTdGF0ZSgpKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFJlc3RvcmVkU3RhdGUocGFyYW1zOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5tZXJnZVN0YXRlcyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgZmlsdGVyTWFuYWdlcjogSUZpbHRlck1hbmFnZXI7XHJcbiAgICBwYWdlcjogSVBhZ2VyO1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF0YVJlYWRQcm9taXNlKHJlcXVlc3RQYXJhbXM6IGFueSk6IFByb21pc2U8T2JqZWN0PjtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
