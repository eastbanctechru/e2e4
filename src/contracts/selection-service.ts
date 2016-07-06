import {SelectableItem} from './selectable-item';
export interface SelectionService {
    itemsSource: Array<SelectableItem>;
    lastProcessedIndex: number;
    deselectAll(recursive?: boolean): void;
    selectAll(recursive?: boolean): void;
    selectRange(fromIndex: number, toIndex: number): void;
    hasSelections(): boolean;
    isIndexSelected(index: number): boolean;
    getMinSelectedIndex(): number;
    getMaxSelectedIndex(): number;
    getItemIndex(item: SelectableItem): number;
    selectFirst(): void;
    selectLast(): void;
    selectIndex(index: number, savePrevious?: boolean): void;
    deselectIndex(index: number): void;
    toggleSelection(index: number, savePrevious?: boolean): void;
    getSelections(recursive?: boolean): Array<Object>;
    getSelectedIndexex(): Array<number>;
    dispose(): void;
}
