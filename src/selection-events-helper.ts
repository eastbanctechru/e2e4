import {SelectionAreaConfig} from './contracts/selection-area-config';
import {KeyCodes} from './common/key-codes';
import {MouseButtons} from './common/mouse-buttons';

export class SelectionEventsHelper {
    public selectionConfig: SelectionAreaConfig;
    constructor(selectionConfig: SelectionAreaConfig) {
        this.selectionConfig = selectionConfig;
    }
    protected trySelectAll(ctrlPressed: boolean, shiftPressed: boolean): boolean {
        if (ctrlPressed && !shiftPressed) {
            this.selectionConfig.selectionService.selectAll();
            return true;
        }
        return false;
    }

    protected trySelectPreviousItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex > 0) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex - 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    protected trySelectNextItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex < this.selectionConfig.selectionService.itemsSource.length - 1) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex + 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    protected tryDeselectLastItemInRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex > 0 && shiftKeyPressed) {
            if (this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex - 1)) {
                this.selectionConfig.selectionService.deselectIndex(this.selectionConfig.selectionService.lastProcessedIndex);
                this.selectionConfig.selectionService.lastProcessedIndex = this.selectionConfig.selectionService.lastProcessedIndex - 1;
                return true;
            }
        }
        return false;
    }
    protected tryDeselectLastItemInReversedRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex < this.selectionConfig.selectionService.itemsSource.length && shiftKeyPressed) {
            if (this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex + 1)) {
                this.selectionConfig.selectionService.deselectIndex(this.selectionConfig.selectionService.lastProcessedIndex);
                this.selectionConfig.selectionService.lastProcessedIndex = this.selectionConfig.selectionService.lastProcessedIndex + 1;
                return true;
            }
        }
        return false;
    }

    protected tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }

    protected tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex + 1);
            return true;
        }
        return false;
    }
    protected tryInitialSelectionOfFirstItem(): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex === null) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    protected trySelectAllItemsUpToFirst(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, 0);
            return true;
        }
        return false;
    }
    protected trySelectAllItemsUpToLast(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.itemsSource.length - 1);
            return true;
        }
        return false;
    }
    protected trySelectFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    protected trySelectLastItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectLast();
            return true;
        }
        return false;
    }

    protected onPreviousKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInRange(shiftKeyPressed) ||
            this.trySelectPreviousItem(shiftKeyPressed);
    }
    protected onNextKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectLastItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToLast(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInReversedRange(shiftKeyPressed) ||
            this.trySelectNextItem(shiftKeyPressed);
    }
    public keyboardHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: KeyCodes): boolean {
        switch (keyCode) {
            case KeyCodes.ArrowUp:
                return !this.selectionConfig.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowLeft:
                return this.selectionConfig.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowDown:
                return !this.selectionConfig.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowRight:
                return this.selectionConfig.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.A:
                return this.trySelectAll(ctrlKeyPressed, shiftKeyPressed);
            default:
                return false;
        }
    }
    public mouseHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: MouseButtons, itemIndex: number): boolean {
        const isItemSelected = this.selectionConfig.selectionService.isIndexSelected(itemIndex);
        if (isItemSelected !== false && mouseButton !== MouseButtons.Left) {
            return false;
        }
        if (shiftKeyPressed && this.selectionConfig.multiple) {
            const minIndex = this.selectionConfig.selectionService.getMinSelectedIndex();
            this.selectionConfig.selectionService.selectRange(minIndex === null ? itemIndex : minIndex, itemIndex);
        } else {
            let multiple = (ctrlKeyPressed || this.selectionConfig.toggleOnly) && this.selectionConfig.multiple;
            this.selectionConfig.selectionService.toggleSelection(itemIndex, multiple);
        }
        return true;
    }
}
