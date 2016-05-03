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
define(["require", "exports", './simpleList', './common/defaults', './filterAnnotation'], function (require, exports, simpleList_1, defaults_1, filterAnnotation_1) {
    "use strict";
    var BufferedList = (function (_super) {
        __extends(BufferedList, _super);
        function BufferedList(stateManager) {
            _super.call(this, stateManager);
            this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.skip = 0;
            this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
        }
        Object.defineProperty(BufferedList.prototype, "takeRowCount", {
            get: function () {
                return this.takeRowCountInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                if (rowCount < defaults_1.Defaults.bufferedListSettings.minRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
                if (rowCount > defaults_1.Defaults.bufferedListSettings.maxRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.maxRowCount;
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
        BufferedList.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            delete this.bufferedLoadDataSuccessBinded;
        };
        BufferedList.prototype.bufferedLoadDataSuccess = function (result) {
            this.loadedCount = this.skip + result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.loadedCount = this.skip;
            // In case when filter changed from last request and theres no data now
            if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                this.clearData();
            }
            return result;
        };
        BufferedList.prototype.clearData = function () {
            _super.prototype.clearData.call(this);
            this.skip = 0;
            this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
        };
        BufferedList.prototype.loadData = function () {
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            promise.then(this.bufferedLoadDataSuccessBinded);
            return promise;
            var _a;
        };
        BufferedList.prototype.onSortChangesCompleted = function () {
            this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.skip = 0;
            _super.prototype.onSortChangesCompleted.call(this);
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedList.prototype, "skip", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount,
                parameterName: defaults_1.Defaults.bufferedListSettings.takeRowCountParameterName,
                parseFormatter: function (proposedParam, allParams) {
                    if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                        return allParams.skip + allParams.take;
                    }
                    return defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
            }), 
            __metadata('design:type', Number)
        ], BufferedList.prototype, "takeRowCount", null);
        return BufferedList;
    }(simpleList_1.SimpleList));
    exports.BufferedList = BufferedList;
});

//# sourceMappingURL=data:application/json;base64,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QUcsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxNQUFNLENBQUMsbUJBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDN0QsQ0FBQzthQUNhLENBQUM7O3dEQUFBO1FBeUR2QixtQkFBQztJQUFELENBN0VBLEFBNkVDLENBN0UwQyx1QkFBVSxHQTZFcEQ7SUE3RXFCLG9CQUFZLGVBNkVqQyxDQUFBIiwiZmlsZSI6ImJ1ZmZlcmVkTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2ltcGxlTGlzdH0gZnJvbSAnLi9zaW1wbGVMaXN0JztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCdWZmZXJlZExpc3QgZXh0ZW5kcyBTaW1wbGVMaXN0IHtcclxuICAgIHByaXZhdGUgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSB0YWtlUm93Q291bnRJbnRlcm5hbCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcblxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLnNraXBSb3dDb3VudFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMDsgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc2tpcCA9IDA7XHJcblxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50LFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLnRha2VSb3dDb3VudFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IChwcm9wb3NlZFBhcmFtLCBhbGxQYXJhbXMpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWxsUGFyYW1zICYmIGFsbFBhcmFtcy5za2lwICE9PSB1bmRlZmluZWQgJiYgYWxsUGFyYW1zLnRha2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsbFBhcmFtcy5za2lwICsgYWxsUGFyYW1zLnRha2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgZ2V0IHRha2VSb3dDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRha2VSb3dDb3VudEludGVybmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0YWtlUm93Q291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHJvd0NvdW50ID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIGlmIChyb3dDb3VudCA8IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1pblJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvd0NvdW50ID4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWF4Um93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxDb3VudCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5za2lwICsgcm93Q291bnQgPiB0aGlzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHJvd0NvdW50ID0gdGhpcy50b3RhbENvdW50IC0gdGhpcy5za2lwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWwgPSByb3dDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICBzdXBlcihzdGF0ZU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3MocmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSB0aGlzLnNraXAgKyByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5za2lwICs9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwO1xyXG4gICAgICAgIC8vIEluIGNhc2Ugd2hlbiBmaWx0ZXIgY2hhbmdlZCBmcm9tIGxhc3QgcmVxdWVzdCBhbmQgdGhlcmVzIG5vIGRhdGEgbm93XHJcbiAgICAgICAgaWYgKChyZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgY2xlYXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2tpcCA9IDA7XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgfVxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgICAgIHN1cGVyLm9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
