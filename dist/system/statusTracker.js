System.register(['./common/statusModel', './common/defaults', './common/progressState', 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var statusModel_1, defaults_1, progressState_1, _;
    var StatusTracker;
    return {
        setters:[
            function (statusModel_1_1) {
                statusModel_1 = statusModel_1_1;
            },
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            StatusTracker = (function () {
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
            exports_1("StatusTracker", StatusTracker);
        }
    }
});
