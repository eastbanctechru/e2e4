import { FilterConfig } from './contracts/filter-config';
import { Pager } from './contracts/pager';
import { filter } from './filter-annotation';

/**
 * Implements {@link Pager} contract and represents buffered list behavior. 
 * @note This type is configured to use with {@link FiltersService}.
 */
export class BufferedPager implements Pager {
    /**
     * Global settings for properties such as request and response parameters names, default values and constraints for pager properties.
     * 
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link BufferedPager} type.
     * 
     * So, changing of this settings will affect all instances of {@link BufferedPager} type that will be created after such changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    // tslint:disable-next-line: typedef
    public static settings =
    {
        /**
         * @see {@link BufferedPager.defaultRowCount}
         */
        defaultRowCount: 20,
        /**
         * @see {@link BufferedPager.loadedCountParameterName}
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link BufferedPager.maxRowCount}
         */
        maxRowCount: 200,
        /**
         * @see {@link BufferedPager.minRowCount}
         */
        minRowCount: 1,
        /**
         * @see {@link BufferedPager.skipRowCountParameterName}
         */
        skipRowCountParameterName: 'skip',
        /**
         * @see {@link BufferedPager.takeRowCountParameterName}
         */
        takeRowCountParameterName: 'take',
        /**
         * @see {@link BufferedPager.totalCountParameterName}
         */
        totalCountParameterName: 'totalCount'
    };

    /**
     * Internal implementation of {@link takeRowCount}. 
     */
    @filter({
        defaultValue(): number { return (<BufferedPager>this).defaultRowCount; },
        parameterName(): string { return (<BufferedPager>this).takeRowCountParameterName; },
        parseFormatter(rawValue: any, allValues: any): number {
            let result;
            if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                result = (allValues.skip || 0) + (allValues.take || 0);
            }
            return result || this.defaultRowCount;
        }
    } as FilterConfig)
    protected takeRowCountInternal: number = BufferedPager.settings.defaultRowCount;
    /**
     * @see {@link Pager.appendedOnLoad}
     */
    public appendedOnLoad: boolean = true;
    /**
     * @see {@link Pager.totalCount}
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}
     */
    public loadedCount: number = 0;
    /**
     * This is both initial value and value which will be applied to {@link takeRowCount} property on {@link reset} method execution. 
     */
    public defaultRowCount: number = BufferedPager.settings.defaultRowCount;
    /**
     * The smallest value that can be applied to {@link takeRowCount} property. 
     */
    public minRowCount: number = BufferedPager.settings.minRowCount;
    /**
     * The biggest value that can be applied to {@link takeRowCount} property. 
     */
    public maxRowCount: number = BufferedPager.settings.maxRowCount;
    /**
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link loadedCount} property.
     * 
     * @see {@link BufferedPager.settings.loadedCountParameterName}
     */
    public loadedCountParameterName: string = BufferedPager.settings.loadedCountParameterName;
    /**
     * Specifies name of parameter to apply {@link skip} property value to server request.
     * 
     * @see {@link BufferedPager.settings.skipRowCountParameterName}
     */
    public skipRowCountParameterName: string = BufferedPager.settings.skipRowCountParameterName;
    /**
     * Specifies name of property in server response from which {@link processResponse} method can read value of {@link totalCount} property.
     * 
     * @see {@link BufferedPager.settings.totalCountParameterName}
     */
    public totalCountParameterName: string = BufferedPager.settings.totalCountParameterName;
    /**
     * Specifies name of parameter to apply {@link takeRowCount} property value to server request.
     * 
     * @see {@link BufferedPager.settings.takeRowCountParameterName}
     */
    public takeRowCountParameterName: string = BufferedPager.settings.takeRowCountParameterName;

    /**
     * This property is applied to the server request and it specifies how many rows are already loaded and must be skipped on next request. 
     * 
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link skipRowCountParameterName}
     * @see {@link BufferedListRequest.skip} 
     */
    @filter({
        defaultValue: 0,
        parameterName(): string { return this.skipRowCountParameterName; },
        parseFormatter(): number { return 0; }
    } as FilterConfig)
    public skip: number = 0;

    /**
     * This property is applied to the server request and it specifies how many rows must be loaded on next request.
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     * @see {@link takeRowCountParameterName}
     * @see {@link BufferedListRequest.take} 
     */
    public get takeRowCount(): number {
        return this.takeRowCountInternal;
    }
    /**
     * Executes several checks. For example, it doesn't accept values bigger than {@link maxRowCount}.
     */
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
    /**
     * @see {@link Pager.processResponse}
     */
    public processResponse(response: Object): void {
        this.totalCount = response[this.totalCountParameterName] || 0;
        this.skip = (response[this.loadedCountParameterName] === null || response[this.loadedCountParameterName] === undefined) ?
            0 : this.skip + response[this.loadedCountParameterName];
        this.loadedCount = this.skip;
    }
    /**
     * @see {@link Pager.reset}
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
