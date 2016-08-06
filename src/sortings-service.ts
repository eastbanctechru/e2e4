import {FilterConfig} from './contracts/filter-config';
import { SortParameter } from './sort-parameter';
import {filter} from './filter-annotation';
/**
 * Реализует функционал для работы с сортировками.
 */
export class SortingsService {
    /**
     * Глобальные настройки сервиса.
     * Данные настройки являются статическими и копируются при создании каждой новой копии класса {@link SortingsService} в его одноименные свойства.
     * Изменение данных настроек затронет все объекты типа {@link SortingsService}.
     * Для изменения настроек конкретного объекта вы можете конфигурировать его одноименные свойства.
     */
    public static settings: any = {
        /**
         * Смотри {@link SortingsService.persistSortings}. 
         */
        persistSortings: false,
        /**
         * Смотри {@link SortingsService.sortParameterName}. 
         */
        sortParameterName: 'sort'
    };
    /**
     * Внутренняя реализация {@link defaultSortings}.
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
     * Массив сортировок, которые были применены с использованием сервиса.
     * В случае, если сервис зарегистрировать как целевой объект в {@link FiltersService}, то данное свойство будет обрабатываться всеми методами сервиса.
     */
    public sortings: Array<SortParameter> = new Array<SortParameter>();
    /**
     * Имя параметра при запросе на сервер, в котором будет передано значение свойства {@link sortings}. 
     */
    public sortParameterName: string = SortingsService.settings.sortParameterName;
    /**
     * Указывает, нужно ли сохранять сортировки на постоянной основе.
     * Смотри {@link FilterConfig.persisted} а также {@link FiltersService.getPersistedState}
     */
    public persistSortings: boolean = SortingsService.settings.persistSortings;
    /**
     * Внутренний метод для клонирования настроек по умолчанию.
     * Используется как {@link FilterConfig.defaultValue} при использовании в сочетании с {@link FiltersService} 
     * а так же копирует настройки по умолчанию в свойство {@link sortings} при вызове setter-а {@link defaultSortings}
     */
    protected cloneDefaultSortings(): Array<SortParameter> {
        return this.defaultSortingsInternal.map((s: SortParameter) => new SortParameter(s.fieldName, s.direction));
    }
    /**
     * Сортировки по умолчанию, которые будут применены сервисом сразу при создании.
     * В случае, если на момент вызова setter-а массив {@link sortings} был пустым, то в него копируются переданные значения.
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
     * Устанавливает настройки сортировок в соотетствии с переданными параметрами.
     * @param fieldName название поля, сортировку по которому необходимо выполнить. Будет использован как {@SortParameter.fieldName}.
     * В случае, если сортировка по данному имени поля уже есть в настройках, то ее направление будет изменено на обратное и она будет помещена в конец массива, то есть сортировка по данному полю будет идти в последнюю очередь.
     * @param savePrevious признак, сохранять ли уже настроеные сортировки (то есть сортировать по нескольким полям одновременно). 
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
     * Подготавливает объект к уничтожению.
     */
    public dispose(): void {
        this.defaultSortingsInternal.length = 0;
        this.sortings.length = 0;
    }
}
