define(["require", "exports"], function (require, exports) {
    "use strict";
    var Utility = (function () {
        function Utility() {
        }
        Utility.disposeAll = function (collection, async) {
            if (async === void 0) { async = true; }
            if (!Array.isArray(collection)) {
                return;
            }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtRQWlDQSxDQUFDO1FBaENVLGtCQUFVLEdBQWpCLFVBQWtCLFVBQWlCLEVBQUUsS0FBcUI7WUFBckIscUJBQXFCLEdBQXJCLFlBQXFCO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixVQUFVLENBQUM7b0JBQ1AsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUNNLG9CQUFZLEdBQW5CLFVBQW9CLE1BQWM7WUFBRSxjQUFjO2lCQUFkLFdBQWMsQ0FBZCxzQkFBYyxDQUFkLElBQWM7Z0JBQWQsNkJBQWM7O1lBQzlDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQWpDQSxBQWlDQyxJQUFBO0lBakNZLGVBQU8sVUFpQ25CLENBQUEiLCJmaWxlIjoiY29tbW9uL3V0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXRpbGl0eSB7XHJcbiAgICBzdGF0aWMgZGlzcG9zZUFsbChjb2xsZWN0aW9uOiBhbnlbXSwgYXN5bmM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gY29sbGVjdGlvbi5zcGxpY2UoMCwgY29sbGVjdGlvbi5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtcyA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZm9ybWF0U3RyaW5nKGZvcm1hdDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHMgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByZWcgPSBuZXcgUmVnRXhwKCdcXFxceycgKyBpICsgJ1xcXFx9JywgJ2dtJyk7XHJcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UocmVnLCBhcmd1bWVudHNbaSArIDFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
