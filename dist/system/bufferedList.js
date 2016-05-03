System.register(['./simpleList', './bufferedPager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var simpleList_1, bufferedPager_1;
    var BufferedList;
    return {
        setters:[
            function (simpleList_1_1) {
                simpleList_1 = simpleList_1_1;
            },
            function (bufferedPager_1_1) {
                bufferedPager_1 = bufferedPager_1_1;
            }],
        execute: function() {
            BufferedList = (function (_super) {
                __extends(BufferedList, _super);
                function BufferedList(stateManager) {
                    _super.call(this, stateManager, new bufferedPager_1.BufferedPager());
                }
                return BufferedList;
            }(simpleList_1.SimpleList));
            exports_1("BufferedList", BufferedList);
        }
    }
});
