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
define(["require", "exports", './listComponent', './common/defaults', './filterAnnotation'], function (require, exports, listComponent_1, defaults_1, filterAnnotation_1) {
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
            this.loadedCount = this.skip + result[defaults_1.Defaults.listComponent.loadedCountParameterName];
            this.skip += result[defaults_1.Defaults.listComponent.loadedCountParameterName];
            this.loadedCount = this.skip;
            // In case when filter changed from last request and theres no data now
            if ((result[defaults_1.Defaults.listComponent.totalCountParameterName] || 0) === 0) {
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
    }(listComponent_1.ListComponent));
    exports.BufferedListComponent = BufferedListComponent;
});

//# sourceMappingURL=data:application/json;base64,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Q0F6RW1ELDZCQUFhLEdBeUVoRTtJQXpFcUIsNkJBQXFCLHdCQXlFMUMsQ0FBQSIsImZpbGUiOiJidWZmZXJlZExpc3RDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RDb21wb25lbnR9IGZyb20gJy4vbGlzdENvbXBvbmVudCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQnVmZmVyZWRMaXN0Q29tcG9uZW50IGV4dGVuZHMgTGlzdENvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LnNraXBSb3dDb3VudFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMDsgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc2tpcCA9IDA7XHJcblxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKHByb3Bvc2VkUGFyYW0sIGFsbFBhcmFtcyk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgZ2V0IHRha2VSb3dDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRha2VSb3dDb3VudEludGVybmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0YWtlUm93Q291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHJvd0NvdW50ID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICBpZiAocm93Q291bnQgPCBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvd0NvdW50ID4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50Lm1heFJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50Lm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3MuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICBidWZmZXJlZExvYWREYXRhU3VjY2VzcyhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcCArIHJlc3VsdFtEZWZhdWx0cy5saXN0Q29tcG9uZW50LmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5za2lwICs9IHJlc3VsdFtEZWZhdWx0cy5saXN0Q29tcG9uZW50LmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgICAgICAvLyBJbiBjYXNlIHdoZW4gZmlsdGVyIGNoYW5nZWQgZnJvbSBsYXN0IHJlcXVlc3QgYW5kIHRoZXJlcyBubyBkYXRhIG5vd1xyXG4gICAgICAgIGlmICgocmVzdWx0W0RlZmF1bHRzLmxpc3RDb21wb25lbnQudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDApID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgICAgICBzdXBlci5vblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
