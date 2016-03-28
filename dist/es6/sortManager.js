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
        parameterName: Defaults.listComponent.sortParameterName,
        parseFormatter: (proposedValue) => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listComponent.persistSortings
    }), 
    __metadata('design:type', Object)
], SortManager.prototype, "sortings", void 0);

//# sourceMappingURL=data:application/json;base64,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LEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlJLENBQUM7UUFDRCxTQUFTLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlO0tBQ25DLENBQUM7OzZDQUFBO0FBa0N0QiIsImZpbGUiOiJzb3J0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7U29ydFBhcmFtZXRlcn0gZnJvbSAnLi9jb21tb24vc29ydFBhcmFtZXRlcic7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydE1hbmFnZXIgaW1wbGVtZW50cyBJU29ydE1hbmFnZXIge1xyXG4gICAgc3RhdGljIGluY2x1ZGVJbih0YXJnZXQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRhcmdldC5zb3J0TWFuYWdlciA9IG5ldyBTb3J0TWFuYWdlcigpO1xyXG4gICAgfVxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbigpOiBBcnJheTxTb3J0UGFyYW1ldGVyPiB7IHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5ncyA/IF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdFNvcnRpbmdzKSA6IFtdOyB9LFxyXG4gICAgICAgIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLmxpc3RDb21wb25lbnQuc29ydFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IChwcm9wb3NlZFZhbHVlKTogQXJyYXk8T2JqZWN0PiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHByb3Bvc2VkVmFsdWUpID8gcHJvcG9zZWRWYWx1ZS5tYXAoKHNvcnQpID0+IHsgcmV0dXJuIG5ldyBTb3J0UGFyYW1ldGVyKHNvcnQuZmllbGROYW1lLCBzb3J0LmRpcmVjdGlvbiAqIDEpOyB9KSA6IFtdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGVyc2lzdGVkOiBEZWZhdWx0cy5saXN0Q29tcG9uZW50LnBlcnNpc3RTb3J0aW5nc1xyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc29ydGluZ3MgPSBuZXcgQXJyYXk8U29ydFBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRTb3J0aW5nc1ByaXZhdGU6IFNvcnRQYXJhbWV0ZXJbXSA9IG51bGw7XHJcbiAgICBnZXQgZGVmYXVsdFNvcnRpbmdzKCk6IFNvcnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTtcclxuICAgIH1cclxuICAgIHNldCBkZWZhdWx0U29ydGluZ3ModmFsdWU6IEFycmF5PFNvcnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc29ydGluZ3MgPT09IG51bGwgfHwgdGhpcy5zb3J0aW5ncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncyA9IF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0U29ydChmaWVsZE5hbWU6IHN0cmluZywgc2F2ZVByZXZpb3VzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0aW5nc1tpXS5maWVsZE5hbWUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZFNvcnQgPSB0aGlzLnNvcnRpbmdzLnNwbGljZShpLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihleGlzdGVkU29ydC5maWVsZE5hbWUsIGV4aXN0ZWRTb3J0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0LnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kZWZhdWx0U29ydGluZ3M7XHJcbiAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
