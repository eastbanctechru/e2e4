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
    cloneDefaultSortings() {
        return this.defaultSortingsPrivate.map(s => new SortParameter(s.fieldName, s.direction));
    }
    get defaultSortings() {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value) {
        this.defaultSortingsPrivate = value || [];
        if (this.sortings.length === 0) {
            this.sortings = this.cloneDefaultSortings();
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
        defaultValue: function () { return this.cloneDefaultSortings(); },
        parameterName: Defaults.listSettings.sortParameterName,
        parseFormatter: (proposedValue) => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listSettings.persistSortings
    }), 
    __metadata('design:type', Object)
], SortManager.prototype, "sortings", void 0);

//# sourceMappingURL=data:application/json;base64,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QUFDLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUksQ0FBQztRQUNELFNBQVMsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLGVBQWU7S0FDbEMsQ0FBQzs7NkNBQUE7QUFrQ3RCIiwiZmlsZSI6InNvcnRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtTb3J0UGFyYW1ldGVyfSBmcm9tICcuL2NvbW1vbi9zb3J0UGFyYW1ldGVyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydE1hbmFnZXIgaW1wbGVtZW50cyBJU29ydE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBjbG9uZURlZmF1bHRTb3J0aW5ncygpOiBBcnJheTxTb3J0UGFyYW1ldGVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZS5tYXAocyA9PiBuZXcgU29ydFBhcmFtZXRlcihzLmZpZWxkTmFtZSwgcy5kaXJlY3Rpb24pKTtcclxuICAgIH1cclxuICAgIEBmaWx0ZXIoe1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24gKCk6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHsgcmV0dXJuIHRoaXMuY2xvbmVEZWZhdWx0U29ydGluZ3MoKTsgfSxcclxuICAgICAgICBwYXJhbWV0ZXJOYW1lOiBEZWZhdWx0cy5saXN0U2V0dGluZ3Muc29ydFBhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgcGFyc2VGb3JtYXR0ZXI6IChwcm9wb3NlZFZhbHVlKTogQXJyYXk8T2JqZWN0PiA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHByb3Bvc2VkVmFsdWUpID8gcHJvcG9zZWRWYWx1ZS5tYXAoKHNvcnQpID0+IHsgcmV0dXJuIG5ldyBTb3J0UGFyYW1ldGVyKHNvcnQuZmllbGROYW1lLCBzb3J0LmRpcmVjdGlvbiAqIDEpOyB9KSA6IFtdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGVyc2lzdGVkOiBEZWZhdWx0cy5saXN0U2V0dGluZ3MucGVyc2lzdFNvcnRpbmdzXHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBzb3J0aW5ncyA9IG5ldyBBcnJheTxTb3J0UGFyYW1ldGVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTogU29ydFBhcmFtZXRlcltdID0gbmV3IEFycmF5PFNvcnRQYXJhbWV0ZXI+KCk7XHJcbiAgICBnZXQgZGVmYXVsdFNvcnRpbmdzKCk6IFNvcnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTtcclxuICAgIH1cclxuICAgIHNldCBkZWZhdWx0U29ydGluZ3ModmFsdWU6IEFycmF5PFNvcnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlID0gdmFsdWUgfHwgW107XHJcbiAgICAgICAgaWYgKHRoaXMuc29ydGluZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGluZ3MgPSB0aGlzLmNsb25lRGVmYXVsdFNvcnRpbmdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0U29ydChmaWVsZE5hbWU6IHN0cmluZywgc2F2ZVByZXZpb3VzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0aW5nc1tpXS5maWVsZE5hbWUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZFNvcnQgPSB0aGlzLnNvcnRpbmdzLnNwbGljZShpLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihleGlzdGVkU29ydC5maWVsZE5hbWUsIGV4aXN0ZWRTb3J0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0LnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNvcnRpbmdzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
