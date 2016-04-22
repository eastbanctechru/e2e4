var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './common/defaults', './common/sortParameter', './filterAnnotation', 'lodash'], function (require, exports, defaults_1, sortParameter_1, filterAnnotation_1, _) {
    "use strict";
    var SortManager = (function () {
        function SortManager() {
            this.sortings = new Array();
            this.defaultSortingsPrivate = null;
        }
        Object.defineProperty(SortManager.prototype, "defaultSortings", {
            get: function () {
                return this.defaultSortingsPrivate;
            },
            set: function (value) {
                this.defaultSortingsPrivate = value;
                if (this.sortings === null || this.sortings.length === 0) {
                    this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
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
            delete this.defaultSortings;
            this.sortings.length = 0;
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: function () { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvcnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBT0E7UUFBQTtZQVNJLGFBQVEsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztZQUU5QiwyQkFBc0IsR0FBb0IsSUFBSSxDQUFDO1FBK0IzRCxDQUFDO1FBOUJHLHNCQUFJLHdDQUFlO2lCQUFuQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQ3ZDLENBQUM7aUJBQ0QsVUFBb0IsS0FBMkI7Z0JBQzNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztZQUNMLENBQUM7OztXQU5BO1FBT0QsNkJBQU8sR0FBUCxVQUFRLFNBQWlCLEVBQUUsWUFBcUI7WUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxRSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUM7UUFDRCw2QkFBTyxHQUFQO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBeENEO1lBQUMseUJBQU0sQ0FBQztnQkFDSixZQUFZLEVBQUUsY0FBbUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEgsYUFBYSxFQUFFLG1CQUFRLENBQUMsWUFBWSxDQUFDLGlCQUFpQjtnQkFDdEQsY0FBYyxFQUFFLFVBQUMsYUFBYTtvQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBTyxNQUFNLENBQUMsSUFBSSw2QkFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDOUksQ0FBQztnQkFDRCxTQUFTLEVBQUUsbUJBQVEsQ0FBQyxZQUFZLENBQUMsZUFBZTthQUNsQyxDQUFDOztxREFBQTtRQWtDdkIsa0JBQUM7SUFBRCxDQTFDQSxBQTBDQyxJQUFBO0lBMUNZLG1CQUFXLGNBMEN2QixDQUFBIiwiZmlsZSI6InNvcnRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU29ydE1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtTb3J0UGFyYW1ldGVyfSBmcm9tICcuL2NvbW1vbi9zb3J0UGFyYW1ldGVyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTb3J0TWFuYWdlciBpbXBsZW1lbnRzIElTb3J0TWFuYWdlciB7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uKCk6IEFycmF5PFNvcnRQYXJhbWV0ZXI+IHsgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzID8gXy5jbG9uZURlZXAodGhpcy5kZWZhdWx0U29ydGluZ3MpIDogW107IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMubGlzdFNldHRpbmdzLnNvcnRQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBhcnNlRm9ybWF0dGVyOiAocHJvcG9zZWRWYWx1ZSk6IEFycmF5PE9iamVjdD4gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9wb3NlZFZhbHVlKSA/IHByb3Bvc2VkVmFsdWUubWFwKChzb3J0KSA9PiB7IHJldHVybiBuZXcgU29ydFBhcmFtZXRlcihzb3J0LmZpZWxkTmFtZSwgc29ydC5kaXJlY3Rpb24gKiAxKTsgfSkgOiBbXTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMubGlzdFNldHRpbmdzLnBlcnNpc3RTb3J0aW5nc1xyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgc29ydGluZ3MgPSBuZXcgQXJyYXk8U29ydFBhcmFtZXRlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRTb3J0aW5nc1ByaXZhdGU6IFNvcnRQYXJhbWV0ZXJbXSA9IG51bGw7XHJcbiAgICBnZXQgZGVmYXVsdFNvcnRpbmdzKCk6IFNvcnRQYXJhbWV0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZTtcclxuICAgIH1cclxuICAgIHNldCBkZWZhdWx0U29ydGluZ3ModmFsdWU6IEFycmF5PFNvcnRQYXJhbWV0ZXI+KSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U29ydGluZ3NQcml2YXRlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc29ydGluZ3MgPT09IG51bGwgfHwgdGhpcy5zb3J0aW5ncy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncyA9IF8uY2xvbmVEZWVwKHRoaXMuZGVmYXVsdFNvcnRpbmdzUHJpdmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0U29ydChmaWVsZE5hbWU6IHN0cmluZywgc2F2ZVByZXZpb3VzOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihmaWVsZE5hbWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3J0aW5ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0aW5nc1tpXS5maWVsZE5hbWUgPT09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZFNvcnQgPSB0aGlzLnNvcnRpbmdzLnNwbGljZShpLCAxKVswXTtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnQgPSBuZXcgU29ydFBhcmFtZXRlcihleGlzdGVkU29ydC5maWVsZE5hbWUsIGV4aXN0ZWRTb3J0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0LnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRpbmdzLnB1c2gobmV3U29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5kZWZhdWx0U29ydGluZ3M7XHJcbiAgICAgICAgdGhpcy5zb3J0aW5ncy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
