var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './simpleList', './bufferedPager'], function (require, exports, simpleList_1, bufferedPager_1) {
    "use strict";
    var BufferedList = (function (_super) {
        __extends(BufferedList, _super);
        function BufferedList(stateManager) {
            _super.call(this, stateManager, new bufferedPager_1.BufferedPager());
        }
        return BufferedList;
    }(simpleList_1.SimpleList));
    exports.BufferedList = BufferedList;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1ZmZlcmVkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBSUE7UUFBMkMsZ0NBQVU7UUFDakQsc0JBQVksWUFBMkI7WUFDbkMsa0JBQU0sWUFBWSxFQUFFLElBQUksNkJBQWEsRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FKQSxBQUlDLENBSjBDLHVCQUFVLEdBSXBEO0lBSnFCLG9CQUFZLGVBSWpDLENBQUEiLCJmaWxlIjoiYnVmZmVyZWRMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTaW1wbGVMaXN0fSBmcm9tICcuL3NpbXBsZUxpc3QnO1xyXG5pbXBvcnQge0J1ZmZlcmVkUGFnZXJ9IGZyb20gJy4vYnVmZmVyZWRQYWdlcic7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQnVmZmVyZWRMaXN0IGV4dGVuZHMgU2ltcGxlTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICBzdXBlcihzdGF0ZU1hbmFnZXIsIG5ldyBCdWZmZXJlZFBhZ2VyKCkpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
