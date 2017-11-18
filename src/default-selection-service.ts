import { SelectionService } from './contracts/selection-service';

/**
 * Internal contract for {@link DefaultSelectionService}.
 */
export interface SelectionTuple {
    /**
     * Index of selected element in {@link DefaultSelectionService.items} collection.
     */
    index: number;
    /**
     * Element from {@link DefaultSelectionService.items} collection.
     */
    item: any;
}
/**
 * Default implementation of {@link SelectionService}.
 */
export class DefaultSelectionService implements SelectionService {
    /**
     * @inheritdoc
     */
    public lastProcessedIndex: number;
    /**
     * @inheritdoc
     */
    public trackByFn: (index: number, item: any) => any;
    /**
     * @inheritdoc
     */
    public items: any[];

    /**
     * Collection of {@link SelectionTuple} elements which represents currently selected items in {@link items} collection.
     */
    protected selectionsList: SelectionTuple[] = new Array<SelectionTuple>();

    constructor() {
        this.trackByFn = this.trackByIdentity;
    }
    /**
     * @inheritdoc
     */
    public destroy(): void {
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        this.items = null;
    }
    /**
     * @inheritdoc
     */
    public checkSelection(): void {
        if (this.items !== null && typeof this.items !== 'undefined') {
            for (let i = this.selectionsList.length - 1; i >= 0; i--) {
                const tuple = this.selectionsList[i];
                const trackFn = this.trackByFn || this.trackByIdentity;
                if (
                    this.isIndexAcceptable(tuple.index) &&
                    trackFn(tuple.index, this.items[tuple.index]) === trackFn(tuple.index, tuple.item)
                ) {
                    tuple.item = this.items[tuple.index];
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
     * Checks that applied index is valid number and it's value is inside {@link items} boundaries.
     * @param index index to check.
     * @returns `true` if index is valid.
     */
    public isIndexAcceptable(index: number): boolean {
        return index !== null && typeof index !== 'undefined' && index >= 0 && this.items && this.items.length > index;
    }
    /**
     * @inheritdoc
     */
    public deselectAll(): void {
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (const item of list) {
            this.processSelection(item, false);
        }
        this.lastProcessedIndex = null;
    }
    /**
     * @inheritdoc
     */
    public selectAll(): void {
        this.selectRange(0, this.items.length - 1);
    }
    /**
     * @inheritdoc
     */
    public selectRange(fromIndex: number, toIndex: number): void {
        if (toIndex < 0 || this.items.length <= toIndex || fromIndex < 0 || this.items.length <= fromIndex) {
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
     * @inheritdoc
     */
    public hasSelections(): boolean {
        return this.selectionsList.length !== 0;
    }
    /**
     * @inheritdoc
     */
    public isRangeSelected(from: number, to: number): boolean {
        // nothing selected
        if (this.selectionsList.length === 0) {
            return false;
        }
        // entire list selected
        if (from === 0 && to === this.items.length - 1 && this.selectionsList.length === this.items.length) {
            return true;
        }
        const orderedIndexes = this.selectionsList.map((tuple: SelectionTuple) => tuple.index).sort();
        return (
            1 + to - from === orderedIndexes.length &&
            orderedIndexes[0] === from &&
            orderedIndexes[orderedIndexes.length - 1] === to
        );
    }
    /**
     * @inheritdoc
     */
    public isIndexSelected(index: number): boolean {
        if (this.selectionsList.length > 0 && this.isIndexAcceptable(index)) {
            return this.selectionsList.findIndex((st: SelectionTuple) => st.index === index) !== -1;
        }
        return false;
    }
    /**
     * @inheritdoc
     */
    public getItemIndex(item: any): number {
        return this.items.findIndex((value: any) => value === item);
    }
    /**
     * @inheritdoc
     */
    public getMinSelectedIndex(): number {
        let minIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            minIndex = minIndex === -1 || item.index < minIndex ? item.index : minIndex;
        });
        return minIndex;
    }
    /**
     * @inheritdoc
     */
    public getMaxSelectedIndex(): number {
        let maxIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            maxIndex = maxIndex === -1 || item.index > maxIndex ? item.index : maxIndex;
        });
        return maxIndex;
    }
    /**
     * @inheritdoc
     */
    public selectFirst(): void {
        if (this.items.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    /**
     * @inheritdoc
     */
    public selectLast(): void {
        if (this.items.length > 0) {
            this.selectItem(this.getSelectionTuple(this.items.length - 1));
        }
    }
    /**
     * @inheritdoc
     */
    public selectIndex(index: number, savePrevious: boolean = false): void {
        if (this.isIndexAcceptable(index)) {
            this.selectItem(this.getSelectionTuple(index), savePrevious);
        }
    }
    /**
     * @inheritdoc
     */
    public deselectIndex(index: number): void {
        if (this.isIndexAcceptable(index)) {
            this.deselectItem(this.getSelectionTuple(index));
        }
    }
    /**
     * @inheritdoc
     */
    public toggleSelection(index: number, savePrevious: boolean = false): void {
        if (!this.isIndexAcceptable(index)) {
            return;
        }
        const tuple = this.getSelectionTuple(index);
        if (
            this.isIndexSelected(index) &&
            (this.selectionsList.length === 1 || (this.selectionsList.length > 1 && savePrevious))
        ) {
            this.deselectItem(tuple);
            return;
        }
        this.selectItem(tuple, savePrevious);
    }
    /**
     * @inheritdoc
     */
    public getSelectedElements(): object[] {
        return this.selectionsList.map((selectionTuple: SelectionTuple) => selectionTuple.item);
    }
    /**
     * @inheritdoc
     */
    public getSelectedIndexes(): number[] {
        return this.selectionsList.map((selectionTuple: SelectionTuple) => selectionTuple.index);
    }
    /**
     * Default tracking function that will be used if nothing was specified for {@link trackByFn}.
     * Implements comparison by reference equality of objects.
     */
    protected trackByIdentity: (index: number, item: any) => any = (index: number, item: any) => item;

    /**
     * Performs final processing of selection/deselection of element.
     *
     * Current implementation sets {@link selected} propery of element (if it's defined).
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
        const index = this.selectionsList.findIndex(
            (selectedItem: SelectionTuple) => selectedItem.item === selectionTuple.item
        );
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
            const index = this.selectionsList.findIndex(
                (selectedItem: SelectionTuple) => selectedItem.item === selectionTuple.item
            );
            if (index !== -1) {
                this.selectionsList.splice(index, 1);
            }
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        } else {
            const list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach((selectedItem: SelectionTuple) => {
                this.processSelection(selectedItem, false);
            });
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
            item: this.items[index]
        };
    }
}
