var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SimpleList } from './simpleList';
import { Defaults } from './common/defaults';
import { filter } from './filterAnnotation';
export class BufferedList extends SimpleList {
    constructor(stateManager) {
        super(stateManager);
        this.takeRowCountInternal = Defaults.bufferedListSettings.defaultTakeRowCount;
        this.skip = 0;
        this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
    }
    get takeRowCount() {
        return this.takeRowCountInternal;
    }
    set takeRowCount(value) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
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
    dispose() {
        super.dispose();
        delete this.bufferedLoadDataSuccessBinded;
    }
    bufferedLoadDataSuccess(result) {
        this.loadedCount = this.skip + result[Defaults.listSettings.loadedCountParameterName];
        this.skip += result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listSettings.totalCountParameterName] || 0) === 0) {
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
        this.takeRowCount = Defaults.bufferedListSettings.defaultTakeRowCount;
        this.skip = 0;
        super.onSortChangesCompleted();
    }
}
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
    __metadata('design:type', Object)
], BufferedList.prototype, "takeRowCountInternal", void 0);
__decorate([
    filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: () => { return 0; }
    }), 
    __metadata('design:type', Object)
], BufferedList.prototype, "skip", void 0);

//# sourceMappingURL=data:application/json;base64,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ZXJlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NpbXBsZUxpc3R9IGZyb20gJy4vc2ltcGxlTGlzdCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQnVmZmVyZWRMaXN0IGV4dGVuZHMgU2ltcGxlTGlzdCB7XHJcbiAgICBwcml2YXRlIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy50YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRQYXJhbSwgYWxsUGFyYW1zKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKGFsbFBhcmFtcyAmJiBhbGxQYXJhbXMuc2tpcCAhPT0gdW5kZWZpbmVkICYmIGFsbFBhcmFtcy50YWtlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxQYXJhbXMuc2tpcCArIGFsbFBhcmFtcy50YWtlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG5cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogMCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5za2lwUm93Q291bnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAoKTogbnVtYmVyID0+IHsgcmV0dXJuIDA7IH1cclxuICAgIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIHNraXAgPSAwO1xyXG5cclxuICAgIGdldCB0YWtlUm93Q291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdGFrZVJvd0NvdW50KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZVN0ciA9ICh2YWx1ZSArICcnKS5yZXBsYWNlKC9bXjAtOVxcLl0vZywgJycpO1xyXG4gICAgICAgIGxldCByb3dDb3VudCA9IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgPyBwYXJzZUludCh2YWx1ZVN0ciwgMTApIDogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICBpZiAocm93Q291bnQgPCBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5taW5Sb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb3dDb3VudCA+IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWF4Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcCArIHJvd0NvdW50ID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3dDb3VudCA9IHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2tpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudEludGVybmFsID0gcm93Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzcy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwICsgcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMuc2tpcCArPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgICAgICAvLyBJbiBjYXNlIHdoZW4gZmlsdGVyIGNoYW5nZWQgZnJvbSBsYXN0IHJlcXVlc3QgYW5kIHRoZXJlcyBubyBkYXRhIG5vd1xyXG4gICAgICAgIGlmICgocmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzdXBlci5sb2FkRGF0YS5jYWxsKHRoaXMsIC4uLkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIG9uU29ydENoYW5nZXNDb21wbGV0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIHRoaXMuc2tpcCA9IDA7XHJcbiAgICAgICAgc3VwZXIub25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
