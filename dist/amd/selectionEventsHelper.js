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

//# sourceMappingURL=data:application/json;base64,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LGVBQWUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUNELG9EQUFvQixHQUFwQjtZQUNJLElBQUksQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUM1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsc0NBQXNDO29CQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWxDLENBQUM7WUFDTCxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUViLENBQUM7UUFDTCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQXJHQSxBQXFHQyxJQUFBO0lBckdZLDZCQUFxQix3QkFxR2pDLENBQUEiLCJmaWxlIjoic2VsZWN0aW9uRXZlbnRzSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU2VsZWN0YWJsZX0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGFibGUnO1xyXG5pbXBvcnQge0lTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7SVNlbGVjdGlvbkNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbkNvbmZpZyc7XHJcbmltcG9ydCB7S2V5Q29kZXN9IGZyb20gJy4vY29tbW9uL2tleUNvZGVzJztcclxuaW1wb3J0IHtNb3VzZUJ1dHRvbnN9IGZyb20gJy4vY29tbW9uL21vdXNlQnV0dG9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uRXZlbnRzSGVscGVyIHtcclxuICAgIHNlbGVjdGlvbkNvbmZpZzogSVNlbGVjdGlvbkNvbmZpZztcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGlvbkNvbmZpZzogSVNlbGVjdGlvbkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnID0gc2VsZWN0aW9uQ29uZmlnO1xyXG4gICAgfVxyXG4gICAgdHJ5U2VsZWN0QWxsKGJyb3dzZXJFdmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChicm93c2VyRXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dVcChicm93c2VyRXZlbnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IG51bGwgfHwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgZmFsc2UgPT09IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdFJhbmdlKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4LCB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxLCBicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25BcnJvd0Rvd24oYnJvd3NlckV2ZW50OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJFdmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0TGFzdCgpO1xyXG4gICAgICAgICAgICBicm93c2VyRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IG51bGwgfHwgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgZmFsc2UgPT09IHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdFJhbmdlKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4LCB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxLCBicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGJyb3dzZXJFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgYnJvd3NlckV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAga2V5Ym9hcmRIYW5kbGVyKGJyb3dzZXJFdmVudDogS2V5Ym9hcmRFdmVudCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoYnJvd3NlckV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BcnJvd1VwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXAoYnJvd3NlckV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGVzLkFycm93RG93bjpcclxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd24oYnJvd3NlckV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGVzLkE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVNlbGVjdEFsbChicm93c2VyRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb3VzZUhhbmRsZXIoYnJvd3NlckV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtSW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzSXRlbVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQoaXRlbUluZGV4KTtcclxuICAgICAgICBpZiAoaXNJdGVtU2VsZWN0ZWQgPT09IGZhbHNlIHx8IGJyb3dzZXJFdmVudC53aGljaCA9PT0gTW91c2VCdXR0b25zLkxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uQ29uZmlnLnRvZ2dsZU9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYXJXaW5kb3dTZWxlY3Rpb24sIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0l0ZW1TZWxlY3RlZCA9PT0gZmFsc2UgfHwgYnJvd3NlckV2ZW50LndoaWNoID09PSBNb3VzZUJ1dHRvbnMuTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoYnJvd3NlckV2ZW50LmN0cmxLZXkgJiYgdGhpcy5zZWxlY3Rpb25Db25maWcuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Db25maWcuc2VsZWN0aW9uTWFuYWdlci50b2dnbGVTZWxlY3Rpb24oaXRlbUluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChicm93c2VyRXZlbnQuc2hpZnRLZXkgJiYgdGhpcy5zZWxlY3Rpb25Db25maWcuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWluSW5kZXggPSB0aGlzLnNlbGVjdGlvbkNvbmZpZy5zZWxlY3Rpb25NYW5hZ2VyLmdldE1pblNlbGVjdGVkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UobWluSW5kZXggPT09IG51bGwgPyBpdGVtSW5kZXggOiBtaW5JbmRleCwgaXRlbUluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ29uZmlnLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGl0ZW1JbmRleCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jbGVhcldpbmRvd1NlbGVjdGlvbiwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJXaW5kb3dTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDpkaXNhYmxlOm5vLXN0cmluZy1saXRlcmFsICovXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudFsnc2VsZWN0aW9uJ10uZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
