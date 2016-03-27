System.register(['./common/progressState'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var progressState_1;
    var BaseComponent;
    return {
        setters:[
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            }],
        execute: function() {
            BaseComponent = (function () {
                function BaseComponent() {
                    this.disposed = false;
                    this.inited = false;
                    this.title = null;
                    this.state = null;
                }
                Object.defineProperty(BaseComponent.prototype, "busy", {
                    get: function () {
                        return this.state === progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseComponent.prototype, "ready", {
                    get: function () {
                        return this.state !== progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseComponent.prototype.init = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    this.inited = true;
                };
                BaseComponent.prototype.dispose = function () {
                    this.disposed = true;
                };
                return BaseComponent;
            }());
            exports_1("BaseComponent", BaseComponent);
            ;
        }
    }
});
