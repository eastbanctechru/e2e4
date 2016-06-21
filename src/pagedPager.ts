import {Defaults} from './common/defaults';
import {IPager} from './contracts/IPager';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export class PagedPager implements IPager {
    private pageSizeInternal: number = Defaults.pagedListSettings.defaultPageSize;

    @filter({
        defaultValue: 1,
        parameterName: Defaults.pagedListSettings.pageNumberParameterName,
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? 1 : rawValue;
        }
    } as IFilterConfig)
    private pageNumberInternal: number = 1;

    public defaultPageSize: number = Defaults.pagedListSettings.defaultPageSize;
    public maxPageSize: number = Defaults.pagedListSettings.maxPageSize;
    public minPageSize: number = Defaults.pagedListSettings.minPageSize;
    public totalCount: number = 0;
    public loadedCount: number = 0;
    public displayFrom: number = 0;
    public displayTo: number = 0;

    public get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    public get pageNumber(): number {
        return this.pageNumberInternal;
    }
    public set pageNumber(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
        if (pageNumber > this.pageCount) {
            pageNumber = this.pageCount;
        }
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        this.pageNumberInternal = pageNumber;
    }
    @filter({
        defaultValue: function (): number { return this.defaultPageSize; },
        parameterName: Defaults.pagedListSettings.pageSizeParameterName,
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        },
        persisted: Defaults.pagedListSettings.persistPageSize
    })
    public get pageSize(): number {
        return this.pageSizeInternal;
    }
    public set pageSize(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultPageSize;

        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }

            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
            }
        }
        if (pageSize > this.maxPageSize) {
            pageSize = this.maxPageSize;
        }
        if (pageSize < this.minPageSize || pageSize === 0) {
            pageSize = this.defaultPageSize;
        }

        this.pageSizeInternal = pageSize;
    }

    public processResponse(result: Object): void {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName] || 0;
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;

        this.displayFrom = result[Defaults.pagedListSettings.displayFromParameterName] || 0;
        this.displayTo = result[Defaults.pagedListSettings.displayToParameterName] || 0;

    }
    public reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
