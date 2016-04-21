define(["require", "exports"], function (require, exports) {
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
                /* tslint:disable:no-any */
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
                /* tslint:disable:no-any */
                (selectionTuple.item).selectionManager.selectAll(true);
            }
            this.lastProcessedIndex = selectionTuple.index;
        };
        SelectionManager.prototype.canRecurse = function (recursive, /* tslint:disable:no-any */ item /* tslint:enable:no-any */) {
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
                    /* tslint:disable:no-any */
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
                    /* tslint:disable:no-any */
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
                        /* tslint:disable:no-any */
                        result = result.concat((item).selectionManager.getSelections(true));
                    }
                }
            }
            return this.selectionsList.map(function (selectable) { return selectable.item; });
        };
        return SelectionManager;
    }());
    exports.SelectionManager = SelectionManager;
});

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsMkJBQTJCO3dCQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFFLElBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUVqRixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsVUFBVSxDQUFDLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQTFNQSxBQTBNQyxJQUFBO0lBMU1ZLHdCQUFnQixtQkEwTTVCLENBQUEiLCJmaWxlIjoic2VsZWN0aW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlbGVjdGFibGV9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3RhYmxlJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25UdXBsZX0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvblR1cGxlJztcclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbk1hbmFnZXIgaW1wbGVtZW50cyBJU2VsZWN0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHNlbGVjdGlvbnNMaXN0ID0gbmV3IEFycmF5PElTZWxlY3Rpb25UdXBsZT4oKTtcclxuICAgIHByaXZhdGUgaXRlbXM6IEFycmF5PElTZWxlY3RhYmxlPjtcclxuICAgIHByaXZhdGUgaXRlbXNQcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbnNMaXN0O1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLml0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RQcm9jZXNzZWRJbmRleDogbnVtYmVyO1xyXG4gICAgZ2V0IGl0ZW1zU291cmNlKCk6IEFycmF5PElTZWxlY3RhYmxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XHJcbiAgICB9XHJcbiAgICBzZXQgaXRlbXNTb3VyY2UodmFsdWU6IEFycmF5PElTZWxlY3RhYmxlPikge1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrU2VsZWN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHByb2Nlc3NTZWxlY3Rpb24oaXRlbTogSVNlbGVjdGFibGUsIHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG4gICAgICAgIGlmIChpdGVtLm9uU2VsZWN0aW9uQ2hhbmdlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ub25TZWxlY3Rpb25DaGFuZ2VkKHNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkID09PSB0cnVlICYmIGl0ZW0ub25TZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ub25TZWxlY3RlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0ZWQgPT09IGZhbHNlICYmIGl0ZW0ub25EZXNlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaXRlbS5vbkRlc2VsZWN0ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRlc2VsZWN0SXRlbShzZWxlY3Rpb25UdXBsZTogSVNlbGVjdGlvblR1cGxlLCByZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5maW5kSW5kZXgoc2VsZWN0ZWRJdGVtID0+IChzZWxlY3RlZEl0ZW0uaXRlbSA9PT0gc2VsZWN0aW9uVHVwbGUuaXRlbSkpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgZmFsc2UpO1xyXG4gICAgICAgIGlmICh0aGlzLmNhblJlY3Vyc2UocmVjdXJzaXZlLCBzZWxlY3Rpb25UdXBsZS5pdGVtKSkge1xyXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgKChzZWxlY3Rpb25UdXBsZS5pdGVtIGFzIGFueSkpLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gc2VsZWN0aW9uVHVwbGUuaW5kZXg7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNlbGVjdEl0ZW0oc2VsZWN0aW9uVHVwbGU6IElTZWxlY3Rpb25UdXBsZSwgc2F2ZVByZXZpb3VzOiBib29sZWFuID0gZmFsc2UsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmV2aW91cykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0aW9uc0xpc3QuZmluZEluZGV4KHNlbGVjdGVkSXRlbSA9PiAoc2VsZWN0ZWRJdGVtLml0ZW0gPT09IHNlbGVjdGlvblR1cGxlLml0ZW0pKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHNlbGVjdGlvblR1cGxlLml0ZW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnB1c2goc2VsZWN0aW9uVHVwbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuc2VsZWN0aW9uc0xpc3Quc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKHNlbGVjdGVkSXRlbSA9PiB7IHRoaXMucHJvY2Vzc1NlbGVjdGlvbihzZWxlY3RlZEl0ZW0uaXRlbSwgZmFsc2UpOyB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5wdXNoKHNlbGVjdGlvblR1cGxlKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHNlbGVjdGlvblR1cGxlLml0ZW0sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jYW5SZWN1cnNlKHJlY3Vyc2l2ZSwgc2VsZWN0aW9uVHVwbGUuaXRlbSkpIHtcclxuICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbiAgICAgICAgICAgICgoc2VsZWN0aW9uVHVwbGUuaXRlbSBhcyBhbnkpKS5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEFsbCh0cnVlKTtcclxuICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0UHJvY2Vzc2VkSW5kZXggPSBzZWxlY3Rpb25UdXBsZS5pbmRleDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2FuUmVjdXJzZShyZWN1cnNpdmU6IGJvb2xlYW4sIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL2l0ZW06IGFueS8qIHRzbGludDplbmFibGU6bm8tYW55ICovKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSAmJiBpdGVtLnNlbGVjdGlvbk1hbmFnZXIgJiYgaXRlbS5zZWxlY3Rpb25NYW5hZ2VyIGluc3RhbmNlb2YgU2VsZWN0aW9uTWFuYWdlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3Rpb25UdXBsZShpbmRleDogbnVtYmVyKTogSVNlbGVjdGlvblR1cGxlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIGl0ZW06IHRoaXMuaXRlbXNTb3VyY2VbaW5kZXhdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgdHVwbGUgPSB0aGlzLnNlbGVjdGlvbnNMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pdGVtc1NvdXJjZVt0dXBsZS5pbmRleF0gIT09IHR1cGxlLml0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKHR1cGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRlc2VsZWN0QWxsKHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuc2VsZWN0aW9uc0xpc3Quc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3RbaV0uaXRlbTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKGl0ZW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuUmVjdXJzZShyZWN1cnNpdmUsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgICAgICgoaXRlbSBhcyBhbnkpKS5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0QWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RQcm9jZXNzZWRJbmRleCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZWxlY3RBbGwocmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFJhbmdlKDAsIHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIC0gMSwgcmVjdXJzaXZlKTtcclxuICAgIH1cclxuICAgIHNlbGVjdFJhbmdlKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRvSW5kZXggPCAwIHx8IHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIDw9IHRvSW5kZXggfHwgZnJvbUluZGV4IDwgMCB8fCB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA8PSBmcm9tSW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gTWF0aC5taW4oZnJvbUluZGV4LCB0b0luZGV4KTtcclxuICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWF4KGZyb21JbmRleCwgdG9JbmRleCk7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdEFsbCgpO1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gbmV3IEFycmF5PElTZWxlY3Rpb25UdXBsZT4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8PSBlbmRJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR1cGxlID0gdGhpcy5nZXRTZWxlY3Rpb25UdXBsZShpKTtcclxuICAgICAgICAgICAgdGVtcERhdGEucHVzaCh0dXBsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdGlvbih0dXBsZS5pdGVtLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuUmVjdXJzZShyZWN1cnNpdmUsIHR1cGxlLml0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgICAgICgodHVwbGUuaXRlbSBhcyBhbnkpKS5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEFsbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGgsIC4uLnRlbXBEYXRhKTtcclxuICAgICAgICB0aGlzLmxhc3RQcm9jZXNzZWRJbmRleCA9IGVuZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NlbGVjdGlvbnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoICE9PSAwO1xyXG4gICAgfVxyXG4gICAgaXNJbmRleFNlbGVjdGVkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zU291cmNlW2luZGV4XS5zZWxlY3RlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1JbmRleChpdGVtOiBJU2VsZWN0YWJsZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNTb3VyY2UuZmluZEluZGV4KHZhbHVlID0+IHZhbHVlID09PSBpdGVtKTtcclxuICAgIH1cclxuICAgIGdldE1pblNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWluSW5kZXggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgbWluSW5kZXggPSAobWluSW5kZXggPT09IG51bGwgfHwgaXRlbS5pbmRleCA8IG1pbkluZGV4KSA/IGl0ZW0uaW5kZXggOiBtaW5JbmRleDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWluSW5kZXg7XHJcbiAgICB9XHJcbiAgICBnZXRNYXhTZWxlY3RlZEluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIG1heEluZGV4ID0gKG1heEluZGV4ID09PSBudWxsIHx8IGl0ZW0uaW5kZXggPiBtYXhJbmRleCkgPyBpdGVtLmluZGV4IDogbWF4SW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1heEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdEZpcnN0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHRoaXMuZ2V0U2VsZWN0aW9uVHVwbGUoMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlbGVjdExhc3QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5nZXRTZWxlY3Rpb25UdXBsZSh0aGlzLml0ZW1zU291cmNlLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0SW5kZXgoaW5kZXg6IG51bWJlciwgc2F2ZVByZXZpb3VzOiBib29sZWFuID0gZmFsc2UsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPiBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5nZXRTZWxlY3Rpb25UdXBsZShpbmRleCksIHNhdmVQcmV2aW91cywgcmVjdXJzaXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkZXNlbGVjdEluZGV4KGluZGV4OiBudW1iZXIsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPiBpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSh0aGlzLmdldFNlbGVjdGlvblR1cGxlKGluZGV4KSwgcmVjdXJzaXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0b2dnbGVTZWxlY3Rpb24oaW5kZXg6IG51bWJlciwgc2F2ZVByZXZpb3VzOiBib29sZWFuID0gZmFsc2UsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA8PSBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHR1cGxlID0gdGhpcy5nZXRTZWxlY3Rpb25UdXBsZShpbmRleCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbmRleFNlbGVjdGVkKGluZGV4KSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggPT09IDEgfHwgKHRoaXMuc2VsZWN0aW9uc0xpc3QubGVuZ3RoID4gMSAmJiBzYXZlUHJldmlvdXMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbSh0dXBsZSwgcmVjdXJzaXZlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh0dXBsZSwgc2F2ZVByZXZpb3VzLCByZWN1cnNpdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHR1cGxlLCBzYXZlUHJldmlvdXMsIHJlY3Vyc2l2ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3Rpb25zKHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuc2VsZWN0aW9uc0xpc3RbaV0uaXRlbTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuUmVjdXJzZShyZWN1cnNpdmUsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCgoKGl0ZW0gYXMgYW55KSkuc2VsZWN0aW9uTWFuYWdlci5nZXRTZWxlY3Rpb25zKHRydWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbnNMaXN0Lm1hcCgoc2VsZWN0YWJsZSkgPT4gc2VsZWN0YWJsZS5pdGVtKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
