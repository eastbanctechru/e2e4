System.register(['./common/keyCodes', './common/mouseButtons'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var keyCodes_1, mouseButtons_1;
    var SelectionEventsHelper;
    return {
        setters:[
            function (keyCodes_1_1) {
                keyCodes_1 = keyCodes_1_1;
            },
            function (mouseButtons_1_1) {
                mouseButtons_1 = mouseButtons_1_1;
            }],
        execute: function() {
            SelectionEventsHelper = (function () {
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
            exports_1("SelectionEventsHelper", SelectionEventsHelper);
        }
    }
});
