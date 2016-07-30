import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';

export class BufferedPager implements Pager {
    public static settings: any =
    {
        defaultRowCount: 20,
        loadedCountParameterName: 'loadedCount',
        maxRowCount: 200,
        minRowCount: 1,
        skipRowCountParameterName: 'skip',
        takeRowCountParameterName: 'take',
        totalCountParameterName: 'totalCount'
    };
    @filter({
        defaultValue: function (): number { return this.defaultRowCount; },
        parameterName: BufferedPager.settings.takeRowCountParameterName,
        parseFormatter: function (
            rawValue: any, allValues: any): number {
            let result;
            if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                result = (allValues.skip || 0) + (allValues.take || 0);
            }
            return result || this.defaultRowCount;
        }
    } as FilterConfig)
    protected takeRowCountInternal: number = BufferedPager.settings.defaultRowCount;

    public appendedOnLoad: boolean = true;
    public totalCount: number = 0;
    public loadedCount: number = 0;
    public defaultRowCount: number = BufferedPager.settings.defaultRowCount;
    public minRowCount: number = BufferedPager.settings.minRowCount;
    public maxRowCount: number = BufferedPager.settings.maxRowCount;

    @filter({
        defaultValue: 0,
        parameterName: BufferedPager.settings.skipRowCountParameterName,
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
        this.totalCount = result[BufferedPager.settings.totalCountParameterName] || 0;
        this.skip = (result[BufferedPager.settings.loadedCountParameterName] === null || result[BufferedPager.settings.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[BufferedPager.settings.loadedCountParameterName];
        this.loadedCount = this.skip;
    }

    public reset(): void {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
