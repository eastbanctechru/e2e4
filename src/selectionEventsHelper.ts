import {ISelectable} from './contracts/ISelectable';
import {ISelectionManager} from './contracts/ISelectionManager';
import {ISelectionConfig} from './contracts/ISelectionConfig';
import {KeyCodes} from './common/keyCodes';
import {MouseButtons} from './common/mouseButtons';

export class SelectionEventsHelper {
    selectionConfig: ISelectionConfig;
    constructor(selectionConfig: ISelectionConfig) {
        this.selectionConfig = selectionConfig;
    }
    trySelectAll(browserEvent: KeyboardEvent): void {
        if (browserEvent.ctrlKey) {
            this.selectionConfig.selectionManager.selectAll();
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        }
    }
    onArrowUp(browserEvent: KeyboardEvent, allowMultipleSelection: boolean): void {
        if (browserEvent.ctrlKey) {
            this.selectionConfig.selectionManager.selectFirst();
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        } else if (this.selectionConfig.selectionManager.lastProcessedIndex === null || this.selectionConfig.selectionManager.lastProcessedIndex === undefined) {
            this.selectionConfig.selectionManager.selectFirst();
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        } else if (browserEvent.shiftKey && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex - 1);
        } else if (this.selectionConfig.selectionManager.lastProcessedIndex > 0) {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex - 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
            }
            this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex - 1, browserEvent.shiftKey && allowMultipleSelection);
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        }
    }
    onArrowDown(browserEvent: KeyboardEvent, allowMultipleSelection: boolean): void {
        if (browserEvent.ctrlKey) {
            this.selectionConfig.selectionManager.selectLast();
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        } else if (this.selectionConfig.selectionManager.lastProcessedIndex === null || this.selectionConfig.selectionManager.lastProcessedIndex === undefined) {
            this.selectionConfig.selectionManager.selectFirst();
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        } else if (browserEvent.shiftKey && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex + 1);
        } else {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex + 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
            }
            this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex + 1, browserEvent.shiftKey && allowMultipleSelection);
            browserEvent.stopPropagation();
            browserEvent.preventDefault();
        }
    }
    keyboardHandler(browserEvent: KeyboardEvent, allowMultipleSelection: boolean): void {
        switch (browserEvent.keyCode) {
            case KeyCodes.ArrowUp:
                this.onArrowUp(browserEvent, allowMultipleSelection);
                break;
            case KeyCodes.ArrowDown:
                this.onArrowDown(browserEvent, allowMultipleSelection);
                break;
            case KeyCodes.A:
                this.trySelectAll(browserEvent);
                break;
            default:
                break;
        }
    }
    mouseHandler(browserEvent: MouseEvent, itemIndex: number): void {
        const isItemSelected = this.selectionConfig.selectionManager.isIndexSelected(itemIndex);
        if (isItemSelected === false || browserEvent.which === MouseButtons.Left) {
            if (this.selectionConfig.toggleOnly) {
                this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
                setTimeout(this.clearWindowSelection, 0);
                return;
            }
        }
        if (isItemSelected === false || browserEvent.which === MouseButtons.Left) {
            if (browserEvent.ctrlKey && this.selectionConfig.allowMultipleSelection) {
                this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
            } else if (browserEvent.shiftKey && this.selectionConfig.allowMultipleSelection) {
                const minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
                this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
            } else {
                this.selectionConfig.selectionManager.toggleSelection(itemIndex, false);
            }
            setTimeout(this.clearWindowSelection, 0);
        }
    }
    clearWindowSelection(): void {
        try {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.hasOwnProperty('selection')) {
                /* tslint:disable:no-string-literal */
                document['selection'].empty();
                /* tslint:enable:no-string-literal */
            }
        } catch (e) {

        }
    }
}
