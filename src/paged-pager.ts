import {Pager} from './contracts/pager';
import {filter} from './filter-annotation';
import {FilterConfig} from './contracts/filter-config';
/**
 * Имплементация контракта {@link Pager} реализующая поведение списка с постраничной разбивкой.
 */
export class PagedPager implements Pager {
    /**
     * Настройки таких свойств, как имена параметров и значения по умолчанию при построении запроса и разборе ответа от сервера.
     * Данные настройки являются статическими и копируются при создании каждой новой копии класса {@link PagedPager} в его одноименные свойства.
     * Изменение данных настроек затронет все объекты типа {@link PagedPager}.
     * Для изменения настроек конкретного объекта вы можете конфигурировать его одноименные свойства.
     */
    public static settings: any =
    {
        /**
         * Смотри {@link PagedPager.defaultPageSize}. 
         */
        defaultPageSize: 20,
        /**
         * Смотри {@link PagedPager.displayFromParameterName}. 
         */
        displayFromParameterName: 'displayFrom',
        /**
         * Смотри {@link PagedPager.displayToParameterName}. 
         */
        displayToParameterName: 'displayTo',
        /**
         * Смотри {@link PagedPager.loadedCountParameterName}. 
         */
        loadedCountParameterName: 'loadedCount',
        /**
         * Смотри {@link PagedPager.maxPageSize}. 
         */
        maxPageSize: 200,
        /**
         * Смотри {@link PagedPager.minPageSize}. 
         */
        minPageSize: 1,
        /**
         * Смотри {@link PagedPager.pageNumberParameterName}. 
         */
        pageNumberParameterName: 'pageNumber',
        /**
         * Смотри {@link PagedPager.pageSizeParameterName}. 
         */
        pageSizeParameterName: 'pageSize',
        /**
         * Смотри {@link PagedPager.persistPageSize}. 
         */
        persistPageSize: false,
        /**
         * Смотри {@link PagedPager.totalCountParameterName}. 
         */
        totalCountParameterName: 'totalCount'
    };
    /**
     * Внутренняя реализация свойства {@link pageSize}. 
     */
    protected pageSizeInternal: number = PagedPager.settings.defaultPageSize;

    @filter({
        defaultValue: 1,
        parameterName: function (): string { return (<PagedPager>this).pageNumberParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? 1 : rawValue;
        }
    } as FilterConfig)
    /**
     * Внутренняя реализация свойства {@link pageNumber}. 
     */
    protected pageNumberInternal: number = 1;
    /**
     * Смотри {@link Pager.appendedOnLoad}. 
     */
    public appendedOnLoad: boolean = false;
    /**
     * Количество записей по умолчанию, которое будет загружаться с сервера. 
     * Является исходным значением для свойства {@link pageSize}, и в данное же значение будет сбрасываться свойство {@link pageSize} при вызове метода {@link reset}. 
     */
    public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    /**
     * Максимальное значение в которое может быть установлен параметр {@link pageSize}. 
     */
    public maxPageSize: number = PagedPager.settings.maxPageSize;
    /**
     * Минимальное значение в которое может быть установлен параметр {@link pageSize}. 
     */
    public minPageSize: number = PagedPager.settings.minPageSize;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link displayFrom}. 
     */
    public displayFromParameterName: string = PagedPager.settings.displayFromParameterName;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link displayTo}. 
     */
    public displayToParameterName: string = PagedPager.settings.displayToParameterName;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link loadedCount}. 
     */
    public loadedCountParameterName: string = PagedPager.settings.loadedCountParameterName;
    /**
     * Имя свойства в ответе от сервера, из которого будет считано значение свойства {@link totalCount}. 
     */
    public totalCountParameterName: string = PagedPager.settings.totalCountParameterName;
    /**
     * Имя параметра при запросе на сервер, в котором будет передано значение свойства {@link pageNumber}. 
     */
    public pageNumberParameterName: string = PagedPager.settings.pageNumberParameterName;
    /**
     * Имя параметра при запросе на сервер, в котором будет передано значение свойства {@link pageSize}. 
     */
    public pageSizeParameterName: string = PagedPager.settings.pageSizeParameterName;
    /**
     * Указывает, нужно ли сохранять размер страницы списка постоянно.
     * Смотри {@link FilterConfig.persisted} а также {@link FiltersService.getPersistedState}
     */
    public persistPageSize: boolean = PagedPager.settings.persistPageSize;
    /**
     * Смотри {@link Pager.totalCount}.
     */
    public totalCount: number = 0;
    /**
     * Смотри {@link Pager.loadedCount}. 
     */
    public loadedCount: number = 0;
    /**
     * Разбирается методом {@link processResponse} из ответа сервера. 
     * Представляет собой номер записи, с которой загружены данные. Например для второй страницы списка с разбивкой по 20 записей на страницу будет равен 21.
     * См. также {@link PagedListResponse.displayFrom}
     */
    public displayFrom: number = 0;
    /**
     * Разбирается методом {@link processResponse} из ответа сервера. Представляет собой номер записи, вплоть до которой загружены данные. 
     * Например для второй страницы списка с разбивкой по 20 записей на страницу будет равен 40 (или меньше, если в списке содержится меньшее количество записей).
     * См. также {@link PagedListResponse.displayTo}
     */
    public displayTo: number = 0;
    /**
     * Количество страниц, расчитанное как {@link totalCount} / {@link pageSize}.
     * Используется для проверки на корректность возможных значений {@link pageNumber}.
     */
    public get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    /**
     * Номер страницы, которую необходимо загрузить при запросе на сервер.
     * Имя параметра в запросе будет выставлено в соответствии со свойством {@link pageNumberParameterName}.
     * Setter данного свойства выполняет ряд проверок не давая, к примеру, отправить в качестве параметра значение, превышающее значение {@link pageCount}
     * См. также {@link PagedListRequest.pageNumber}
     */
    public get pageNumber(): number {
        return this.pageNumberInternal;
    }
    public set pageNumber(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
        if (pageNumber > this.pageCount) {
            pageNumber = this.pageCount;
        }
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        this.pageNumberInternal = pageNumber;
    }
    @filter({
        defaultValue: function (): number { return (<PagedPager>this).defaultPageSize; },
        parameterName: function (): string { return (<PagedPager>this).pageSizeParameterName; },
        parseFormatter: function (rawValue: any): number {
            return isNaN(rawValue) || !rawValue ? this.defaultPageSize : rawValue;
        },
        persisted: function (): boolean { return (<PagedPager>this).persistPageSize; }
    })
    /**
     * Размер страницы, которую необходимо загрузить при запросе на сервер.
     * Имя параметра в запросе будет выставлено в соответствии со свойством {@link pageSizeParameterName}.
     * Setter данного свойства выполняет ряд проверок не давая, к примеру, отправить в качестве параметра значение, превышающее значение {@link maxPageSize}
     * См. также {@link PagedListRequest.pageSize}
     */
    public get pageSize(): number {
        return this.pageSizeInternal;
    }
    public set pageSize(value: number) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultPageSize;

        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }

            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
            }
        }
        if (pageSize > this.maxPageSize) {
            pageSize = this.maxPageSize;
        }
        if (pageSize < this.minPageSize || pageSize === 0) {
            pageSize = this.defaultPageSize;
        }

        this.pageSizeInternal = pageSize;
    }
    /**
     * Смотри {@link Pager.processResponse}. 
     */
    public processResponse(result: Object): void {
        this.loadedCount = result[this.loadedCountParameterName] || 0;
        this.totalCount = result[this.totalCountParameterName] || 0;

        this.displayFrom = result[this.displayFromParameterName] || 0;
        this.displayTo = result[this.displayToParameterName] || 0;

    }
    /**
     * Смотри {@link Pager.reset}. 
     */
    public reset(): void {
        this.totalCount = 0;
        this.pageNumber = 1;
        this.pageSize = this.defaultPageSize;
    }
}
