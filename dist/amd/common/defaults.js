define(["require", "exports"], function (require, exports) {
    "use strict";
    var Defaults = (function () {
        function Defaults() {
        }
        Defaults.sortAttribute = {
            ascClassName: 'arrow-up',
            descClassName: 'arrow-down',
            sortableClassName: 'sortable'
        };
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
        Defaults.eventNames = {
            selectableItemClicked: 'selectable-item-clicked'
        };
        Defaults.uiSettings = {
            elementVisibilityInterval: 500,
            progressDelayInterval: 500
        };
        return Defaults;
    }());
    exports.Defaults = Defaults;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kZWZhdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUF5Q0EsQ0FBQztRQXhDVSxzQkFBYSxHQUNwQjtZQUNJLFlBQVksRUFBRSxVQUFVO1lBQ3hCLGFBQWEsRUFBRSxZQUFZO1lBQzNCLGlCQUFpQixFQUFFLFVBQVU7U0FDaEMsQ0FBQztRQUNLLHFCQUFZLEdBQ25CO1lBQ0ksbUJBQW1CLEVBQUUsY0FBYztZQUNuQyx3QkFBd0IsRUFBRSxhQUFhO1lBQ3ZDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsdUJBQXVCLEVBQUUsWUFBWTtTQUN4QyxDQUFDO1FBQ0ssNkJBQW9CLEdBQzNCO1lBQ0ksbUJBQW1CLEVBQUUsRUFBRTtZQUN2QixXQUFXLEVBQUUsR0FBRztZQUNoQixXQUFXLEVBQUUsQ0FBQztZQUNkLHlCQUF5QixFQUFFLE1BQU07WUFDakMseUJBQXlCLEVBQUUsTUFBTTtTQUNwQyxDQUFDO1FBQ0ssMEJBQWlCLEdBQ3hCO1lBQ0ksZUFBZSxFQUFFLEVBQUU7WUFDbkIsd0JBQXdCLEVBQUUsYUFBYTtZQUN2QyxzQkFBc0IsRUFBRSxXQUFXO1lBQ25DLFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsdUJBQXVCLEVBQUUsWUFBWTtZQUNyQyxxQkFBcUIsRUFBRSxVQUFVO1lBQ2pDLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFDSyxtQkFBVSxHQUFHO1lBQ2hCLHFCQUFxQixFQUFFLHlCQUF5QjtTQUNuRCxDQUFDO1FBQ0ssbUJBQVUsR0FBRztZQUNoQix5QkFBeUIsRUFBRSxHQUFHO1lBQzlCLHFCQUFxQixFQUFFLEdBQUc7U0FDN0IsQ0FBQztRQUNOLGVBQUM7SUFBRCxDQXpDQSxBQXlDQyxJQUFBO0lBekNZLGdCQUFRLFdBeUNwQixDQUFBIiwiZmlsZSI6ImNvbW1vbi9kZWZhdWx0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEZWZhdWx0cyB7XHJcbiAgICBzdGF0aWMgc29ydEF0dHJpYnV0ZSA9XHJcbiAgICB7XHJcbiAgICAgICAgYXNjQ2xhc3NOYW1lOiAnYXJyb3ctdXAnLFxyXG4gICAgICAgIGRlc2NDbGFzc05hbWU6ICdhcnJvdy1kb3duJyxcclxuICAgICAgICBzb3J0YWJsZUNsYXNzTmFtZTogJ3NvcnRhYmxlJ1xyXG4gICAgfTtcclxuICAgIHN0YXRpYyBsaXN0U2V0dGluZ3MgPVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHRBcmVhU2VsZWN0b3I6ICcjY29udGV4dE1lbnUnLFxyXG4gICAgICAgIGxvYWRlZENvdW50UGFyYW1ldGVyTmFtZTogJ2xvYWRlZENvdW50JyxcclxuICAgICAgICBwZXJzaXN0U29ydGluZ3M6IHRydWUsXHJcbiAgICAgICAgc29ydFBhcmFtZXRlck5hbWU6ICdzb3J0JyxcclxuICAgICAgICB0b3RhbENvdW50UGFyYW1ldGVyTmFtZTogJ3RvdGFsQ291bnQnXHJcbiAgICB9O1xyXG4gICAgc3RhdGljIGJ1ZmZlcmVkTGlzdFNldHRpbmdzID1cclxuICAgIHtcclxuICAgICAgICBkZWZhdWx0VGFrZVJvd0NvdW50OiAyMCxcclxuICAgICAgICBtYXhSb3dDb3VudDogMjAwLFxyXG4gICAgICAgIG1pblJvd0NvdW50OiAwLFxyXG4gICAgICAgIHNraXBSb3dDb3VudFBhcmFtZXRlck5hbWU6ICdza2lwJyxcclxuICAgICAgICB0YWtlUm93Q291bnRQYXJhbWV0ZXJOYW1lOiAndGFrZSdcclxuICAgIH07XHJcbiAgICBzdGF0aWMgcGFnZWRMaXN0U2V0dGluZ3MgPVxyXG4gICAge1xyXG4gICAgICAgIGRlZmF1bHRQYWdlU2l6ZTogMjAsXHJcbiAgICAgICAgZGlzcGxheUZyb21QYXJhbWV0ZXJOYW1lOiAnZGlzcGxheUZyb20nLFxyXG4gICAgICAgIGRpc3BsYXlUb1BhcmFtZXRlck5hbWU6ICdkaXNwbGF5VG8nLFxyXG4gICAgICAgIG1heFBhZ2VTaXplOiAyMDAsXHJcbiAgICAgICAgbWluUGFnZVNpemU6IDAsXHJcbiAgICAgICAgcGFnZU51bWJlclBhcmFtZXRlck5hbWU6ICdwYWdlTnVtYmVyJyxcclxuICAgICAgICBwYWdlU2l6ZVBhcmFtZXRlck5hbWU6ICdwYWdlU2l6ZScsXHJcbiAgICAgICAgcGVyc2lzdFBhZ2VTaXplOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgc3RhdGljIGV2ZW50TmFtZXMgPSB7XHJcbiAgICAgICAgc2VsZWN0YWJsZUl0ZW1DbGlja2VkOiAnc2VsZWN0YWJsZS1pdGVtLWNsaWNrZWQnXHJcbiAgICB9O1xyXG4gICAgc3RhdGljIHVpU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgZWxlbWVudFZpc2liaWxpdHlJbnRlcnZhbDogNTAwLFxyXG4gICAgICAgIHByb2dyZXNzRGVsYXlJbnRlcnZhbDogNTAwXHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
