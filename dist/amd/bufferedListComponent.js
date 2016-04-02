var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './list', './common/defaults', './filterAnnotation'], function (require, exports, list_1, defaults_1, filterAnnotation_1) {
    "use strict";
    var BufferedListComponent = (function (_super) {
        __extends(BufferedListComponent, _super);
        function BufferedListComponent(stateManager) {
            _super.call(this, stateManager);
            this.takeRowCountInternal = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
            this.skip = 0;
            this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
        }
        Object.defineProperty(BufferedListComponent.prototype, "takeRowCount", {
            get: function () {
                return this.takeRowCountInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                if (rowCount < defaults_1.Defaults.bufferedListComponent.minRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                }
                if (rowCount > defaults_1.Defaults.bufferedListComponent.maxRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListComponent.maxRowCount;
                }
                if (this.totalCount !== 0) {
                    if (this.skip + rowCount > this.totalCount) {
                        rowCount = this.totalCount - this.skip;
                    }
                }
                this.takeRowCountInternal = rowCount;
            },
            enumerable: true,
            configurable: true
        });
        BufferedListComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            delete this.bufferedLoadDataSuccessBinded;
        };
        BufferedListComponent.prototype.bufferedLoadDataSuccess = function (result) {
            this.loadedCount = this.skip + result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.loadedCount = this.skip;
            // In case when filter changed from last request and theres no data now
            if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                this.clearData();
            }
            return result;
        };
        BufferedListComponent.prototype.loadData = function () {
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            promise.then(this.bufferedLoadDataSuccessBinded);
            return promise;
            var _a;
        };
        BufferedListComponent.prototype.onSortChangesCompleted = function () {
            this.takeRowCount = defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
            this.skip = 0;
            _super.prototype.onSortChangesCompleted.call(this);
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListComponent.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedListComponent.prototype, "skip", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount,
                parameterName: defaults_1.Defaults.bufferedListComponent.takeRowCountParameterName,
                parseFormatter: function (proposedParam, allParams) {
                    if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                        return allParams.skip + allParams.take;
                    }
                    return defaults_1.Defaults.bufferedListComponent.defaultTakeRowCount;
                }
            }), 
            __metadata('design:type', Number)
        ], BufferedListComponent.prototype, "takeRowCount", null);
        return BufferedListComponent;
    }(list_1.List));
    exports.BufferedListComponent = BufferedListComponent;
});

//# sourceMappingURL=data:application/json;base64,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Q0F6RW1ELFdBQUksR0F5RXZEO0lBekVxQiw2QkFBcUIsd0JBeUUxQyxDQUFBIiwiZmlsZSI6ImJ1ZmZlcmVkTGlzdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdH0gZnJvbSAnLi9saXN0JztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCdWZmZXJlZExpc3RDb21wb25lbnQgZXh0ZW5kcyBMaXN0IHtcclxuICAgIHByaXZhdGUgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSB0YWtlUm93Q291bnRJbnRlcm5hbCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKCk6IG51bWJlciA9PiB7IHJldHVybiAwOyB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBza2lwID0gMDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50LFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbSwgYWxsUGFyYW1zKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGFsbFBhcmFtcyAmJiBhbGxQYXJhbXMuc2tpcCAhPT0gdW5kZWZpbmVkICYmIGFsbFBhcmFtcy50YWtlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxQYXJhbXMuc2tpcCArIGFsbFBhcmFtcy50YWtlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTlcXC5dL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIGlmIChyb3dDb3VudCA8IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5taW5Sb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWF4Um93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWF4Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcCArIHJvd0NvdW50ID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3dDb3VudCA9IHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2tpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudEludGVybmFsID0gcm93Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzcy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwICsgcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMuc2tpcCArPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgICAgICAvLyBJbiBjYXNlIHdoZW4gZmlsdGVyIGNoYW5nZWQgZnJvbSBsYXN0IHJlcXVlc3QgYW5kIHRoZXJlcyBubyBkYXRhIG5vd1xyXG4gICAgICAgIGlmICgocmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzdXBlci5sb2FkRGF0YS5jYWxsKHRoaXMsIC4uLkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgICAgIHN1cGVyLm9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
