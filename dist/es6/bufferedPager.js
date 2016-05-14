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
import { filter } from './filterAnnotation';
export class BufferedPager {
    constructor() {
        this.takeRowCountInternal = Defaults.bufferedListSettings.defaultTakeRowCount;
        this.totalCount = 0;
        this.loadedCount = 0;
        this.skip = 0;
    }
    get takeRowCount() {
        return this.takeRowCountInternal;
    }
    set takeRowCount(value) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListSettings.defaultTakeRowCount;
        if (rowCount < Defaults.bufferedListSettings.minRowCount) {
            rowCount = Defaults.bufferedListSettings.defaultTakeRowCount;
        }
        if (rowCount > Defaults.bufferedListSettings.maxRowCount) {
            rowCount = Defaults.bufferedListSettings.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }
    processResponse(result) {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName] || 0;
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.skip += result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
    }
    reset() {
        this.totalCount = 0;
        this.takeRowCount = Defaults.bufferedListSettings.defaultTakeRowCount;
        this.skip = 0;
    }
}
__decorate([
    filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: () => { return 0; }
    }), 
    __metadata('design:type', Object)
], BufferedPager.prototype, "skip", void 0);
__decorate([
    filter({
        defaultValue: Defaults.bufferedListSettings.defaultTakeRowCount,
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: (proposedParam, allParams) => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListSettings.defaultTakeRowCount;
        }
    }), 
    __metadata('design:type', Number)
], BufferedPager.prototype, "takeRowCount", null);

//# sourceMappingURL=data:application/json;base64,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QUFDLG9CQUFvQixDQUFDLG1CQUFtQjtRQUMvRCxhQUFhLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLHlCQUF5QjtRQUN0RSxjQUFjLEVBQUUsQ0FBQyxhQUFrQixFQUFFLFNBQWM7WUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUMzQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUM3RCxDQUFDO0tBQ2EsQ0FBQzs7aURBQUE7QUFrQ3RCIiwiZmlsZSI6ImJ1ZmZlcmVkUGFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SVBhZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JUGFnZXInO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCdWZmZXJlZFBhZ2VyIGltcGxlbWVudHMgSVBhZ2VyIHtcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGxvYWRlZENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5za2lwUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDA7IH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNraXAgPSAwO1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbTogYW55LCBhbGxQYXJhbXM6IGFueSk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgaWYgKHJvd0NvdW50IDwgRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NSZXNwb25zZShyZXN1bHQ6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc2tpcCArPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
