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
        SortManager.prototype.cloneSortings = function (toClone) {
            return (Array.isArray(toClone) ? toClone : []).map(function (s) { return new sortParameter_1.SortParameter(s.fieldName, s.direction); });
        };
        Object.defineProperty(SortManager.prototype, "defaultSortings", {
            get: function () {
                return this.defaultSortingsPrivate;
            },
            set: function (value) {
                this.defaultSortingsPrivate = value;
                if (this.sortings.length === 0) {
                    this.sortings = this.cloneSortings(this.defaultSortingsPrivate);
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
                defaultValue: function () { return this.cloneSortings(this.defaultSortingsPrivate); },
                parameterName: defaults_1.Defaults.listSettings.sortParameterName,
                parseFormatter: function (proposedValue) {
                    return Array.isArray(proposedValue) ? proposedValue.map(function (sort) { return new sortParameter_1.SortParameter(sort.fieldName, sort.direction * 1); }) : [];
                },
                persisted: defaults_1.Defaults.listSettings.persistSortings
            }), 
            __metadata('design:type', Object)
        ], SortManager.prototype, "sortings", void 0);
        return SortManager;
    }());
    exports.SortManager = SortManager;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvcnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtZQVlJLGFBQVEsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztZQUU5QiwyQkFBc0IsR0FBb0IsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUErQmpGLENBQUM7UUE1Q1csbUNBQWEsR0FBckIsVUFBc0IsT0FBNkI7WUFDL0MsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSw2QkFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLENBQUM7UUFDekcsQ0FBQztRQVlELHNCQUFJLHdDQUFlO2lCQUFuQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ3ZDLENBQUM7aUJBQ0QsVUFBb0IsS0FBMkI7Z0JBQzNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDcEUsQ0FBQztZQUNMLENBQUM7OztXQU5BO1FBT0QsNkJBQU8sR0FBUCxVQUFRLFNBQWlCLEVBQUUsWUFBcUI7WUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxRSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUM7UUFDRCw2QkFBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUF4Q0Q7WUFBQyx5QkFBTSxDQUFDO2dCQUNKLFlBQVksRUFBRSxjQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNHLGFBQWEsRUFBRSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7Z0JBQ3RELGNBQWMsRUFBRSxVQUFDLGFBQWE7b0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQU8sTUFBTSxDQUFDLElBQUksNkJBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzlJLENBQUM7Z0JBQ0QsU0FBUyxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLGVBQWU7YUFDbEMsQ0FBQzs7cURBQUE7UUFrQ3ZCLGtCQUFDO0lBQUQsQ0E3Q0EsQUE2Q0MsSUFBQTtJQTdDWSxtQkFBVyxjQTZDdkIsQ0FBQSIsImZpbGUiOiJzb3J0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7U29ydFBhcmFtZXRlcn0gZnJvbSAnLi9jb21tb24vc29ydFBhcmFtZXRlcic7XHJcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICcuL2ZpbHRlckFubm90YXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNvcnRNYW5hZ2VyIGltcGxlbWVudHMgSVNvcnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgY2xvbmVTb3J0aW5ncyh0b0Nsb25lOiBBcnJheTxTb3J0UGFyYW1ldGVyPik6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHtcclxuICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkodG9DbG9uZSkgPyB0b0Nsb25lIDogW10pLm1hcChzID0+IG5ldyBTb3J0UGFyYW1ldGVyKHMuZmllbGROYW1lLCBzLmRpcmVjdGlvbikpO1xyXG4gICAgfVxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmdW5jdGlvbiAoKTogQXJyYXk8U29ydFBhcmFtZXRlcj4geyByZXR1cm4gdGhpcy5jbG9uZVNvcnRpbmdzKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMubGlzdFNldHRpbmdzLnNvcnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRWYWx1ZSk6IEFycmF5PE9iamVjdD4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9wb3NlZFZhbHVlKSA/IHByb3Bvc2VkVmFsdWUubWFwKChzb3J0KSA9PiB7IHJldHVybiBuZXcgU29ydFBhcmFtZXRlcihzb3J0LmZpZWxkTmFtZSwgc29ydC5kaXJlY3Rpb24gKiAxKTsgfSkgOiBbXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMubGlzdFNldHRpbmdzLnBlcnNpc3RTb3J0aW5nc1xyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc29ydGluZ3MgPSBuZXcgQXJyYXk8U29ydFBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRTb3J0aW5nc1ByaXZhdGU6IFNvcnRQYXJhbWV0ZXJbXSA9IG5ldyBBcnJheTxTb3J0UGFyYW1ldGVyPigpO1xyXG4gICAgZ2V0IGRlZmF1bHRTb3J0aW5ncygpOiBTb3J0UGFyYW1ldGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgZGVmYXVsdFNvcnRpbmdzKHZhbHVlOiBBcnJheTxTb3J0UGFyYW1ldGVyPikge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnNvcnRpbmdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzID0gdGhpcy5jbG9uZVNvcnRpbmdzKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0U29ydChmaWVsZE5hbWU6IHN0cmluZywgc2F2ZVByZXZpb3VzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0aW5nc1tpXS5maWVsZE5hbWUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZFNvcnQgPSB0aGlzLnNvcnRpbmdzLnNwbGljZShpLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihleGlzdGVkU29ydC5maWVsZE5hbWUsIGV4aXN0ZWRTb3J0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0LnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTb3J0aW5nc1ByaXZhdGUubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNvcnRpbmdzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
