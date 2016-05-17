var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './common/defaults', './common/sortParameter', './filterAnnotation', 'lodash'], function (require, exports, defaults_1, sortParameter_1, filterAnnotation_1, _) {
    "use strict";
    var SortManager = (function () {
        function SortManager() {
            this.sortings = new Array();
            this.defaultSortingsPrivate = new Array();
        }
        Object.defineProperty(SortManager.prototype, "defaultSortings", {
            get: function () {
                return this.defaultSortingsPrivate;
            },
            set: function (value) {
                this.defaultSortingsPrivate = value;
                if (this.sortings.length === 0) {
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
            this.defaultSortingsPrivate.length = 0;
            this.sortings.length = 0;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: function () { return _.cloneDeep(this.defaultSortings || []); },
                parameterName: defaults_1.Defaults.listSettings.sortParameterName,
                parseFormatter: function (proposedValue) {
                    return Array.isArray(proposedValue) ? proposedValue.map(function (sort) { return new sortParameter_1.SortParameter(sort.fieldName, sort.direction * 1); }) : [];
                },
                persisted: defaults_1.Defaults.listSettings.persistSortings
            }), 
            __metadata('design:type', Object)
        ], SortManager.prototype, "sortings", void 0);
        return SortManager;
    }());
    exports.SortManager = SortManager;
});

//# sourceMappingURL=data:application/json;base64,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QyxlQUFlO2FBQ2xDLENBQUM7O3FEQUFBO1FBa0N2QixrQkFBQztJQUFELENBMUNBLEFBMENDLElBQUE7SUExQ1ksbUJBQVcsY0EwQ3ZCLENBQUEiLCJmaWxlIjoic29ydE1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTb3J0TWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge1NvcnRQYXJhbWV0ZXJ9IGZyb20gJy4vY29tbW9uL3NvcnRQYXJhbWV0ZXInO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNvcnRNYW5hZ2VyIGltcGxlbWVudHMgSVNvcnRNYW5hZ2VyIHtcclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCk6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHsgcmV0dXJuIF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdFNvcnRpbmdzIHx8IFtdKTsgfSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5saXN0U2V0dGluZ3Muc29ydFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IChwcm9wb3NlZFZhbHVlKTogQXJyYXk8T2JqZWN0PiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHByb3Bvc2VkVmFsdWUpID8gcHJvcG9zZWRWYWx1ZS5tYXAoKHNvcnQpID0+IHsgcmV0dXJuIG5ldyBTb3J0UGFyYW1ldGVyKHNvcnQuZmllbGROYW1lLCBzb3J0LmRpcmVjdGlvbiAqIDEpOyB9KSA6IFtdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGVyc2lzdGVkOiBEZWZhdWx0cy5saXN0U2V0dGluZ3MucGVyc2lzdFNvcnRpbmdzXHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBzb3J0aW5ncyA9IG5ldyBBcnJheTxTb3J0UGFyYW1ldGVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTogU29ydFBhcmFtZXRlcltdID0gbmV3IEFycmF5PFNvcnRQYXJhbWV0ZXI+KCk7XHJcbiAgICBnZXQgZGVmYXVsdFNvcnRpbmdzKCk6IFNvcnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTtcclxuICAgIH1cclxuICAgIHNldCBkZWZhdWx0U29ydGluZ3ModmFsdWU6IEFycmF5PFNvcnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc29ydGluZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFNvcnQoZmllbGROYW1lOiBzdHJpbmcsIHNhdmVQcmV2aW91czogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZmllbGROYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc29ydGluZ3NbaV0uZmllbGROYW1lID09PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0ZWRTb3J0ID0gdGhpcy5zb3J0aW5ncy5zcGxpY2UoaSwgMSlbMF07XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZXhpc3RlZFNvcnQuZmllbGROYW1lLCBleGlzdGVkU29ydC5kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbmV3U29ydC50b2dnbGVEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzYXZlUHJldmlvdXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
