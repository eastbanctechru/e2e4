export interface ISelectionManager {
    lastProcessedIndex: number;
    deselectAll(recursive: boolean): void;
    selectAll(recursive: boolean): void;
    selectRange(fromIndex: number, toIndex: number, recursive: boolean): void;
    hasSelections(): boolean;
    isIndexSelected(index: number): boolean;
    getMinSelectedIndex(): number;
    getMaxSelectedIndex(): number;
    selectFirst(): void;
    selectLast(): void;
    selectIndex(index: number, savePrevious: boolean, recursive: boolean): void;
    deselectIndex(index: number, recursive: boolean): void;
    toggleSelection(index: number, savePrevious: boolean, recursive: boolean): void;
    getSelections(recursive: boolean): Array<Object>;
    dispose(): void;
}
