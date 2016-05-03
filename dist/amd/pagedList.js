var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './simpleList', './common/utility'], function (require, exports, simpleList_1, utility_1) {
    "use strict";
    var PagedList = (function (_super) {
        __extends(PagedList, _super);
        function PagedList(stateManager, pager) {
            _super.call(this, stateManager, pager);
        }
        PagedList.prototype.loadData = function () {
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            utility_1.Utility.disposeAll(this.items);
            return promise;
            var _a;
        };
        PagedList.prototype.goToFirstPage = function () {
            if (this.pager.pageNumber > 1) {
                this.pager.pageNumber = 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToPreviousPage = function () {
            if (this.pager.pageNumber > 1) {
                this.pager.pageNumber -= 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToNextPage = function () {
            if (this.pager.pageNumber < this.pager.pageCount) {
                this.pager.pageNumber += 1;
                this.loadData();
            }
        };
        PagedList.prototype.goToLastPage = function () {
            if (this.pager.pageNumber < this.pager.pageCount) {
                this.pager.pageNumber = this.pager.pageCount;
                this.loadData();
            }
        };
        return PagedList;
    }(simpleList_1.SimpleList));
    exports.PagedList = PagedList;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBUUE7UUFBd0MsNkJBQVU7UUFDOUMsbUJBQVksWUFBMkIsRUFBRSxLQUFpQjtZQUN0RCxrQkFBTSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELDRCQUFRLEdBQVI7WUFDSSxJQUFNLE9BQU8sR0FBRyxNQUFBLGdCQUFLLENBQUMsUUFBUSxFQUFDLElBQUksWUFBQyxJQUFJLFNBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUM7WUFDcEYsaUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUM7O1FBQ25CLENBQUM7UUFDRCxpQ0FBYSxHQUFiO1lBQ0ksRUFBRSxDQUFDLENBQWMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDRCxvQ0FBZ0IsR0FBaEI7WUFDSSxFQUFFLENBQUMsQ0FBYyxJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELGdDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBYyxJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLEtBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNELGdDQUFZLEdBQVo7WUFDSSxFQUFFLENBQUMsQ0FBYyxJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLEtBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsS0FBTSxDQUFDLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLEtBQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ3VDLHVCQUFVLEdBa0NqRDtJQWxDcUIsaUJBQVMsWUFrQzlCLENBQUEiLCJmaWxlIjoicGFnZWRMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTaW1wbGVMaXN0fSBmcm9tICcuL3NpbXBsZUxpc3QnO1xyXG5pbXBvcnQge1BhZ2VkUGFnZXJ9IGZyb20gJy4vcGFnZWRQYWdlcic7XHJcbmltcG9ydCB7VXRpbGl0eX0gZnJvbSAnLi9jb21tb24vdXRpbGl0eSc7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFnZWRMaXN0IGV4dGVuZHMgU2ltcGxlTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIsIHBhZ2VyOiBQYWdlZFBhZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyLCBwYWdlcik7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGEoKTogUHJvbWlzZTxPYmplY3Q+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlID0gc3VwZXIubG9hZERhdGEuY2FsbCh0aGlzLCAuLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBnb1RvRmlyc3RQYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgoPFBhZ2VkUGFnZXI+dGhpcy5wYWdlcikucGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgKDxQYWdlZFBhZ2VyPnRoaXMucGFnZXIpLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub1ByZXZpb3VzUGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoKDxQYWdlZFBhZ2VyPnRoaXMucGFnZXIpLnBhZ2VOdW1iZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICg8UGFnZWRQYWdlcj50aGlzLnBhZ2VyKS5wYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCg8UGFnZWRQYWdlcj50aGlzLnBhZ2VyKS5wYWdlTnVtYmVyIDwgKDxQYWdlZFBhZ2VyPnRoaXMucGFnZXIpLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICAoPFBhZ2VkUGFnZXI+dGhpcy5wYWdlcikucGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub0xhc3RQYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgoPFBhZ2VkUGFnZXI+dGhpcy5wYWdlcikucGFnZU51bWJlciA8ICg8UGFnZWRQYWdlcj50aGlzLnBhZ2VyKS5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgKDxQYWdlZFBhZ2VyPnRoaXMucGFnZXIpLnBhZ2VOdW1iZXIgPSAoPFBhZ2VkUGFnZXI+dGhpcy5wYWdlcikucGFnZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
