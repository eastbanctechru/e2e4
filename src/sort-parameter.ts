/**
 * Представляет собой направление сортировки, передаваемое в качестве параметра объектом типа {@link SortParameter}.  
 */
export enum SortDirection {
    /**
     * Прямое направление сортировки.  
     */
    Asc = 0,
    /**
     * Обратнок направление сортировки.  
     */
    Desc = 1
}
/**
 * Представляет собой сортировку, передаваемую как параметр на сервер объектом типа {@link SortingsService}.
 */
export class SortParameter {
    /**
     * Направление сортировки.  
     */
    public direction: SortDirection;
    /**
     * Название поля, по которому необходимо выполнить сортировку.  
     */
    public fieldName: string = null;
    constructor(fieldName: string, direction: SortDirection = SortDirection.Asc) {
        this.fieldName = fieldName;
        this.direction = direction;
    }
    /**
     * Смена направления сортировки на обратное.  
     */
    public toggleDirection(): void {
        this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    }
    /**
     * Используется для сериализации при передаче в качестве параметра в соответствии с конвенцией {@link FiltersService.buildFilterValue}.
     * returns литерал, представляющий собой состояние сортировки.
     */
    public toRequest(): Object {
        return { direction: this.direction, fieldName: this.fieldName };
    }
}
