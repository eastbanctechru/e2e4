import {FilterConfig} from './contracts/filter-config';
import { SortParameter } from './sort-parameter';
import {filter} from './filter-annotation';
/**
 * Provides sortings functionality. 
 * Can be used with {@link FiltersService} to automatic request building, settings resetting etc.
 */
export class SortingsService {
    /**
     * Global settings for {@link SortingsService}.
     * These settings are static and they are copied to the properties of the same name for each instance of {@link SortingsService}.
     * So, changing of this settings will affect all instances of {@link SortingsService} that will be created after change.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    public static settings: any = {
        /**
         * @see {@link SortingsService.persistSortings}. 
         */
        persistSortings: false,
        /**
         * @see {@link SortingsService.sortParameterName}. 
         */
        sortParameterName: 'sort'
    };
    /**
     * Internal implementation of {@link defaultSortings}.
     */
    protected defaultSortingsInternal: SortParameter[] = new Array<SortParameter>();
    @filter({
        defaultValue: function (): Array<SortParameter> { return this.cloneDefaultSortings(); },
        parameterName: function (): string { return (<SortingsService>this).sortParameterName; },
        parseFormatter: function (rawValue: any): Array<Object> {
            return Array.isArray(rawValue) ? rawValue.map((sort: SortParameter) => { return new SortParameter(sort.fieldName, sort.direction * 1); }) : [];
        },
        persisted: function (): boolean { return (<SortingsService>this).persistSortings; }
    } as FilterConfig)
    /**
     * Sortings that was selected by the user and must be applied on next request of data.
     * This property is annotated with {@link filter}. So it's ready to use with {@link FiltersService}.
     */
    public sortings: Array<SortParameter> = new Array<SortParameter>();
    /**
     * Specifies name of parameter that will be used to apply {@link sortings} property value when builds server request.
     */
    public sortParameterName: string = SortingsService.settings.sortParameterName;
    /**
     * Specifies that {@link sortings} property value must be persisted.
     * @see {@link FilterConfig.persisted} and {@link FiltersService.getPersistedState}
     */
    public persistSortings: boolean = SortingsService.settings.persistSortings;
    /**
     * Internal method for cloning of default sortings.
     * This method is used as {@link FilterConfig.defaultValue} as well as for copying to {@link sortings} when {@link defaultSortings} setter is used and {@link sortings} is empty. 
     */
    protected cloneDefaultSortings(): Array<SortParameter> {
        return this.defaultSortingsInternal.map((s: SortParameter) => new SortParameter(s.fieldName, s.direction));
    }
    /**
     * Default sortings that will be used by service.
     * If setter of this property is called when {@link sortings} is empty then applied value will be copied to {@link sortings} immediately.
     */
    public get defaultSortings(): SortParameter[] {
        return this.defaultSortingsInternal;
    }
    public set defaultSortings(value: Array<SortParameter>) {
        this.defaultSortingsInternal = value || [];
        if (this.sortings.length === 0) {
            this.sortings = this.cloneDefaultSortings();
        }
    }
    /**
     * Sets sortings according to specified parameters.
     * @param fieldName name of the field by which sorting must be executed on server. This value will be used as {@SortParameter.fieldName}.
     * In case when sorting by the same field is already specified, direction of this sorting will be toggled to reversed value and this sorting will be pushed to the end of {@link sortings} array.
     * So it will be applied last.
     * @param savePrevious true to keep previously applied sortings in {@link sortings} array. 
     */
    public setSort(fieldName: string, savePrevious: boolean): void {
        let newSort = new SortParameter(fieldName);
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = new SortParameter(existedSort.fieldName, existedSort.direction);
                newSort.toggleDirection();
                break;
            }
        }
        if (savePrevious) {
            this.sortings.push(newSort);
        } else {
            this.sortings.length = 0;
            this.sortings.push(newSort);
        }
    }
    /**
     * Performs object clean up.
     */
    public destroy(): void {
        this.defaultSortingsInternal.length = 0;
        this.sortings.length = 0;
    }
}
