import {ListComponent} from './listComponent';
import {Utility} from './common/Utility';
import {Defaults} from './common/Defaults';
import {filter} from './filterAnnotation';
import {IFilterConfig} from './contracts/IFilterConfig';

export abstract class PagedListComponent extends ListComponent {
    private pageSizeInternal = Defaults.pagedListComponent.defaultPageSize;
    private pageNumberInternal = 1;
    private pagedLoadDataSuccessBinded: (result: Object) => Object;
    private pagedLoadDataSuccessCallback(result: Object): Object {
        this.loadedCount = result[Defaults.listComponent.loadedCountParameterName];
        this.totalCount = result[Defaults.listComponent.totalCountParameterName] || 0;

        this.displayFrom = result[Defaults.pagedListComponent.displayFromParameterName] || 1;
        this.displayTo = result[Defaults.pagedListComponent.displayToParameterName] || 1;
        return result;
    }
    displayFrom = 1;
    displayTo = 1;

    constructor() {
        super();
        this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
    }

    dispose(): void {
        super.dispose();
        delete this.pagedLoadDataSuccessBinded;
    }

    get pageCount(): number {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }

    @filter({ defaultValue: 1, parameterName: Defaults.pagedListComponent.pageNumberParameterName } as IFilterConfig)
    get pageNumber(): number {
        return this.pageNumberInternal;
    }
    set pageNumber(value: number) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
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
        defaultValue: Defaults.pagedListComponent.defaultPageSize,
        parameterName: Defaults.pagedListComponent.pageSizeParameterName,
        persisted: Defaults.pagedListComponent.persistPageSize
    })
    get pageSize(): number {
        return this.pageSizeInternal;
    }
    set pageSize(value: number) {
        const valueStr = (value + '').replace(/[^0-9\.]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.pagedListComponent.defaultPageSize;

        if (pageSize > Defaults.pagedListComponent.maxPageSize) {
            pageSize = Defaults.pagedListComponent.maxPageSize;
        }
        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }

            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
                if (pageSize > Defaults.pagedListComponent.maxPageSize) {
                    pageSize = Defaults.pagedListComponent.maxPageSize;
                }
            }
        }
        if (pageSize < Defaults.pagedListComponent.minPageSize || pageSize === 0) {
            pageSize = Defaults.pagedListComponent.defaultPageSize;
        }
        if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
            pageSize = this.pageSizeInternal;
        }
        this.pageSizeInternal = pageSize;
    }

    loadData(): Promise<Object> {
        this.selectionManager.deselectAll();
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        Utility.disposeAll(this.items);
        promise.then(this.pagedLoadDataSuccessBinded);
        return promise;
    }
    goToFirstPage(): void {
        if (this.pageNumber > 1) {
            this.pageNumber = 1;
            this.loadData();
        }
    }
    goToPreviousPage(): void {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            this.loadData();
        }
    }
    goToNextPage(): void {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber += 1;
            this.loadData();
        }
    }
    goToLastPage(): void {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageCount;
            this.loadData();
        }
    }
}
