define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (ProgressState) {
        ProgressState[ProgressState["Initial"] = 0] = "Initial";
        ProgressState[ProgressState["Done"] = 1] = "Done";
        ProgressState[ProgressState["Progress"] = 2] = "Progress";
        ProgressState[ProgressState["Fail"] = 3] = "Fail";
        ProgressState[ProgressState["Cancelled"] = 4] = "Cancelled";
    })(exports.ProgressState || (exports.ProgressState = {}));
    var ProgressState = exports.ProgressState;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9wcm9ncmVzc1N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUEsV0FBWSxhQUFhO1FBQ3JCLHVEQUFXLENBQUE7UUFDWCxpREFBUSxDQUFBO1FBQ1IseURBQVksQ0FBQTtRQUNaLGlEQUFRLENBQUE7UUFDUiwyREFBYSxDQUFBO0lBQ2pCLENBQUMsRUFOVyxxQkFBYSxLQUFiLHFCQUFhLFFBTXhCO0lBTkQsSUFBWSxhQUFhLEdBQWIscUJBTVgsQ0FBQSIsImZpbGUiOiJjb21tb24vcHJvZ3Jlc3NTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFByb2dyZXNzU3RhdGUge1xyXG4gICAgSW5pdGlhbCA9IDAsXHJcbiAgICBEb25lID0gMSxcclxuICAgIFByb2dyZXNzID0gMixcclxuICAgIEZhaWwgPSAzLFxyXG4gICAgQ2FuY2VsbGVkID0gNFxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
