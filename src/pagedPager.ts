import {Defaults} from './common/defaults';
import {IPager} from './contracts/IPager';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export class PagedPager implements IPager {
    private pageSizeInternal = Defaults.pagedListSettings.defaultPageSize;
    private pageNumberInternal = 1;

    totalCount: number = 0;
    loadedCount: number = 0;
    displayFrom = 1;
    displayTo = 1;
    get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    @filter({ defaultValue: 1, parameterName: Defaults.pagedListSettings.pageNumberParameterName } as IFilterConfig)
    get pageNumber(): number {
        return this.pageNumberInternal;
    }
    set pageNumber(value: number) {
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
        defaultValue: Defaults.pagedListSettings.defaultPageSize,
        parameterName: Defaults.pagedListSettings.pageSizeParameterName,
        persisted: Defaults.pagedListSettings.persistPageSize
    })
    get pageSize(): number {
        return this.pageSizeInternal;
    }
    set pageSize(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.pagedListSettings.defaultPageSize;

        if (pageSize > Defaults.pagedListSettings.maxPageSize) {
            pageSize = Defaults.pagedListSettings.maxPageSize;
        }
        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }

            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
                if (pageSize > Defaults.pagedListSettings.maxPageSize) {
                    pageSize = Defaults.pagedListSettings.maxPageSize;
                }
            }
        }
        if (pageSize < Defaults.pagedListSettings.minPageSize || pageSize === 0) {
            pageSize = Defaults.pagedListSettings.defaultPageSize;
        }
        if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
            pageSize = this.pageSizeInternal;
        }
        this.pageSizeInternal = pageSize;
    }

    processResponse(result: Object): void {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName] || 0;
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;

        this.displayFrom = result[Defaults.pagedListSettings.displayFromParameterName] || 1;
        this.displayTo = result[Defaults.pagedListSettings.displayToParameterName] || 1;

    }
    reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = Defaults.pagedListSettings.defaultPageSize;
    }
}
