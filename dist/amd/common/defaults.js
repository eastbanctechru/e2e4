define(["require", "exports"], function (require, exports) {
    "use strict";
    var Defaults = (function () {
        function Defaults() {
        }
        Defaults.listSettings = {
            contextAreaSelector: '#contextMenu',
            loadedCountParameterName: 'loadedCount',
            persistSortings: true,
            sortParameterName: 'sort',
            totalCountParameterName: 'totalCount'
        };
        Defaults.bufferedListSettings = {
            defaultTakeRowCount: 20,
            maxRowCount: 200,
            minRowCount: 0,
            skipRowCountParameterName: 'skip',
            takeRowCountParameterName: 'take'
        };
        Defaults.pagedListSettings = {
            defaultPageSize: 20,
            displayFromParameterName: 'displayFrom',
            displayToParameterName: 'displayTo',
            maxPageSize: 200,
            minPageSize: 0,
            pageNumberParameterName: 'pageNumber',
            pageSizeParameterName: 'pageSize',
            persistPageSize: true
        };
        Defaults.uiSettings = {
            elementVisibilityInterval: 500,
            progressDelayInterval: 500
        };
        return Defaults;
    }());
    exports.Defaults = Defaults;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUFnQ0EsQ0FBQztRQS9CVSxxQkFBWSxHQUNuQjtZQUNJLG1CQUFtQixFQUFFLGNBQWM7WUFDbkMsd0JBQXdCLEVBQUUsYUFBYTtZQUN2QyxlQUFlLEVBQUUsSUFBSTtZQUNyQixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLHVCQUF1QixFQUFFLFlBQVk7U0FDeEMsQ0FBQztRQUNLLDZCQUFvQixHQUMzQjtZQUNJLG1CQUFtQixFQUFFLEVBQUU7WUFDdkIsV0FBVyxFQUFFLEdBQUc7WUFDaEIsV0FBVyxFQUFFLENBQUM7WUFDZCx5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLHlCQUF5QixFQUFFLE1BQU07U0FDcEMsQ0FBQztRQUNLLDBCQUFpQixHQUN4QjtZQUNJLGVBQWUsRUFBRSxFQUFFO1lBQ25CLHdCQUF3QixFQUFFLGFBQWE7WUFDdkMsc0JBQXNCLEVBQUUsV0FBVztZQUNuQyxXQUFXLEVBQUUsR0FBRztZQUNoQixXQUFXLEVBQUUsQ0FBQztZQUNkLHVCQUF1QixFQUFFLFlBQVk7WUFDckMscUJBQXFCLEVBQUUsVUFBVTtZQUNqQyxlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDO1FBQ0ssbUJBQVUsR0FBRztZQUNoQix5QkFBeUIsRUFBRSxHQUFHO1lBQzlCLHFCQUFxQixFQUFFLEdBQUc7U0FDN0IsQ0FBQztRQUNOLGVBQUM7SUFBRCxDQWhDQSxBQWdDQyxJQUFBO0lBaENZLGdCQUFRLFdBZ0NwQixDQUFBIiwiZmlsZSI6ImNvbW1vbi9kZWZhdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEZWZhdWx0cyB7XHJcbiAgICBzdGF0aWMgbGlzdFNldHRpbmdzID1cclxuICAgIHtcclxuICAgICAgICBjb250ZXh0QXJlYVNlbGVjdG9yOiAnI2NvbnRleHRNZW51JyxcclxuICAgICAgICBsb2FkZWRDb3VudFBhcmFtZXRlck5hbWU6ICdsb2FkZWRDb3VudCcsXHJcbiAgICAgICAgcGVyc2lzdFNvcnRpbmdzOiB0cnVlLFxyXG4gICAgICAgIHNvcnRQYXJhbWV0ZXJOYW1lOiAnc29ydCcsXHJcbiAgICAgICAgdG90YWxDb3VudFBhcmFtZXRlck5hbWU6ICd0b3RhbENvdW50J1xyXG4gICAgfTtcclxuICAgIHN0YXRpYyBidWZmZXJlZExpc3RTZXR0aW5ncyA9XHJcbiAgICB7XHJcbiAgICAgICAgZGVmYXVsdFRha2VSb3dDb3VudDogMjAsXHJcbiAgICAgICAgbWF4Um93Q291bnQ6IDIwMCxcclxuICAgICAgICBtaW5Sb3dDb3VudDogMCxcclxuICAgICAgICBza2lwUm93Q291bnRQYXJhbWV0ZXJOYW1lOiAnc2tpcCcsXHJcbiAgICAgICAgdGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZTogJ3Rha2UnXHJcbiAgICB9O1xyXG4gICAgc3RhdGljIHBhZ2VkTGlzdFNldHRpbmdzID1cclxuICAgIHtcclxuICAgICAgICBkZWZhdWx0UGFnZVNpemU6IDIwLFxyXG4gICAgICAgIGRpc3BsYXlGcm9tUGFyYW1ldGVyTmFtZTogJ2Rpc3BsYXlGcm9tJyxcclxuICAgICAgICBkaXNwbGF5VG9QYXJhbWV0ZXJOYW1lOiAnZGlzcGxheVRvJyxcclxuICAgICAgICBtYXhQYWdlU2l6ZTogMjAwLFxyXG4gICAgICAgIG1pblBhZ2VTaXplOiAwLFxyXG4gICAgICAgIHBhZ2VOdW1iZXJQYXJhbWV0ZXJOYW1lOiAncGFnZU51bWJlcicsXHJcbiAgICAgICAgcGFnZVNpemVQYXJhbWV0ZXJOYW1lOiAncGFnZVNpemUnLFxyXG4gICAgICAgIHBlcnNpc3RQYWdlU2l6ZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHN0YXRpYyB1aVNldHRpbmdzID0ge1xyXG4gICAgICAgIGVsZW1lbnRWaXNpYmlsaXR5SW50ZXJ2YWw6IDUwMCxcclxuICAgICAgICBwcm9ncmVzc0RlbGF5SW50ZXJ2YWw6IDUwMFxyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
