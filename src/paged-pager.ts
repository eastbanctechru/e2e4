import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';
/**
 * Implementation of {@link Pager} contract that represents behavior of list with pages.
 * Can be used with {@link FiltersService} to automatic request building, settings resetting etc. 
 */
export class PagedPager implements Pager {
    /**
     * Global settings for properties such as request and response parameters names, default values and constraints for pager properties.
     * These settings are static and they are copied to the properties of the same name for each instance of {@link PagedPager}.
     * So, changing of this settings will affect all instances of {@link PagedPager} that will be created after change.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any =
    {
        /**
         * @see {@link PagedPager.defaultPageSize}. 
         */
        defaultPageSize: 20,
        /**
         * @see {@link PagedPager.displayFromParameterName}. 
         */
        displayFromParameterName: 'displayFrom',
        /**
         * @see {@link PagedPager.displayToParameterName}. 
         */
        displayToParameterName: 'displayTo',
        /**
         * @see {@link PagedPager.loadedCountParameterName}. 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link PagedPager.maxPageSize}. 
         */
        maxPageSize: 200,
        /**
         * @see {@link PagedPager.minPageSize}. 
         */
        minPageSize: 1,
        /**
         * @see {@link PagedPager.pageNumberParameterName}. 
         */
        pageNumberParameterName: 'pageNumber',
        /**
         * @see {@link PagedPager.pageSizeParameterName}. 
         */
        pageSizeParameterName: 'pageSize',
        /**
         * @see {@link PagedPager.persistPageSize}. 
         */
        persistPageSize: false,
        /**
         * @see {@link PagedPager.totalCountParameterName}. 
         */
        totalCountParameterName: 'totalCount'
    };
    /**
     * Internal implementation of {@link pageSize}. 
     */
    protected pageSizeInternal: number = PagedPager.settings.defaultPageSize;

    @filter({
        defaultValue: 1,
        parameterName: function (): string { return (<PagedPager>this).pageNumberParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? 1 : rawValue;
        }
    } as FilterConfig)
    /**
     * Internal implementation of {@link pageNumber}.
     * This property is annotated with {@link filter}. So it's ready to use with {@link FiltersService}.
     */
    protected pageNumberInternal: number = 1;
    /**
     * @see {@link Pager.appendedOnLoad}. 
     */
    public appendedOnLoad: boolean = false;
    /**
     * This is both initial value and value to wich {@link pageSize} property will be resetted on {@link reset} method execution. 
     */
    public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    /**
     * Biggest value that can be applied to {@link pageSize}. 
     */
    public maxPageSize: number = PagedPager.settings.maxPageSize;
    /**
     * Smallest value that can be applied to {@link pageSize}. 
     */
    public minPageSize: number = PagedPager.settings.minPageSize;
    /**
     * Specifies name of property in server response from wich value for {@link displayFrom} will be readed by {@link processResponse} method.
     */
    public displayFromParameterName: string = PagedPager.settings.displayFromParameterName;
    /**
     * Specifies name of property in server response from wich value for {@link displayTo} will be readed by {@link processResponse} method.
     */
    public displayToParameterName: string = PagedPager.settings.displayToParameterName;
    /**
     * Specifies name of property in server response from wich value for {@link loadedCount} will be readed by {@link processResponse} method.
     */
    public loadedCountParameterName: string = PagedPager.settings.loadedCountParameterName;
    /**
     * Specifies name of property in server response from wich value for {@link totalCount} will be readed by {@link processResponse} method.
     */
    public totalCountParameterName: string = PagedPager.settings.totalCountParameterName;
    /**
     * Specifies name of parameter that will be used to apply {@link pageNumber} property value when builds server request.
     */
    public pageNumberParameterName: string = PagedPager.settings.pageNumberParameterName;
    /**
     * Specifies name of parameter that will be used to apply {@link pageSize} property value when builds server request.
     */
    public pageSizeParameterName: string = PagedPager.settings.pageSizeParameterName;
    /**
     * Specifies that {@link pageSize} property value must be persisted.
     * @see {@link FilterConfig.persisted} and {@link FiltersService.getPersistedState}
     */
    public persistPageSize: boolean = PagedPager.settings.persistPageSize;
    /**
     * @see {@link Pager.totalCount}.
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}. 
     */
    public loadedCount: number = 0;

    /**
     * Number of record in remote data source from which data was loaded by last request to the server.
     * Value for this property is readed by {@link processResponse} method from server response.
     * @see {@link PagedListResponse.displayFrom}
     */
    public displayFrom: number = 0;
    /**
     * Number of record in remote data source to which data was loaded by last request to the server.
     * Value for this property is readed by {@link processResponse} method from server response.
     * @see {@link PagedListResponse.displayTo}
     */
    public displayTo: number = 0;
    /**
     * Total pages count computed as {@link totalCount} / {@link pageSize}.
     * Used to check correctness of values applied to {@link pageNumber}.
     */
    public get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    /**
     * This property is applied to the server request and it specifies number of page that must be loaded on next data loading. 
     * Parameter name in request will be setted in accordance with {@link pageNumberParameterName} property.
     * Setter of this property executes several checks. For example, it doesn't accept value that is bigger than {@link pageCount}.
     * @see {@link PagedListRequest.pageNumber}
     */
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
        defaultValue: function (): number { return (<PagedPager>this).defaultPageSize; },
        parameterName: function (): string { return (<PagedPager>this).pageSizeParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        },
        persisted: function (): boolean { return (<PagedPager>this).persistPageSize; }
    })
    /**
     * This property is applied to the server request and it specifies size of page that must be loaded on next data loading. 
     * Parameter name in request will be setted in accordance with {@link pageSizeParameterName} property.
     * Setter of this property executes several checks. For example, it doesn't accept value that is bigger than {@link maxPageSize}.
     * This property is annotated with {@link filter}. So it's ready to use with {@link FiltersService}.
     * @see {@link PagedListRequest.pageSize}
     */
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
    /**
     * @see {@link Pager.processResponse}. 
     */
    public processResponse(result: Object): void {
        this.loadedCount = result[this.loadedCountParameterName] || 0;
        this.totalCount = result[this.totalCountParameterName] || 0;

        this.displayFrom = result[this.displayFromParameterName] || 0;
        this.displayTo = result[this.displayToParameterName] || 0;

    }
    /**
     * @see {@link Pager.reset}. 
     */
    public reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
