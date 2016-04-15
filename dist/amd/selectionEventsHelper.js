define(["require", "exports", './common/keyCodes', './common/MouseButtons'], function (require, exports, keyCodes_1, MouseButtons_1) {
    "use strict";
    var SelectionEventsHelper = (function () {
        function SelectionEventsHelper(selectionConfig) {
            this.selectionConfig = selectionConfig;
        }
        SelectionEventsHelper.prototype.trySelectAll = function (browserEvent) {
            if (browserEvent.ctrlKey) {
                this.selectionConfig.selectionManager.selectAll();
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.onArrowUp = function (browserEvent, allowMultipleSelection) {
            if (browserEvent.ctrlKey) {
                this.selectionConfig.selectionManager.selectFirst();
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
            else if (this.selectionConfig.selectionManager.lastProcessedIndex === null || this.selectionConfig.selectionManager.lastProcessedIndex === undefined) {
                this.selectionConfig.selectionManager.selectFirst();
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
            else if (browserEvent.shiftKey && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
                this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex - 1);
            }
            else if (this.selectionConfig.selectionManager.lastProcessedIndex > 0) {
                if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex - 1)) {
                    this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
                }
                this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex - 1, browserEvent.shiftKey && allowMultipleSelection);
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.onArrowDown = function (browserEvent, allowMultipleSelection) {
            if (browserEvent.ctrlKey) {
                this.selectionConfig.selectionManager.selectLast();
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
            else if (this.selectionConfig.selectionManager.lastProcessedIndex === null || this.selectionConfig.selectionManager.lastProcessedIndex === undefined) {
                this.selectionConfig.selectionManager.selectFirst();
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
            else if (browserEvent.shiftKey && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
                this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex + 1);
            }
            else {
                if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex + 1)) {
                    this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
                }
                this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex + 1, browserEvent.shiftKey && allowMultipleSelection);
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.keyboardHandler = function (browserEvent, allowMultipleSelection) {
            switch (browserEvent.keyCode) {
                case keyCodes_1.KeyCodes.ArrowUp:
                    this.onArrowUp(browserEvent, allowMultipleSelection);
                    break;
                case keyCodes_1.KeyCodes.ArrowDown:
                    this.onArrowDown(browserEvent, allowMultipleSelection);
                    break;
                case keyCodes_1.KeyCodes.A:
                    this.trySelectAll(browserEvent);
                    break;
                default:
                    break;
            }
        };
        SelectionEventsHelper.prototype.mouseHandler = function (browserEvent, itemIndex, item) {
            if (itemIndex === null || itemIndex === undefined) {
                itemIndex = this.selectionConfig.selectionManager.getItemIndex(item);
                if (itemIndex === -1) {
                    return;
                }
            }
            var isItemSelected = this.selectionConfig.selectionManager.isIndexSelected(itemIndex);
            if (isItemSelected === false || browserEvent.which === MouseButtons_1.MouseButtons.Left) {
                if (this.selectionConfig.toggleOnly) {
                    this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
                    setTimeout(this.clearWindowSelection, 0);
                    return;
                }
            }
            if (isItemSelected === false || browserEvent.which === MouseButtons_1.MouseButtons.Left) {
                if (browserEvent.ctrlKey && this.selectionConfig.allowMultipleSelection) {
                    this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
                }
                else if (browserEvent.shiftKey && this.selectionConfig.allowMultipleSelection) {
                    var minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
                    this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
                }
                else {
                    this.selectionConfig.selectionManager.toggleSelection(itemIndex, false);
                }
                setTimeout(this.clearWindowSelection, 0);
            }
        };
        SelectionEventsHelper.prototype.clearWindowSelection = function () {
            try {
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }
                else if (document.hasOwnProperty('selection')) {
                    /* tslint:disable:no-string-literal */
                    document['selection'].empty();
                }
            }
            catch (e) {
            }
        };
        return SelectionEventsHelper;
    }());
    exports.SelectionEventsHelper = SelectionEventsHelper;
});

//# sourceMappingURL=data:application/json;base64,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Q0FBQztvQkFDOUUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29CQUM3RSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLFNBQVMsR0FBRyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzNHLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1RSxDQUFDO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUM7UUFDRCxvREFBb0IsR0FBcEI7WUFDSSxJQUFJLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDNUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLHNDQUFzQztvQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVsQyxDQUFDO1lBQ0wsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFYixDQUFDO1FBQ0wsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0EzR0EsQUEyR0MsSUFBQTtJQTNHWSw2QkFBcUIsd0JBMkdqQyxDQUFBIiwiZmlsZSI6InNlbGVjdGlvbkV2ZW50c0hlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlbGVjdGFibGV9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3RhYmxlJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25Db25maWd9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3Rpb25Db25maWcnO1xyXG5pbXBvcnQge0tleUNvZGVzfSBmcm9tICcuL2NvbW1vbi9rZXlDb2Rlcyc7XHJcbmltcG9ydCB7TW91c2VCdXR0b25zfSBmcm9tICcuL2NvbW1vbi9Nb3VzZUJ1dHRvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkV2ZW50c0hlbHBlciB7XHJcbiAgICBzZWxlY3Rpb25Db25maWc6IElTZWxlY3Rpb25Db25maWc7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rpb25Db25maWc6IElTZWxlY3Rpb25Db25maWcpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZyA9IHNlbGVjdGlvbkNvbmZpZztcclxuICAgIH1cclxuICAgIHRyeVNlbGVjdEFsbChicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkFycm93VXAoYnJvd3NlckV2ZW50OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJFdmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSwgYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dEb3duKGJyb3dzZXJFdmVudDogS2V5Ym9hcmRFdmVudCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChicm93c2VyRXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdExhc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ICsgMSwgYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGtleWJvYXJkSGFuZGxlcihicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGJyb3dzZXJFdmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dVcDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwKGJyb3dzZXJFdmVudCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGJyb3dzZXJFdmVudCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlTZWxlY3RBbGwoYnJvd3NlckV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW91c2VIYW5kbGVyKGJyb3dzZXJFdmVudDogTW91c2VFdmVudCwgaXRlbUluZGV4PzogbnVtYmVyLCBpdGVtPzogSVNlbGVjdGFibGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaXRlbUluZGV4ID09PSBudWxsIHx8IGl0ZW1JbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuZ2V0SXRlbUluZGV4KGl0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGlzSXRlbVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQoaXRlbUluZGV4KTtcclxuICAgICAgICBpZiAoaXNJdGVtU2VsZWN0ZWQgPT09IGZhbHNlIHx8IGJyb3dzZXJFdmVudC53aGljaCA9PT0gTW91c2VCdXR0b25zLkxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnRvZ2dsZU9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYXJXaW5kb3dTZWxlY3Rpb24sIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0l0ZW1TZWxlY3RlZCA9PT0gZmFsc2UgfHwgYnJvd3NlckV2ZW50LndoaWNoID09PSBNb3VzZUJ1dHRvbnMuTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkgJiYgdGhpcy5zZWxlY3Rpb25Db25maWcuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci50b2dnbGVTZWxlY3Rpb24oaXRlbUluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgdGhpcy5zZWxlY3Rpb25Db25maWcuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWluSW5kZXggPSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmdldE1pblNlbGVjdGVkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UobWluSW5kZXggPT09IG51bGwgPyBpdGVtSW5kZXggOiBtaW5JbmRleCwgaXRlbUluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jbGVhcldpbmRvd1NlbGVjdGlvbiwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJXaW5kb3dTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLXN0cmluZy1saXRlcmFsICovXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudFsnc2VsZWN0aW9uJ10uZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
