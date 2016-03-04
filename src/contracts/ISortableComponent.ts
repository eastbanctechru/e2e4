import {SortParameter} from '../SortParameter';
export interface ISortableComponent {
    sortings: Array<SortParameter>;
    defaultSortings: SortParameter[];
    setSort(fieldName: string, savePrevious: boolean): void;
    onSortingsChanged(): void;
}
