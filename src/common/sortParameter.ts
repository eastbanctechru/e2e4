import {SortDirection} from './sortDirection';
export class SortParameter {
    constructor(fieldName: string, direction: SortDirection = SortDirection.Asc) {
        this.fieldName = fieldName;
        this.direction = direction;
    }
    direction: SortDirection;
    fieldName: string = null;
    toggleDirection(): void {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }

    toRequest(): Object {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}
