var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Defaults } from './common/defaults';
import { SortParameter } from './common/sortParameter';
import { filter } from './filterAnnotation';
import * as _ from 'lodash';
export class SortManager {
    constructor() {
        this.sortings = new Array();
        this.defaultSortingsPrivate = null;
    }
    static includeIn(target) {
        target.sortManager = new SortManager();
    }
    get defaultSortings() {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value) {
        this.defaultSortingsPrivate = value;
        if (this.sortings === null || this.sortings.length === 0) {
            this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
        }
    }
    setSort(fieldName, savePrevious) {
        let newSort = new SortParameter(fieldName);
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
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
    }
    dispose() {
        delete this.defaultSortings;
        this.sortings.length = 0;
    }
}
__decorate([
    filter({
        defaultValue: function () { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
        parameterName: Defaults.listSettings.sortParameterName,
        parseFormatter: (proposedValue) => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listSettings.persistSortings
    }), 
    __metadata('design:type', Object)
], SortManager.prototype, "sortings", void 0);

//# sourceMappingURL=data:application/json;base64,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LEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlJLENBQUM7UUFDRCxTQUFTLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxlQUFlO0tBQ2xDLENBQUM7OzZDQUFBO0FBa0N0QiIsImZpbGUiOiJzb3J0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7U29ydFBhcmFtZXRlcn0gZnJvbSAnLi9jb21tb24vc29ydFBhcmFtZXRlcic7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydE1hbmFnZXIgaW1wbGVtZW50cyBJU29ydE1hbmFnZXIge1xyXG4gICAgc3RhdGljIGluY2x1ZGVJbih0YXJnZXQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRhcmdldC5zb3J0TWFuYWdlciA9IG5ldyBTb3J0TWFuYWdlcigpO1xyXG4gICAgfVxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbigpOiBBcnJheTxTb3J0UGFyYW1ldGVyPiB7IHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5ncyA/IF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdFNvcnRpbmdzKSA6IFtdOyB9LFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmxpc3RTZXR0aW5ncy5zb3J0UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKHByb3Bvc2VkVmFsdWUpOiBBcnJheTxPYmplY3Q+ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocHJvcG9zZWRWYWx1ZSkgPyBwcm9wb3NlZFZhbHVlLm1hcCgoc29ydCkgPT4geyByZXR1cm4gbmV3IFNvcnRQYXJhbWV0ZXIoc29ydC5maWVsZE5hbWUsIHNvcnQuZGlyZWN0aW9uICogMSk7IH0pIDogW107XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwZXJzaXN0ZWQ6IERlZmF1bHRzLmxpc3RTZXR0aW5ncy5wZXJzaXN0U29ydGluZ3NcclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNvcnRpbmdzID0gbmV3IEFycmF5PFNvcnRQYXJhbWV0ZXI+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0U29ydGluZ3NQcml2YXRlOiBTb3J0UGFyYW1ldGVyW10gPSBudWxsO1xyXG4gICAgZ2V0IGRlZmF1bHRTb3J0aW5ncygpOiBTb3J0UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgZGVmYXVsdFNvcnRpbmdzKHZhbHVlOiBBcnJheTxTb3J0UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNvcnRpbmdzID09PSBudWxsIHx8IHRoaXMuc29ydGluZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MgPSBfLmNsb25lRGVlcCh0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldFNvcnQoZmllbGROYW1lOiBzdHJpbmcsIHNhdmVQcmV2aW91czogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZmllbGROYW1lKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydGluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc29ydGluZ3NbaV0uZmllbGROYW1lID09PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0ZWRTb3J0ID0gdGhpcy5zb3J0aW5ncy5zcGxpY2UoaSwgMSlbMF07XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0ID0gbmV3IFNvcnRQYXJhbWV0ZXIoZXhpc3RlZFNvcnQuZmllbGROYW1lLCBleGlzdGVkU29ydC5kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbmV3U29ydC50b2dnbGVEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzYXZlUHJldmlvdXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5wdXNoKG5ld1NvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuZGVmYXVsdFNvcnRpbmdzO1xyXG4gICAgICAgIHRoaXMuc29ydGluZ3MubGVuZ3RoID0gMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
