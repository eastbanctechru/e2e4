import {ISelectable} from './contracts/ISelectable';
import {ISelectionTuple} from './contracts/ISelectionTuple';
import {ISelectionManager} from './contracts/ISelectionManager';

export class SelectionManager implements ISelectionManager {
    private selectionsList: Array<ISelectionTuple> = new Array<ISelectionTuple>();
    private items: Array<ISelectable>;
    public lastProcessedIndex: number;
    public dispose(): void {
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        delete this.items;
    }
    public get itemsSource(): Array<ISelectable> {
        return this.items;
    }
    public set itemsSource(value: Array<ISelectable>) {
        this.items = value;
        this.checkSelection();
    }
    protected processSelection(tuple: ISelectionTuple, selected: boolean): void {
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
    private deselectItem(selectionTuple: ISelectionTuple): void {
        const index = this.selectionsList.findIndex((selectedItem: ISelectionTuple) => (selectedItem.item === selectionTuple.item));
        if (index !== -1) {
            this.selectionsList.splice(index, 1);
        }
        this.processSelection(selectionTuple, false);
        this.lastProcessedIndex = selectionTuple.index;
    }
    private selectItem(selectionTuple: ISelectionTuple, savePrevious: boolean = false): void {
        if (savePrevious) {
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        } else {
            const list = this.selectionsList.splice(0, this.selectionsList.length);
            list.forEach((selectedItem: ISelectionTuple) => { this.processSelection(selectedItem, false); });
            this.selectionsList.push(selectionTuple);
            this.processSelection(selectionTuple, true);
        }
        this.lastProcessedIndex = selectionTuple.index;
    }
    private getSelectionTuple(index: number): ISelectionTuple {
        return {
            index: index,
            item: this.itemsSource[index]
        };
    }
    private checkSelection(): void {
        for (let i = this.selectionsList.length - 1; i >= 0; i--) {
            const tuple = this.selectionsList[i];
            if (this.itemsSource[tuple.index] !== tuple.item) {
                this.deselectItem(tuple);
            }
        }
    }
    private checkIndexAcceptable(index: number): boolean {
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
        this.deselectAll();
        const tempData = new Array<ISelectionTuple>();
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
    public isIndexSelected(index: number): boolean {
        if (index >= 0 && this.itemsSource.length > index) {
            return this.itemsSource[index].selected;
        }
        return false;
    }

    public getItemIndex(item: ISelectable): number {
        return this.itemsSource.findIndex((value: ISelectable) => value === item);
    }
    public getMinSelectedIndex(): number {
        let minIndex = null;
        this.selectionsList.forEach((item: ISelectionTuple) => {
            minIndex = (minIndex === null || item.index < minIndex) ? item.index : minIndex;
        });
        return minIndex;
    }
    public getMaxSelectedIndex(): number {
        let maxIndex = null;
        this.selectionsList.forEach((item: ISelectionTuple) => {
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
        return this.selectionsList.map((selectable: ISelectionTuple) => selectable.item);
    }
    public getSelectedIndexex(): Array<number> {
        return this.selectionsList.map((selectable: ISelectionTuple) => selectable.index);
    }
}
