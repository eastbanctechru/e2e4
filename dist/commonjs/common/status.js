"use strict";
var progressState_1 = require('./progressState');
var Status = (function () {
    function Status(status, title) {
        this.status = status;
        this.title = title;
    }
    Object.defineProperty(Status.prototype, "className", {
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
    return Status;
}());
exports.Status = Status;
