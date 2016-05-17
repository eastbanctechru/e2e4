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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUErQkEsQ0FBQztRQTlCVSxxQkFBWSxHQUNuQjtZQUNJLHdCQUF3QixFQUFFLGFBQWE7WUFDdkMsZUFBZSxFQUFFLElBQUk7WUFDckIsaUJBQWlCLEVBQUUsTUFBTTtZQUN6Qix1QkFBdUIsRUFBRSxZQUFZO1NBQ3hDLENBQUM7UUFDSyw2QkFBb0IsR0FDM0I7WUFDSSxtQkFBbUIsRUFBRSxFQUFFO1lBQ3ZCLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxDQUFDO1lBQ2QseUJBQXlCLEVBQUUsTUFBTTtZQUNqQyx5QkFBeUIsRUFBRSxNQUFNO1NBQ3BDLENBQUM7UUFDSywwQkFBaUIsR0FDeEI7WUFDSSxlQUFlLEVBQUUsRUFBRTtZQUNuQix3QkFBd0IsRUFBRSxhQUFhO1lBQ3ZDLHNCQUFzQixFQUFFLFdBQVc7WUFDbkMsV0FBVyxFQUFFLEdBQUc7WUFDaEIsV0FBVyxFQUFFLENBQUM7WUFDZCx1QkFBdUIsRUFBRSxZQUFZO1lBQ3JDLHFCQUFxQixFQUFFLFVBQVU7WUFDakMsZUFBZSxFQUFFLElBQUk7U0FDeEIsQ0FBQztRQUNLLG1CQUFVLEdBQUc7WUFDaEIseUJBQXlCLEVBQUUsR0FBRztZQUM5QixxQkFBcUIsRUFBRSxHQUFHO1NBQzdCLENBQUM7UUFDTixlQUFDO0lBQUQsQ0EvQkEsQUErQkMsSUFBQTtJQS9CWSxnQkFBUSxXQStCcEIsQ0FBQSIsImZpbGUiOiJjb21tb24vZGVmYXVsdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGVmYXVsdHMge1xyXG4gICAgc3RhdGljIGxpc3RTZXR0aW5ncyA9XHJcbiAgICB7XHJcbiAgICAgICAgbG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lOiAnbG9hZGVkQ291bnQnLFxyXG4gICAgICAgIHBlcnNpc3RTb3J0aW5nczogdHJ1ZSxcclxuICAgICAgICBzb3J0UGFyYW1ldGVyTmFtZTogJ3NvcnQnLFxyXG4gICAgICAgIHRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lOiAndG90YWxDb3VudCdcclxuICAgIH07XHJcbiAgICBzdGF0aWMgYnVmZmVyZWRMaXN0U2V0dGluZ3MgPVxyXG4gICAge1xyXG4gICAgICAgIGRlZmF1bHRUYWtlUm93Q291bnQ6IDIwLFxyXG4gICAgICAgIG1heFJvd0NvdW50OiAyMDAsXHJcbiAgICAgICAgbWluUm93Q291bnQ6IDAsXHJcbiAgICAgICAgc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZTogJ3NraXAnLFxyXG4gICAgICAgIHRha2VSb3dDb3VudFBhcmFtZXRlck5hbWU6ICd0YWtlJ1xyXG4gICAgfTtcclxuICAgIHN0YXRpYyBwYWdlZExpc3RTZXR0aW5ncyA9XHJcbiAgICB7XHJcbiAgICAgICAgZGVmYXVsdFBhZ2VTaXplOiAyMCxcclxuICAgICAgICBkaXNwbGF5RnJvbVBhcmFtZXRlck5hbWU6ICdkaXNwbGF5RnJvbScsXHJcbiAgICAgICAgZGlzcGxheVRvUGFyYW1ldGVyTmFtZTogJ2Rpc3BsYXlUbycsXHJcbiAgICAgICAgbWF4UGFnZVNpemU6IDIwMCxcclxuICAgICAgICBtaW5QYWdlU2l6ZTogMCxcclxuICAgICAgICBwYWdlTnVtYmVyUGFyYW1ldGVyTmFtZTogJ3BhZ2VOdW1iZXInLFxyXG4gICAgICAgIHBhZ2VTaXplUGFyYW1ldGVyTmFtZTogJ3BhZ2VTaXplJyxcclxuICAgICAgICBwZXJzaXN0UGFnZVNpemU6IHRydWVcclxuICAgIH07XHJcbiAgICBzdGF0aWMgdWlTZXR0aW5ncyA9IHtcclxuICAgICAgICBlbGVtZW50VmlzaWJpbGl0eUludGVydmFsOiA1MDAsXHJcbiAgICAgICAgcHJvZ3Jlc3NEZWxheUludGVydmFsOiA1MDBcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
