import { ISelectable } from './contracts/ISelectable';
import { ISelectionManager } from './contracts/ISelectionManager';
export declare class SelectionManager implements ISelectionManager {
    private selectionsList;
    private items;
    private itemsPropertyName;
    dispose(): void;
    lastProcessedIndex: number;
    itemsSource: Array<ISelectable>;
    private processSelection(item, selected);
    private deselectItem(selectionTuple);
    private selectItem(selectionTuple, savePrevious?);
    private getSelectionTuple(index);
    private checkSelection();
    deselectAll(): void;
    selectAll(): void;
    selectRange(fromIndex: number, toIndex: number): void;
    hasSelections(): boolean;
    isIndexSelected(index: number): boolean;
    getItemIndex(item: ISelectable): number;
    getMinSelectedIndex(): number;
    getMaxSelectedIndex(): number;
    selectFirst(): void;
    selectLast(): void;
    selectIndex(index: number, savePrevious?: boolean): void;
    deselectIndex(index: number): void;
    toggleSelection(index: number, savePrevious?: boolean): void;
    getSelections(): Array<Object>;
}
