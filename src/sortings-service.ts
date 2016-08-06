import {FilterConfig} from './contracts/filter-config';
import { SortParameter } from './sort-parameter';
import {filter} from './filter-annotation';

export class SortingsService {
    public static settings: any = {
        persistSortings: false,
        sortParameterName: 'sort'
    };
    protected defaultSortingsInternal: SortParameter[] = new Array<SortParameter>();
    @filter({
        defaultValue: function (): Array<SortParameter> { return this.cloneDefaultSortings(); },
        parameterName: function (): string { return (<SortingsService>this).sortParameterName; },
        parseFormatter: function (rawValue: any): Array<Object> {
            return Array.isArray(rawValue) ? rawValue.map((sort: SortParameter) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: function (): boolean { return (<SortingsService>this).persistSortings; }
    } as FilterConfig)
    public sortings: Array<SortParameter> = new Array<SortParameter>();
    public sortParameterName: string = SortingsService.settings.sortParameterName;

    /**
     * Указывает, нужно ли сохранять сортировки на постоянной основе.
     * Смотри {@link FilterConfig.persisted} а также {@link FiltersService.getPersistedState}
     */
    public persistSortings: boolean = SortingsService.settings.persistSortings;

    protected cloneDefaultSortings(): Array<SortParameter> {
        return this.defaultSortingsInternal.map((s: SortParameter) => new SortParameter(s.fieldName, s.direction));
    }

    public get defaultSortings(): SortParameter[] {
        return this.defaultSortingsInternal;
    }
    public set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsInternal = value || [];
        if (this.sortings.length === 0) {
            this.sortings = this.cloneDefaultSortings();
        }
    }
    public setSort(fieldName: string, savePrevious: boolean): void {
        let newSort = new SortParameter(fieldName);
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
                newSort.toggleDirection();
                break;
            }
        }
        if (savePrevious) {
            this.sortings.push(newSort);
        } else {
            this.sortings.length = 0;
            this.sortings.push(newSort);
        }
    }
    public dispose(): void {
        this.defaultSortingsInternal.length = 0;
        this.sortings.length = 0;
    }
}
