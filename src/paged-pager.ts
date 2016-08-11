import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';
/**
 * Implements {@link Pager} contract and represents behavior of list with pages.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class PagedPager implements Pager {
    /**
     * Global settings for properties such as request and response parameters names, default values and constraints for pager properties.
     * 
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link PagedPager} type.
     * 
     * So, changing of this settings will affect all instances of {@link PagedPager} type that will be created after such changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any =
    {
        /**
         * @see {@link PagedPager.defaultPageSize}
         */
        defaultPageSize: 20,
        /**
         * @see {@link PagedPager.displayFromParameterName} 
         */
        displayFromParameterName: 'displayFrom',
        /**
         * @see {@link PagedPager.displayToParameterName} 
         */
        displayToParameterName: 'displayTo',
        /**
         * @see {@link PagedPager.loadedCountParameterName} 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link PagedPager.maxPageSize}
         */
        maxPageSize: 200,
        /**
         * @see {@link PagedPager.minPageSize} 
         */
        minPageSize: 1,
        /**
         * @see {@link PagedPager.pageNumberParameterName} 
         */
        pageNumberParameterName: 'pageNumber',
        /**
         * @see {@link PagedPager.pageSizeParameterName} 
         */
        pageSizeParameterName: 'pageSize',
        /**
         * @see {@link PagedPager.persistPageSize} 
         */
        persistPageSize: false,
        /**
         * @see {@link PagedPager.totalCountParameterName} 
         */
        totalCountParameterName: 'totalCount'
    };
    /**
     * Internal implementation of {@link pageSize}. 
     */
    protected pageSizeInternal: number = PagedPager.settings.defaultPageSize;

    /**
     * Internal implementation of {@link pageNumber}.
     */
    @filter({
        defaultValue: 1,
        parameterName: function (): string { return (<PagedPager>this).pageNumberParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? 1 : rawValue;
        }
    } as FilterConfig)
    protected pageNumberInternal: number = 1;
    /**
     * @see {@link Pager.appendedOnLoad}
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
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link displayFrom} property.
     * 
     * @see {@link PagedPager.settings.displayFromParameterName}
     */
    public displayFromParameterName: string = PagedPager.settings.displayFromParameterName;
    /**
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link displayTo} property.
     * 
     * @see {@link PagedPager.settings.displayToParameterName}
     */
    public displayToParameterName: string = PagedPager.settings.displayToParameterName;
    /**
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link loadedCount} property.
     * 
     * @see {@link PagedPager.settings.loadedCountParameterName}
     */
    public loadedCountParameterName: string = PagedPager.settings.loadedCountParameterName;
    /**
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link totalCount} property.
     * 
     * @see {@link PagedPager.settings.totalCountParameterName}
     */
    public totalCountParameterName: string = PagedPager.settings.totalCountParameterName;
    /**
     * Specifies name of parameter to apply {@link pageNumber} property value to server request.
     * 
     * @see {@link PagedPager.settings.pageNumberParameterName}
     */
    public pageNumberParameterName: string = PagedPager.settings.pageNumberParameterName;
    /**
     * Specifies name of parameter to apply {@link pageSize} property value to server request.
     * 
     * @see {@link PagedPager.settings.pageSizeParameterName}
     */
    public pageSizeParameterName: string = PagedPager.settings.pageSizeParameterName;
    /**
     * Specifies that {@link pageSize} property value must be persisted.
     * @see {@link FilterConfig.persisted} and {@link FiltersService.getPersistedState}
     */
    public persistPageSize: boolean = PagedPager.settings.persistPageSize;
    /**
     * @see {@link Pager.totalCount}
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}
     */
    public loadedCount: number = 0;

    /**
     * Number of record in remote data source from which data was loaded by last request to the server.
     * @see {@link displayFromParameterName}
     * @see {@link PagedListResponse.displayFrom}
     */
    public displayFrom: number = 0;
    /**
     * Number of record in remote data source to which data was loaded by last request to the server.
     * @see {@link displayToParameterName}
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
     * This property is applied to the server request and it specifies number of the page that must be loaded on next request.
     * 
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link pageNumberParameterName}
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
     * This property is applied to the server request and it specifies size of page that must be loaded on next request.
     *  
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link pageSizeParameterName}
     * @see {@link PagedListRequest.pageSize} 
     */
    @filter({
        defaultValue: function (): number { return (<PagedPager>this).defaultPageSize; },
        parameterName: function (): string { return (<PagedPager>this).pageSizeParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        },
        persisted: function (): boolean { return (<PagedPager>this).persistPageSize; }
    })
    public get pageSize(): number {
        return this.pageSizeInternal;
    }
    /**
     * Executes several checks. For example, it doesn't accept values than {@link maxPageSize}.
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
     * @see {@link Pager.processResponse}
     */
    public processResponse(response: Object): void {
        this.loadedCount = response[this.loadedCountParameterName] || 0;
        this.totalCount = response[this.totalCountParameterName] || 0;

        this.displayFrom = response[this.displayFromParameterName] || 0;
        this.displayTo = response[this.displayToParameterName] || 0;

    }
    /**
     * @see {@link Pager.reset}
     */
    public reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
