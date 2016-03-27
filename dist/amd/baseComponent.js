define(["require", "exports", './common/progressState'], function (require, exports, progressState_1) {
    "use strict";
    var BaseComponent = (function () {
        function BaseComponent() {
            this.disposed = false;
            this.inited = false;
            this.title = null;
            this.state = null;
        }
        Object.defineProperty(BaseComponent.prototype, "busy", {
            get: function () {
                return this.state === progressState_1.ProgressState.Progress;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseComponent.prototype, "ready", {
            get: function () {
                return this.state !== progressState_1.ProgressState.Progress;
            },
            enumerable: true,
            configurable: true
        });
        BaseComponent.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.inited = true;
        };
        BaseComponent.prototype.dispose = function () {
            this.disposed = true;
        };
        return BaseComponent;
    }());
    exports.BaseComponent = BaseComponent;
    ;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFDQTtRQUFBO1lBQ0ksYUFBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixXQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2YsVUFBSyxHQUFXLElBQUksQ0FBQztZQUNyQixVQUFLLEdBQWtCLElBQUksQ0FBQztRQWdCaEMsQ0FBQztRQWRHLHNCQUFJLCtCQUFJO2lCQUFSO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLDZCQUFhLENBQUMsUUFBUSxDQUFDO1lBQ2pELENBQUM7OztXQUFBO1FBRUQsc0JBQUksZ0NBQUs7aUJBQVQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssNkJBQWEsQ0FBQyxRQUFRLENBQUM7WUFDakQsQ0FBQzs7O1dBQUE7UUFFRCw0QkFBSSxHQUFKO1lBQUssY0FBaUI7aUJBQWpCLFdBQWlCLENBQWpCLHNCQUFpQixDQUFqQixJQUFpQjtnQkFBakIsNkJBQWlCOztZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsK0JBQU8sR0FBUDtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDTCxvQkFBQztJQUFELENBcEJBLEFBb0JDLElBQUE7SUFwQnFCLHFCQUFhLGdCQW9CbEMsQ0FBQTtJQUFBLENBQUMiLCJmaWxlIjoiYmFzZUNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tcG9uZW50IHtcclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHRpdGxlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgc3RhdGU6IFByb2dyZXNzU3RhdGUgPSBudWxsO1xyXG5cclxuICAgIGdldCBidXN5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWFkeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSAhPT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KC4uLmFyZ3M6IE9iamVjdFtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
