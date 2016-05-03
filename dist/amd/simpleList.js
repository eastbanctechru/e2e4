define(["require", "exports", './common/defaults', './common/utility', './filterManager', './common/progressState'], function (require, exports, defaults_1, utility_1, filterManager_1, progressState_1) {
    "use strict";
    var SimpleList = (function () {
        function SimpleList(stateManager, pager) {
            this.disposed = false;
            this.inited = false;
            this.state = progressState_1.ProgressState.Initial;
            ///IList
            this.items = [];
            ///IRequestCanceller
            ///IObjectWithState
            this.useModelState = true;
            this.stateManager = stateManager;
            this.pager = pager;
            this.filterManager = new filterManager_1.FilterManager(this);
            this.filterManager.registerFilterTarget(this.pager);
            this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
            this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
        }
        SimpleList.prototype.listLoadDataSuccessCallback = function (result) {
            this.pager.processResponse(result);
            this.state = progressState_1.ProgressState.Done;
            // In case when filter changed from last request and theres no data now
            if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                this.clearData();
            }
            return result;
        };
        SimpleList.prototype.listLoadDataFailCallback = function () {
            this.state = progressState_1.ProgressState.Fail;
        };
        SimpleList.prototype.clearDataInternal = function () {
            this.pager.reset();
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
            this.pager.totalCount = 0;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZUxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFTQTtRQW1CSSxvQkFBWSxZQUEyQixFQUFFLEtBQWE7WUFRdEQsYUFBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixXQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2YsVUFBSyxHQUFrQiw2QkFBYSxDQUFDLE9BQU8sQ0FBQztZQTRCN0MsUUFBUTtZQUNSLFVBQUssR0FBYSxFQUFFLENBQUM7WUFzQ3JCLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsa0JBQWEsR0FBRyxJQUFJLENBQUM7WUE5RWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUF6Qk8sZ0RBQTJCLEdBQW5DLFVBQW9DLE1BQWM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyw2QkFBYSxDQUFDLElBQUksQ0FBQztZQUNoQyx1RUFBdUU7WUFDdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQVEsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNPLDZDQUF3QixHQUFoQztZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsNkJBQWEsQ0FBQyxJQUFJLENBQUM7UUFDcEMsQ0FBQztRQUdPLHNDQUFpQixHQUF6QjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsaUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFhRCxzQkFBSSw0QkFBSTtpQkFBUjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyw2QkFBYSxDQUFDLFFBQVEsQ0FBQztZQUNqRCxDQUFDOzs7V0FBQTtRQUVELHNCQUFJLDZCQUFLO2lCQUFUO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLDZCQUFhLENBQUMsUUFBUSxDQUFDO1lBQ2pELENBQUM7OztXQUFBO1FBRUQseUJBQUksR0FBSixVQUFLLFdBQW9CO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsNEJBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUNELDJDQUFzQixHQUF0QjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFHRCw4QkFBUyxHQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxrQ0FBYSxHQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELDZCQUFRLEdBQVI7WUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztZQUNyRSxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsNkJBQWEsQ0FBQyxRQUFRLENBQUM7WUFDcEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUMxRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsOEJBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCwrQkFBVSxHQUFWO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDRCxRQUFRO1FBRVIsb0JBQW9CO1FBQ3BCLDhDQUF5QixHQUF6QixVQUEwQixPQUF3QixJQUFVLENBQUM7O1FBQzdELG1DQUFjLEdBQWQsY0FBeUIsQ0FBQzs7UUFLMUIscUNBQWdCLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDOztRQUNELG1DQUFjLEdBQWQ7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUM7O1FBQ08scUNBQWdCLEdBQXhCLFVBQXlCLE1BQWM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUtMLGlCQUFDO0lBQUQsQ0FwSEEsQUFvSEMsSUFBQTtJQXBIcUIsa0JBQVUsYUFvSC9CLENBQUEiLCJmaWxlIjoic2ltcGxlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2ZpbHRlck1hbmFnZXInO1xyXG5pbXBvcnQge1Byb2dyZXNzU3RhdGV9IGZyb20gJy4vY29tbW9uL3Byb2dyZXNzU3RhdGUnO1xyXG5pbXBvcnQge0lTdGF0ZU1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTdGF0ZU1hbmFnZXInO1xyXG5pbXBvcnQge0lQYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVBhZ2VyJztcclxuaW1wb3J0IHtJTGlzdH0gZnJvbSAnLi9jb250cmFjdHMvSUxpc3QnO1xyXG5pbXBvcnQge0lGaWx0ZXJNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyTWFuYWdlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2ltcGxlTGlzdCBpbXBsZW1lbnRzIElMaXN0IHtcclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLnBhZ2VyLnByb2Nlc3NSZXNwb25zZShyZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgLy8gSW4gY2FzZSB3aGVuIGZpbHRlciBjaGFuZ2VkIGZyb20gbGFzdCByZXF1ZXN0IGFuZCB0aGVyZXMgbm8gZGF0YSBub3dcclxuICAgICAgICBpZiAoKHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDApID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YUZhaWxDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5GYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbEJpbmRlZDogKGVycm9yOiBPYmplY3QpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIGNsZWFyRGF0YUludGVybmFsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZXIucmVzZXQoKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIsIHBhZ2VyOiBJUGFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLnBhZ2VyID0gcGFnZXI7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyID0gbmV3IEZpbHRlck1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRoaXMucGFnZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFGYWlsQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlOiBQcm9ncmVzc1N0YXRlID0gUHJvZ3Jlc3NTdGF0ZS5Jbml0aWFsO1xyXG5cclxuICAgIGdldCBidXN5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWFkeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSAhPT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KHF1ZXJ5UGFyYW1zPzogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHJlc3RvcmVkU3RhdGUgPSB0aGlzLmdldFJlc3RvcmVkU3RhdGUocXVlcnlQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyTWFuYWdlci5wYXJzZVBhcmFtcyhyZXN0b3JlZFN0YXRlKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IHRydWU7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgICAgICBkZWxldGUgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkO1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG4gICAgaXRlbXM6IE9iamVjdFtdID0gW107XHJcbiAgICB0b1JlcXVlc3QoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUmVxdWVzdChudWxsKTtcclxuICAgIH1cclxuICAgIGdldExvY2FsU3RhdGUoKTogT2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJNYW5hZ2VyLmJ1aWxkUGVyc2lzdGVkU3RhdGUobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9hZERhdGEgY2FuIGJlIGNhbGxlZCBvbmx5IGFmdGVyIGFjdGl2YXRpb24uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhZ2VyLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmdldERhdGFSZWFkUHJvbWlzZSh0aGlzLnRvUmVxdWVzdCgpKTtcclxuICAgICAgICB0aGlzLmFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCwgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkKTtcclxuICAgICAgICBpZiAodGhpcy51c2VNb2RlbFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVJlcXVlc3RTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVMb2NhbFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgY2xlYXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXJEYXRhSW50ZXJuYWwoKTtcclxuICAgIH1cclxuICAgIHJlbG9hZERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vL0lMaXN0XHJcblxyXG4gICAgLy8vSVJlcXVlc3RDYW5jZWxsZXJcclxuICAgIGFkZFRvQ2FuY2VsbGF0aW9uU2VxdWVuY2UocHJvbWlzZTogUHJvbWlzZTxPYmplY3Q+KTogdm9pZCB7IH07XHJcbiAgICBjYW5jZWxSZXF1ZXN0cygpOiB2b2lkIHsgfTtcclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICAvLy9JT2JqZWN0V2l0aFN0YXRlXHJcbiAgICB1c2VNb2RlbFN0YXRlID0gdHJ1ZTtcclxuICAgIHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcjtcclxuICAgIHNhdmVSZXF1ZXN0U3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIuZmx1c2hSZXF1ZXN0U3RhdGUodGhpcy50b1JlcXVlc3QoKSk7XHJcbiAgICB9O1xyXG4gICAgc2F2ZUxvY2FsU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hbmFnZXIucGVyc2lzdExvY2FsU3RhdGUodGhpcy5nZXRMb2NhbFN0YXRlKCkpO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgZ2V0UmVzdG9yZWRTdGF0ZShwYXJhbXM6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVNYW5hZ2VyLm1lcmdlU3RhdGVzKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICAvLy9JT2JqZWN0V2l0aFN0YXRlXHJcbiAgICBmaWx0ZXJNYW5hZ2VyOiBJRmlsdGVyTWFuYWdlcjtcclxuICAgIHBhZ2VyOiBJUGFnZXI7XHJcbiAgICBhYnN0cmFjdCBnZXREYXRhUmVhZFByb21pc2UocmVxdWVzdFBhcmFtczogYW55KTogUHJvbWlzZTxPYmplY3Q+O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
