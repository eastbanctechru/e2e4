System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MouseButtons;
    return {
        setters:[],
        execute: function() {
            (function (MouseButtons) {
                MouseButtons[MouseButtons["None"] = 0] = "None";
                MouseButtons[MouseButtons["Left"] = 1] = "Left";
                MouseButtons[MouseButtons["Middle"] = 2] = "Middle";
                MouseButtons[MouseButtons["Right"] = 3] = "Right";
            })(MouseButtons || (MouseButtons = {}));
            exports_1("MouseButtons", MouseButtons);
        }
    }
});
//# sourceMappingURL=mouseButtons.js.map