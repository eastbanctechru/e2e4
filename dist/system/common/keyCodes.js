System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var KeyCodes;
    return {
        setters:[],
        execute: function() {
            (function (KeyCodes) {
                KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
                KeyCodes[KeyCodes["Shift"] = 16] = "Shift";
                KeyCodes[KeyCodes["Ctrl"] = 17] = "Ctrl";
                KeyCodes[KeyCodes["Alt"] = 18] = "Alt";
                KeyCodes[KeyCodes["Esc"] = 27] = "Esc";
                KeyCodes[KeyCodes["ArrowUp"] = 38] = "ArrowUp";
                KeyCodes[KeyCodes["ArrowDown"] = 40] = "ArrowDown";
                KeyCodes[KeyCodes["A"] = 65] = "A";
            })(KeyCodes || (KeyCodes = {}));
            exports_1("KeyCodes", KeyCodes);
        }
    }
});
//# sourceMappingURL=keyCodes.js.map