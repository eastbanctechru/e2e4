import {ISortManager} from './contracts/ISortManager';
import {Defaults} from './common/defaults';
import {IFilterConfig} from './contracts/IFilterConfig';
import {SortParameter} from './common/sortParameter';
import {filter} from './filterAnnotation';

export class SortManager implements ISortManager {
    private defaultSortingsPrivate: SortParameter[] = new Array<SortParameter>();
    @filter({
        defaultValue: function (): Array<SortParameter> { return this.cloneDefaultSortings(); },
        parameterName: Defaults.listSettings.sortParameterName,
        parseFormatter: function (rawValue: any): Array<Object> {
            return Array.isArray(rawValue) ? rawValue.map((sort: SortParameter) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listSettings.persistSortings
    } as IFilterConfig)
    public sortings: Array<SortParameter> = new Array<SortParameter>();

    private cloneDefaultSortings(): Array<SortParameter> {
        return this.defaultSortingsPrivate.map((s: SortParameter) => new SortParameter(s.fieldName, s.direction));
    }
    public get defaultSortings(): SortParameter[] {
        return this.defaultSortingsPrivate;
    }
    public set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsPrivate = value || [];
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
        this.defaultSortingsPrivate.length = 0;
        this.sortings.length = 0;
    }
}
