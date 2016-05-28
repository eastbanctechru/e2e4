import {ISelectable} from './ISelectable';
export interface ISelectionManager {
    itemsSource: Array<ISelectable>;
    lastProcessedIndex: number;
    deselectAll(recursive?: boolean): void;
    selectAll(recursive?: boolean): void;
    selectRange(fromIndex: number, toIndex: number): void;
    hasSelections(): boolean;
    isIndexSelected(index: number): boolean;
    getMinSelectedIndex(): number;
    getMaxSelectedIndex(): number;
    getItemIndex(item: ISelectable): number;
    selectFirst(): void;
    selectLast(): void;
    selectIndex(index: number, savePrevious?: boolean): void;
    deselectIndex(index: number): void;
    toggleSelection(index: number, savePrevious?: boolean): void;
    getSelections(recursive?: boolean): Array<Object>;
    getSelectedIndexex(): Array<number>;
    dispose(): void;
}
