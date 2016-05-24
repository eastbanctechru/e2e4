define(["require", "exports"], function (require, exports) {
    "use strict";
    var Defaults = (function () {
        function Defaults() {
        }
        Defaults.listSettings = {
            loadedCountParameterName: 'loadedCount',
            persistSortings: true,
            sortParameterName: 'sort',
            totalCountParameterName: 'totalCount'
        };
        Defaults.bufferedListSettings = {
            defaultRowCount: 20,
            maxRowCount: 200,
            minRowCount: 1,
            skipRowCountParameterName: 'skip',
            takeRowCountParameterName: 'take'
        };
        Defaults.pagedListSettings = {
            defaultPageSize: 20,
            displayFromParameterName: 'displayFrom',
            displayToParameterName: 'displayTo',
            maxPageSize: 200,
            minPageSize: 1,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUErQkEsQ0FBQztRQTlCVSxxQkFBWSxHQUNuQjtZQUNJLHdCQUF3QixFQUFFLGFBQWE7WUFDdkMsZUFBZSxFQUFFLElBQUk7WUFDckIsaUJBQWlCLEVBQUUsTUFBTTtZQUN6Qix1QkFBdUIsRUFBRSxZQUFZO1NBQ3hDLENBQUM7UUFDSyw2QkFBb0IsR0FDM0I7WUFDSSxlQUFlLEVBQUUsRUFBRTtZQUNuQixXQUFXLEVBQUUsR0FBRztZQUNoQixXQUFXLEVBQUUsQ0FBQztZQUNkLHlCQUF5QixFQUFFLE1BQU07WUFDakMseUJBQXlCLEVBQUUsTUFBTTtTQUNwQyxDQUFDO1FBQ0ssMEJBQWlCLEdBQ3hCO1lBQ0ksZUFBZSxFQUFFLEVBQUU7WUFDbkIsd0JBQXdCLEVBQUUsYUFBYTtZQUN2QyxzQkFBc0IsRUFBRSxXQUFXO1lBQ25DLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsdUJBQXVCLEVBQUUsWUFBWTtZQUNyQyxxQkFBcUIsRUFBRSxVQUFVO1lBQ2pDLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFDSyxtQkFBVSxHQUFHO1lBQ2hCLHlCQUF5QixFQUFFLEdBQUc7WUFDOUIscUJBQXFCLEVBQUUsR0FBRztTQUM3QixDQUFDO1FBQ04sZUFBQztJQUFELENBL0JBLEFBK0JDLElBQUE7SUEvQlksZ0JBQVEsV0ErQnBCLENBQUEiLCJmaWxlIjoiY29tbW9uL2RlZmF1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERlZmF1bHRzIHtcclxuICAgIHN0YXRpYyBsaXN0U2V0dGluZ3MgPVxyXG4gICAge1xyXG4gICAgICAgIGxvYWRlZENvdW50UGFyYW1ldGVyTmFtZTogJ2xvYWRlZENvdW50JyxcclxuICAgICAgICBwZXJzaXN0U29ydGluZ3M6IHRydWUsXHJcbiAgICAgICAgc29ydFBhcmFtZXRlck5hbWU6ICdzb3J0JyxcclxuICAgICAgICB0b3RhbENvdW50UGFyYW1ldGVyTmFtZTogJ3RvdGFsQ291bnQnXHJcbiAgICB9O1xyXG4gICAgc3RhdGljIGJ1ZmZlcmVkTGlzdFNldHRpbmdzID1cclxuICAgIHtcclxuICAgICAgICBkZWZhdWx0Um93Q291bnQ6IDIwLFxyXG4gICAgICAgIG1heFJvd0NvdW50OiAyMDAsXHJcbiAgICAgICAgbWluUm93Q291bnQ6IDEsXHJcbiAgICAgICAgc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZTogJ3NraXAnLFxyXG4gICAgICAgIHRha2VSb3dDb3VudFBhcmFtZXRlck5hbWU6ICd0YWtlJ1xyXG4gICAgfTtcclxuICAgIHN0YXRpYyBwYWdlZExpc3RTZXR0aW5ncyA9XHJcbiAgICB7XHJcbiAgICAgICAgZGVmYXVsdFBhZ2VTaXplOiAyMCxcclxuICAgICAgICBkaXNwbGF5RnJvbVBhcmFtZXRlck5hbWU6ICdkaXNwbGF5RnJvbScsXHJcbiAgICAgICAgZGlzcGxheVRvUGFyYW1ldGVyTmFtZTogJ2Rpc3BsYXlUbycsXHJcbiAgICAgICAgbWF4UGFnZVNpemU6IDIwMCxcclxuICAgICAgICBtaW5QYWdlU2l6ZTogMSxcclxuICAgICAgICBwYWdlTnVtYmVyUGFyYW1ldGVyTmFtZTogJ3BhZ2VOdW1iZXInLFxyXG4gICAgICAgIHBhZ2VTaXplUGFyYW1ldGVyTmFtZTogJ3BhZ2VTaXplJyxcclxuICAgICAgICBwZXJzaXN0UGFnZVNpemU6IHRydWVcclxuICAgIH07XHJcbiAgICBzdGF0aWMgdWlTZXR0aW5ncyA9IHtcclxuICAgICAgICBlbGVtZW50VmlzaWJpbGl0eUludGVydmFsOiA1MDAsXHJcbiAgICAgICAgcHJvZ3Jlc3NEZWxheUludGVydmFsOiA1MDBcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
