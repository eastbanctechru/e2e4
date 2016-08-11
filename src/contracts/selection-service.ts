/**
 * Represents selectable element which can be processed by any implementation of {@link SelectionService}.
 */
export interface SelectableItem {
    selected: boolean;
}

/**
 * Describes possible operations with selection model.
 * Default implementation in this library is {@link DefaultSelectionService}, but you can extend it or replace with your own implementation.
 */
export interface SelectionService {
    /**
     * Collection of elements that will be selected.
     * Application-defined implementations of this contact must perform {@link checkSelection} when this property is setted to new value.
     * @see {@link trackByFn} 
     */
    itemsSource: Array<SelectableItem>;
    /**
     * Optional function which can be used for comparison of {@link itemsSource} elements.
     * If specified, this function must be used {@link checkSelection} implementation.
     * Also it's reasonable to use this function for {@link getItemIndex} implementation.
     * @param index index of element in {@link itemsSource} collection.
     * @param actual element from {@link itemsSource} collection.
     */
    trackByFn: (index: number, item: any) => any;
    /**
     * Index of last selected/deselected element in {@link itemsSource} collection. 
     */
    lastProcessedIndex: number;
    /**
     * In application-defined implementations must perform checks that every selected element is actually selected.
     * It's reasonable to use this when {@link itemsSource} was changed and some items was selected previously.
     */
    checkSelection(): void;
    /**
     * Deselects all elements in {@link itemsSource} collection.
     */
    deselectAll(): void;
    /**
     * Selects all elements in {@link itemsSource} collection.
     */
    selectAll(): void;
    /**
     * Selects range of elements in {@link itemsSource} collection.
     * @param fromIndex index from which elements must be selected.
     * @param toIndex index to which elements must be selected. 
     */
    selectRange(fromIndex: number, toIndex: number): void;
    /**
     * Checks, that all elements inside specified range is selected in {@link itemsSource} collection.
     * @param fromIndex index of element from which check must be performed.
     * @param toIndex index of element to which check must be performed.
     * @returns true if all elements inside specified range is selected. 
     */
    isRangeSelected(from: number, to: number): boolean;
    /**
     * Checks that at least one element selected in {@link itemsSource} collection.
     * @returns true if anything selected.
     */
    hasSelections(): boolean;
    /**
     * Checks that element at specified index is selected.
     * @param index index of element in {@link itemsSource} collection to check.
     * @returns true if element is selected.
     */
    isIndexSelected(index: number): boolean;
    /**
     * Returns index of first selected element from {@link itemsSource}.
     * @returns index of first selected element. -1 if nothing's selected.
     */
    getMinSelectedIndex(): number;
    /**
     * Returns index of last selected element from {@link itemsSource}.
     * @returns index of last selected element. -1 if nothing's selected.
     */
    getMaxSelectedIndex(): number;
    /**
     * Returns index of specified element in {@link itemsSource} collection.
     * @param item element to find.
     * @returns index of specified element in {@link itemsSource} collection. -1 if element not found.
     * @see {@link trackByFn}
     */
    getItemIndex(item: SelectableItem): number;
    /**
     * Selects first element in {@link itemsSource} collection.
     */
    selectFirst(): void;
    /**
     * Selects last element in {@link itemsSource} collection.
     */
    selectLast(): void;
    /**
     * Selects element at specified index in {@link itemsSource} collection.
     * @param index index of element in {@link itemsSource} collection.
     * @param savePrevious true if previously selected elements must stay selected after current selection.
     */
    selectIndex(index: number, savePrevious?: boolean): void;
    /**
     * Deselects element at specified index in {@link itemsSource} collection.
     * @param index index of element in {@link itemsSource} collection.
     */
    deselectIndex(index: number): void;
    /**
     * Toggles selection state of element from {@link itemsSource} collection at specified index.
     * @param index index of element in {@link itemsSource} collection.
     * @param savePrevious true if previously selected elements must stay selected after current selection.
     */
    toggleSelection(index: number, savePrevious?: boolean): void;
    /**
     * Returns all elements from {@link itemsSource} collection which marked as selected.
     * @returns collection of selected elements.
     */
    getSelectedElements(): Array<Object>;
    /**
     * Returns indexes of all elements from {@link itemsSource} collection which marked as selected.
     * @returns collection of selected elements indexes in {@link itemsSource} collection.
     */
    getSelectedIndexes(): Array<number>;
    /**
     * Performs application-defined logic associated with class destroy.
     */
    destroy(): void;
}
