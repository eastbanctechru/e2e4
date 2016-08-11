/**
 * Represents sort direction that applied as parameter by {@link SortParameter} class.  
 */
export enum SortDirection {
    /**
     * Ascending sort order.
     */
    Asc = 0,
    /**
     * Descending sort order.  
     */
    Desc = 1
}

/**
 * Represent state of sorting parameter that applied to the server request by {@link SortingsService}.
 */
export class SortParameter {
    /**
     * Sort direction.  
     */
    public direction: SortDirection;
    /**
     * Name of the field by which sorting must be performed.  
     */
    public fieldName: string = null;
    /**
     * @param fieldName value for {@link fieldName} property.  
     * @param direction value for {@link direction} property.
     */
    constructor(fieldName: string, direction: SortDirection = SortDirection.Asc) {
        this.fieldName = fieldName;
        this.direction = direction;
    }
    /**
     * Reverses {@link direction} property value.
     */
    public toggleDirection(): void {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }
    /**
     * Used to build serialized representation of oneself that will be applied to server request.
     * Meets {@link FiltersService.buildFilterValue} convention.
     */
    public toRequest(): Object {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}
