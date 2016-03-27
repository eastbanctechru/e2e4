import {ISortManager} from './contracts/ISortManager';
import {Defaults} from './common/defaults';
import {IFilterConfig} from './contracts/IFilterConfig';
import {SortParameter} from './common/sortParameter';
import {filter} from './filterAnnotation';
import * as _ from 'lodash';

export class SortManager implements ISortManager {
    static includeIn(target: any): void {
        target.sortManager = new SortManager();
    }
    @filter({
        defaultValue: function(): Array<SortParameter> { return this.defaultSortings ? _.cloneDeep(this.defaultSortings) : []; },
        parameterName: Defaults.listComponent.sortParameterName,
        parseFormatter: (proposedValue): Array<Object> => {
            return Array.isArray(proposedValue) ? proposedValue.map((sort) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: Defaults.listComponent.persistSortings
    } as IFilterConfig)
    sortings = new Array<SortParameter>();

    private defaultSortingsPrivate: SortParameter[] = null;
    get defaultSortings(): SortParameter[] {
        return this.defaultSortingsPrivate;
    }
    set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsPrivate = value;
        if (this.sortings === null || this.sortings.length === 0) {
            this.sortings = _.cloneDeep(this.defaultSortingsPrivate);
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
        delete this.defaultSortings;
        this.sortings.length = 0;
    }
}
