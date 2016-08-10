import {Pager} from './contracts/pager';
/**
 * Простейшая имплементация контракта {@link Pager} реализующая поведение простого списка без разбивки.
 */
export class RegularPager implements Pager {
    /**
     * Настройки имен свойств в ответе с данными от сервера.
     * Данные настройки являются статическими и копируются при создании каждой новой копии класса {@link RegularPager} в его одноименные свойства.
     * Изменение данных настроек затронет все объекты типа {@link RegularPager}.
     * Для изменения настроек конкретного объекта вы можете конфигурировать его одноименные свойства.
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
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link totalCount}. 
     */
    public totalCountParameterName: string = RegularPager.settings.totalCountParameterName;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link loadedCount}. 
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
