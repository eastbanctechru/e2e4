import { expect } from 'chai';
import { PagedPager } from '../src/pagedPager';
import { Defaults } from '../src/common/defaults';
import { FilterManager } from '../src/filterManager';

interface IResponseObject {
    loadedCount: number;
    totalCount: number;
    displayFrom: number;
    displayTo: number;
}

function toResponseObject(): IResponseObject {
    return { displayFrom: 1, displayTo: 20, loadedCount: 20, totalCount: 100 } as IResponseObject;
}
describe('PagedPager', () => {
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
    });
    describe('as filter target', () => {
        it('parse pageNumber param', () => {
            let pager = new PagedPager();
            let filterManager = new FilterManager(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: 5,
                pageSize: 100
            };
            filterManager.parseParams(params);
            expect(pager.pageNumber).eq(params.pageNumber);
        });
        it('parse pageSize param', () => {
            let pager = new PagedPager();
            let filterManager = new FilterManager(pager);

            expect(pager.pageNumber).eq(1);
            let params = {
                pageNumber: 5,
                pageSize: 100
            };
            filterManager.parseParams(params);
            expect(pager.pageSize).eq(params.pageSize);
        });

        it('sets pageSize to defaultPageSize on reset', () => {
            let pager = new PagedPager();
            let filterManager = new FilterManager(pager);
            pager.pageSize = 40;
            expect(pager.pageSize).eq(40);
            filterManager.resetValues();
            expect(pager.pageSize).eq(pager.defaultPageSize);
        });

        it('can have own defaultPageSize', () => {
            let pager = new PagedPager();
            let filterManager = new FilterManager(pager);
            pager.defaultPageSize = 5;
            filterManager.resetValues();
            expect(pager.pageSize).eq(5);
            expect(Defaults.pagedListSettings.defaultPageSize).not.eq(pager.defaultPageSize);
        });
    });
});
