import {SelectionService, SelectableItem} from './contracts/selection-service';

/**
 * Вспомогательный контракт для типизации кода {@link DefaultSelectionService}.
 */
export interface SelectionTuple {
    /**
     * Индекс элемента в коллекцити {@link DefaultSelectionService.itemsSource}.
     */
    index: number;
    /**
     * Элемент из коллекции {@link DefaultSelectionService.itemsSource}.
     */
    item: SelectableItem;
}
/**
 * Имплементация по умолчанию для контракта {@link SelectionService}.
 */
export class DefaultSelectionService implements SelectionService {
    /**
     * Смотри {@link SelectionService.lastProcessedIndex}
     */
    public lastProcessedIndex: number;
    /**
     * Смотри {@link SelectionService.trackByFn}
     */
    public trackByFn: (index: number, item: any) => any = this.trackByIdentity;
    /**
     * Коллекция объектов {@link SelectionTuple} для элементов в коллекции {@link SelectionService.itemsSource}, которые на данный момент выбраны.  
     */
    protected selectionsList: Array<SelectionTuple> = new Array<SelectionTuple>();
    /**
     * Internal реализация {@link SelectionService.itemsSource}.  
     */
    protected items: Array<SelectableItem>;
    /**
     * Используется по умолчанию, если не указано значение для {@link SelectionService.trackByFn}.
     * Реализует сравнение по reference equals.   
     */
    protected trackByIdentity: (index: number, item: any) => any = (index: number, item: any) => { return item; };
    /**
     * Смотри {@link SelectionService.dispose}
     */
    public dispose(): void {
        this.selectionsList.length = 0;
        this.lastProcessedIndex = null;
        delete this.items;
    }
    /**
     * Смотри {@link SelectionService.itemsSource}
     */
    public get itemsSource(): Array<SelectableItem> {
        return this.items;
    }
    public set itemsSource(value: Array<SelectableItem>) {
        this.items = value;
        this.checkSelection();
    }
    /**
     * Выполняет конечную обработку свойств элемента как {@link SelectableItem}:
     * выставляет в нужное значение признак selected.
     * вызывает хуки {@link SelectableItem.onSelectionChanged}, {@link SelectableItem.onSelected}, {@link SelectableItem.onDeselected}
     */
    protected processSelection(tuple: SelectionTuple, selected: boolean): void {
        tuple.item.selected = selected;
    }
    /**
     * Внутренний метод, реализующий отмену выбора элемента.
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
     * Внутренний метод, реализующий выбор элемента.
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
     * Внутренний метод, реализующий выбор элемента.
     */
    protected getSelectionTuple(index: number): SelectionTuple {
        return {
            index: index,
            item: this.itemsSource[index]
        };
    }
    /**
     * Вызывается setter-ом {@link SelectionService.itemsSource} для проверки, какие элементы выбраны после смены значения.
     * Смотри также {@link SelectionService.trackByFn}
     */
    protected checkSelection(): void {
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
     * Проверяет, является ли переданный в качестве параметра в один из публичных методов индекс массива применимым.
     */
    protected checkIndexAcceptable(index: number): boolean {
        return index !== null && index !== undefined && index >= 0 && this.itemsSource && this.itemsSource.length > index;
    }
    /**
     * Смотри {@link SelectionService.deselectAll}
     */
    public deselectAll(): void {
        const list = this.selectionsList.splice(0, this.selectionsList.length);
        for (let i = 0; i < list.length; i++) {
            this.processSelection(list[i], false);
        }
        this.lastProcessedIndex = null;
    }
    /**
     * Смотри {@link SelectionService.selectAll}
     */
    public selectAll(): void {
        this.selectRange(0, this.itemsSource.length - 1);
    }
    /**
     * Смотри {@link SelectionService.selectRange}
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
     * Смотри {@link SelectionService.hasSelections}
     */
    public hasSelections(): boolean {
        return this.selectionsList.length !== 0;
    }
    /**
     * Смотри {@link SelectionService.isRangeSelected}
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
     * Смотри {@link SelectionService.isIndexSelected}
     */
    public isIndexSelected(index: number): boolean {
        if (index >= 0 && this.itemsSource.length > index) {
            return this.itemsSource[index].selected;
        }
        return false;
    }
    /**
     * Смотри {@link SelectionService.getItemIndex}
     */
    public getItemIndex(item: SelectableItem): number {
        return this.itemsSource.findIndex((value: SelectableItem) => value === item);
    }
    /**
     * Смотри {@link SelectionService.getMinSelectedIndex}
     */
    public getMinSelectedIndex(): number {
        let minIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            minIndex = (minIndex === -1 || item.index < minIndex) ? item.index : minIndex;
        });
        return minIndex;
    }
    /**
     * Смотри {@link SelectionService.getMaxSelectedIndex}
     */
    public getMaxSelectedIndex(): number {
        let maxIndex = -1;
        this.selectionsList.forEach((item: SelectionTuple) => {
            maxIndex = (maxIndex === -1 || item.index > maxIndex) ? item.index : maxIndex;
        });
        return maxIndex;
    }
    /**
     * Смотри {@link SelectionService.selectFirst}
     */
    public selectFirst(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(0));
        }
    }
    /**
     * Смотри {@link SelectionService.selectLast}
     */
    public selectLast(): void {
        if (this.itemsSource.length > 0) {
            this.selectItem(this.getSelectionTuple(this.itemsSource.length - 1));
        }
    }
    /**
     * Смотри {@link SelectionService.selectIndex}
     */
    public selectIndex(index: number, savePrevious: boolean = false): void {
        if (this.checkIndexAcceptable(index)) {
            this.selectItem(this.getSelectionTuple(index), savePrevious);
        }
    }
    /**
     * Смотри {@link SelectionService.deselectIndex}
     */
    public deselectIndex(index: number): void {
        if (this.checkIndexAcceptable(index)) {
            this.deselectItem(this.getSelectionTuple(index));
        }
    }
    /**
     * Смотри {@link SelectionService.toggleSelection}
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
     * Смотри {@link SelectionService.getSelectedElements}
     */
    public getSelectedElements(): Array<Object> {
        return this.selectionsList.map((selectable: SelectionTuple) => selectable.item);
    }
    /**
     * Смотри {@link SelectionService.getSelectedIndexes}
     */
    public getSelectedIndexes(): Array<number> {
        return this.selectionsList.map((selectable: SelectionTuple) => selectable.index);
    }
}
