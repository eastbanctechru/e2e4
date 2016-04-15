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
    private deselectItem(selectionTuple, recursive?);
    private selectItem(selectionTuple, savePrevious?, recursive?);
    private canRecurse(recursive, item);
    private getSelectionTuple(index);
    deselectAll(recursive?: boolean): void;
    selectAll(recursive?: boolean): void;
    selectRange(fromIndex: number, toIndex: number, recursive?: boolean): void;
    hasSelections(): boolean;
    isIndexSelected(index: number): boolean;
    getMinSelectedIndex(): number;
    getMaxSelectedIndex(): number;
    selectFirst(): void;
    selectLast(): void;
    selectIndex(index: number, savePrevious?: boolean, recursive?: boolean): void;
    deselectIndex(index: number, recursive?: boolean): void;
    toggleSelection(index: number, savePrevious?: boolean, recursive?: boolean): void;
    getSelections(recursive?: boolean): Array<Object>;
}
