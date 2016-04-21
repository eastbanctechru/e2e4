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
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
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
                defaultValue: defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount,
                parameterName: defaults_1.Defaults.bufferedListSettings.takeRowCountParameterName,
                parseFormatter: function (proposedParam, allParams) {
                    if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                        return allParams.skip + allParams.take;
                    }
                    return defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
            }), 
            __metadata('design:type', Object)
        ], BufferedList.prototype, "takeRowCountInternal", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedList.prototype, "skip", void 0);
        return BufferedList;
    }(list_1.List));
    exports.BufferedList = BufferedList;
});

//# sourceMappingURL=data:application/json;base64,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QUksR0F5RTlDO0lBekVxQixvQkFBWSxlQXlFakMsQ0FBQSIsImZpbGUiOiJidWZmZXJlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQnVmZmVyZWRMaXN0IGV4dGVuZHMgTGlzdCB7XHJcbiAgICBwcml2YXRlIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbSwgYWxsUGFyYW1zKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGFsbFBhcmFtcyAmJiBhbGxQYXJhbXMuc2tpcCAhPT0gdW5kZWZpbmVkICYmIGFsbFBhcmFtcy50YWtlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxQYXJhbXMuc2tpcCArIGFsbFBhcmFtcy50YWtlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5za2lwUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDA7IH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNraXAgPSAwO1xyXG5cclxuICAgIGdldCB0YWtlUm93Q291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdGFrZVJvd0NvdW50KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVN0ciA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXjAtOVxcLl0vZywgJycpO1xyXG4gICAgICAgIGxldCByb3dDb3VudCA9IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgPyBwYXJzZUludCh2YWx1ZVN0ciwgMTApIDogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICBpZiAocm93Q291bnQgPCBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5taW5Sb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb3dDb3VudCA+IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWF4Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcCArIHJvd0NvdW50ID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3dDb3VudCA9IHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2tpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudEludGVybmFsID0gcm93Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzcy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwICsgcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMuc2tpcCArPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgICAgICAvLyBJbiBjYXNlIHdoZW4gZmlsdGVyIGNoYW5nZWQgZnJvbSBsYXN0IHJlcXVlc3QgYW5kIHRoZXJlcyBubyBkYXRhIG5vd1xyXG4gICAgICAgIGlmICgocmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzdXBlci5sb2FkRGF0YS5jYWxsKHRoaXMsIC4uLkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIHRoaXMuc2tpcCA9IDA7XHJcbiAgICAgICAgc3VwZXIub25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
