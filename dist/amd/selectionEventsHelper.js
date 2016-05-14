define(["require", "exports", './common/keyCodes', './common/mouseButtons'], function (require, exports, keyCodes_1, mouseButtons_1) {
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
        SelectionEventsHelper.prototype.onArrowUp = function (browserEvent) {
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
                this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex - 1, browserEvent.shiftKey && this.selectionConfig.allowMultipleSelection);
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.onArrowDown = function (browserEvent) {
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
                this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex + 1, browserEvent.shiftKey && this.selectionConfig.allowMultipleSelection);
                browserEvent.stopPropagation();
                browserEvent.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.keyboardHandler = function (browserEvent) {
            switch (browserEvent.keyCode) {
                case keyCodes_1.KeyCodes.ArrowUp:
                    this.onArrowUp(browserEvent);
                    break;
                case keyCodes_1.KeyCodes.ArrowDown:
                    this.onArrowDown(browserEvent);
                    break;
                case keyCodes_1.KeyCodes.A:
                    this.trySelectAll(browserEvent);
                    break;
                default:
                    break;
            }
        };
        SelectionEventsHelper.prototype.mouseHandler = function (browserEvent, itemIndex) {
            var isItemSelected = this.selectionConfig.selectionManager.isIndexSelected(itemIndex);
            if (isItemSelected === false || browserEvent.which === mouseButtons_1.MouseButtons.Left) {
                if (this.selectionConfig.toggleOnly) {
                    this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
                    setTimeout(this.clearWindowSelection, 0);
                    return;
                }
            }
            if (isItemSelected === false || browserEvent.which === mouseButtons_1.MouseButtons.Left) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbkV2ZW50c0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU1BO1FBRUksK0JBQVksZUFBaUM7WUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDM0MsQ0FBQztRQUNELDRDQUFZLEdBQVosVUFBYSxZQUEyQjtZQUNwQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEQsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMvQixZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbEMsQ0FBQztRQUNMLENBQUM7UUFDRCx5Q0FBUyxHQUFULFVBQVUsWUFBMkI7WUFDakMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDL0IsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNySixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNwRCxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQy9CLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksS0FB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LEtBQUssQ0FBQyxDQUFDO2dCQUM1RSxDQUFDO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUM7UUFDRCxvREFBb0IsR0FBcEI7WUFDSSxJQUFJLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDNUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLHNDQUFzQztvQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVsQyxDQUFDO1lBQ0wsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFYixDQUFDO1FBQ0wsQ0FBQztRQUNMLDRCQUFDO0lBQUQsQ0FyR0EsQUFxR0MsSUFBQTtJQXJHWSw2QkFBcUIsd0JBcUdqQyxDQUFBIiwiZmlsZSI6InNlbGVjdGlvbkV2ZW50c0hlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVNlbGVjdGFibGV9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3RhYmxlJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25Db25maWd9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3Rpb25Db25maWcnO1xyXG5pbXBvcnQge0tleUNvZGVzfSBmcm9tICcuL2NvbW1vbi9rZXlDb2Rlcyc7XHJcbmltcG9ydCB7TW91c2VCdXR0b25zfSBmcm9tICcuL2NvbW1vbi9tb3VzZUJ1dHRvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbkV2ZW50c0hlbHBlciB7XHJcbiAgICBzZWxlY3Rpb25Db25maWc6IElTZWxlY3Rpb25Db25maWc7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rpb25Db25maWc6IElTZWxlY3Rpb25Db25maWcpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZyA9IHNlbGVjdGlvbkNvbmZpZztcclxuICAgIH1cclxuICAgIHRyeVNlbGVjdEFsbChicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkFycm93VXAoYnJvd3NlckV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJFdmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSwgYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuc2VsZWN0aW9uQ29uZmlnLmFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dEb3duKGJyb3dzZXJFdmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChicm93c2VyRXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdExhc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ICsgMSwgYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuc2VsZWN0aW9uQ29uZmlnLmFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGtleWJvYXJkSGFuZGxlcihicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGJyb3dzZXJFdmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dVcDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwKGJyb3dzZXJFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGJyb3dzZXJFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlTZWxlY3RBbGwoYnJvd3NlckV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW91c2VIYW5kbGVyKGJyb3dzZXJFdmVudDogTW91c2VFdmVudCwgaXRlbUluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0l0ZW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKGl0ZW1JbmRleCk7XHJcbiAgICAgICAgaWYgKGlzSXRlbVNlbGVjdGVkID09PSBmYWxzZSB8fCBicm93c2VyRXZlbnQud2hpY2ggPT09IE1vdXNlQnV0dG9ucy5MZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy50b2dnbGVPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihpdGVtSW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNsZWFyV2luZG93U2VsZWN0aW9uLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNJdGVtU2VsZWN0ZWQgPT09IGZhbHNlIHx8IGJyb3dzZXJFdmVudC53aGljaCA9PT0gTW91c2VCdXR0b25zLkxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKGJyb3dzZXJFdmVudC5jdHJsS2V5ICYmIHRoaXMuc2VsZWN0aW9uQ29uZmlnLmFsbG93TXVsdGlwbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuc2VsZWN0aW9uQ29uZmlnLmFsbG93TXVsdGlwbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkluZGV4ID0gdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5nZXRNaW5TZWxlY3RlZEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdFJhbmdlKG1pbkluZGV4ID09PSBudWxsID8gaXRlbUluZGV4IDogbWluSW5kZXgsIGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihpdGVtSW5kZXgsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYXJXaW5kb3dTZWxlY3Rpb24sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyV2luZG93U2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXN0cmluZy1saXRlcmFsICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
