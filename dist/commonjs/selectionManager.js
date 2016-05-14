"use strict";
var SelectionManager = (function () {
    function SelectionManager() {
        this.selectionsList = new Array();
    }
    SelectionManager.prototype.dispose = function () {
        this.selectionsList.length = 0;
        delete this.selectionsList;
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
        item.selected = selected;
        if (item.onSelectionChanged !== undefined) {
            item.onSelectionChanged(selected);
        }
        if (selected === true && item.onSelected !== undefined) {
            item.onSelected();
        }
        if (selected === false && item.onDeselected !== undefined) {
            item.onDeselected();
        }
    };
    SelectionManager.prototype.deselectItem = function (selectionTuple, recursive) {
        if (recursive === void 0) { recursive = false; }
        var index = this.selectionsList.findIndex(function (selectedItem) { return (selectedItem.item === selectionTuple.item); });
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        this.processSelection(selectionTuple.item, false);
        if (this.canRecurse(recursive, selectionTuple.item)) {
            (selectionTuple.item).selectionManager.deselectAll(true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    };
    SelectionManager.prototype.selectItem = function (selectionTuple, savePrevious, recursive) {
        var _this = this;
        if (savePrevious === void 0) { savePrevious = false; }
        if (recursive === void 0) { recursive = false; }
        if (savePrevious) {
            var index = this.selectionsList.findIndex(function (selectedItem) { return (selectedItem.item === selectionTuple.item); });
            if (index !== -1) {
                this.processSelection(selectionTuple.item, false);
                this.selectionsList.splice(index, 1);
            }
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple.item, true);
        }
        else {
            var list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach(function (selectedItem) { _this.processSelection(selectedItem.item, false); });
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple.item, true);
        }
        if (this.canRecurse(recursive, selectionTuple.item)) {
            (selectionTuple.item).selectionManager.selectAll(true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    };
    SelectionManager.prototype.canRecurse = function (recursive, item) {
        if (recursive && item.selectionManager && item.selectionManager instanceof SelectionManager) {
            return true;
        }
        return false;
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
    SelectionManager.prototype.deselectAll = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        var list = this.selectionsList.splice(0, this.selectionsList.length);
        for (var i = 0; i < list.length; i++) {
            var item = list[i].item;
            this.processSelection(item, false);
            if (this.canRecurse(recursive, item)) {
                (item).selectionManager.deselectAll(true);
            }
        }
        this.lastProcessedIndex = null;
    };
    SelectionManager.prototype.selectAll = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        this.selectRange(0, this.itemsSource.length - 1, recursive);
    };
    SelectionManager.prototype.selectRange = function (fromIndex, toIndex, recursive) {
        if (recursive === void 0) { recursive = false; }
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
            if (this.canRecurse(recursive, tuple.item)) {
                (tuple.item).selectionManager.selectAll(true);
            }
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
    SelectionManager.prototype.selectIndex = function (index, savePrevious, recursive) {
        if (savePrevious === void 0) { savePrevious = false; }
        if (recursive === void 0) { recursive = false; }
        if (index >= 0 && this.itemsSource.length > index) {
            this.selectItem(this.getSelectionTuple(index), savePrevious, recursive);
        }
    };
    SelectionManager.prototype.deselectIndex = function (index, recursive) {
        if (recursive === void 0) { recursive = false; }
        if (index >= 0 && this.itemsSource.length > index) {
            this.deselectItem(this.getSelectionTuple(index), recursive);
        }
    };
    SelectionManager.prototype.toggleSelection = function (index, savePrevious, recursive) {
        if (savePrevious === void 0) { savePrevious = false; }
        if (recursive === void 0) { recursive = false; }
        if (index < 0 || this.itemsSource.length <= index) {
            return;
        }
        var tuple = this.getSelectionTuple(index);
        if (this.isIndexSelected(index)) {
            if (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious)) {
                this.deselectItem(tuple, recursive);
            }
            else {
                this.selectItem(tuple, savePrevious, recursive);
            }
            return;
        }
        this.selectItem(tuple, savePrevious, recursive);
    };
    SelectionManager.prototype.getSelections = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        if (recursive) {
            var result = [];
            for (var i = 0; i < this.selectionsList.length; i++) {
                var item = this.selectionsList[i].item;
                result.push(item);
                if (this.canRecurse(recursive, item)) {
                    result = result.concat((item).selectionManager.getSelections(true));
                }
            }
        }
        return this.selectionsList.map(function (selectable) { return selectable.item; });
    };
    return SelectionManager;
}());
exports.SelectionManager = SelectionManager;
