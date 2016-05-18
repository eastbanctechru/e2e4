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
        return Utility;
    }());
    exports.Utility = Utility;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtRQXlCQSxDQUFDO1FBeEJVLGtCQUFVLEdBQWpCLFVBQWtCLFVBQWlCLEVBQUUsS0FBcUI7WUFBckIscUJBQXFCLEdBQXJCLFlBQXFCO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixVQUFVLENBQUM7b0JBQ1AsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtvQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQXpCQSxBQXlCQyxJQUFBO0lBekJZLGVBQU8sVUF5Qm5CLENBQUEiLCJmaWxlIjoiY29tbW9uL3V0aWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXRpbGl0eSB7XHJcbiAgICBzdGF0aWMgZGlzcG9zZUFsbChjb2xsZWN0aW9uOiBhbnlbXSwgYXN5bmM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gY29sbGVjdGlvbi5zcGxpY2UoMCwgY29sbGVjdGlvbi5sZW5ndGgpO1xyXG5cclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtcyA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
