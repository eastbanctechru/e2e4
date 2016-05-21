define(["require", "exports", './common/status', './common/defaults', './common/progressState'], function (require, exports, status_1, defaults_1, progressState_1) {
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
                    for (var i = StatusTracker.statusList.length - 1; i >= 0; i--) {
                        if (StatusTracker.statusList[i].sid === sid) {
                            StatusTracker.statusList.splice(i, 1);
                        }
                    }
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

//# sourceMappingURL=data:application/json;base64,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Ijoic3RhdHVzVHJhY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RhdHVzfSBmcm9tICcuL2NvbW1vbi9zdGF0dXMnO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tICcuL2NvbW1vbi9kZWZhdWx0cyc7XHJcbmltcG9ydCB7UHJvZ3Jlc3NTdGF0ZX0gZnJvbSAnLi9jb21tb24vcHJvZ3Jlc3NTdGF0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdHVzVHJhY2tlciB7XHJcbiAgICBzdGF0aWMgc3RhdHVzID0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgc3RhdGljIG1vZGFsRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdHVzTGlzdCA9IG5ldyBBcnJheTxTdGF0dXM+KCk7XHJcblxyXG4gICAgc3RhdGljIGdldCBzdGF0dXNEaXNwbGF5ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXR1c1RyYWNrZXIuc3RhdHVzICE9PSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTdGF0dXNUcmFja2VyLnN0YXR1c0Rpc3BsYXllZCB8fCBTdGF0dXNUcmFja2VyLm1vZGFsRGlzcGxheWVkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRyYWNrU3RhdHVzKHRpdGxlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHNpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IG5ldyBTdGF0dXMoUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcywgdGl0bGUpO1xyXG4gICAgICAgICAgICBzdGF0dXMuc2lkID0gc2lkO1xyXG4gICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QucHVzaChzdGF0dXMpO1xyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MucHJvZ3Jlc3NEZWxheUludGVydmFsKTtcclxuICAgICAgICByZXR1cm4gc2lkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlc29sdmVTdGF0dXMoc2lkOiBudW1iZXIsIHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChzaWQpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2lkID09PSBzaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgY3VycmVudC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1bmRvbmUgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh1bmRvbmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0W2ldLnNpZCA9PT0gc2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgRGVmYXVsdHMudWlTZXR0aW5ncy5lbGVtZW50VmlzaWJpbGl0eUludGVydmFsKTtcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
