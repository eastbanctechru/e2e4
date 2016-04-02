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
                if (title) {
                    var status_2 = new status_1.Status(progressState_1.ProgressState.Progress, title);
                    status_2.sid = sid;
                    StatusTracker.statusList.push(status_2);
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

//# sourceMappingURL=data:application/json;base64,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ZnJvbSAnLi9jb21tb24vc3RhdHVzJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge1Byb2dyZXNzU3RhdGV9IGZyb20gJy4vY29tbW9uL3Byb2dyZXNzU3RhdGUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdHVzVHJhY2tlciB7XHJcbiAgICBzdGF0aWMgc3RhdHVzID0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgc3RhdGljIG1vZGFsRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdHVzTGlzdCA9IG5ldyBBcnJheTxTdGF0dXM+KCk7XHJcblxyXG4gICAgc3RhdGljIGdldCBzdGF0dXNEaXNwbGF5ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXR1c1RyYWNrZXIuc3RhdHVzICE9PSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTdGF0dXNUcmFja2VyLnN0YXR1c0Rpc3BsYXllZCB8fCBTdGF0dXNUcmFja2VyLm1vZGFsRGlzcGxheWVkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRyYWNrU3RhdHVzKHRpdGxlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHNpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFN0YXR1cyhQcm9ncmVzc1N0YXRlLlByb2dyZXNzLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMuc2lkID0gc2lkO1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0LnB1c2goc3RhdHVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MucHJvZ3Jlc3NEZWxheUludGVydmFsKTtcclxuICAgICAgICByZXR1cm4gc2lkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlc29sdmVTdGF0dXMoc2lkOiBudW1iZXIsIHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNpZCA9PT0gc2lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1bmRvbmUgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh1bmRvbmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2lkID09PSBzaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MuZWxlbWVudFZpc2liaWxpdHlJbnRlcnZhbCk7XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
