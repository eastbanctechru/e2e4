define(["require", "exports", './progressState'], function (require, exports, progressState_1) {
    "use strict";
    var StatusModel = (function () {
        function StatusModel(status, title) {
            this.status = status;
            this.title = title;
        }
        Object.defineProperty(StatusModel.prototype, "className", {
            get: function () {
                switch (this.status) {
                    case progressState_1.ProgressState.Done:
                        return 'status status-resolved';
                    case progressState_1.ProgressState.Progress:
                        return 'status status-progress';
                    case progressState_1.ProgressState.Fail:
                        return 'status status-fail';
                    default:
                        return '';
                }
            },
            enumerable: true,
            configurable: true
        });
        return StatusModel;
    }());
    exports.StatusModel = StatusModel;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zdGF0dXNNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUNBO1FBSUkscUJBQVksTUFBcUIsRUFBRSxLQUFhO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxzQkFBSSxrQ0FBUztpQkFBYjtnQkFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsS0FBSyw2QkFBYSxDQUFDLElBQUk7d0JBQ25CLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztvQkFDcEMsS0FBSyw2QkFBYSxDQUFDLFFBQVE7d0JBQ3ZCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztvQkFDcEMsS0FBSyw2QkFBYSxDQUFDLElBQUk7d0JBQ25CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztvQkFDaEM7d0JBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUM7OztXQUFBO1FBQ0wsa0JBQUM7SUFBRCxDQXBCQSxBQW9CQyxJQUFBO0lBcEJZLG1CQUFXLGNBb0J2QixDQUFBIiwiZmlsZSI6ImNvbW1vbi9zdGF0dXNNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9wcm9ncmVzc1N0YXRlJztcclxuZXhwb3J0IGNsYXNzIFN0YXR1c01vZGVsIHtcclxuICAgIHNpZDogbnVtYmVyO1xyXG4gICAgc3RhdHVzOiBQcm9ncmVzc1N0YXRlO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSwgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIH1cclxuICAgIGdldCBjbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZ3Jlc3NTdGF0ZS5Eb25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXJlc29sdmVkJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXByb2dyZXNzJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLkZhaWw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N0YXR1cyBzdGF0dXMtZmFpbCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
