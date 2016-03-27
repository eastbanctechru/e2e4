import { SortParameter } from '../common/sortParameter';
export interface ISortManager {
    sortings: Array<SortParameter>;
    defaultSortings: SortParameter[];
    setSort(fieldName: string, savePrevious: boolean): void;
    dispose(): void;
}
