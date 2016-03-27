"use strict";
(function (ProgressState) {
    ProgressState[ProgressState["Initial"] = 0] = "Initial";
    ProgressState[ProgressState["Done"] = 1] = "Done";
    ProgressState[ProgressState["Progress"] = 2] = "Progress";
    ProgressState[ProgressState["Fail"] = 3] = "Fail";
    ProgressState[ProgressState["Cancelled"] = 4] = "Cancelled";
})(exports.ProgressState || (exports.ProgressState = {}));
var ProgressState = exports.ProgressState;
//# sourceMappingURL=progressState.js.map