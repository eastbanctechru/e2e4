define(["require", "exports"], function (require, exports) {
    "use strict";
    var Utility = (function () {
        function Utility() {
        }
        Utility.disposeAll = function (collection, async) {
            if (async === void 0) { async = true; }
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
        Utility.formatString = function (format) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp('\\{' + i + '\\}', 'gm');
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        };
        return Utility;
    }());
    exports.Utility = Utility;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtRQWtDQSxDQUFDO1FBakNVLGtCQUFVLEdBQWpCLFVBQWtCLFVBQWlCLEVBQUUsS0FBcUI7WUFBckIscUJBQXFCLEdBQXJCLFlBQXFCO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsS0FBSyxHQUFHLEtBQUssS0FBSyxTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixVQUFVLENBQUM7b0JBQ1AsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUNNLG9CQUFZLEdBQW5CLFVBQW9CLE1BQWM7WUFBRSxjQUFjO2lCQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7Z0JBQWQsNkJBQWM7O1lBQzlDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQWxDQSxBQWtDQyxJQUFBO0lBbENZLGVBQU8sVUFrQ25CLENBQUEiLCJmaWxlIjoiY29tbW9uL3V0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXRpbGl0eSB7XHJcbiAgICBzdGF0aWMgZGlzcG9zZUFsbChjb2xsZWN0aW9uOiBhbnlbXSwgYXN5bmM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFjb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXN5bmMgPSBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jO1xyXG4gICAgICAgIGxldCBpdGVtcyA9IGNvbGxlY3Rpb24uc3BsaWNlKDAsIGNvbGxlY3Rpb24ubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBudWxsO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGZvcm1hdFN0cmluZyhmb3JtYXQ6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcmVnID0gbmV3IFJlZ0V4cCgnXFxcXHsnICsgaSArICdcXFxcfScsICdnbScpO1xyXG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKHJlZywgYXJndW1lbnRzW2kgKyAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
