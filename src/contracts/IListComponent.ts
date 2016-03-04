export interface IListComponent {
    items: Object[];
    totalCount: number;
    loadedCount: number;
    clearData(): void;
    reloadData(): void;
    toRequest(): any;
}
