define(["require", "exports"], function (require, exports) {
    "use strict";
    var SelectionManager = (function () {
        function SelectionManager(target, itemsPropertyName) {
            this.selectionsList = new Array();
            this.target = target;
            this.itemsPropertyName = itemsPropertyName;
        }
        SelectionManager.includeIn = function (target, itemsPropertyName) {
            target.selectionManager = new SelectionManager(target, itemsPropertyName);
        };
        SelectionManager.prototype.dispose = function () {
            this.selectionsList.length = 0;
            delete this.selectionsList;
            delete this.target;
        };
        Object.defineProperty(SelectionManager.prototype, "itemsSource", {
            get: function () {
                return this.target[this.itemsPropertyName];
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
                selectionTuple.item.selectionManager.deselectAll(true);
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
                selectionTuple.item.selectionManager.selectAll(true);
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
        SelectionManager.prototype.deselectAll = function (recursive) {
            if (recursive === void 0) { recursive = false; }
            var list = this.selectionsList.splice(0, this.selectionsList.length);
            for (var i = 0; i < list.length; i++) {
                var item = list[i].item;
                this.processSelection(item, false);
                if (this.canRecurse(recursive, item)) {
                    /* tslint:disable:no-any */
                    item.selectionManager.deselectAll(true);
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
                    tuple.item.selectionManager.selectAll(true);
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
                        result = result.concat(item.selectionManager.getSelections(true));
                    }
                }
            }
            return this.selectionsList.map(function (selectable) { return selectable.item; });
        };
        return SelectionManager;
    }());
    exports.SelectionManager = SelectionManager;
});

//# sourceMappingURL=data:application/json;base64,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QUFDLFVBQUMsVUFBVSxJQUFLLE9BQUEsVUFBVSxDQUFDLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQWxNQSxBQWtNQyxJQUFBO0lBbE1ZLHdCQUFnQixtQkFrTTVCLENBQUEiLCJmaWxlIjoic2VsZWN0aW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlbGVjdGFibGV9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3RhYmxlJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25UdXBsZX0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvblR1cGxlJztcclxuaW1wb3J0IHtJQ29tcG9uZW50V2l0aFNlbGVjdGlvbn0gZnJvbSAnLi9jb250cmFjdHMvSUNvbXBvbmVudFdpdGhTZWxlY3Rpb24nO1xyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uTWFuYWdlciBpbXBsZW1lbnRzIElTZWxlY3Rpb25NYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBpbmNsdWRlSW4odGFyZ2V0OiBJQ29tcG9uZW50V2l0aFNlbGVjdGlvbiwgaXRlbXNQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRhcmdldC5zZWxlY3Rpb25NYW5hZ2VyID0gbmV3IFNlbGVjdGlvbk1hbmFnZXIodGFyZ2V0LCBpdGVtc1Byb3BlcnR5TmFtZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IE9iamVjdCwgaXRlbXNQcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuaXRlbXNQcm9wZXJ0eU5hbWUgPSBpdGVtc1Byb3BlcnR5TmFtZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2VsZWN0aW9uc0xpc3QgPSBuZXcgQXJyYXk8SVNlbGVjdGlvblR1cGxlPigpO1xyXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IE9iamVjdDtcclxuICAgIHByaXZhdGUgaXRlbXNQcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbnNMaXN0O1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0UHJvY2Vzc2VkSW5kZXg6IG51bWJlcjtcclxuICAgIGdldCBpdGVtc1NvdXJjZSgpOiBBcnJheTxJU2VsZWN0YWJsZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldFt0aGlzLml0ZW1zUHJvcGVydHlOYW1lXTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcHJvY2Vzc1NlbGVjdGlvbihpdGVtOiBJU2VsZWN0YWJsZSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgICAgaWYgKGl0ZW0ub25TZWxlY3Rpb25DaGFuZ2VkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaXRlbS5vblNlbGVjdGlvbkNoYW5nZWQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0ZWQgPT09IHRydWUgJiYgaXRlbS5vblNlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaXRlbS5vblNlbGVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxlY3RlZCA9PT0gZmFsc2UgJiYgaXRlbS5vbkRlc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpdGVtLm9uRGVzZWxlY3RlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZGVzZWxlY3RJdGVtKHNlbGVjdGlvblR1cGxlOiBJU2VsZWN0aW9uVHVwbGUsIHJlY3Vyc2l2ZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGlvbnNMaXN0LmZpbmRJbmRleChzZWxlY3RlZEl0ZW0gPT4gKHNlbGVjdGVkSXRlbS5pdGVtID09PSBzZWxlY3Rpb25UdXBsZS5pdGVtKSk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdGlvbihzZWxlY3Rpb25UdXBsZS5pdGVtLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuUmVjdXJzZShyZWN1cnNpdmUsIHNlbGVjdGlvblR1cGxlLml0ZW0pKSB7XHJcbiAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gICAgICAgICAgICAoKHNlbGVjdGlvblR1cGxlLml0ZW0gYXMgYW55KSBhcyBJQ29tcG9uZW50V2l0aFNlbGVjdGlvbikuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEFsbCh0cnVlKTtcclxuICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0UHJvY2Vzc2VkSW5kZXggPSBzZWxlY3Rpb25UdXBsZS5pbmRleDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2VsZWN0SXRlbShzZWxlY3Rpb25UdXBsZTogSVNlbGVjdGlvblR1cGxlLCBzYXZlUHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSwgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXZpb3VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5maW5kSW5kZXgoc2VsZWN0ZWRJdGVtID0+IChzZWxlY3RlZEl0ZW0uaXRlbSA9PT0gc2VsZWN0aW9uVHVwbGUuaXRlbSkpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QucHVzaChzZWxlY3Rpb25UdXBsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlbGVjdGlvbihzZWxlY3Rpb25UdXBsZS5pdGVtLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBsaXN0LmZvckVhY2goc2VsZWN0ZWRJdGVtID0+IHsgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHNlbGVjdGVkSXRlbS5pdGVtLCBmYWxzZSk7IH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnB1c2goc2VsZWN0aW9uVHVwbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oc2VsZWN0aW9uVHVwbGUuaXRlbSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNhblJlY3Vyc2UocmVjdXJzaXZlLCBzZWxlY3Rpb25UdXBsZS5pdGVtKSkge1xyXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgKChzZWxlY3Rpb25UdXBsZS5pdGVtIGFzIGFueSkgYXMgSUNvbXBvbmVudFdpdGhTZWxlY3Rpb24pLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0QWxsKHRydWUpO1xyXG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RQcm9jZXNzZWRJbmRleCA9IHNlbGVjdGlvblR1cGxlLmluZGV4O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5SZWN1cnNlKHJlY3Vyc2l2ZTogYm9vbGVhbiwgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovaXRlbTogYW55LyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi8pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAocmVjdXJzaXZlICYmIGl0ZW0uc2VsZWN0aW9uTWFuYWdlciAmJiBpdGVtLnNlbGVjdGlvbk1hbmFnZXIgaW5zdGFuY2VvZiBTZWxlY3Rpb25NYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFNlbGVjdGlvblR1cGxlKGluZGV4OiBudW1iZXIpOiBJU2VsZWN0aW9uVHVwbGUge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgaXRlbTogdGhpcy5pdGVtc1NvdXJjZVtpbmRleF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZGVzZWxlY3RBbGwocmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5zZWxlY3Rpb25zTGlzdC5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdFtpXS5pdGVtO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oaXRlbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5SZWN1cnNlKHJlY3Vyc2l2ZSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gICAgICAgICAgICAgICAgKChpdGVtIGFzIGFueSkgYXMgSUNvbXBvbmVudFdpdGhTZWxlY3Rpb24pLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNlbGVjdEFsbChyZWN1cnNpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoMCwgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggLSAxLCByZWN1cnNpdmUpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0UmFuZ2UoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlciwgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAodG9JbmRleCA8IDAgfHwgdGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPD0gdG9JbmRleCB8fCBmcm9tSW5kZXggPCAwIHx8IHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIDw9IGZyb21JbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBNYXRoLm1pbihmcm9tSW5kZXgsIHRvSW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IGVuZEluZGV4ID0gTWF0aC5tYXgoZnJvbUluZGV4LCB0b0luZGV4KTtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgY29uc3QgdGVtcERhdGEgPSBuZXcgQXJyYXk8SVNlbGVjdGlvblR1cGxlPigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDw9IGVuZEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdHVwbGUgPSB0aGlzLmdldFNlbGVjdGlvblR1cGxlKGkpO1xyXG4gICAgICAgICAgICB0ZW1wRGF0YS5wdXNoKHR1cGxlKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VsZWN0aW9uKHR1cGxlLml0ZW0sIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5SZWN1cnNlKHJlY3Vyc2l2ZSwgdHVwbGUuaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xyXG4gICAgICAgICAgICAgICAgKCh0dXBsZS5pdGVtIGFzIGFueSkgYXMgSUNvbXBvbmVudFdpdGhTZWxlY3Rpb24pLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0QWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGlvbnNMaXN0LnNwbGljZSgwLCB0aGlzLnNlbGVjdGlvbnNMaXN0Lmxlbmd0aCwgLi4udGVtcERhdGEpO1xyXG4gICAgICAgIHRoaXMubGFzdFByb2Nlc3NlZEluZGV4ID0gZW5kSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzU2VsZWN0aW9ucygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggIT09IDA7XHJcbiAgICB9XHJcbiAgICBpc0luZGV4U2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmIHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoID4gaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNTb3VyY2VbaW5kZXhdLnNlbGVjdGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWluU2VsZWN0ZWRJbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtaW5JbmRleCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBtaW5JbmRleCA9IChtaW5JbmRleCA9PT0gbnVsbCB8fCBpdGVtLmluZGV4IDwgbWluSW5kZXgpID8gaXRlbS5pbmRleCA6IG1pbkluZGV4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtaW5JbmRleDtcclxuICAgIH1cclxuICAgIGdldE1heFNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbWF4SW5kZXggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uc0xpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgbWF4SW5kZXggPSAobWF4SW5kZXggPT09IG51bGwgfHwgaXRlbS5pbmRleCA+IG1heEluZGV4KSA/IGl0ZW0uaW5kZXggOiBtYXhJbmRleDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF4SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Rmlyc3QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5nZXRTZWxlY3Rpb25UdXBsZSgwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VsZWN0TGFzdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtc1NvdXJjZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh0aGlzLmdldFNlbGVjdGlvblR1cGxlKHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RJbmRleChpbmRleDogbnVtYmVyLCBzYXZlUHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSwgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbSh0aGlzLmdldFNlbGVjdGlvblR1cGxlKGluZGV4KSwgc2F2ZVByZXZpb3VzLCByZWN1cnNpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRlc2VsZWN0SW5kZXgoaW5kZXg6IG51bWJlciwgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiB0aGlzLml0ZW1zU291cmNlLmxlbmd0aCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKHRoaXMuZ2V0U2VsZWN0aW9uVHVwbGUoaW5kZXgpLCByZWN1cnNpdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRvZ2dsZVNlbGVjdGlvbihpbmRleDogbnVtYmVyLCBzYXZlUHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSwgcmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IHRoaXMuaXRlbXNTb3VyY2UubGVuZ3RoIDw9IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHVwbGUgPSB0aGlzLmdldFNlbGVjdGlvblR1cGxlKGluZGV4KTtcclxuICAgICAgICBpZiAodGhpcy5pc0luZGV4U2VsZWN0ZWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbnNMaXN0Lmxlbmd0aCA9PT0gMSB8fCAodGhpcy5zZWxlY3Rpb25zTGlzdC5sZW5ndGggPiAxICYmIHNhdmVQcmV2aW91cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RJdGVtKHR1cGxlLCByZWN1cnNpdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHR1cGxlLCBzYXZlUHJldmlvdXMsIHJlY3Vyc2l2ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odHVwbGUsIHNhdmVQcmV2aW91cywgcmVjdXJzaXZlKTtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGlvbnMocmVjdXJzaXZlOiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxPYmplY3Q+IHtcclxuICAgICAgICBpZiAocmVjdXJzaXZlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbnNMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zZWxlY3Rpb25zTGlzdFtpXS5pdGVtO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5SZWN1cnNlKHJlY3Vyc2l2ZSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KCgoaXRlbSBhcyBhbnkpIGFzIElDb21wb25lbnRXaXRoU2VsZWN0aW9uKS5zZWxlY3Rpb25NYW5hZ2VyLmdldFNlbGVjdGlvbnModHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uc0xpc3QubWFwKChzZWxlY3RhYmxlKSA9PiBzZWxlY3RhYmxlLml0ZW0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
