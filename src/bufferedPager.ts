import {Defaults} from './common/defaults';
import {IPager} from './contracts/IPager';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export class BufferedPager implements IPager {
    @filter({
        defaultValue: function (): number { return this.defaultRowCount; },
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: function (
            /* tslint:disable:no-unused-variable */rawValue: any/* tslint:enable:no-unused-variable */, allValues: any): number {
            let result;
            if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                result = (allValues.skip || 0) + (allValues.take || 0);
            }
            return result || this.defaultRowCount;
        }
    } as IFilterConfig)
    private takeRowCountInternal: number = Defaults.bufferedListSettings.defaultRowCount;

    public totalCount: number = 0;
    public loadedCount: number = 0;
    public defaultRowCount: number = Defaults.bufferedListSettings.defaultRowCount;
    public minRowCount: number = Defaults.bufferedListSettings.minRowCount;
    public maxRowCount: number = Defaults.bufferedListSettings.maxRowCount;

    @filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: function (): number { return 0; }
    } as IFilterConfig)
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
