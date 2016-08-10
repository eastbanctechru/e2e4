/**
 * Represents sort direction that applied as parameter by {@link SortParameter}.  
 */
export enum SortDirection {
    /**
     * Ascending order.
     */
    Asc = 0,
    /**
     * Descending order.  
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
     * Name of the field by wich sorting must be performed.  
     */
    public fieldName: string = null;
    constructor(fieldName: string, direction: SortDirection = SortDirection.Asc) {
        this.fieldName = fieldName;
        this.direction = direction;
    }
    /**
     * Reverses {@link direction} value.
     */
    public toggleDirection(): void {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }
    /**
     * Used to build serialized representation of oneself that will be applied to server request.
     * Meets {@link FiltersService.buildFilterValue} convention.
     * returns serialized representation of oneself.
     */
    public toRequest(): Object {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}
