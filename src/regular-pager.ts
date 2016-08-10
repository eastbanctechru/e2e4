import {Pager} from './contracts/pager';
/**
 * Implementation of {@link Pager} contract that represents behavior of simple list without any paging mechanics.
 * Can be used with {@link FiltersService} to automatic request building, settings resetting etc.
 */
export class RegularPager implements Pager {
    /**
     * Global settings for response parameters names.
     * These settings are static and they are copied to the properties of the same name for each instance of {@link RegularPager}.
     * So, changing of this settings will affect all instances of {@link RegularPager} that will be created after change.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any =
    {
        /**
         * @see {@link RegularPager.loadedCountParameterName}. 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link RegularPager.loadedCountParameterName}. 
         */
        totalCountParameterName: 'totalCount'
    };
    /**
     * @see {@link Pager.appendedOnLoad}. 
     */
    public appendedOnLoad: boolean = false;

    /**
     * @see {@link Pager.totalCount}. 
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}. 
     */
    public loadedCount: number = 0;
    /**
     * Specifies name of property in server response from wich value for {@link totalCount} will be readed by {@link processResponse} method.
     */
    public totalCountParameterName: string = RegularPager.settings.totalCountParameterName;
    /**
     * Specifies name of property in server response from wich value for {@link loadedCount} will be readed by {@link processResponse} method.
     */
    public loadedCountParameterName: string = RegularPager.settings.loadedCountParameterName;
    /**
     * @see {@link Pager.processResponse}. 
     */
    public processResponse(result: Object): void {
        this.loadedCount = result[this.loadedCountParameterName] || 0;
        this.totalCount = result[this.totalCountParameterName] || 0;
    }
    /**
     * @see {@link Pager.reset}. 
     */
    public reset(): void {
        this.totalCount = 0;
    }
}
