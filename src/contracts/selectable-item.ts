export interface SelectableItem {
    selected: boolean;
    onSelected?(): void;
    onDeselected?(): void;
    onSelectionChanged?(selected: boolean): void;
}
