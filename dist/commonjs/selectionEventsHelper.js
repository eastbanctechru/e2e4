"use strict";
var keyCodes_1 = require('./common/keyCodes');
var MouseButtons_1 = require('./common/MouseButtons');
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
