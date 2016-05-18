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
export class SortManager {
    constructor() {
        this.sortings = new Array();
        this.defaultSortingsPrivate = new Array();
    }
    cloneSortings(toClone) {
        return (Array.isArray(toClone) ? toClone : []).map(s => new SortParameter(s.fieldName, s.direction));
    }
    get defaultSortings() {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value) {
        this.defaultSortingsPrivate = value;
        if (this.sortings.length === 0) {
            this.sortings = this.cloneSortings(this.defaultSortingsPrivate);
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
        this.defaultSortingsPrivate.length = 0;
        this.sortings.length = 0;
    }
}
__decorate([
    filter({
        defaultValue: function () { return this.cloneSortings(this.defaultSortingsPrivate); },
        parameterName: Defaults.listSettings.sortParameterName,
        parseFormatter: (proposedValue) => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listSettings.persistSortings
    }), 
    __metadata('design:type', Object)
], SortManager.prototype, "sortings", void 0);

//# sourceMappingURL=data:application/json;base64,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RUFBRSxDQUFDLGFBQWE7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlJLENBQUM7UUFDRCxTQUFTLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxlQUFlO0tBQ2xDLENBQUM7OzZDQUFBO0FBa0N0QiIsImZpbGUiOiJzb3J0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7U29ydFBhcmFtZXRlcn0gZnJvbSAnLi9jb21tb24vc29ydFBhcmFtZXRlcic7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNvcnRNYW5hZ2VyIGltcGxlbWVudHMgSVNvcnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY2xvbmVTb3J0aW5ncyh0b0Nsb25lOiBBcnJheTxTb3J0UGFyYW1ldGVyPik6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkodG9DbG9uZSkgPyB0b0Nsb25lIDogW10pLm1hcChzID0+IG5ldyBTb3J0UGFyYW1ldGVyKHMuZmllbGROYW1lLCBzLmRpcmVjdGlvbikpO1xyXG4gICAgfVxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKTogQXJyYXk8U29ydFBhcmFtZXRlcj4geyByZXR1cm4gdGhpcy5jbG9uZVNvcnRpbmdzKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMubGlzdFNldHRpbmdzLnNvcnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRWYWx1ZSk6IEFycmF5PE9iamVjdD4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9wb3NlZFZhbHVlKSA/IHByb3Bvc2VkVmFsdWUubWFwKChzb3J0KSA9PiB7IHJldHVybiBuZXcgU29ydFBhcmFtZXRlcihzb3J0LmZpZWxkTmFtZSwgc29ydC5kaXJlY3Rpb24gKiAxKTsgfSkgOiBbXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMubGlzdFNldHRpbmdzLnBlcnNpc3RTb3J0aW5nc1xyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc29ydGluZ3MgPSBuZXcgQXJyYXk8U29ydFBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRTb3J0aW5nc1ByaXZhdGU6IFNvcnRQYXJhbWV0ZXJbXSA9IG5ldyBBcnJheTxTb3J0UGFyYW1ldGVyPigpO1xyXG4gICAgZ2V0IGRlZmF1bHRTb3J0aW5ncygpOiBTb3J0UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgZGVmYXVsdFNvcnRpbmdzKHZhbHVlOiBBcnJheTxTb3J0UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNvcnRpbmdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzID0gdGhpcy5jbG9uZVNvcnRpbmdzKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0U29ydChmaWVsZE5hbWU6IHN0cmluZywgc2F2ZVByZXZpb3VzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0aW5nc1tpXS5maWVsZE5hbWUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZFNvcnQgPSB0aGlzLnNvcnRpbmdzLnNwbGljZShpLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihleGlzdGVkU29ydC5maWVsZE5hbWUsIGV4aXN0ZWRTb3J0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0LnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNvcnRpbmdzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
