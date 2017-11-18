/**
 * Represents possible operations with selection model.
 *
 * Default implementation in this library is {@link DefaultSelectionService}, but you can extend it or replace with your own implementation.
 */
export interface SelectionService {
    /**
     * Collection of elements for selection.
     */
    items: any[];
    /**
     * Index of last selected/deselected element in {@link items} collection.
     */
    lastProcessedIndex: number;
    /**
     * Optional function which can be used to compare {@link items} elements.
     *
     * This function can be used by {@link checkSelection}.
     *
     * Also it's reasonable to use this function for {@link getItemIndex}.
     * @param index index of element in {@link items} collection.
     * @param actual element from {@link items} collection.
     */
    trackByFn(index: number, item: any): any;
    /**
     * Performs check that every selected element is actually selected.
     *
     */
    checkSelection(): void;
    /**
     * Deselects all elements in {@link items} collection.
     */
    deselectAll(): void;
    /**
     * Selects all elements in {@link items} collection.
     */
    selectAll(): void;
    /**
     * Selects range of elements in {@link items} collection.
     * @param fromIndex index of element from which selection range begins.
     * @param toIndex index of element on which selection range ends.
     */
    selectRange(fromIndex: number, toIndex: number): void;
    /**
     * Checks that all elements inside specified range are selected in {@link items} collection.
     * @param fromIndex index of element from which check must be performed.
     * @param toIndex index of element to which check must be performed.
     * @returns `true` if all elements inside specified range are selected.
     */
    isRangeSelected(from: number, to: number): boolean;
    /**
     * Checks that at least one element selected in {@link items} collection.
     * @returns `true` if anything is selected.
     */
    hasSelections(): boolean;
    /**
     * Checks that element at specified index is selected.
     * @param index index of element in {@link items} collection to check.
     * @returns `true` if element is selected.
     */
    isIndexSelected(index: number): boolean;
    /**
     * Returns index of first selected element from {@link items} collection.
     * @returns index of first selected element. -1 if nothing is selected.
     */
    getMinSelectedIndex(): number;
    /**
     * Returns index of last selected element from {@link items} collection.
     * @returns index of last selected element. -1 if nothing is selected.
     */
    getMaxSelectedIndex(): number;
    /**
     * Returns index of specified element in {@link items} collection.
     * @param item element to find.
     * @returns index of specified element in {@link items} collection. -1 if element not found.
     * @see {@link trackByFn}
     */
    getItemIndex(item: any): number;
    /**
     * Selects first element in {@link items} collection.
     */
    selectFirst(): void;
    /**
     * Selects last element in {@link items} collection.
     */
    selectLast(): void;
    /**
     * Selects element at specified index in {@link items} collection.
     * @param index index of element in {@link items} collection.
     * @param savePrevious `true` if previously selected elements must stay selected after current selection.
     */
    selectIndex(index: number, savePrevious?: boolean): void;
    /**
     * Deselects element at specified index in {@link items} collection.
     * @param index index of element in {@link items} collection.
     */
    deselectIndex(index: number): void;
    /**
     * Toggles selection of element at the specified index.
     * @param index index of element in {@link items} collection.
     * @param savePrevious `true` if previously selected elements must stay selected after current selection.
     */
    toggleSelection(index: number, savePrevious?: boolean): void;
    /**
     * Returns all elements from {@link items} collection which are marked as selected.
     * @returns collection of selected elements.
     */
    getSelectedElements(): object[];
    /**
     * Returns indexes of all elements from {@link items} collection which are marked as selected.
     * @returns collection of selected elements indexes in {@link items} collection.
     */
    getSelectedIndexes(): number[];
    /**
     * Performs application-defined logic for service destroy.
     */
    destroy(): void;
}
