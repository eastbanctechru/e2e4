define(["require", "exports", './common/statusModel', './common/defaults', './common/progressState', 'lodash'], function (require, exports, statusModel_1, defaults_1, progressState_1, _) {
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
                if (title) {
                    var statusModel = new statusModel_1.StatusModel(progressState_1.ProgressState.Progress, title);
                    statusModel.sid = sid;
                    StatusTracker.statusList.push(statusModel);
                }
            }, defaults_1.Defaults.uiSettings.progressDelayInterval);
            return sid;
        };
        StatusTracker.resolveStatus = function (sid, status) {
            if (sid) {
                clearTimeout(sid);
                var current = StatusTracker.statusList.find(function (item) {
                    return item.sid === sid;
                });
                if (current) {
                    current.status = status;
                }
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

//# sourceMappingURL=data:application/json;base64,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b2RlbH0gZnJvbSAnLi9jb21tb24vc3RhdHVzTW9kZWwnO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0dXNUcmFja2VyIHtcclxuICAgIHN0YXRpYyBzdGF0dXMgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICBzdGF0aWMgbW9kYWxEaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0dXNMaXN0ID0gbmV3IEFycmF5PFN0YXR1c01vZGVsPigpO1xyXG5cclxuICAgIHN0YXRpYyBnZXQgc3RhdHVzRGlzcGxheWVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTdGF0dXNUcmFja2VyLnN0YXR1cyAhPT0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBpc0FjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gU3RhdHVzVHJhY2tlci5zdGF0dXNEaXNwbGF5ZWQgfHwgU3RhdHVzVHJhY2tlci5tb2RhbERpc3BsYXllZDtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0cmFja1N0YXR1cyh0aXRsZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBzaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXMgPSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzO1xyXG4gICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c01vZGVsID0gbmV3IFN0YXR1c01vZGVsKFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3MsIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1c01vZGVsLnNpZCA9IHNpZDtcclxuICAgICAgICAgICAgICAgIFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdC5wdXNoKHN0YXR1c01vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MucHJvZ3Jlc3NEZWxheUludGVydmFsKTtcclxuICAgICAgICByZXR1cm4gc2lkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlc29sdmVTdGF0dXMoc2lkOiBudW1iZXIsIHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNpZCA9PT0gc2lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1bmRvbmUgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh1bmRvbmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2lkID09PSBzaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MuZWxlbWVudFZpc2liaWxpdHlJbnRlcnZhbCk7XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
