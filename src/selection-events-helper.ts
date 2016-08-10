import {SelectionAreaConfig} from './contracts/selection-area-config';
/**
 * Used by {@link SelectionEventsHelper} handlers to determine which key was pressed on keyboard.  
 */
export enum KeyCodes {
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Esc = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40,
    A = 65
}

/**
 * Used by {@link SelectionEventsHelper} handlers to determine which mouse button is pressed.  
 */
export enum MouseButtons {
    None = 0,
    Left = 1,
    Middle = 2,
    Right = 3
}
/**
 * Helper class that can be used by application-defined UI components for handling keyboard and mouse interaction with component.
 * Implements selection model that similar to Excel or Google Sheets. Concrete handled patterns you can see in concrete methods documentation.
 * This implementation doesn't use any browser specific objects such as events and doesn't use any browser API.
 */
export class SelectionEventsHelper {
    /**
     * @param selectionConfig used for declarative interaction with application-defined UI component and access to it's selection settings
     * as well as {@link SelectionService} implementation, that was configured in application-defined UI component.
     */
    constructor(public selectionConfig: SelectionAreaConfig) {
    }
    /**
     * Tries to select all items if Ctrl+A combination was pressed.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    protected trySelectAll(ctrlPressed: boolean, shiftPressed: boolean): boolean {
        if (ctrlPressed && !shiftPressed) {
            this.selectionConfig.selectionService.selectAll();
            return true;
        }
        return false;
    }
    /**
     * Tries to select previous item when `Arrow Up` was pressed (`Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * If `Shift` was pressed and {@link SelectionAreaConfig.multiple} is 'true' then elements selected before stays selected.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected trySelectPreviousItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex > 0) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex - 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    /**
     * Tries to select next item when `Arrow Down` was pressed (`Right Arrow` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * If `Shift` was pressed and {@link SelectionAreaConfig.multiple} is 'true' then elements selected before stays selected.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected trySelectNextItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex < this.selectionConfig.selectionService.itemsSource.length - 1) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex + 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    /**
     * Tries to deselect last selected element when `Shift+Arrow Up` combination pressed (`Shift+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
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
    /**
     * Tries to deselect last selected element when `Shift+Arrow Down` combination pressed (`Shift+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
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
    /**
     * Tries to select element that is previous to the last processed element and last operation is deselection.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }
    /**
     * Tries to select element that is next to the last processed element and last operation is deselection. 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex + 1);
            return true;
        }
        return false;
    }
    /**
     * Tries to handle first action on UI component. Selects first element in {@link SelectionService.itemsSource} if nothing was selected before.
     * @returns `true` if command was applied.
     */
    protected tryInitialSelectionOfFirstItem(): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex === null) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Tries to select all elements starting from last selected element up to first element in {@link SelectionService.itemsSource} when `Ctrl+Shift+Arrow Up` combination was pressed
     * (`Ctrl+Shift+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected trySelectAllItemsUpToFirst(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, 0);
            return true;
        }
        return false;
    }
    /**
     * Tries to select all elements starting from last selected element up to last element in {@link SelectionService.itemsSource} when `Ctrl+Shift+Arrow Down` combination was pressed
     * (`Ctrl+Shift+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if command was applied.
     */
    protected trySelectAllItemsUpToLast(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.itemsSource.length - 1);
            return true;
        }
        return false;
    }
    /**
     * Tries to select first element in {@link SelectionService.itemsSource} when `Ctrl+Arrow Up` combination was pressed (`Ctrl+Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    protected trySelectFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Tries to select last element in {@link SelectionService.itemsSource} when `Ctrl+Arrow Down` combination was pressed (`Ctrl+Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`). 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed (with pressed `Shift` this command would not be applied).
     * @returns `true` if command was applied.
     */
    protected trySelectLastItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectLast();
            return true;
        }
        return false;
    }
    /**
     * Common handler for `Arrow Up` key (`Arrow Left` if {@link SelectionAreaConfig.horizontal} is `true`). Calls applicable handlers one by one until any returns `true`. 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if any of executed commands was applied.
     */
    protected onPreviousKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInRange(shiftKeyPressed) ||
            this.trySelectPreviousItem(shiftKeyPressed);
    }
    /**
     * Common handler for `Arrow Down` key (`Arrow Right` if {@link SelectionAreaConfig.horizontal} is `true`). Calls applicable handlers one by one until any returns `true`.
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @returns `true` if any of executed commands was applied.
     */
    protected onNextKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectLastItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToLast(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInReversedRange(shiftKeyPressed) ||
            this.trySelectNextItem(shiftKeyPressed);
    }
    /**
     * Common handler for keyboard events. Depending on specified parameters calls {@link onNextKey} {@link onPreviousKey} or {@link trySelectAll} handler. 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @param keyCode - specifies code of key that was pressed. This method can handle next keys: {@link KeyCodes.ArrowUp}, {@link KeyCodes.ArrowLeft}, {@link KeyCodes.ArrowDown}, {@link KeyCodes.ArrowRight} and {@link KeyCodes.A}.
     * @returns `true` if any of executed commands was applied.
     */
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
    /**
     * Common handler for mouse events. 
     * @param ctrlKeyPressed - `true` if `Ctrl` key was pressed.
     * @param shiftKeyPressed - `true` if `Shift` key was pressed.
     * @param mouseButton specifies which mouse button was pressed.
     * @param itemIndex index of clicked element in {@link SelectionService.itemsSource} collection.
     * @returns `true` if any of executed commands was applied.
     */
    public mouseHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: MouseButtons, itemIndex: number): boolean {
        const isItemSelected = this.selectionConfig.selectionService.isIndexSelected(itemIndex);
        if (isItemSelected !== false && mouseButton !== MouseButtons.Left) {
            return false;
        }
        if (shiftKeyPressed && this.selectionConfig.multiple) {
            const minIndex = this.selectionConfig.selectionService.getMinSelectedIndex();
            this.selectionConfig.selectionService.selectRange(minIndex === -1 ? itemIndex : minIndex, itemIndex);
        } else {
            let multiple = (ctrlKeyPressed || this.selectionConfig.toggleOnly) && this.selectionConfig.multiple;
            this.selectionConfig.selectionService.toggleSelection(itemIndex, multiple);
        }
        return true;
    }
}
