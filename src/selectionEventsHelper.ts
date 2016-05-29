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
    private trySelectNextItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex < this.selectionConfig.selectionManager.itemsSource.length - 1) {
            this.selectionConfig.selectionManager.selectIndex(this.selectionConfig.selectionManager.lastProcessedIndex + 1, shiftKeyPressed && this.selectionConfig.allowMultipleSelection);
            return true;
        }
        return false;
    }
    private tryDeselectLastItemInRange(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex > 0 && shiftKeyPressed) {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex - 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
                this.selectionConfig.selectionManager.lastProcessedIndex = this.selectionConfig.selectionManager.lastProcessedIndex - 1;
                return true;
            }
        }
        return false;
    }
    private tryDeselectLastItemInReversedRange(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex < this.selectionConfig.selectionManager.itemsSource.length && shiftKeyPressed) {
            if (this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex + 1)) {
                this.selectionConfig.selectionManager.deselectIndex(this.selectionConfig.selectionManager.lastProcessedIndex);
                this.selectionConfig.selectionManager.lastProcessedIndex = this.selectionConfig.selectionManager.lastProcessedIndex + 1;
                return true;
            }
        }
        return false;
    }

    private tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }

    private tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionManager.isIndexSelected(this.selectionConfig.selectionManager.lastProcessedIndex)) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.lastProcessedIndex + 1);
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
    private trySelectAllItemsUpToLast(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionManager.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.allowMultipleSelection) {
            this.selectionConfig.selectionManager.selectRange(this.selectionConfig.selectionManager.lastProcessedIndex, this.selectionConfig.selectionManager.itemsSource.length - 1);
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
    private trySelectLastItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionManager.selectLast();
            return true;
        }
        return false;
    }

    onArrowUp(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInRange(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectPreviousItem(ctrlKeyPressed, shiftKeyPressed);
    }
    onArrowDown(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectLastItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToLast(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInReversedRange(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectNextItem(ctrlKeyPressed, shiftKeyPressed);
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
        if (shiftKeyPressed && this.selectionConfig.allowMultipleSelection) {
            const minIndex = this.selectionConfig.selectionManager.getMinSelectedIndex();
            this.selectionConfig.selectionManager.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
        } else {
            let multiple = (ctrlKeyPressed || this.selectionConfig.toggleOnly) && this.selectionConfig.allowMultipleSelection;
            this.selectionConfig.selectionManager.toggleSelection(itemIndex, multiple);
        }
        return true;
    }
}
