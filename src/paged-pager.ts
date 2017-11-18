import { FilterConfig } from './contracts/filter-config';
import { ListResponse } from './contracts/list-response';
import { Pager } from './contracts/pager';
import { filter } from './filter-annotation';

/**
 * Implements {@link Pager} contract and represents behavior of list with pages.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class PagedPager implements Pager {
    /**
     * Global settings for properties such as default values and constraints for pager properties.
     *
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link PagedPager} type.
     *
     * So, changing of this settings will affect all instances of {@link PagedPager} type that will be created after such changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    // tslint:disable-next-line: typedef
    public static settings = {
        /**
         * @see {@link PagedPager.defaultPageSize}
         */
        defaultPageSize: 20,
        /**
         * @see {@link PagedPager.maxPageSize}
         */
        maxPageSize: 200,
        /**
         * @see {@link PagedPager.minPageSize}
         */
        minPageSize: 1
    };
    /**
     * @inheritdoc
     */
    public appendedOnLoad: boolean = false;
    /**
     * This is both initial value and value which will be applied to {@link pageSize} property on {@link reset} method execution.
     */
    public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    /**
     * The biggest value that can be applied to {@link pageSize} property.
     */
    public maxPageSize: number = PagedPager.settings.maxPageSize;
    /**
     * The smallest value that can be applied to {@link pageSize} property.
     */
    public minPageSize: number = PagedPager.settings.minPageSize;
    /**
     * @inheritdoc
     */
    public totalCount: number = 0;
    /**
     * @inheritdoc
     */
    public loadedCount: number = 0;

    /**
     * Number of record in remote data source from which data was loaded at last request.
     *
     * For example, it will be equal to 21 when loads second page of list with page size of 20.
     */
    public displayFrom: number = 0;
    /**
     * Number of record in remote data source to which data was loaded at last request.
     *
     * For example, it will be equal to 40 when loads second page of list with page size of 20. Or it will be equal to total count of available records if records count is less than 40.
     */
    public displayTo: number = 0;

    /**
     * Internal implementation of {@link pageSize}.
     */
    @filter({
        defaultValue(this: PagedPager): number {
            return this.defaultPageSize;
        },
        parameterName: 'take',
        parseFormatter(this: PagedPager, rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        }
    })
    protected pageSizeInternal: number = PagedPager.settings.defaultPageSize;
    /**
     * Internal implementation of {@link pageNumber}.
     */
    @filter({
        defaultValue: 0,
        parameterName: 'skip',
        parseFormatter(this: PagedPager, rawValue: any, allValues: any): number {
            const skip = isNaN(rawValue) || !rawValue ? 0 : rawValue;
            const pageSize =
                !allValues || isNaN(allValues.take) || !allValues.take ? this.defaultPageSize : allValues.take * 1;
            return skip % pageSize === 0 ? skip / pageSize + 1 : 1;
        },
        serializeFormatter(this: PagedPager): number {
            return (this.pageNumber - 1) * this.pageSize;
        }
    } as FilterConfig)
    protected pageNumberInternal: number = 1;

    /**
     * Total pages count computed as {@link totalCount} / {@link pageSize}.
     * Used to check correctness of values applied to {@link pageNumber}.
     */
    public get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    /**
     * Specifies number of the page that must be loaded on next request.
     *
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link PagedListRequest.pageNumber}
     */
    public get pageNumber(): number {
        return this.pageNumberInternal;
    }
    /**
     * Executes several checks. For example, it doesn't accept values bigger than {@link pageCount}.
     */
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
    /**
     * Specifies size of page that must be loaded on next request.
     *
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link PagedListRequest.pageSize}
     */
    public get pageSize(): number {
        return this.pageSizeInternal;
    }
    /**
     * Executes several checks. For example, it doesn't accept values bigger than {@link maxPageSize}.
     */
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
    /**
     * @inheritdoc
     */
    public processResponse(response: ListResponse<any> | any[]): void {
        let alignedResponse: ListResponse<any>;
        if (Array.isArray(response)) {
            alignedResponse = {
                items: response,
                loadedCount: response.length,
                totalCount: response.length
            } as ListResponse<any>;
        } else {
            alignedResponse = response;
        }
        this.loadedCount =
            alignedResponse.loadedCount ||
            (alignedResponse.items && alignedResponse.items.length ? alignedResponse.items.length : 0);
        this.totalCount = alignedResponse.totalCount || 0;
        const skippedCount = this.pageSize * (this.pageNumber - 1);
        this.displayFrom = skippedCount + 1;
        this.displayTo = this.displayFrom + this.loadedCount - 1;
    }
    /**
     * Returns `true` if it's possible to move pager to the previous page (e.g. currently pager is not on the first page).
     */
    public get canMoveBackward(): boolean {
        return this.pageCount !== 0 && this.pageNumber !== 1;
    }
    /**
     * Returns `true` if it's possible to move pager to the next page (e.g. currently pager is not on the last page).
     */
    public get canMoveForward(): boolean {
        return this.pageCount !== 0 && this.pageNumber < this.pageCount;
    }
    /**
     * Sets {@link pageNumber} property to `1` if it's possible.
     * @returns `true` if {@link pageNumber} value was changed.
     */
    public tryMoveToFirstPage(): boolean {
        if (this.canMoveBackward) {
            this.pageNumber = 1;
            return true;
        }
        return false;
    }
    /**
     * Decrements {@link pageNumber} if it's possible.
     * @returns `true` if {@link pageNumber} value was changed.
     */
    public tryMoveToPreviousPage(): boolean {
        if (this.canMoveBackward) {
            this.pageNumber -= 1;
            return true;
        }
        return false;
    }
    /**
     * Increments {@link pageNumber} if it's possible.
     * @returns `true` if {@link pageNumber} value was changed.
     */
    public tryMoveToNextPage(): boolean {
        if (this.canMoveForward) {
            this.pageNumber += 1;
            return true;
        }
        return false;
    }
    /**
     * Sets {@link pageNumber} property to value of {@link pageCount} property if it's possible.
     * @returns `true` if {@link pageNumber} value was changed.
     */
    public tryMoveToLastPage(): boolean {
        if (this.canMoveForward) {
            this.pageNumber = this.pageCount;
            return true;
        }
        return false;
    }

    /**
     * @inheritdoc
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
