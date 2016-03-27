"use strict";
var progressState_1 = require('./progressState');
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
//# sourceMappingURL=statusModel.js.map