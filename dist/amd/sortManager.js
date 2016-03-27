var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './common/defaults', './common/sortParameter', './filterAnnotation'], function (require, exports, defaults_1, sortParameter_1, filterAnnotation_1) {
    "use strict";
    var SortManager = (function () {
        function SortManager() {
            this.sortings = new Array();
            this.defaultSortingsPrivate = null;
        }
        SortManager.includeIn = function (target) {
            target.sortManager = new SortManager();
        };
        Object.defineProperty(SortManager.prototype, "defaultSortings", {
            get: function () {
                return this.defaultSortingsPrivate;
            },
            set: function (value) {
                this.defaultSortingsPrivate = value;
                if (this.sortings === null || this.sortings.length === 0) {
                    this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
                }
            },
            enumerable: true,
            configurable: true
        });
        SortManager.prototype.setSort = function (fieldName, savePrevious) {
            var newSort = new sortParameter_1.SortParameter(fieldName);
            for (var i = 0; i < this.sortings.length; i++) {
                if (this.sortings[i].fieldName === fieldName) {
                    var existedSort = this.sortings.splice(i, 1)[0];
                    newSort = new sortParameter_1.SortParameter(existedSort.fieldName, existedSort.direction);
                    newSort.toggleDirection();
                    break;
                }
            }
            if (savePrevious) {
                this.sortings.push(newSort);
            }
            else {
                this.sortings.length = 0;
                this.sortings.push(newSort);
            }
        };
        SortManager.prototype.dispose = function () {
            delete this.defaultSortings;
            this.sortings.length = 0;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: function () { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
                parameterName: defaults_1.Defaults.listComponent.sortParameterName,
                parseFormatter: function (proposedValue) {
                    return Array.isArray(proposedValue) ? proposedValue.map(function (sort) { return new sortParameter_1.SortParameter(sort.fieldName, sort.direction * 1); }) : [];
                },
                persisted: defaults_1.Defaults.listComponent.persistSortings
            }), 
            __metadata('design:type', Object)
        ], SortManager.prototype, "sortings", void 0);
        return SortManager;
    }());
    exports.SortManager = SortManager;
});

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzlJLENBQUM7Z0JBQ0QsU0FBUyxFQUFFLG1CQUFRLENBQUMsYUFBYSxDQUFDLGVBQWU7YUFDbkMsQ0FBQzs7cURBQUE7UUFrQ3ZCLGtCQUFDO0lBQUQsQ0E3Q0EsQUE2Q0MsSUFBQTtJQTdDWSxtQkFBVyxjQTZDdkIsQ0FBQSIsImZpbGUiOiJzb3J0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7U29ydFBhcmFtZXRlcn0gZnJvbSAnLi9jb21tb24vc29ydFBhcmFtZXRlcic7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNvcnRNYW5hZ2VyIGltcGxlbWVudHMgSVNvcnRNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBpbmNsdWRlSW4odGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0YXJnZXQuc29ydE1hbmFnZXIgPSBuZXcgU29ydE1hbmFnZXIoKTtcclxuICAgIH1cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24oKTogQXJyYXk8U29ydFBhcmFtZXRlcj4geyByZXR1cm4gdGhpcy5kZWZhdWx0U29ydGluZ3MgPyBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRTb3J0aW5ncykgOiBbXTsgfSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5saXN0Q29tcG9uZW50LnNvcnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRWYWx1ZSk6IEFycmF5PE9iamVjdD4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9wb3NlZFZhbHVlKSA/IHByb3Bvc2VkVmFsdWUubWFwKChzb3J0KSA9PiB7IHJldHVybiBuZXcgU29ydFBhcmFtZXRlcihzb3J0LmZpZWxkTmFtZSwgc29ydC5kaXJlY3Rpb24gKiAxKTsgfSkgOiBbXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMubGlzdENvbXBvbmVudC5wZXJzaXN0U29ydGluZ3NcclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNvcnRpbmdzID0gbmV3IEFycmF5PFNvcnRQYXJhbWV0ZXI+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0U29ydGluZ3NQcml2YXRlOiBTb3J0UGFyYW1ldGVyW10gPSBudWxsO1xyXG4gICAgZ2V0IGRlZmF1bHRTb3J0aW5ncygpOiBTb3J0UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgZGVmYXVsdFNvcnRpbmdzKHZhbHVlOiBBcnJheTxTb3J0UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNvcnRpbmdzID09PSBudWxsIHx8IHRoaXMuc29ydGluZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFNvcnQoZmllbGROYW1lOiBzdHJpbmcsIHNhdmVQcmV2aW91czogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZmllbGROYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc29ydGluZ3NbaV0uZmllbGROYW1lID09PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0ZWRTb3J0ID0gdGhpcy5zb3J0aW5ncy5zcGxpY2UoaSwgMSlbMF07XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZXhpc3RlZFNvcnQuZmllbGROYW1lLCBleGlzdGVkU29ydC5kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbmV3U29ydC50b2dnbGVEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzYXZlUHJldmlvdXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZGVmYXVsdFNvcnRpbmdzO1xyXG4gICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
