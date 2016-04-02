System.register(['./progressState'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var progressState_1;
    var Status;
    return {
        setters:[
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            }],
        execute: function() {
            Status = (function () {
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
            exports_1("Status", Status);
        }
    }
});
