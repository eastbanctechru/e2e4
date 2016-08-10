import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';
/**
 * Implementation of {@link Pager} contract that represents buffered list behavior. 
 * Can be used with {@link FiltersService} to automatic request building, settings resetting etc.
 */
export class BufferedPager implements Pager {
    /**
     * Global settings for properties such as request and response parameters names, default values and constraints for pager properties.
     * These settings are static and they are copied to the properties of the same name for each instance of {@link BufferedPager}.
     * So, changing of this settings will affect all instances of {@link BufferedPager} that will be created after change.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any =
    {
        /**
         * @see {@link BufferedPager.defaultRowCount}. 
         */
        defaultRowCount: 20,
        /**
         * @see {@link BufferedPager.loadedCountParameterName}. 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link BufferedPager.maxRowCount}. 
         */
        maxRowCount: 200,
        /**
         * @see {@link BufferedPager.minRowCount}. 
         */
        minRowCount: 1,
        /**
         * @see {@link BufferedPager.skipRowCountParameterName}. 
         */
        skipRowCountParameterName: 'skip',
        /**
         * @see {@link BufferedPager.takeRowCountParameterName}. 
         */
        takeRowCountParameterName: 'take',
        /**
         * @see {@link BufferedPager.totalCountParameterName}. 
         */
        totalCountParameterName: 'totalCount'
    };

    @filter({
        defaultValue: function (): number { return (<BufferedPager>this).defaultRowCount; },
        parameterName: function (): string { return (<BufferedPager>this).takeRowCountParameterName; },
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
    /**
     * @see {@link Pager.appendedOnLoad}. 
     */
    public appendedOnLoad: boolean = true;
    /**
     * @see {@link Pager.totalCount}. 
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}. 
     */
    public loadedCount: number = 0;
    /**
     * This is both initial value and value to wich {@link takeRowCount} property will be resetted on {@link reset} method execution. 
     */
    public defaultRowCount: number = BufferedPager.settings.defaultRowCount;
    /**
     * Smallest value that can be applied to {@link takeRowCount}. 
     */
    public minRowCount: number = BufferedPager.settings.minRowCount;
    /**
     * Biggest value that can be applied to {@link takeRowCount}. 
     */
    public maxRowCount: number = BufferedPager.settings.maxRowCount;
    /**
     * Specifies name of property in server response from wich value for {@link loadedCount} will be readed by {@link processResponse} method.
     */
    public loadedCountParameterName: string = BufferedPager.settings.loadedCountParameterName;
    /**
     * Specifies name of parameter that will be used to apply {@link skip} property value when builds server request.
     */
    public skipRowCountParameterName: string = BufferedPager.settings.skipRowCountParameterName;
    /**
     * Specifies name of property in server response from wich value for {@link totalCount} will be readed by {@link processResponse} method.
     */
    public totalCountParameterName: string = BufferedPager.settings.totalCountParameterName;
    /**
     * Specifies name of parameter that will be used to apply {@link takeRowCount} property value when builds server request.
     */
    public takeRowCountParameterName: string = BufferedPager.settings.takeRowCountParameterName;

    /**
     * This property is applied to the server request and it specifies how many rows already loaded and must be skipped on next data loading. 
     * Parameter name in request will be setted in accordance with {@link skipRowCountParameterName} property.
     * This property is annotated with {@link filter}. So it's ready to use with {@link FiltersService}.
     * @see {@link BufferedListRequest.skip}
     */
    @filter({
        defaultValue: 0,
        parameterName: function (): string { return this.skipRowCountParameterName; },
        parseFormatter: function (): number { return 0; }
    } as FilterConfig)
    public skip: number = 0;

    /**
     * This property is applied to the server request and it specifies how many rows must be loaded on next data loading. 
     * Parameter name in request will be setted in accordance with {@link takeRowCountParameterName} property.
     * Setter of this property executes several checks. For example, it doesn't accept value that is bigger than {@link maxRowCount}.
     * This property is annotated with {@link filter}. So it's ready to use with {@link FiltersService}.
     * @see {@link BufferedListRequest.take}
     */
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
    /**
     * @see {@link Pager.processResponse}. 
     */
    public processResponse(result: Object): void {
        this.totalCount = result[this.totalCountParameterName] || 0;
        this.skip = (result[this.loadedCountParameterName] === null || result[this.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[this.loadedCountParameterName];
        this.loadedCount = this.skip;
    }
    /**
     * @see {@link Pager.reset}. 
     */
    public reset(): void {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
