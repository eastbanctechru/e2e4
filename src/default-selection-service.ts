import {SelectionItem, SelectionService} from './contracts/selection-service';

/**
 * Internal contract for {@link DefaultSelectionService}.
 */
export interface SelectionTuple {
    /**
     * Index of selected element in {@link DefaultSelectionService.itemsSource} collection.
     */
    index: number;
    /**
     * Element from {@link DefaultSelectionService.itemsSource} collection.
     */
    item: SelectionItem;
}
/**
 * Default implementation of {@link SelectionService}.
 */
export class DefaultSelectionService implements SelectionService {
    /**
     * @see {@link SelectionService.lastProcessedIndex}
     */
    public lastProcessedIndex: number;
    /**
     * @see {@link SelectionService.trackByFn}
     */
    public trackByFn: (index: number, item: any) => any = this.trackByIdentity;
    /**
     * Collection of {@link SelectionTuple} elements which represents currently selected items in {@link itemsSource} collection.  
     */
    protected selectionsList: Array<SelectionTuple> = new Array<SelectionTuple>();
    /**
     * Internal implementation of {@link itemsSource}.  
     */
    protected items: Array<SelectionItem>;
    /**
     * Default tracking function that will be used if nothing was specified for {@link trackByFn}.
     * Implements comparison by reference equality of objects.
     */
    protected trackByIdentity: (index: number, item: any) => any = (index: number, item: any) => { return item; };
    /**
     * @see {@link SelectionService.destroy}
     */
    public destroy(): void {
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        this.items = null;
    }
    /**
     * @see {@link SelectionService.itemsSource}
     */
    public get itemsSource(): Array<SelectionItem> {
        return this.items;
    }
    public set itemsSource(value: Array<SelectionItem>) {
        this.items = value;
        this.checkSelection();
    }
    /**
     * Performs final processing of selection/deselection of {@link itemsSource} element.
     * 
     * Current implementation just sets {@link SelectionItem.selected} (if it's defined) but it can be extended in derived classes.
     */
    protected processSelection(tuple: SelectionTuple, selected: boolean): void {
        if (Object.prototype.hasOwnProperty.call(tuple.item, 'selected')) {
            tuple.item.selected = selected;
        }
    }
    /**
     * Internal method that used to perform item selection.
     */
    protected deselectItem(selectionTuple: SelectionTuple): void {
        const index = this.selectionsList.findIndex((selectedItem: SelectionTuple) => (selectedItem.item === selectionTuple.item));
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        this.processSelection(selectionTuple, false);
        this.lastProcessedIndex = selectionTuple.index;
    }
    /**
     * Internal method that used to execute item deselection.
     */
    protected selectItem(selectionTuple: SelectionTuple, savePrevious: boolean = false): void {
        if (savePrevious) {
            const index = this.selectionsList.findIndex((selectedItem: SelectionTuple) => (selectedItem.item === selectionTuple.item));
            if (index !== -1) {
                this.selectionsList.splice(index, 1);
            }
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        } else {
            const list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach((selectedItem: SelectionTuple) => { this.processSelection(selectedItem, false); });
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    }
    /**
     * Internal method that used to represent selection item as {@link SelectionTuple}.
     */
    protected getSelectionTuple(index: number): SelectionTuple {
        return {
            index,
            item: this.itemsSource[index]
        };
    }
    /**
     * @see {@link SelectionService.checkSelection}
     */
    public checkSelection(): void {
        if (this.itemsSource !== null && this.itemsSource !== undefined) {
            for (let i = this.selectionsList.length - 1; i >= 0; i--) {
                const tuple = this.selectionsList[i];
                const trackFn = this.trackByFn || this.trackByIdentity;
                if (this.checkIndexAcceptable(tuple.index) && trackFn(tuple.index, this.itemsSource[tuple.index]) === trackFn(tuple.index, tuple.item)) {
                    tuple.item = this.itemsSource[tuple.index];
                    this.selectItem(tuple, true);

                } else {
                    this.deselectItem(tuple);
                }
            }
        } else {
            this.deselectAll();
        }
    }
    /**
     * Checks that applied index is valid number and it's value is inside {@link itemsSource} boundaries.
     * @param index index to check.
     * @returns `true` if index is valid.
     */
    protected checkIndexAcceptable(index: number): boolean {
        return index !== null && index !== undefined && index >= 0 && this.itemsSource && this.itemsSource.length > index;
    }
    /**
     * @see {@link SelectionService.deselectAll}
     */
    public deselectAll(): void {
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (let i = 0; i < list.length; i++) {
            this.processSelection(list[i], false);
        }
        this.lastProcessedIndex = null;
    }
    /**
     * @see {@link SelectionService.selectAll}
     */
    public selectAll(): void {
        this.selectRange(0, this.itemsSource.length - 1);
    }
    /**
     * @see {@link SelectionService.selectRange}
     */
    public selectRange(fromIndex: number, toIndex: number): void {
        if (toIndex < 0 || this.itemsSource.length <= toIndex || fromIndex < 0 || this.itemsSource.length <= fromIndex) {
            return;
        }
        const startIndex = Math.min(fromIndex, toIndex);
        const endIndex = Math.max(fromIndex, toIndex);
        if (this.isRangeSelected(startIndex, endIndex)) {
            return;
        }
        this.deselectAll();
        const tempData = new Array<SelectionTuple>();
        for (let i = startIndex; i <= endIndex; i++) {
            const tuple = this.getSelectionTuple(i);
            tempData.push(tuple);
            this.processSelection(tuple, true);
        }
        this.selectionsList.splice(0, this.selectionsList.length, ...tempData);
        this.lastProcessedIndex = endIndex;
    }
    /**
     * @see {@link SelectionService.hasSelections}
     */
    public hasSelections(): boolean {
        return this.selectionsList.length !== 0;
    }
    /**
     * @see {@link SelectionService.isRangeSelected}
     */
    public isRangeSelected(from: number, to: number): boolean {
        // nothing selected
        if (this.selectionsList.length === 0) {
            return false;
        }
        // entire list selected
        if (from === 0 && to === this.itemsSource.length - 1 && this.selectionsList.length === this.itemsSource.length) {
            return true;
        }
        let orderedIndexes = this.selectionsList.map((tuple: SelectionTuple) => tuple.index).sort();
        return (1 + to - from === orderedIndexes.length) && (orderedIndexes[0] === from) && (orderedIndexes[orderedIndexes.length - 1] === to);
    }
    /**
     * @see {@link SelectionService.isIndexSelected}
     */
    public isIndexSelected(index: number): boolean {
        if (index >= 0 && this.selectionsList.length > 0 && this.itemsSource.length > index) {
            return this.selectionsList.findIndex((st: SelectionTuple) => st.index === index) !== -1;
        }
        return false;
    }
    /**
     * @see {@link SelectionService.getItemIndex}
     */
    public getItemIndex(item: SelectionItem): number {
        return this.itemsSource.findIndex((value: SelectionItem) => value === item);
    }
    /**
     * @see {@link SelectionService.getMinSelectedIndex}
     */
    public getMinSelectedIndex(): number {
        let minIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            minIndex = (minIndex === -1 || item.index < minIndex) ? item.index : minIndex;
        });
        return minIndex;
    }
    /**
     * @see {@link SelectionService.getMaxSelectedIndex}
     */
    public getMaxSelectedIndex(): number {
        let maxIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            maxIndex = (maxIndex === -1 || item.index > maxIndex) ? item.index : maxIndex;
        });
        return maxIndex;
    }
    /**
     * @see {@link SelectionService.selectFirst}
     */
    public selectFirst(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    /**
     * @see {@link SelectionService.selectLast}
     */
    public selectLast(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
        }
    }
    /**
     * @see {@link SelectionService.selectIndex}
     */
    public selectIndex(index: number, savePrevious: boolean = false): void {
        if (this.checkIndexAcceptable(index)) {
            this.selectItem(this.getSelectionTuple(index), savePrevious);
        }
    }
    /**
     * @see {@link SelectionService.deselectIndex}
     */
    public deselectIndex(index: number): void {
        if (this.checkIndexAcceptable(index)) {
            this.deselectItem(this.getSelectionTuple(index));
        }
    }
    /**
     * @see {@link SelectionService.toggleSelection}
     */
    public toggleSelection(index: number, savePrevious: boolean = false): void {
        if (!this.checkIndexAcceptable(index)) {
            return;
        }
        const tuple = this.getSelectionTuple(index);
        if (this.isIndexSelected(index) && (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious))) {
            this.deselectItem(tuple);
            return;
        }
        this.selectItem(tuple, savePrevious);
    }
    /**
     * @see {@link SelectionService.getSelectedElements}
     */
    public getSelectedElements(): Array<Object> {
        return this.selectionsList.map((selectionItem: SelectionTuple) => selectionItem.item);
    }
    /**
     * @see {@link SelectionService.getSelectedIndexes}
     */
    public getSelectedIndexes(): Array<number> {
        return this.selectionsList.map((selectionItem: SelectionTuple) => selectionItem.index);
    }
}
