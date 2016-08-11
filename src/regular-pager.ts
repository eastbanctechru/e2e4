import {Pager} from './contracts/pager';
/**
 * Implements {@link Pager} contract and represents behavior of simple list without any paging mechanics.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class RegularPager implements Pager {
    /**
     * Global settings for response parameters names.
     * 
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link RegularPager}.
     * 
     * So, changing of this settings will affect all instances of {@link RegularPager} that will be created after those changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any =
    {
        /**
         * @see {@link RegularPager.loadedCountParameterName}
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link RegularPager.loadedCountParameterName} 
         */
        totalCountParameterName: 'totalCount'
    };
    /**
     * @see {@link Pager.appendedOnLoad}
     */
    public appendedOnLoad: boolean = false;

    /**
     * @see {@link Pager.totalCount}
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}
     */
    public loadedCount: number = 0;
    /**
     * Specifies name of property in server response from wich value of {@link totalCount} property will be readed by {@link processResponse} method.
     * 
     * @see {@link RegularPager.settings.totalCountParameterName}
     */
    public totalCountParameterName: string = RegularPager.settings.totalCountParameterName;
    /**
     * Specifies name of property in server response from wich value of {@link loadedCount} property will be readed by {@link processResponse} method.
     * 
     * @see {@link RegularPager.settings.loadedCountParameterName}
     */
    public loadedCountParameterName: string = RegularPager.settings.loadedCountParameterName;
    /**
     * @see {@link Pager.processResponse}
     */
    public processResponse(response: Object): void {
        this.loadedCount = response[this.loadedCountParameterName] || 0;
        this.totalCount = response[this.totalCountParameterName] || 0;
    }
    /**
     * @see {@link Pager.reset}
     */
    public reset(): void {
        this.totalCount = 0;
    }
}
