define(["require", "exports"], function (require, exports) {
    "use strict";
    var SelectionManager = (function () {
        function SelectionManager() {
            this.selectionsList = new Array();
        }
        SelectionManager.prototype.dispose = function () {
            this.selectionsList.length = 0;
            this.lastProcessedIndex = null;
            delete this.items;
        };
        Object.defineProperty(SelectionManager.prototype, "itemsSource", {
            get: function () {
                return this.items;
            },
            set: function (value) {
                this.items = value;
                this.checkSelection();
            },
            enumerable: true,
            configurable: true
        });
        SelectionManager.prototype.processSelection = function (item, selected) {
            var initialSelectState = item.selected;
            item.selected = selected;
            if (item.onSelectionChanged !== undefined && initialSelectState !== selected) {
                item.onSelectionChanged(selected);
            }
            if (selected === true && item.onSelected !== undefined && initialSelectState !== selected) {
                item.onSelected();
            }
            if (selected === false && item.onDeselected !== undefined && initialSelectState !== selected) {
                item.onDeselected();
            }
        };
        SelectionManager.prototype.deselectItem = function (selectionTuple) {
            var index = this.selectionsList.findIndex(function (selectedItem) { return (selectedItem.item === selectionTuple.item); });
            if (index !== -1) {
                this.selectionsList.splice(index, 1);
            }
            this.processSelection(selectionTuple.item, false);
            this.lastProcessedIndex = selectionTuple.index;
        };
        SelectionManager.prototype.selectItem = function (selectionTuple, savePrevious) {
            var _this = this;
            if (savePrevious === void 0) { savePrevious = false; }
            if (savePrevious) {
                this.selectionsList.push(selectionTuple);
                this.processSelection(selectionTuple.item, true);
            }
            else {
                var list = this.selectionsList.splice(0, this.selectionsList.length);
                list.forEach(function (selectedItem) { _this.processSelection(selectedItem.item, false); });
                this.selectionsList.push(selectionTuple);
                this.processSelection(selectionTuple.item, true);
            }
            this.lastProcessedIndex = selectionTuple.index;
        };
        SelectionManager.prototype.getSelectionTuple = function (index) {
            return {
                index: index,
                item: this.itemsSource[index]
            };
        };
        SelectionManager.prototype.checkSelection = function () {
            for (var i = this.selectionsList.length - 1; i >= 0; i--) {
                var tuple = this.selectionsList[i];
                if (this.itemsSource[tuple.index] !== tuple.item) {
                    this.deselectItem(tuple);
                }
            }
        };
        SelectionManager.prototype.checkIndexAcceptable = function (index) {
            return index !== null && index !== undefined && index >= 0 && this.itemsSource.length > index;
        };
        SelectionManager.prototype.deselectAll = function () {
            var list = this.selectionsList.splice(0, this.selectionsList.length);
            for (var i = 0; i < list.length; i++) {
                var item = list[i].item;
                this.processSelection(item, false);
            }
            this.lastProcessedIndex = null;
        };
        SelectionManager.prototype.selectAll = function () {
            this.selectRange(0, this.itemsSource.length - 1);
        };
        SelectionManager.prototype.selectRange = function (fromIndex, toIndex) {
            if (toIndex < 0 || this.itemsSource.length <= toIndex || fromIndex < 0 || this.itemsSource.length <= fromIndex) {
                return;
            }
            var startIndex = Math.min(fromIndex, toIndex);
            var endIndex = Math.max(fromIndex, toIndex);
            this.deselectAll();
            var tempData = new Array();
            for (var i = startIndex; i <= endIndex; i++) {
                var tuple = this.getSelectionTuple(i);
                tempData.push(tuple);
                this.processSelection(tuple.item, true);
            }
            (_a = this.selectionsList).splice.apply(_a, [0, this.selectionsList.length].concat(tempData));
            this.lastProcessedIndex = endIndex;
            var _a;
        };
        SelectionManager.prototype.hasSelections = function () {
            return this.selectionsList.length !== 0;
        };
        SelectionManager.prototype.isIndexSelected = function (index) {
            if (index >= 0 && this.itemsSource.length > index) {
                return this.itemsSource[index].selected;
            }
            return false;
        };
        SelectionManager.prototype.getItemIndex = function (item) {
            return this.itemsSource.findIndex(function (value) { return value === item; });
        };
        SelectionManager.prototype.getMinSelectedIndex = function () {
            var minIndex = null;
            this.selectionsList.forEach(function (item) {
                minIndex = (minIndex === null || item.index < minIndex) ? item.index : minIndex;
            });
            return minIndex;
        };
        SelectionManager.prototype.getMaxSelectedIndex = function () {
            var maxIndex = null;
            this.selectionsList.forEach(function (item) {
                maxIndex = (maxIndex === null || item.index > maxIndex) ? item.index : maxIndex;
            });
            return maxIndex;
        };
        SelectionManager.prototype.selectFirst = function () {
            if (this.itemsSource.length > 0) {
                this.selectItem(this.getSelectionTuple(0));
            }
        };
        SelectionManager.prototype.selectLast = function () {
            if (this.itemsSource.length > 0) {
                this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
            }
        };
        SelectionManager.prototype.selectIndex = function (index, savePrevious) {
            if (savePrevious === void 0) { savePrevious = false; }
            if (this.checkIndexAcceptable(index)) {
                this.selectItem(this.getSelectionTuple(index), savePrevious);
            }
        };
        SelectionManager.prototype.deselectIndex = function (index) {
            if (this.checkIndexAcceptable(index)) {
                this.deselectItem(this.getSelectionTuple(index));
            }
        };
        SelectionManager.prototype.toggleSelection = function (index, savePrevious) {
            if (savePrevious === void 0) { savePrevious = false; }
            if (!this.checkIndexAcceptable(index)) {
                return;
            }
            var tuple = this.getSelectionTuple(index);
            if (this.isIndexSelected(index) && (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious))) {
                this.deselectItem(tuple);
                return;
            }
            this.selectItem(tuple, savePrevious);
        };
        SelectionManager.prototype.getSelections = function () {
            return this.selectionsList.map(function (selectable) { return selectable.item; });
        };
        return SelectionManager;
    }());
    exports.SelectionManager = SelectionManager;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFRQTtRQUFBO1lBQ1ksbUJBQWMsR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztRQThKMUQsQ0FBQztRQTNKRyxrQ0FBTyxHQUFQO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFHRCxzQkFBSSx5Q0FBVztpQkFBZjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDO2lCQUNELFVBQWdCLEtBQXlCO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLENBQUM7OztXQUpBO1FBS08sMkNBQWdCLEdBQXhCLFVBQXlCLElBQWlCLEVBQUUsUUFBaUI7WUFDekQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLElBQUksa0JBQWtCLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLGtCQUFrQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxrQkFBa0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7UUFDTyx1Q0FBWSxHQUFwQixVQUFxQixjQUErQjtZQUNoRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFlBQVksSUFBSSxPQUFBLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztZQUN6RyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDbkQsQ0FBQztRQUNPLHFDQUFVLEdBQWxCLFVBQW1CLGNBQStCLEVBQUUsWUFBNkI7WUFBakYsaUJBV0M7WUFYbUQsNEJBQTZCLEdBQTdCLG9CQUE2QjtZQUM3RSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZLElBQU0sS0FBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNuRCxDQUFDO1FBQ08sNENBQWlCLEdBQXpCLFVBQTBCLEtBQWE7WUFDbkMsTUFBTSxDQUFDO2dCQUNILEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzthQUNoQyxDQUFDO1FBQ04sQ0FBQztRQUNPLHlDQUFjLEdBQXRCO1lBQ0ksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNPLCtDQUFvQixHQUE1QixVQUE2QixLQUFhO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEcsQ0FBQztRQUNELHNDQUFXLEdBQVg7WUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNuQyxDQUFDO1FBQ0Qsb0NBQVMsR0FBVDtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxzQ0FBVyxHQUFYLFVBQVksU0FBaUIsRUFBRSxPQUFlO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0csTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBbUIsQ0FBQztZQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFDRCxNQUFBLElBQUksQ0FBQyxjQUFjLEVBQUMsTUFBTSxZQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sU0FBSyxRQUFRLEVBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDOztRQUN2QyxDQUFDO1FBRUQsd0NBQWEsR0FBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELDBDQUFlLEdBQWYsVUFBZ0IsS0FBYTtZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUM1QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsdUNBQVksR0FBWixVQUFhLElBQWlCO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssS0FBSyxJQUFJLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELDhDQUFtQixHQUFuQjtZQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQzVCLFFBQVEsR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUNELDhDQUFtQixHQUFuQjtZQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQzVCLFFBQVEsR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELHNDQUFXLEdBQVg7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQ0QscUNBQVUsR0FBVjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUM7UUFFRCxzQ0FBVyxHQUFYLFVBQVksS0FBYSxFQUFFLFlBQTZCO1lBQTdCLDRCQUE2QixHQUE3QixvQkFBNkI7WUFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNMLENBQUM7UUFDRCx3Q0FBYSxHQUFiLFVBQWMsS0FBYTtZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDTCxDQUFDO1FBQ0QsMENBQWUsR0FBZixVQUFnQixLQUFhLEVBQUUsWUFBNkI7WUFBN0IsNEJBQTZCLEdBQTdCLG9CQUE2QjtZQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCx3Q0FBYSxHQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsVUFBVSxDQUFDLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQS9KQSxBQStKQyxJQUFBO0lBL0pZLHdCQUFnQixtQkErSjVCLENBQUEiLCJmaWxlIjoic2VsZWN0aW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlbGVjdGFibGV9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3RhYmxlJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5cclxuaW50ZXJmYWNlIElTZWxlY3Rpb25UdXBsZSB7XHJcbiAgICBpbmRleDogbnVtYmVyO1xyXG4gICAgaXRlbTogSVNlbGVjdGFibGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25NYW5hZ2VyIGltcGxlbWVudHMgSVNlbGVjdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzZWxlY3Rpb25zTGlzdCA9IG5ldyBBcnJheTxJU2VsZWN0aW9uVHVwbGU+KCk7XHJcbiAgICBwcml2YXRlIGl0ZW1zOiBBcnJheTxJU2VsZWN0YWJsZT47XHJcbiAgICBwcml2YXRlIGl0ZW1zUHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RQcm9jZXNzZWRJbmRleCA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFByb2Nlc3NlZEluZGV4OiBudW1iZXI7XHJcbiAgICBnZXQgaXRlbXNTb3VyY2UoKTogQXJyYXk8SVNlbGVjdGFibGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH1cclxuICAgIHNldCBpdGVtc1NvdXJjZSh2YWx1ZTogQXJyYXk8SVNlbGVjdGFibGU+KSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTZWxlY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcHJvY2Vzc1NlbGVjdGlvbihpdGVtOiBJU2VsZWN0YWJsZSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0U3RhdGUgPSBpdGVtLnNlbGVjdGVkO1xyXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgICAgICBpZiAoaXRlbS5vblNlbGVjdGlvbkNoYW5nZWQgIT09IHVuZGVmaW5lZCAmJiBpbml0aWFsU2VsZWN0U3RhdGUgIT09IHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ub25TZWxlY3Rpb25DaGFuZ2VkKHNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkID09PSB0cnVlICYmIGl0ZW0ub25TZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmIGluaXRpYWxTZWxlY3RTdGF0ZSAhPT0gc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgaXRlbS5vblNlbGVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxlY3RlZCA9PT0gZmFsc2UgJiYgaXRlbS5vbkRlc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBpbml0aWFsU2VsZWN0U3RhdGUgIT09IHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ub25EZXNlbGVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkZXNlbGVjdEl0ZW0oc2VsZWN0aW9uVHVwbGU6IElTZWxlY3Rpb25UdXBsZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5maW5kSW5kZXgoc2VsZWN0ZWRJdGVtID0+IChzZWxlY3RlZEl0ZW0uaXRlbSA9PT0gc2VsZWN0aW9uVHVwbGUuaXRlbSkpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gc2VsZWN0aW9uVHVwbGUuaW5kZXg7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNlbGVjdEl0ZW0oc2VsZWN0aW9uVHVwbGU6IElTZWxlY3Rpb25UdXBsZSwgc2F2ZVByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QucHVzaChzZWxlY3Rpb25UdXBsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdGlvbihzZWxlY3Rpb25UdXBsZS5pdGVtLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0LmZvckVhY2goc2VsZWN0ZWRJdGVtID0+IHsgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHNlbGVjdGVkSXRlbS5pdGVtLCBmYWxzZSk7IH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnB1c2goc2VsZWN0aW9uVHVwbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gc2VsZWN0aW9uVHVwbGUuaW5kZXg7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFNlbGVjdGlvblR1cGxlKGluZGV4OiBudW1iZXIpOiBJU2VsZWN0aW9uVHVwbGUge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtc1NvdXJjZVtpbmRleF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja1NlbGVjdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB0dXBsZSA9IHRoaXMuc2VsZWN0aW9uc0xpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1zU291cmNlW3R1cGxlLmluZGV4XSAhPT0gdHVwbGUuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0odHVwbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja0luZGV4QWNjZXB0YWJsZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ICE9PSBudWxsICYmIGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggPj0gMCAmJiB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA+IGluZGV4O1xyXG4gICAgfVxyXG4gICAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuc2VsZWN0aW9uc0xpc3Quc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3RbaV0uaXRlbTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKGl0ZW0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0UHJvY2Vzc2VkSW5kZXggPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0QWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoMCwgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggLSAxKTtcclxuICAgIH1cclxuICAgIHNlbGVjdFJhbmdlKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodG9JbmRleCA8IDAgfHwgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPD0gdG9JbmRleCB8fCBmcm9tSW5kZXggPCAwIHx8IHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIDw9IGZyb21JbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBNYXRoLm1pbihmcm9tSW5kZXgsIHRvSW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gTWF0aC5tYXgoZnJvbUluZGV4LCB0b0luZGV4KTtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgY29uc3QgdGVtcERhdGEgPSBuZXcgQXJyYXk8SVNlbGVjdGlvblR1cGxlPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDw9IGVuZEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdHVwbGUgPSB0aGlzLmdldFNlbGVjdGlvblR1cGxlKGkpO1xyXG4gICAgICAgICAgICB0ZW1wRGF0YS5wdXNoKHR1cGxlKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHR1cGxlLml0ZW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnNwbGljZSgwLCB0aGlzLnNlbGVjdGlvbnNMaXN0Lmxlbmd0aCwgLi4udGVtcERhdGEpO1xyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2VsZWN0aW9ucygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggIT09IDA7XHJcbiAgICB9XHJcbiAgICBpc0luZGV4U2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNTb3VyY2VbaW5kZXhdLnNlbGVjdGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUluZGV4KGl0ZW06IElTZWxlY3RhYmxlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1NvdXJjZS5maW5kSW5kZXgodmFsdWUgPT4gdmFsdWUgPT09IGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0TWluU2VsZWN0ZWRJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtaW5JbmRleCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBtaW5JbmRleCA9IChtaW5JbmRleCA9PT0gbnVsbCB8fCBpdGVtLmluZGV4IDwgbWluSW5kZXgpID8gaXRlbS5pbmRleCA6IG1pbkluZGV4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtaW5JbmRleDtcclxuICAgIH1cclxuICAgIGdldE1heFNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWF4SW5kZXggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgbWF4SW5kZXggPSAobWF4SW5kZXggPT09IG51bGwgfHwgaXRlbS5pbmRleCA+IG1heEluZGV4KSA/IGl0ZW0uaW5kZXggOiBtYXhJbmRleDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF4SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Rmlyc3QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5nZXRTZWxlY3Rpb25UdXBsZSgwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VsZWN0TGFzdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh0aGlzLmdldFNlbGVjdGlvblR1cGxlKHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RJbmRleChpbmRleDogbnVtYmVyLCBzYXZlUHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSW5kZXhBY2NlcHRhYmxlKGluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5nZXRTZWxlY3Rpb25UdXBsZShpbmRleCksIHNhdmVQcmV2aW91cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVzZWxlY3RJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJbmRleEFjY2VwdGFibGUoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKHRoaXMuZ2V0U2VsZWN0aW9uVHVwbGUoaW5kZXgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0b2dnbGVTZWxlY3Rpb24oaW5kZXg6IG51bWJlciwgc2F2ZVByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbmRleEFjY2VwdGFibGUoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHVwbGUgPSB0aGlzLmdldFNlbGVjdGlvblR1cGxlKGluZGV4KTtcclxuICAgICAgICBpZiAodGhpcy5pc0luZGV4U2VsZWN0ZWQoaW5kZXgpICYmICh0aGlzLnNlbGVjdGlvbnNMaXN0Lmxlbmd0aCA9PT0gMSB8fCAodGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggPiAxICYmIHNhdmVQcmV2aW91cykpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKHR1cGxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odHVwbGUsIHNhdmVQcmV2aW91cyk7XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3Rpb25zKCk6IEFycmF5PE9iamVjdD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbnNMaXN0Lm1hcCgoc2VsZWN0YWJsZSkgPT4gc2VsZWN0YWJsZS5pdGVtKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
