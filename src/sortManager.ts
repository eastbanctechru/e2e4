import {ISortManager} from './contracts/ISortManager';
import {Defaults} from './common/defaults';
import {IFilterConfig} from './contracts/IFilterConfig';
import {SortParameter} from './common/sortParameter';
import {filter} from './filterAnnotation';

export class SortManager implements ISortManager {
    private cloneDefaultSortings(): Array<SortParameter> {
        return this.defaultSortingsPrivate.map(s => new SortParameter(s.fieldName, s.direction));
    }
    @filter({
        defaultValue: function (): Array<SortParameter> { return this.cloneDefaultSortings(); },
        parameterName: Defaults.listSettings.sortParameterName,
        parseFormatter: function (proposedValue: any): Array<Object> {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listSettings.persistSortings
    } as IFilterConfig)
    sortings = new Array<SortParameter>();

    private defaultSortingsPrivate: SortParameter[] = new Array<SortParameter>();
    get defaultSortings(): SortParameter[] {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsPrivate = value || [];
        if (this.sortings.length === 0) {
            this.sortings = this.cloneDefaultSortings();
        }
    }
    setSort(fieldName: string, savePrevious: boolean): void {
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
    dispose(): void {
        this.defaultSortingsPrivate.length = 0;
        this.sortings.length = 0;
    }
}
