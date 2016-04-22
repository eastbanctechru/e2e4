import {List} from './list';
import {IStateManager} from './contracts/IStateManager';
import {Defaults} from './common/defaults';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';
import {ISortManager} from './contracts/ISortManager';

export abstract class BufferedList extends List {
    private bufferedLoadDataSuccessBinded: (result: Object) => Object;
    @filter({
        defaultValue: Defaults.bufferedListSettings.defaultTakeRowCount,
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: (proposedParam, allParams): number => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return Defaults.bufferedListSettings.defaultTakeRowCount;
        }
    } as IFilterConfig)
    private takeRowCountInternal = Defaults.bufferedListSettings.defaultTakeRowCount;

    @filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: (): number => { return 0; }
    } as IFilterConfig)
    skip = 0;

    get takeRowCount(): number {
        return this.takeRowCountInternal;
    }

    set takeRowCount(value: number) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.bufferedListSettings.defaultTakeRowCount;
        if (rowCount < Defaults.bufferedListSettings.minRowCount) {
            rowCount = Defaults.bufferedListSettings.defaultTakeRowCount;
        }
        if (rowCount > Defaults.bufferedListSettings.maxRowCount) {
            rowCount = Defaults.bufferedListSettings.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }

    constructor(stateManager: IStateManager, sortManager: ISortManager) {
        super(stateManager, sortManager);
        this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
    }

    dispose(): void {
        super.dispose();
        delete this.bufferedLoadDataSuccessBinded;
    }

    bufferedLoadDataSuccess(result: Object): Object {
        this.loadedCount = this.skip + result[Defaults.listSettings.loadedCountParameterName];
        this.skip += result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
        // In case when filter changed from last request and theres no data now
        if ((result[Defaults.listSettings.totalCountParameterName] || 0) === 0) {
            this.clearData();
        }
        return result;
    }

    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        promise.then(this.bufferedLoadDataSuccessBinded);
        return promise;
    }
    onSortChangesCompleted(): void {
        this.takeRowCount = Defaults.bufferedListSettings.defaultTakeRowCount;
        this.skip = 0;
        super.onSortChangesCompleted();
    }
}
