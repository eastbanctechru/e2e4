define(["require", "exports", './common/keyCodes', './common/MouseButtons'], function (require, exports, keyCodes_1, MouseButtons_1) {
    "use strict";
    var KeyboardSelectionEventsHelper = (function () {
        function KeyboardSelectionEventsHelper(selectionManager) {
            this.selectionManager = selectionManager;
        }
        KeyboardSelectionEventsHelper.prototype.trySelectAll = function (evt) {
            if (evt.ctrlKey) {
                this.selectionManager.selectAll();
                evt.stopPropagation();
                evt.preventDefault();
            }
        };
        KeyboardSelectionEventsHelper.prototype.onArrowUp = function (evt, allowMultipleSelection) {
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
        KeyboardSelectionEventsHelper.prototype.onArrowDown = function (evt, allowMultipleSelection) {
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
        KeyboardSelectionEventsHelper.prototype.keyDownHandler = function (evt, allowMultipleSelection) {
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
        KeyboardSelectionEventsHelper.prototype.onMouseUp = function (eventArgs, toggleOnly, allowMultipleSelection) {
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
        KeyboardSelectionEventsHelper.prototype.clearWindowSelection = function () {
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
        return KeyboardSelectionEventsHelper;
    }());
    exports.KeyboardSelectionEventsHelper = KeyboardSelectionEventsHelper;
});

//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxDQUFDO29CQUM5QyxzQ0FBc0M7b0JBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFbEMsQ0FBQztZQUNMLENBQUU7WUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWIsQ0FBQztRQUNMLENBQUM7UUFDTCxvQ0FBQztJQUFELENBckdBLEFBcUdDLElBQUE7SUFyR1kscUNBQTZCLGdDQXFHekMsQ0FBQSIsImZpbGUiOiJzZWxlY3Rpb25FdmVudHNIZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lTZWxlY3Rpb25NYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU2VsZWN0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7SVNlbGVjdGFibGVJdGVtQ2xpY2tlZEV2ZW50QXJnc30gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGFibGVJdGVtQ2xpY2tlZEV2ZW50QXJncyc7XHJcbmltcG9ydCB7S2V5Q29kZXN9IGZyb20gJy4vY29tbW9uL2tleUNvZGVzJztcclxuaW1wb3J0IHtNb3VzZUJ1dHRvbnN9IGZyb20gJy4vY29tbW9uL01vdXNlQnV0dG9ucyc7XHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNlbGVjdGlvbkV2ZW50c0hlbHBlciB7XHJcbiAgICBzZWxlY3Rpb25NYW5hZ2VyOiBJU2VsZWN0aW9uTWFuYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGlvbk1hbmFnZXI6IElTZWxlY3Rpb25NYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyID0gc2VsZWN0aW9uTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHRyeVNlbGVjdEFsbChldnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dVcChldnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsIHx8IHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2dC5zaGlmdEtleSAmJiBmYWxzZSA9PT0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCAtIDEsIGV2dC5zaGlmdEtleSAmJiBhbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkFycm93RG93bihldnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdExhc3QoKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggPT09IG51bGwgfHwgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4LCB0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5pc0luZGV4U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEsIGV2dC5zaGlmdEtleSAmJiBhbGxvd011bHRpcGxlU2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBrZXlEb3duSGFuZGxlcihldnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGV2dC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dVcDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwKGV2dCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BcnJvd0Rvd246XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGV2dCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBLZXlDb2Rlcy5BOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cnlTZWxlY3RBbGwoZXZ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Nb3VzZVVwKGV2ZW50QXJnczogSVNlbGVjdGFibGVJdGVtQ2xpY2tlZEV2ZW50QXJncywgdG9nZ2xlT25seTogYm9vbGVhbiwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzSXRlbVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZChldmVudEFyZ3MuaXRlbUluZGV4KTtcclxuICAgICAgICBpZiAoaXNJdGVtU2VsZWN0ZWQgPT09IGZhbHNlIHx8IGV2ZW50QXJncy5icm93c2VyRXZlbnQud2hpY2ggPT09IE1vdXNlQnV0dG9ucy5MZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0b2dnbGVPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGV2ZW50QXJncy5pdGVtSW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmNsZWFyV2luZG93U2VsZWN0aW9uLCAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNJdGVtU2VsZWN0ZWQgPT09IGZhbHNlIHx8IGV2ZW50QXJncy5icm93c2VyRXZlbnQud2hpY2ggPT09IE1vdXNlQnV0dG9ucy5MZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudEFyZ3MuYnJvd3NlckV2ZW50LmN0cmxLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnRvZ2dsZVNlbGVjdGlvbihldmVudEFyZ3MuaXRlbUluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudEFyZ3MuYnJvd3NlckV2ZW50LnNoaWZ0S2V5ICYmIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbkluZGV4ID0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmdldE1pblNlbGVjdGVkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZShtaW5JbmRleCA9PT0gbnVsbCA/IGV2ZW50QXJncy5pdGVtSW5kZXggOiBtaW5JbmRleCwgZXZlbnRBcmdzLml0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIudG9nZ2xlU2VsZWN0aW9uKGV2ZW50QXJncy5pdGVtSW5kZXgsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY2xlYXJXaW5kb3dTZWxlY3Rpb24sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyV2luZG93U2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXN0cmluZy1saXRlcmFsICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
