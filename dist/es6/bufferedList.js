var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { List } from './list';
import { Defaults } from './common/defaults';
import { filter } from './filterAnnotation';
export class BufferedList extends List {
    constructor(stateManager, sortManager) {
        super(stateManager, sortManager);
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

//# sourceMappingURL=data:application/json;base64,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O0FBdUR0QiIsImZpbGUiOiJidWZmZXJlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJ1ZmZlcmVkTGlzdCBleHRlbmRzIExpc3Qge1xyXG4gICAgcHJpdmF0ZSBidWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDogKHJlc3VsdDogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKHByb3Bvc2VkUGFyYW0sIGFsbFBhcmFtcyk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBwcml2YXRlIHRha2VSb3dDb3VudEludGVybmFsID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3Muc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKCk6IG51bWJlciA9PiB7IHJldHVybiAwOyB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBza2lwID0gMDtcclxuXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTlcXC5dL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgaWYgKHJvd0NvdW50IDwgRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXI6IElTb3J0TWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3MocmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSB0aGlzLnNraXAgKyByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5za2lwICs9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwO1xyXG4gICAgICAgIC8vIEluIGNhc2Ugd2hlbiBmaWx0ZXIgY2hhbmdlZCBmcm9tIGxhc3QgcmVxdWVzdCBhbmQgdGhlcmVzIG5vIGRhdGEgbm93XHJcbiAgICAgICAgaWYgKChyZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHN1cGVyLmxvYWREYXRhLmNhbGwodGhpcywgLi4uQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgICAgICBzdXBlci5vblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
