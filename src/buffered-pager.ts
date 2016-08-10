import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';
/**
 * Имплементация контракта {@link Pager} реализующая поведение буферного (догружаемого) списка.
 */
export class BufferedPager implements Pager {
    /**
     * Настройки таких свойств, как имена параметров и значения по умолчанию при построении запроса и разборе ответа от сервера.
     * Данные настройки являются статическими и копируются при создании каждой новой копии класса {@link BufferedPager} в его одноименные свойства.
     * Изменение данных настроек затронет все объекты типа {@link BufferedPager}.
     * Для изменения настроек конкретного объекта вы можете конфигурировать его одноименные свойства.
     */
    public static settings: any =
    {
        /**
         * @see {@link BufferedPager.defaultRowCount}. 
         */
        defaultRowCount: 20,
        /**
         * @see {@link BufferedPager.loadedCountParameterName}. 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * @see {@link BufferedPager.maxRowCount}. 
         */
        maxRowCount: 200,
        /**
         * @see {@link BufferedPager.minRowCount}. 
         */
        minRowCount: 1,
        /**
         * @see {@link BufferedPager.skipRowCountParameterName}. 
         */
        skipRowCountParameterName: 'skip',
        /**
         * @see {@link BufferedPager.takeRowCountParameterName}. 
         */
        takeRowCountParameterName: 'take',
        /**
         * @see {@link BufferedPager.totalCountParameterName}. 
         */
        totalCountParameterName: 'totalCount'
    };

    @filter({
        defaultValue: function (): number { return (<BufferedPager>this).defaultRowCount; },
        parameterName: function (): string { return (<BufferedPager>this).takeRowCountParameterName; },
        parseFormatter: function (
            rawValue: any, allValues: any): number {
            let result;
            if (allValues && !isNaN(allValues.skip) && !isNaN(allValues.take)) {
                result = (allValues.skip || 0) + (allValues.take || 0);
            }
            return result || this.defaultRowCount;
        }
    } as FilterConfig)
    protected takeRowCountInternal: number = BufferedPager.settings.defaultRowCount;
    /**
     * @see {@link Pager.appendedOnLoad}. 
     */
    public appendedOnLoad: boolean = true;
    /**
     * @see {@link Pager.totalCount}. 
     */
    public totalCount: number = 0;
    /**
     * @see {@link Pager.loadedCount}. 
     */
    public loadedCount: number = 0;
    /**
     * Количество записей по умолчанию, которое будет загружаться с сервера. 
     * Является исходным значением для свойства {@link takeRowCount}, и в данное же значение будет сбрасываться свойство {@link takeRowCount} при вызове метода {@link reset}. 
     */
    public defaultRowCount: number = BufferedPager.settings.defaultRowCount;
    /**
     * Минимальное значение в которое может быть установлен параметр {@link takeRowCount}. 
     */
    public minRowCount: number = BufferedPager.settings.minRowCount;
    /**
     * Максимальное значение в которое может быть установлен параметр {@link takeRowCount}. 
     */
    public maxRowCount: number = BufferedPager.settings.maxRowCount;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link loadedCount}. 
     */
    public loadedCountParameterName: string = BufferedPager.settings.loadedCountParameterName;
    /**
     * Имя параметра при запросе на сервер, в котором будет передано значение свойства {@link skip}. 
     */
    public skipRowCountParameterName: string = BufferedPager.settings.skipRowCountParameterName;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link totalCount}. 
     */
    public totalCountParameterName: string = BufferedPager.settings.totalCountParameterName;
    /**
     * Имя параметра при запросе на сервер, в котором будет передано значение свойства {@link takeRowCount}. 
     */
    public takeRowCountParameterName: string = BufferedPager.settings.takeRowCountParameterName;
    /**
     * Параметр, передаваемый на сервер и указывающий, сколько записей уже загружено в список и, соответственно, их надо пропустить при загрузке данных.
     * Имя параметра в запросе будет выставлено в соответствии со свойством {@link skipRowCountParameterName}.
     * См. также {@link BufferedListRequest.skip}
     */
    @filter({
        defaultValue: 0,
        parameterName: function (): string { return this.skipRowCountParameterName; },
        parseFormatter: function (): number { return 0; }
    } as FilterConfig)
    public skip: number = 0;
    /**
     * Параметр, передаваемый на сервер и указывающий, сколько записей необходимо загрузить за следующий запрос.
     * Имя параметра в запросе будет выставлено в соответствии со свойством {@link takeRowCountParameterName}.
     * Setter данного свойства выполняет ряд проверок не давая, к примеру, отправить в качестве параметра значение, превышающее значение {@link maxRowCount}
     * См. также {@link BufferedListRequest.take}
     */
    public get takeRowCount(): number {
        return this.takeRowCountInternal;
    }
    public set takeRowCount(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultRowCount;
        if (rowCount < this.minRowCount) {
            rowCount = this.defaultRowCount;
        }
        if (rowCount > this.maxRowCount) {
            rowCount = this.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }
    /**
     * @see {@link Pager.processResponse}. 
     */
    public processResponse(result: Object): void {
        this.totalCount = result[this.totalCountParameterName] || 0;
        this.skip = (result[this.loadedCountParameterName] === null || result[this.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[this.loadedCountParameterName];
        this.loadedCount = this.skip;
    }
    /**
     * @see {@link Pager.reset}. 
     */
    public reset(): void {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
