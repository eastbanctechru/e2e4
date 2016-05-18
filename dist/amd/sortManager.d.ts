import { ISortManager } from './contracts/ISortManager';
import { SortParameter } from './common/sortParameter';
export declare class SortManager implements ISortManager {
    private cloneDefaultSortings();
    sortings: SortParameter[];
    private defaultSortingsPrivate;
    defaultSortings: SortParameter[];
    setSort(fieldName: string, savePrevious: boolean): void;
    dispose(): void;
}
