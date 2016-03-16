import {ListComponent} from './listComponent';
import {Defaults} from './Defaults';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export abstract class BufferedListComponent extends ListComponent {
    private bufferedLoadDataSuccessBinded: (result: Object) => Object;
    private takeRowCountInternal = Defaults.bufferedListComponent.defaultTakeRowCount;

    @filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListComponent.skipRowCountParameterName,
        parseFormatter: (): number => { return 0; }
    } as IFilterConfig)
    skip = 0;

    @filter({
        defaultValue: Defaults.bufferedListComponent.defaultTakeRowCount,
        parameterName: Defaults.bufferedListComponent.takeRowCountParameterName,
        parseFormatter: (proposedParam, allParams): number => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListComponent.defaultTakeRowCount;
        }
    } as IFilterConfig)
    get takeRowCount(): number {
        return this.takeRowCountInternal;
    }

    set takeRowCount(value: number) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListComponent.defaultTakeRowCount;
        if (rowCount < Defaults.bufferedListComponent.minRowCount) {
            rowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        }
        if (rowCount > Defaults.bufferedListComponent.maxRowCount) {
            rowCount = Defaults.bufferedListComponent.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }

    constructor() {
        super();
        this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
    }

    dispose(): void {
        super.dispose();
        delete this.bufferedLoadDataSuccessBinded;
    }

    bufferedLoadDataSuccess(result: Object): Object {
        this.loadedCount = this.skip + result[Defaults.listComponent.loadedCountParameterName];
        this.skip += result[Defaults.listComponent.loadedCountParameterName];
        this.loadedCount = this.skip;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listComponent.totalCountParameterName] || 0) === 0) {
            this.clearData();
        }
        return result;
    }

    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        promise.then(this.bufferedLoadDataSuccessBinded);
        return promise;
    }
    onSortingsChanged(): void {
        this.takeRowCount = Defaults.bufferedListComponent.defaultTakeRowCount;
        this.skip = 0;
        super.onSortingsChanged();
    }
}
