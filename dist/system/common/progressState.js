System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProgressState;
    return {
        setters:[],
        execute: function() {
            (function (ProgressState) {
                ProgressState[ProgressState["Initial"] = 0] = "Initial";
                ProgressState[ProgressState["Done"] = 1] = "Done";
                ProgressState[ProgressState["Progress"] = 2] = "Progress";
                ProgressState[ProgressState["Fail"] = 3] = "Fail";
                ProgressState[ProgressState["Cancelled"] = 4] = "Cancelled";
            })(ProgressState || (ProgressState = {}));
            exports_1("ProgressState", ProgressState);
        }
    }
});
