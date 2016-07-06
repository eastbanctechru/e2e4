import {SelectableItem} from './contracts/selectable-item';
import {SelectionTuple} from './contracts/selection-tuple';
import {SelectionService} from './contracts/selection-service';

export class DefaultSelectionService implements SelectionService {
    protected selectionsList: Array<SelectionTuple> = new Array<SelectionTuple>();
    protected items: Array<SelectableItem>;
    public lastProcessedIndex: number;
    public dispose(): void {
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        delete this.items;
    }
    public get itemsSource(): Array<SelectableItem> {
        return this.items;
    }
    public set itemsSource(value: Array<SelectableItem>) {
        this.items = value;
        this.checkSelection();
    }
    protected processSelection(tuple: SelectionTuple, selected: boolean): void {
        const initialSelectState = tuple.item.selected;
        tuple.item.selected = selected;
        if (tuple.item.onSelectionChanged !== undefined && initialSelectState !== selected) {
            tuple.item.onSelectionChanged(selected);
        }
        if (selected === true && tuple.item.onSelected !== undefined && initialSelectState !== selected) {
            tuple.item.onSelected();
        }
        if (selected === false && tuple.item.onDeselected !== undefined && initialSelectState !== selected) {
            tuple.item.onDeselected();
        }
    }
    protected deselectItem(selectionTuple: SelectionTuple): void {
        const index = this.selectionsList.findIndex((selectedItem: SelectionTuple) => (selectedItem.item === selectionTuple.item));
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        this.processSelection(selectionTuple, false);
        this.lastProcessedIndex = selectionTuple.index;
    }
    protected selectItem(selectionTuple: SelectionTuple, savePrevious: boolean = false): void {
        if (savePrevious) {
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
    protected getSelectionTuple(index: number): SelectionTuple {
        return {
            index: index,
            item: this.itemsSource[index]
        };
    }
    protected checkSelection(): void {
        for (let i = this.selectionsList.length - 1; i >= 0; i--) {
            const tuple = this.selectionsList[i];
            if (this.itemsSource[tuple.index] !== tuple.item) {
                this.deselectItem(tuple);
            }
        }
    }
    protected checkIndexAcceptable(index: number): boolean {
        return index !== null && index !== undefined && index >= 0 && this.itemsSource.length > index;
    }
    public deselectAll(): void {
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (let i = 0; i < list.length; i++) {
            this.processSelection(list[i], false);
        }
        this.lastProcessedIndex = null;
    }
    public selectAll(): void {
        this.selectRange(0, this.itemsSource.length - 1);
    }
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

    public hasSelections(): boolean {
        return this.selectionsList.length !== 0;
    }
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
    public isIndexSelected(index: number): boolean {
        if (index >= 0 && this.itemsSource.length > index) {
            return this.itemsSource[index].selected;
        }
        return false;
    }

    public getItemIndex(item: SelectableItem): number {
        return this.itemsSource.findIndex((value: SelectableItem) => value === item);
    }
    public getMinSelectedIndex(): number {
        let minIndex = null;
        this.selectionsList.forEach((item: SelectionTuple) => {
            minIndex = (minIndex === null || item.index < minIndex) ? item.index : minIndex;
        });
        return minIndex;
    }
    public getMaxSelectedIndex(): number {
        let maxIndex = null;
        this.selectionsList.forEach((item: SelectionTuple) => {
            maxIndex = (maxIndex === null || item.index > maxIndex) ? item.index : maxIndex;
        });
        return maxIndex;
    }

    public selectFirst(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    public selectLast(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
        }
    }

    public selectIndex(index: number, savePrevious: boolean = false): void {
        if (this.checkIndexAcceptable(index)) {
            this.selectItem(this.getSelectionTuple(index), savePrevious);
        }
    }
    public deselectIndex(index: number): void {
        if (this.checkIndexAcceptable(index)) {
            this.deselectItem(this.getSelectionTuple(index));
        }
    }
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
    public getSelections(): Array<Object> {
        return this.selectionsList.map((selectable: SelectionTuple) => selectable.item);
    }
    public getSelectedIndexex(): Array<number> {
        return this.selectionsList.map((selectable: SelectionTuple) => selectable.index);
    }
}
