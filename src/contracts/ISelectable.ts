export interface ISelectable {
    selected: boolean;
    onSelected?(): void;
    onDeselected?(): void;
    onSelectionChanged?(selected: boolean): void;
}
