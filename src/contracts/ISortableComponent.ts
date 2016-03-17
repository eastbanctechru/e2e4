import {SortParameter} from '../common/SortParameter';
export interface ISortableComponent {
    sortings: Array<SortParameter>;
    defaultSortings: SortParameter[];
    setSort(fieldName: string, savePrevious: boolean): void;
    onSortChangesCompleted(): void;
}
