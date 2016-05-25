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
            this.defaultSortingsPrivate = new Array();
        }
        SortManager.prototype.cloneDefaultSortings = function () {
            return this.defaultSortingsPrivate.map(function (s) { return new sortParameter_1.SortParameter(s.fieldName, s.direction); });
        };
        Object.defineProperty(SortManager.prototype, "defaultSortings", {
            get: function () {
                return this.defaultSortingsPrivate;
            },
            set: function (value) {
                this.defaultSortingsPrivate = value || [];
                if (this.sortings.length === 0) {
                    this.sortings = this.cloneDefaultSortings();
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
                defaultValue: function () { return this.cloneDefaultSortings(); },
                parameterName: defaults_1.Defaults.listSettings.sortParameterName,
                parseFormatter: function (rawValue) {
                    return Array.isArray(rawValue) ? rawValue.map(function (sort) { return new sortParameter_1.SortParameter(sort.fieldName, sort.direction * 1); }) : [];
                },
                persisted: defaults_1.Defaults.listSettings.persistSortings
            }), 
            __metadata('design:type', Object)
        ], SortManager.prototype, "sortings", void 0);
        return SortManager;
    }());
    exports.SortManager = SortManager;
});

//# sourceMappingURL=data:application/json;base64,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QUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDcEksQ0FBQztnQkFDRCxTQUFTLEVBQUUsbUJBQVEsQ0FBQyxZQUFZLENBQUMsZUFBZTthQUNsQyxDQUFDOztxREFBQTtRQWtDdkIsa0JBQUM7SUFBRCxDQTdDQSxBQTZDQyxJQUFBO0lBN0NZLG1CQUFXLGNBNkN2QixDQUFBIiwiZmlsZSI6InNvcnRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtTb3J0UGFyYW1ldGVyfSBmcm9tICcuL2NvbW1vbi9zb3J0UGFyYW1ldGVyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydE1hbmFnZXIgaW1wbGVtZW50cyBJU29ydE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBjbG9uZURlZmF1bHRTb3J0aW5ncygpOiBBcnJheTxTb3J0UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZS5tYXAocyA9PiBuZXcgU29ydFBhcmFtZXRlcihzLmZpZWxkTmFtZSwgcy5kaXJlY3Rpb24pKTtcclxuICAgIH1cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCk6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHsgcmV0dXJuIHRoaXMuY2xvbmVEZWZhdWx0U29ydGluZ3MoKTsgfSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5saXN0U2V0dGluZ3Muc29ydFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IGZ1bmN0aW9uIChyYXdWYWx1ZTogYW55KTogQXJyYXk8T2JqZWN0PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHJhd1ZhbHVlKSA/IHJhd1ZhbHVlLm1hcCgoc29ydCkgPT4geyByZXR1cm4gbmV3IFNvcnRQYXJhbWV0ZXIoc29ydC5maWVsZE5hbWUsIHNvcnQuZGlyZWN0aW9uICogMSk7IH0pIDogW107XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwZXJzaXN0ZWQ6IERlZmF1bHRzLmxpc3RTZXR0aW5ncy5wZXJzaXN0U29ydGluZ3NcclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNvcnRpbmdzID0gbmV3IEFycmF5PFNvcnRQYXJhbWV0ZXI+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0U29ydGluZ3NQcml2YXRlOiBTb3J0UGFyYW1ldGVyW10gPSBuZXcgQXJyYXk8U29ydFBhcmFtZXRlcj4oKTtcclxuICAgIGdldCBkZWZhdWx0U29ydGluZ3MoKTogU29ydFBhcmFtZXRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IGRlZmF1bHRTb3J0aW5ncyh2YWx1ZTogQXJyYXk8U29ydFBhcmFtZXRlcj4pIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUgPSB2YWx1ZSB8fCBbXTtcclxuICAgICAgICBpZiAodGhpcy5zb3J0aW5ncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncyA9IHRoaXMuY2xvbmVEZWZhdWx0U29ydGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRTb3J0KGZpZWxkTmFtZTogc3RyaW5nLCBzYXZlUHJldmlvdXM6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbmV3U29ydCA9IG5ldyBTb3J0UGFyYW1ldGVyKGZpZWxkTmFtZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvcnRpbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnRpbmdzW2ldLmZpZWxkTmFtZSA9PT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGVkU29ydCA9IHRoaXMuc29ydGluZ3Muc3BsaWNlKGksIDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgbmV3U29ydCA9IG5ldyBTb3J0UGFyYW1ldGVyKGV4aXN0ZWRTb3J0LmZpZWxkTmFtZSwgZXhpc3RlZFNvcnQuZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQudG9nZ2xlRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2F2ZVByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MucHVzaChuZXdTb3J0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MucHVzaChuZXdTb3J0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZS5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
