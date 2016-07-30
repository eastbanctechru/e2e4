import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';

export class PagedPager implements Pager {
    public static settings: any =
    {
        defaultPageSize: 20,
        displayFromParameterName: 'displayFrom',
        displayToParameterName: 'displayTo',
        loadedCountParameterName: 'loadedCount',
        maxPageSize: 200,
        minPageSize: 1,
        pageNumberParameterName: 'pageNumber',
        pageSizeParameterName: 'pageSize',
        persistPageSize: true,
        totalCountParameterName: 'totalCount'
    };
    protected pageSizeInternal: number = PagedPager.settings.defaultPageSize;
    @filter({
        defaultValue: 1,
        parameterName: PagedPager.settings.pageNumberParameterName,
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? 1 : rawValue;
        }
    } as FilterConfig)
    protected pageNumberInternal: number = 1;

    public appendedOnLoad: boolean = false;
    public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    public maxPageSize: number = PagedPager.settings.maxPageSize;
    public minPageSize: number = PagedPager.settings.minPageSize;
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
        parameterName: PagedPager.settings.pageSizeParameterName,
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        },
        persisted: PagedPager.settings.persistPageSize
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
        this.loadedCount = result[PagedPager.settings.loadedCountParameterName] || 0;
        this.totalCount = result[PagedPager.settings.totalCountParameterName] || 0;

        this.displayFrom = result[PagedPager.settings.displayFromParameterName] || 0;
        this.displayTo = result[PagedPager.settings.displayToParameterName] || 0;

    }
    public reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
