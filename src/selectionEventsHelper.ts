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
    private trySelectAll(ctrlPressed: boolean, shiftPressed: boolean): boolean {
        if (ctrlPressed && !shiftPressed) {
            this.selectionConfig.selectionManager.selectAll();
            return true;
        }
        return false;
    }

    private trySelectPreviousItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex > 0) {
            this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex - 1, shiftKeyPressed && this.selectionConfig.allowMultipleSelection);
            return true;
        }
        return false;
    }
    private tryDeselectPreviousItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex > 0) {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex - 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
                return true;
            }
        }
        return false;
    }

    private tryAddPreviousItemToSelectionRangeWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (shiftKeyPressed && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }
    private tryInitialSelectionOfFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex === null) {
            this.selectionConfig.selectionManager.selectFirst();
            return true;
        }
        return false;
    }
    private trySelectAllItemsUpToFirst(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.allowMultipleSelection) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, 0);
            return true;
        }
        return false;
    }
    private trySelectFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionManager.selectFirst();
            return true;
        }
        return false;
    }
    onArrowUp(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryAddPreviousItemToSelectionRangeWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectPreviousItem(ctrlKeyPressed, shiftKeyPressed) || 
            this.trySelectPreviousItem(ctrlKeyPressed, shiftKeyPressed);
    }
    onArrowDown(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed) {
            this.selectionConfig.selectionManager.selectLast();
            return true;
        }
        if (this.selectionConfig.selectionManager.lastProcessedIndex === null) {
            this.selectionConfig.selectionManager.selectFirst();
            return true;
        }
        if (shiftKeyPressed && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex + 1);
            return true;
        }
        if (this.selectionConfig.selectionManager.lastProcessedIndex < this.selectionConfig.selectionManager.itemsSource.length) {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex + 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
            }
            this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex + 1, shiftKeyPressed && this.selectionConfig.allowMultipleSelection);
            return true;
        }
        return false;
    }
    keyboardHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: KeyCodes): boolean {
        switch (keyCode) {
            case KeyCodes.ArrowUp:
                return this.onArrowUp(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowDown:
                return this.onArrowDown(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.A:
                return this.trySelectAll(ctrlKeyPressed, shiftKeyPressed);
            default:
                return false;
        }
    }
    mouseHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: MouseButtons, itemIndex: number): boolean {
        const isItemSelected = this.selectionConfig.selectionManager.isIndexSelected(itemIndex);
        if (isItemSelected !== false && mouseButton !== MouseButtons.Left) {
            return false;
        }

        if (this.selectionConfig.toggleOnly) {
            if (shiftKeyPressed) {
                const minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
                this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
            } else {
                this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
            }
            return true;
        }
        if (ctrlKeyPressed && this.selectionConfig.allowMultipleSelection) {
            this.selectionConfig.selectionManager.toggleSelection(itemIndex, true);
        } else if (shiftKeyPressed && this.selectionConfig.allowMultipleSelection) {
            const minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
            this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
        } else {
            this.selectionConfig.selectionManager.toggleSelection(itemIndex, false);
        }
        return true;
    }
}
