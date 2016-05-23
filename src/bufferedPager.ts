import {Defaults} from './common/defaults';
import {IPager} from './contracts/IPager';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export class BufferedPager implements IPager {
    private takeRowCountInternal = Defaults.bufferedListSettings.defaultRowCount;
    totalCount: number = 0;
    loadedCount: number = 0;
    defaultRowCount: number = Defaults.bufferedListSettings.defaultRowCount;
    minRowCount: number = Defaults.bufferedListSettings.minRowCount;
    maxRowCount: number = Defaults.bufferedListSettings.defaultRowCount;

    @filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: (): number => { return 0; }
    } as IFilterConfig)
    skip = 0;

    @filter({
        defaultValue: function (): number { return this.defaultRowCount; },
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: (proposedParam: any, allParams: any): number => {
            if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                return allParams.skip + allParams.take;
            }
            return this.defaultRowCount;
        }
    } as IFilterConfig)
    get takeRowCount(): number {
        return this.takeRowCountInternal;
    }

    set takeRowCount(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultRowCount;
        if (rowCount < this.minRowCount) {
            rowCount = this.defaultRowCount;
        }
        if (rowCount > this.maxRowCount) {
            rowCount = this.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }

    processResponse(result: Object): void {
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.skip = (result[Defaults.listSettings.loadedCountParameterName] === null || result[Defaults.listSettings.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
    }

    reset(): void {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
