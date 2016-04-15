define(["require", "exports", './common/keyCodes', './common/MouseButtons'], function (require, exports, keyCodes_1, MouseButtons_1) {
    "use strict";
    var SelectionEventsHelper = (function () {
        function SelectionEventsHelper(selectionManager) {
            this.selectionManager = selectionManager;
        }
        SelectionEventsHelper.prototype.trySelectAll = function (evt) {
            if (evt.ctrlKey) {
                this.selectionManager.selectAll();
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.onArrowUp = function (evt, allowMultipleSelection) {
            if (evt.ctrlKey) {
                this.selectionManager.selectFirst();
                evt.stopPropagation();
                evt.preventDefault();
            }
            else if (this.selectionManager.lastProcessedIndex === null || this.selectionManager.lastProcessedIndex === undefined) {
                this.selectionManager.selectFirst();
                evt.stopPropagation();
                evt.preventDefault();
            }
            else if (evt.shiftKey && false === this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex)) {
                this.selectionManager.selectRange(this.selectionManager.lastProcessedIndex, this.selectionManager.lastProcessedIndex - 1);
            }
            else if (this.selectionManager.lastProcessedIndex > 0) {
                if (this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex - 1)) {
                    this.selectionManager.deselectIndex(this.selectionManager.lastProcessedIndex);
                }
                this.selectionManager.selectIndex(this.selectionManager.lastProcessedIndex - 1, evt.shiftKey && allowMultipleSelection);
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.onArrowDown = function (evt, allowMultipleSelection) {
            if (evt.ctrlKey) {
                this.selectionManager.selectLast();
                evt.stopPropagation();
                evt.preventDefault();
            }
            else if (this.selectionManager.lastProcessedIndex === null || this.selectionManager.lastProcessedIndex === undefined) {
                this.selectionManager.selectFirst();
                evt.stopPropagation();
                evt.preventDefault();
            }
            else if (evt.shiftKey && false === this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex)) {
                this.selectionManager.selectRange(this.selectionManager.lastProcessedIndex, this.selectionManager.lastProcessedIndex + 1);
            }
            else {
                if (this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex + 1)) {
                    this.selectionManager.deselectIndex(this.selectionManager.lastProcessedIndex);
                }
                this.selectionManager.selectIndex(this.selectionManager.lastProcessedIndex + 1, evt.shiftKey && allowMultipleSelection);
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        SelectionEventsHelper.prototype.keyDownHandler = function (evt, allowMultipleSelection) {
            switch (evt.keyCode) {
                case keyCodes_1.KeyCodes.ArrowUp:
                    this.onArrowUp(evt, allowMultipleSelection);
                    break;
                case keyCodes_1.KeyCodes.ArrowDown:
                    this.onArrowDown(evt, allowMultipleSelection);
                    break;
                case keyCodes_1.KeyCodes.A:
                    this.trySelectAll(evt);
                    break;
                default:
                    break;
            }
        };
        SelectionEventsHelper.prototype.onMouseUp = function (eventArgs, toggleOnly, allowMultipleSelection) {
            var isItemSelected = this.selectionManager.isIndexSelected(eventArgs.itemIndex);
            if (isItemSelected === false || eventArgs.browserEvent.which === MouseButtons_1.MouseButtons.Left) {
                if (toggleOnly) {
                    this.selectionManager.toggleSelection(eventArgs.itemIndex, true);
                    setTimeout(this.clearWindowSelection, 0);
                    return;
                }
            }
            if (isItemSelected === false || eventArgs.browserEvent.which === MouseButtons_1.MouseButtons.Left) {
                if (eventArgs.browserEvent.ctrlKey && allowMultipleSelection) {
                    this.selectionManager.toggleSelection(eventArgs.itemIndex, true);
                }
                else if (eventArgs.browserEvent.shiftKey && allowMultipleSelection) {
                    var minIndex = this.selectionManager.getMinSelectedIndex();
                    this.selectionManager.selectRange(minIndex === null ? eventArgs.itemIndex : minIndex, eventArgs.itemIndex);
                }
                else {
                    this.selectionManager.toggleSelection(eventArgs.itemIndex, false);
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

//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxDQUFDO29CQUM5QyxzQ0FBc0M7b0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFbEMsQ0FBQztZQUNMLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWIsQ0FBQztRQUNMLENBQUM7UUFDTCw0QkFBQztJQUFELENBckdBLEFBcUdDLElBQUE7SUFyR1ksNkJBQXFCLHdCQXFHakMsQ0FBQSIsImZpbGUiOiJzZWxlY3Rpb25FdmVudHNIZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7SVNlbGVjdGFibGVJdGVtQ2xpY2tlZEV2ZW50QXJnc30gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGFibGVJdGVtQ2xpY2tlZEV2ZW50QXJncyc7XHJcbmltcG9ydCB7S2V5Q29kZXN9IGZyb20gJy4vY29tbW9uL2tleUNvZGVzJztcclxuaW1wb3J0IHtNb3VzZUJ1dHRvbnN9IGZyb20gJy4vY29tbW9uL01vdXNlQnV0dG9ucyc7XHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25FdmVudHNIZWxwZXIge1xyXG4gICAgc2VsZWN0aW9uTWFuYWdlcjogSVNlbGVjdGlvbk1hbmFnZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rpb25NYW5hZ2VyOiBJU2VsZWN0aW9uTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlciA9IHNlbGVjdGlvbk1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICB0cnlTZWxlY3RBbGwoZXZ0OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2dC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkFycm93VXAoZXZ0OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2dC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gbnVsbCB8fCB0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldnQuc2hpZnRLZXkgJiYgZmFsc2UgPT09IHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdFJhbmdlKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgsIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggLSAxLCBldnQuc2hpZnRLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25BcnJvd0Rvd24oZXZ0OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2dC5jdHJsS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RMYXN0KCk7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2dC5zaGlmdEtleSAmJiBmYWxzZSA9PT0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxLCBldnQuc2hpZnRLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAga2V5RG93bkhhbmRsZXIoZXZ0OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGVzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcChldnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bihldnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5U2VsZWN0QWxsKGV2dCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTW91c2VVcChldmVudEFyZ3M6IElTZWxlY3RhYmxlSXRlbUNsaWNrZWRFdmVudEFyZ3MsIHRvZ2dsZU9ubHk6IGJvb2xlYW4sIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpc0l0ZW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQoZXZlbnRBcmdzLml0ZW1JbmRleCk7XHJcbiAgICAgICAgaWYgKGlzSXRlbVNlbGVjdGVkID09PSBmYWxzZSB8fCBldmVudEFyZ3MuYnJvd3NlckV2ZW50LndoaWNoID09PSBNb3VzZUJ1dHRvbnMuTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAodG9nZ2xlT25seSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihldmVudEFyZ3MuaXRlbUluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5jbGVhcldpbmRvd1NlbGVjdGlvbiwgMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzSXRlbVNlbGVjdGVkID09PSBmYWxzZSB8fCBldmVudEFyZ3MuYnJvd3NlckV2ZW50LndoaWNoID09PSBNb3VzZUJ1dHRvbnMuTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnRBcmdzLmJyb3dzZXJFdmVudC5jdHJsS2V5ICYmIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci50b2dnbGVTZWxlY3Rpb24oZXZlbnRBcmdzLml0ZW1JbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnRBcmdzLmJyb3dzZXJFdmVudC5zaGlmdEtleSAmJiBhbGxvd011bHRpcGxlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5JbmRleCA9IHRoaXMuc2VsZWN0aW9uTWFuYWdlci5nZXRNaW5TZWxlY3RlZEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UobWluSW5kZXggPT09IG51bGwgPyBldmVudEFyZ3MuaXRlbUluZGV4IDogbWluSW5kZXgsIGV2ZW50QXJncy5pdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihldmVudEFyZ3MuaXRlbUluZGV4LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNsZWFyV2luZG93U2VsZWN0aW9uLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGVhcldpbmRvd1NlbGVjdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lmhhc093blByb3BlcnR5KCdzZWxlY3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
