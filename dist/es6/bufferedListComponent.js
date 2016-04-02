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
export class BufferedListComponent extends List {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1ZmZlcmVkTGlzdENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVE7T0FFcEIsRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUI7T0FDbkMsRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0I7QUFHekMsMkNBQW9ELElBQUk7SUEwQ3BELFlBQVksWUFBMkI7UUFDbkMsTUFBTSxZQUFZLENBQUMsQ0FBQztRQXpDaEIseUJBQW9CLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDO1FBT2xGLFNBQUksR0FBRyxDQUFDLENBQUM7UUFtQ0wsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQXhCRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFhO1FBQzFCLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUNwSCxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENB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bGUiOiJidWZmZXJlZExpc3RDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQnVmZmVyZWRMaXN0Q29tcG9uZW50IGV4dGVuZHMgTGlzdCB7XHJcbiAgICBwcml2YXRlIGJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzQmluZGVkOiAocmVzdWx0OiBPYmplY3QpID0+IE9iamVjdDtcclxuICAgIHByaXZhdGUgdGFrZVJvd0NvdW50SW50ZXJuYWwgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LnNraXBSb3dDb3VudFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6ICgpOiBudW1iZXIgPT4geyByZXR1cm4gMDsgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc2tpcCA9IDA7XHJcblxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudCxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKHByb3Bvc2VkUGFyYW0sIGFsbFBhcmFtcyk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgZ2V0IHRha2VSb3dDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRha2VSb3dDb3VudEludGVybmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0YWtlUm93Q291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XFwuXS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHJvd0NvdW50ID0gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA/IHBhcnNlSW50KHZhbHVlU3RyLCAxMCkgOiBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICBpZiAocm93Q291bnQgPCBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RDb21wb25lbnQuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvd0NvdW50ID4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50Lm1heFJvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIHJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50Lm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3MuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICBidWZmZXJlZExvYWREYXRhU3VjY2VzcyhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcCArIHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnNraXAgKz0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSB0aGlzLnNraXA7XHJcbiAgICAgICAgLy8gSW4gY2FzZSB3aGVuIGZpbHRlciBjaGFuZ2VkIGZyb20gbGFzdCByZXF1ZXN0IGFuZCB0aGVyZXMgbm8gZGF0YSBub3dcclxuICAgICAgICBpZiAoKHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDApID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5idWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBvblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0Q29tcG9uZW50LmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgICAgICBzdXBlci5vblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
