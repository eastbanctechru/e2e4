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
            if (isItemSelected !== false && browserEvent.which !== mouseButtons_1.MouseButtons.Left) {
                return;
            }
            if (this.selectionConfig.toggleOnly) {
                if (browserEvent.shiftKey) {
                    var minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
                    this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
                }
                else {
                    this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
                }
                setTimeout(this.clearWindowSelection, 0);
                return;
            }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbkV2ZW50c0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQU1BO1FBRUksK0JBQVksZUFBaUM7WUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDM0MsQ0FBQztRQUNELDRDQUFZLEdBQVosVUFBYSxZQUEyQjtZQUNwQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEQsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMvQixZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbEMsQ0FBQztRQUNMLENBQUM7UUFDRCx5Q0FBUyxHQUFULFVBQVUsWUFBMkI7WUFDakMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDL0IsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNySixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNwRCxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQy9CLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksS0FB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RSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLFNBQVMsR0FBRyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0csQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0Qsb0RBQW9CLEdBQXBCO1lBQ0ksSUFBSSxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzVDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxzQ0FBc0M7b0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFbEMsQ0FBQztZQUNMLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWIsQ0FBQztRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBMUdBLEFBMEdDLElBQUE7SUExR1ksNkJBQXFCLHdCQTBHakMsQ0FBQSIsImZpbGUiOiJzZWxlY3Rpb25FdmVudHNIZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTZWxlY3RhYmxlfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0YWJsZSc7XHJcbmltcG9ydCB7SVNlbGVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lTZWxlY3Rpb25NYW5hZ2VyJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0aW9uQ29uZmlnJztcclxuaW1wb3J0IHtLZXlDb2Rlc30gZnJvbSAnLi9jb21tb24va2V5Q29kZXMnO1xyXG5pbXBvcnQge01vdXNlQnV0dG9uc30gZnJvbSAnLi9jb21tb24vbW91c2VCdXR0b25zJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25FdmVudHNIZWxwZXIge1xyXG4gICAgc2VsZWN0aW9uQ29uZmlnOiBJU2VsZWN0aW9uQ29uZmlnO1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0aW9uQ29uZmlnOiBJU2VsZWN0aW9uQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcgPSBzZWxlY3Rpb25Db25maWc7XHJcbiAgICB9XHJcbiAgICB0cnlTZWxlY3RBbGwoYnJvd3NlckV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJFdmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25BcnJvd1VwKGJyb3dzZXJFdmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChicm93c2VyRXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gbnVsbCB8fCB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJyb3dzZXJFdmVudC5zaGlmdEtleSAmJiBmYWxzZSA9PT0gdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgsIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEsIGJyb3dzZXJFdmVudC5zaGlmdEtleSAmJiB0aGlzLnNlbGVjdGlvbkNvbmZpZy5hbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkFycm93RG93bihicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RMYXN0KCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gbnVsbCB8fCB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJyb3dzZXJFdmVudC5zaGlmdEtleSAmJiBmYWxzZSA9PT0gdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgsIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ICsgMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEsIGJyb3dzZXJFdmVudC5zaGlmdEtleSAmJiB0aGlzLnNlbGVjdGlvbkNvbmZpZy5hbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBrZXlib2FyZEhhbmRsZXIoYnJvd3NlckV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChicm93c2VyRXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGVzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcChicm93c2VyRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bihicm93c2VyRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5U2VsZWN0QWxsKGJyb3dzZXJFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1vdXNlSGFuZGxlcihicm93c2VyRXZlbnQ6IE1vdXNlRXZlbnQsIGl0ZW1JbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXNJdGVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZChpdGVtSW5kZXgpO1xyXG4gICAgICAgIGlmIChpc0l0ZW1TZWxlY3RlZCAhPT0gZmFsc2UgJiYgYnJvd3NlckV2ZW50LndoaWNoICE9PSBNb3VzZUJ1dHRvbnMuTGVmdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcudG9nZ2xlT25seSkge1xyXG4gICAgICAgICAgICBpZiAoYnJvd3NlckV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5JbmRleCA9IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuZ2V0TWluU2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZShtaW5JbmRleCA9PT0gbnVsbCA/IGl0ZW1JbmRleCA6IG1pbkluZGV4LCBpdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci50b2dnbGVTZWxlY3Rpb24oaXRlbUluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYXJXaW5kb3dTZWxlY3Rpb24sIDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChicm93c2VyRXZlbnQuY3RybEtleSAmJiB0aGlzLnNlbGVjdGlvbkNvbmZpZy5hbGxvd011bHRpcGxlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgdGhpcy5zZWxlY3Rpb25Db25maWcuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBjb25zdCBtaW5JbmRleCA9IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuZ2V0TWluU2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdFJhbmdlKG1pbkluZGV4ID09PSBudWxsID8gaXRlbUluZGV4IDogbWluSW5kZXgsIGl0ZW1JbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci50b2dnbGVTZWxlY3Rpb24oaXRlbUluZGV4LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5jbGVhcldpbmRvd1NlbGVjdGlvbiwgMCk7XHJcbiAgICB9XHJcbiAgICBjbGVhcldpbmRvd1NlbGVjdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lmhhc093blByb3BlcnR5KCdzZWxlY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
