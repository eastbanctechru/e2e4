define(["require", "exports"], function (require, exports) {
    "use strict";
    var Utility = (function () {
        function Utility() {
        }
        /* tslint:disable:no-any */
        Utility.disposeAll = function (collection, async) {
            if (async === void 0) { async = true; }
            /* tslint:enable:no-any */
            if (!collection) {
                return;
            }
            async = async === undefined ? true : async;
            var items = collection.splice(0, collection.length);
            if (async) {
                setTimeout(function () {
                    items.forEach(function (item) {
                        if (item.dispose) {
                            item.dispose();
                        }
                    });
                    items = null;
                }, 0);
            }
            else {
                items.forEach(function (item) {
                    if (item.dispose) {
                        item.dispose();
                    }
                });
            }
        };
        return Utility;
    }());
    exports.Utility = Utility;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtRQTRCQSxDQUFDO1FBM0JHLDJCQUEyQjtRQUNwQixrQkFBVSxHQUFqQixVQUFrQixVQUFpQixFQUFFLEtBQXFCO1lBQXJCLHFCQUFxQixHQUFyQixZQUFxQjtZQUN0RCwwQkFBMEI7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzNDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLFVBQVUsQ0FBQztvQkFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTt3QkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDakIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRVYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQ0wsY0FBQztJQUFELENBNUJBLEFBNEJDLElBQUE7SUE1QlksZUFBTyxVQTRCbkIsQ0FBQSIsImZpbGUiOiJjb21tb24vdXRpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVdGlsaXR5IHtcclxuICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gICAgc3RhdGljIGRpc3Bvc2VBbGwoY29sbGVjdGlvbjogYW55W10sIGFzeW5jOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgPSBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jO1xyXG4gICAgICAgIGxldCBpdGVtcyA9IGNvbGxlY3Rpb24uc3BsaWNlKDAsIGNvbGxlY3Rpb24ubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBudWxsO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
