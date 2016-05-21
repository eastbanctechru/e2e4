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
