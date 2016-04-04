define(["require", "exports", './common/keyCodes'], function (require, exports, keyCodes_1) {
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
            else if (this.selectionManager.lastProcessedIndex === null) {
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
            else if (this.selectionManager.lastProcessedIndex === null) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleWJvYXJkU2VsZWN0aW9uRXZlbnRzSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBRUE7UUFFSSx1Q0FBWSxnQkFBbUM7WUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQzdDLENBQUM7UUFDRCxvREFBWSxHQUFaLFVBQWEsR0FBa0I7WUFDM0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNsQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN6QixDQUFDO1FBQ0wsQ0FBQztRQUNELGlEQUFTLEdBQVQsVUFBVSxHQUFrQixFQUFFLHNCQUErQjtZQUN6RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN0QixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FB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TSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssbUJBQVEsQ0FBQyxPQUFPO29CQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO29CQUM1QyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxtQkFBUSxDQUFDLFNBQVM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7b0JBQzlDLEtBQUssQ0FBQztnQkFDVixLQUFLLG1CQUFRLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixLQUFLLENBQUM7Z0JBQ1Y7b0JBQ0ksS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7UUFDRCw0REFBb0IsR0FBcEI7WUFDSSxJQUFJLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDNUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLHNDQUFzQztvQkFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVsQyxDQUFDO1lBQ0wsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFYixDQUFDO1FBQ0wsQ0FBQztRQUNMLG9DQUFDO0lBQUQsQ0FoRkEsQUFnRkMsSUFBQTtJQWhGWSxxQ0FBNkIsZ0NBZ0Z6QyxDQUFBIiwiZmlsZSI6ImtleWJvYXJkU2VsZWN0aW9uRXZlbnRzSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQge0tleUNvZGVzfSBmcm9tICcuL2NvbW1vbi9rZXlDb2Rlcyc7XHJcbmV4cG9ydCBjbGFzcyBLZXlib2FyZFNlbGVjdGlvbkV2ZW50c0hlbHBlciB7XHJcbiAgICBzZWxlY3Rpb25NYW5hZ2VyOiBJU2VsZWN0aW9uTWFuYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdGlvbk1hbmFnZXI6IElTZWxlY3Rpb25NYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyID0gc2VsZWN0aW9uTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHRyeVNlbGVjdEFsbChldnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dVcChldnQ6IEtleWJvYXJkRXZlbnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEZpcnN0KCk7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RGaXJzdCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnNoaWZ0S2V5ICYmIGZhbHNlID09PSB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RSYW5nZSh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4LCB0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5kZXNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTWFuYWdlci5zZWxlY3RJbmRleCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4IC0gMSwgZXZ0LnNoaWZ0S2V5ICYmIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQXJyb3dEb3duKGV2dDogS2V5Ym9hcmRFdmVudCwgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChldnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0TGFzdCgpO1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0Rmlyc3QoKTtcclxuICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2dC5zaGlmdEtleSAmJiBmYWxzZSA9PT0gdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmlzSW5kZXhTZWxlY3RlZCh0aGlzLnNlbGVjdGlvbk1hbmFnZXIubGFzdFByb2Nlc3NlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuc2VsZWN0UmFuZ2UodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCwgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1hbmFnZXIuaXNJbmRleFNlbGVjdGVkKHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmRlc2VsZWN0SW5kZXgodGhpcy5zZWxlY3Rpb25NYW5hZ2VyLmxhc3RQcm9jZXNzZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25NYW5hZ2VyLnNlbGVjdEluZGV4KHRoaXMuc2VsZWN0aW9uTWFuYWdlci5sYXN0UHJvY2Vzc2VkSW5kZXggKyAxLCBldnQuc2hpZnRLZXkgJiYgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAga2V5RG93bkhhbmRsZXIoZXZ0OiBLZXlib2FyZEV2ZW50LCBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGVzLkFycm93VXA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcChldnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQXJyb3dEb3duOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bihldnQsIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZXMuQTpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJ5U2VsZWN0QWxsKGV2dCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyV2luZG93U2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuaGFzT3duUHJvcGVydHkoJ3NlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLXN0cmluZy1saXRlcmFsICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
