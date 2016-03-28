var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ListComponent } from './listComponent';
import { Defaults } from './common/defaults';
import { filter } from './filterAnnotation';
export class BufferedListComponent extends ListComponent {
    constructor(stateManager) {
        super(stateManager);
        this.takeRowCountInternal = Defaults.bufferedListComponent.defaultTakeRowCount;
        this.skip = 0;
        this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
    }
    get takeRowCount() {
        return this.takeRowCountInternal;
    }
    set takeRowCount(value) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListComponent.defaultTakeRowCount;
        if (rowCount < Defaults.bufferedListComponent.minRowCount) {
            rowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        }
        if (rowCount > Defaults.bufferedListComponent.maxRowCount) {
            rowCount = Defaults.bufferedListComponent.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }
    dispose() {
        super.dispose();
        delete this.bufferedLoadDataSuccessBinded;
    }
    bufferedLoadDataSuccess(result) {
        this.loadedCount = this.skip + result[Defaults.listComponent.loadedCountParameterName];
        this.skip += result[Defaults.listComponent.loadedCountParameterName];
        this.loadedCount = this.skip;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listComponent.totalCountParameterName] || 0) === 0) {
            this.clearData();
        }
        return result;
    }
    loadData() {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        promise.then(this.bufferedLoadDataSuccessBinded);
        return promise;
    }
    onSortChangesCompleted() {
        this.takeRowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        this.skip = 0;
        super.onSortChangesCompleted();
    }
}
__decorate([
    filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListComponent.skipRowCountParameterName,
        parseFormatter: () => { return 0; }
    }), 
    __metadata('design:type', Object)
], BufferedListComponent.prototype, "skip", void 0);
__decorate([
    filter({
        defaultValue: Defaults.bufferedListComponent.defaultTakeRowCount,
        parameterName: Defaults.bufferedListComponent.takeRowCountParameterName,
        parseFormatter: (proposedParam, allParams) => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListComponent.defaultTakeRowCount;
        }
    }), 
    __metadata('design:type', Number)
], BufferedListComponent.prototype, "takeRowCount", null);

//# sourceMappingURL=data:application/json;base64,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ZmlsZSI6ImJ1ZmZlcmVkTGlzdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdENvbXBvbmVudH0gZnJvbSAnLi9saXN0Q29tcG9uZW50JztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCdWZmZXJlZExpc3RDb21wb25lbnQgZXh0ZW5kcyBMaXN0Q29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSB0YWtlUm93Q291bnRJbnRlcm5hbCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKCk6IG51bWJlciA9PiB7IHJldHVybiAwOyB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBza2lwID0gMDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50LFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbSwgYWxsUGFyYW1zKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGFsbFBhcmFtcyAmJiBhbGxQYXJhbXMuc2tpcCAhPT0gdW5kZWZpbmVkICYmIGFsbFBhcmFtcy50YWtlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxQYXJhbXMuc2tpcCArIGFsbFBhcmFtcy50YWtlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTlcXC5dL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIGlmIChyb3dDb3VudCA8IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5taW5Sb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdENvbXBvbmVudC5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWF4Um93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWF4Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcCArIHJvd0NvdW50ID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3dDb3VudCA9IHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2tpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudEludGVybmFsID0gcm93Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzcy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwICsgcmVzdWx0W0RlZmF1bHRzLmxpc3RDb21wb25lbnQubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnNraXAgKz0gcmVzdWx0W0RlZmF1bHRzLmxpc3RDb21wb25lbnQubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwO1xyXG4gICAgICAgIC8vIEluIGNhc2Ugd2hlbiBmaWx0ZXIgY2hhbmdlZCBmcm9tIGxhc3QgcmVxdWVzdCBhbmQgdGhlcmVzIG5vIGRhdGEgbm93XHJcbiAgICAgICAgaWYgKChyZXN1bHRbRGVmYXVsdHMubGlzdENvbXBvbmVudC50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzdXBlci5sb2FkRGF0YS5jYWxsKHRoaXMsIC4uLkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB0aGlzLnNraXAgPSAwO1xyXG4gICAgICAgIHN1cGVyLm9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
