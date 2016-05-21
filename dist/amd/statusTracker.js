define(["require", "exports", './common/status', './common/defaults', './common/progressState', 'lodash'], function (require, exports, status_1, defaults_1, progressState_1, _) {
    "use strict";
    var StatusTracker = (function () {
        function StatusTracker() {
        }
        Object.defineProperty(StatusTracker, "statusDisplayed", {
            get: function () {
                return StatusTracker.status !== progressState_1.ProgressState.Done;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatusTracker, "isActive", {
            get: function () {
                return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
            },
            enumerable: true,
            configurable: true
        });
        StatusTracker.trackStatus = function (title) {
            var sid = setTimeout(function () {
                StatusTracker.status = progressState_1.ProgressState.Progress;
                var status = new status_1.Status(progressState_1.ProgressState.Progress, title);
                status.sid = sid;
                StatusTracker.statusList.push(status);
            }, defaults_1.Defaults.uiSettings.progressDelayInterval);
            return sid;
        };
        StatusTracker.resolveStatus = function (sid, status) {
            clearTimeout(sid);
            var current = StatusTracker.statusList.find(function (item) {
                return item.sid === sid;
            });
            if (current) {
                current.status = status;
            }
            setTimeout(function () {
                var undone = StatusTracker.statusList.find(function (item) {
                    return item.status === progressState_1.ProgressState.Progress;
                });
                if (undone === undefined) {
                    StatusTracker.statusList.length = 0;
                    StatusTracker.status = progressState_1.ProgressState.Done;
                }
                else {
                    _.remove(StatusTracker.statusList, function (item) {
                        return item.sid === sid;
                    });
                }
            }, defaults_1.Defaults.uiSettings.elementVisibilityInterval);
        };
        ;
        StatusTracker.status = progressState_1.ProgressState.Done;
        StatusTracker.modalDisplayed = false;
        StatusTracker.statusList = new Array();
        return StatusTracker;
    }());
    exports.StatusTracker = StatusTracker;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXR1c1RyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFLQTtRQUFBO1FBMENBLENBQUM7UUFyQ0csc0JBQVcsZ0NBQWU7aUJBQTFCO2dCQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLDZCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZELENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcseUJBQVE7aUJBQW5CO2dCQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUM7WUFDekUsQ0FBQzs7O1dBQUE7UUFDTSx5QkFBVyxHQUFsQixVQUFtQixLQUFhO1lBQzVCLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQztnQkFDbkIsYUFBYSxDQUFDLE1BQU0sR0FBRyw2QkFBYSxDQUFDLFFBQVEsQ0FBQztnQkFDOUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsNkJBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNqQixhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNNLDJCQUFhLEdBQXBCLFVBQXFCLEdBQVcsRUFBRSxNQUFxQjtZQUNuRCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzVCLENBQUM7WUFDRCxVQUFVLENBQUM7Z0JBQ1AsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO29CQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyw2QkFBYSxDQUFDLFFBQVEsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsYUFBYSxDQUFDLE1BQU0sR0FBRyw2QkFBYSxDQUFDLElBQUksQ0FBQztnQkFDOUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBQSxJQUFJO3dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLEVBQUUsbUJBQVEsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN0RCxDQUFDOztRQXhDTSxvQkFBTSxHQUFHLDZCQUFhLENBQUMsSUFBSSxDQUFDO1FBQzVCLDRCQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHdCQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQXVDNUMsb0JBQUM7SUFBRCxDQTFDQSxBQTBDQyxJQUFBO0lBMUNZLHFCQUFhLGdCQTBDekIsQ0FBQSIsImZpbGUiOiJzdGF0dXNUcmFja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdGF0dXN9IGZyb20gJy4vY29tbW9uL3N0YXR1cyc7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL2NvbW1vbi9wcm9ncmVzc1N0YXRlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXR1c1RyYWNrZXIge1xyXG4gICAgc3RhdGljIHN0YXR1cyA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgIHN0YXRpYyBtb2RhbERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXR1c0xpc3QgPSBuZXcgQXJyYXk8U3RhdHVzPigpO1xyXG5cclxuICAgIHN0YXRpYyBnZXQgc3RhdHVzRGlzcGxheWVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTdGF0dXNUcmFja2VyLnN0YXR1cyAhPT0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBpc0FjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gU3RhdHVzVHJhY2tlci5zdGF0dXNEaXNwbGF5ZWQgfHwgU3RhdHVzVHJhY2tlci5tb2RhbERpc3BsYXllZDtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0cmFja1N0YXR1cyh0aXRsZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBzaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXMgPSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBuZXcgU3RhdHVzKFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3MsIHRpdGxlKTtcclxuICAgICAgICAgICAgc3RhdHVzLnNpZCA9IHNpZDtcclxuICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0LnB1c2goc3RhdHVzKTtcclxuICAgICAgICB9LCBEZWZhdWx0cy51aVNldHRpbmdzLnByb2dyZXNzRGVsYXlJbnRlcnZhbCk7XHJcbiAgICAgICAgcmV0dXJuIHNpZDtcclxuICAgIH1cclxuICAgIHN0YXRpYyByZXNvbHZlU3RhdHVzKHNpZDogbnVtYmVyLCBzdGF0dXM6IFByb2dyZXNzU3RhdGUpOiB2b2lkIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoc2lkKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0LmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnNpZCA9PT0gc2lkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KCgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdW5kb25lID0gU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0LmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdGF0dXMgPT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodW5kb25lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXMgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfLnJlbW92ZShTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QsIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNpZCA9PT0gc2lkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBEZWZhdWx0cy51aVNldHRpbmdzLmVsZW1lbnRWaXNpYmlsaXR5SW50ZXJ2YWwpO1xyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
