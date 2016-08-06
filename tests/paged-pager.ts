import { expect } from 'chai';
import { PagedPager } from '../src/paged-pager';
import { FiltersService } from '../src/filters-service';

interface ResponseObject {
    loadedCount: number;
    totalCount: number;
    displayFrom: number;
    displayTo: number;
}

function toResponseObject(): ResponseObject {
    return { displayFrom: 1, displayTo: 20, loadedCount: 20, totalCount: 100 } as ResponseObject;
}
describe('PagedPager', () => {
    describe('ctor', () => {
        it('created with good state', () => {
            let pager = new PagedPager();
            expect(pager.totalCount).eq(0);
            expect(pager.loadedCount).eq(0);
            expect(pager.pageNumber).eq(1);
            expect(pager.pageSize).eq(pager.defaultPageSize);
            expect(pager.displayFrom).eq(0);
            expect(pager.displayTo).eq(0);

        });
    });

    describe('response processing', () => {
        it('process response values', () => {
            let pager = new PagedPager();
            let response = toResponseObject();
            pager.processResponse(response);

            expect(pager.totalCount).eq(response.totalCount);
            expect(pager.loadedCount).eq(response.loadedCount);
            expect(pager.displayFrom).eq(response.displayFrom);
            expect(pager.displayTo).eq(response.displayTo);
        });

        it('process incorrect values as 0', () => {
            let pager = new PagedPager();
            let response = toResponseObject();
            response.loadedCount = null;
            response.totalCount = null;
            response.displayFrom = null;
            response.displayTo = null;
            pager.processResponse(response);

            expect(pager.totalCount).eq(0);
            expect(pager.loadedCount).eq(0);
            expect(pager.displayFrom).eq(0);
            expect(pager.displayTo).eq(0);
        });

        it('resets contract properties', () => {
            let pager = new PagedPager();
            let response = toResponseObject();
            pager.processResponse(response);
            pager.reset();
            expect(pager.totalCount).eq(0);
            expect(pager.pageNumber).eq(1);
            expect(pager.pageSize).eq(pager.defaultPageSize);
        });
        it('process response with custom properties names', () => {
            let pager = new PagedPager();
            pager.totalCountParameterName = 'customTotal';
            pager.loadedCountParameterName = 'customLoaded';
            pager.displayFromParameterName = 'customDisplayFrom';
            pager.displayToParameterName = 'customDisplayTo';
            const response = {
                customDisplayFrom: 20,
                customDisplayTo: 40,
                customLoaded: 20,
                customTotal: 100
            };
            pager.processResponse(response);
            expect(pager.loadedCount).eq(response.customLoaded);
            expect(pager.totalCount).eq(response.customTotal);
            expect(pager.displayFrom).eq(response.customDisplayFrom);
            expect(pager.displayTo).eq(response.customDisplayTo);
        });

    });
    describe('as filter target', () => {
        it('parse pageNumber param', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: 5,
                pageSize: 100
            };
            filtersService.applyParams(params);
            expect(pager.pageNumber).eq(params.pageNumber);
        });
        it('parse pageNumber as 1 if invalid', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: null,
                pageSize: 100
            };
            filtersService.applyParams(params);
            expect(pager.pageNumber).eq(1);
        });
        it('parse pageSize as defaultPageSize if invalid', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: 1,
                pageSize: null
            };
            filtersService.applyParams(params);
            expect(pager.pageSize).eq(pager.defaultPageSize);
        });
        it('parse pageSize param', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: 5,
                pageSize: 100
            };
            filtersService.applyParams(params);
            expect(pager.pageSize).eq(params.pageSize);
        });

        it('sets pageSize to defaultPageSize on reset', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);
            pager.pageSize = 40;
            expect(pager.pageSize).eq(40);
            filtersService.resetValues();
            expect(pager.pageSize).eq(pager.defaultPageSize);
        });

        it('can have own defaultPageSize', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);
            pager.defaultPageSize = 5;
            filtersService.resetValues();
            expect(pager.pageSize).eq(5);
            expect(PagedPager.settings.defaultPageSize).not.eq(pager.defaultPageSize);
        });

        it('can use custom parameter names', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);

            pager.pageNumberParameterName = 'customPageNumber';
            pager.pageSizeParameterName = 'customPageSize';
            const request = filtersService.getRequestState();
            expect(request).haveOwnProperty(pager.pageNumberParameterName);
            expect(request).haveOwnProperty(pager.pageSizeParameterName);
        });
        it('can persist pageSize', () => {
            let pager = new PagedPager();
            let filtersService = new FiltersService(pager);
            pager.persistPageSize = true;
            const persistedState = filtersService.getPersistedState();

            expect(persistedState).eql({ pageSize: pager.pageSize });
        });

    });
    describe('internal state', () => {
        describe('pageSize', () => {
            it('sets pageNumber to defaultPageSize on invalid', () => {
                let pager = new PagedPager();
                pager.pageSize = null;
                expect(pager.pageSize).eq(pager.defaultPageSize);
                pager.pageSize = undefined;
                expect(pager.pageSize).eq(pager.defaultPageSize);
                pager.pageSize = -20;
                expect(pager.pageSize).eq(pager.defaultPageSize);
            });
            it('sets pageSize to maxPageSize when try to set bigger value', () => {
                let pager = new PagedPager();
                pager.pageSize = PagedPager.settings.maxPageSize + 100;
                expect(pager.pageSize).eq(PagedPager.settings.maxPageSize);
            });

            it('can have own maxPageSize', () => {
                let pager = new PagedPager();
                pager.maxPageSize = PagedPager.settings.maxPageSize + 100;
                pager.pageSize = pager.maxPageSize + 100;
                expect(pager.pageSize).eq(pager.maxPageSize);
                expect(pager.maxPageSize).not.eq(PagedPager.settings.maxPageSize);
            });

            it('sets pageSize to defaultPageSize when try to set value less then minPageSize', () => {
                let pager = new PagedPager();
                pager.pageSize = PagedPager.settings.minPageSize - 1;
                expect(pager.pageSize).eq(pager.defaultPageSize);
            });

            it('can have own minPageSize', () => {
                let pager = new PagedPager();
                pager.minPageSize = PagedPager.settings.minPageSize + 10;
                pager.pageSize = pager.minPageSize - 10;
                expect(pager.pageSize).eq(pager.defaultPageSize);
                expect(pager.minPageSize).not.eq(PagedPager.settings.minPageSize);
            });

            it('sets pageSize to totalCount when try to set value greater then totalCount', () => {
                let response = toResponseObject();
                let pager = new PagedPager();
                pager.processResponse(response);
                pager.pageSize = response.totalCount + 1;
                expect(pager.pageSize).eq(response.totalCount);
            });

            it('sets pageSize to specified value when totalCount is not zero', () => {
                let response = toResponseObject();
                let pager = new PagedPager();
                pager.processResponse(response);
                pager.pageSize = response.totalCount - 1;
                expect(pager.pageSize).eq(response.totalCount - 1);
            });

            it('sets pageSize to maximum possible for current pageNumber', () => {
                let response = toResponseObject();
                let pager = new PagedPager();
                pager.processResponse(response);

                pager.pageNumber = response.totalCount / response.loadedCount;

                pager.pageSize = response.loadedCount + 1;
                expect(pager.pageSize).eq(response.loadedCount);
            });

            it('sets pageSize to maximum possible for current pageNumber and not bigger then maxPageSize', () => {
                let response = toResponseObject();
                let pager = new PagedPager();
                pager.processResponse(response);
                pager.maxPageSize = response.loadedCount / 2;
                pager.pageNumber = response.totalCount / response.loadedCount;
                pager.pageSize = response.loadedCount + 1;
                expect(pager.pageSize).eq(pager.maxPageSize);
            });
        });
        describe('pageNumber', () => {
            it('sets pageNumber to 1 on invalid', () => {
                let pager = new PagedPager();
                pager.pageNumber = null;
                expect(pager.pageNumber).eq(1);
                pager.pageNumber = undefined;
                expect(pager.pageNumber).eq(1);
                pager.pageNumber = -20;
                expect(pager.pageNumber).eq(1);
            });

            it('sets pageNumber to 1 if invalid', () => {
                let pager = new PagedPager();
                pager.pageNumber = null;
                expect(pager.pageNumber).eq(1);
                pager.pageNumber = undefined;
                expect(pager.pageNumber).eq(1);
            });
            it('sets pageNumber no bigger then pageCount', () => {
                let pager = new PagedPager();
                let response = toResponseObject();
                pager.processResponse(response);
                pager.pageNumber = pager.pageCount;
                expect(pager.pageNumber).eq(pager.pageCount);
                pager.pageNumber = pager.pageCount + 10;
                expect(pager.pageNumber).eq(pager.pageCount);
            });
        });
        it('calculates pageCount as count/size', () => {
            let pager = new PagedPager();
            let response = toResponseObject();
            pager.processResponse(response);
            expect(pager.pageCount).eq(Math.ceil(pager.totalCount / pager.pageSize));
        });
    });
});
