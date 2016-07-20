import {Defaults} from './common/defaults';
import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';

export class BufferedPager implements Pager {
    @filter({
        defaultValue: function (): number { return this.defaultRowCount; },
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: function (
            rawValue: any, allValues: any): number {
            let result;
            if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                result = (allValues.skip || 0) + (allValues.take || 0);
            }
            return result || this.defaultRowCount;
        }
    } as FilterConfig)
    protected takeRowCountInternal: number = Defaults.bufferedListSettings.defaultRowCount;

    public appendedOnLoad: boolean = true;
    public totalCount: number = 0;
    public loadedCount: number = 0;
    public defaultRowCount: number = Defaults.bufferedListSettings.defaultRowCount;
    public minRowCount: number = Defaults.bufferedListSettings.minRowCount;
    public maxRowCount: number = Defaults.bufferedListSettings.maxRowCount;

    @filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: function (): number { return 0; }
    } as FilterConfig)
    public skip: number = 0;

    public get takeRowCount(): number {
        return this.takeRowCountInternal;
    }

    public set takeRowCount(value: number) {
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

    public processResponse(result: Object): void {
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.skip = (result[Defaults.listSettings.loadedCountParameterName] === null || result[Defaults.listSettings.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
    }

    public reset(): void {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
