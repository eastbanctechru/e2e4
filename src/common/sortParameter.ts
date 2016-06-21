import {SortDirection} from './sortDirection';
export class SortParameter {
    public direction: SortDirection;
    public fieldName: string = null;
    constructor(fieldName: string, direction: SortDirection = SortDirection.Asc) {
        this.fieldName = fieldName;
        this.direction = direction;
    }
    public toggleDirection(): void {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }
    public toRequest(): Object {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}
