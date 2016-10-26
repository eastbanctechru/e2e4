import { BufferedPager } from '../src/buffered-pager';
import { ListResponse } from '../src/contracts/list-response';
import { FiltersService } from '../src/filters-service';

import { expect } from 'chai';

function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}
describe('BufferedPager', () => {
    describe('ctor', () => {
        it('created with good state', () => {
            let pager = new BufferedPager();
            expect(pager.totalCount).eq(0);
            expect(pager.loadedCount).eq(0);
            expect(pager.skip).eq(0);
            expect(pager.takeRowCount).eq(pager.defaultRowCount);

        });
    });
    describe('response processing', () => {
        it('process response values', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            pager.processResponse(response);
            expect(pager.totalCount).eq(response.totalCount);
            expect(pager.loadedCount).eq(response.loadedCount);
            expect(pager.skip).eq(response.loadedCount);
        });

        it('increments skip on each load callback execution', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            for (let i = response.loadedCount; i <= response.totalCount; i += response.loadedCount) {
                pager.processResponse(response);
                expect(pager.skip).eq(i);
            }
        });
        it('process incorrect totalCount as 0', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            response.totalCount = null;
            pager.processResponse(response);
            expect(pager.totalCount).eq(0);
        });
        it('can calculate loadedCount and skip properties from items array', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            response.loadedCount = null;
            response.totalCount = response.items.length * 2;
            pager.processResponse(response);
            expect(pager.loadedCount).eq(response.items.length);
            expect(pager.skip).eq(response.items.length);
            pager.processResponse(response);
            expect(pager.loadedCount).eq(response.items.length * 2);
            expect(pager.skip).eq(response.items.length * 2);
        });
        it('sets loadedCount to 0 if it not specified in response and items array is empty', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            response.loadedCount = null;
            response.items.length = 0;
            pager.processResponse(response);
            expect(pager.loadedCount).eq(0);
        });
        it('resets contract properties', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            pager.processResponse(response);
            pager.reset();
            expect(pager.totalCount).eq(0);
            expect(pager.skip).eq(0);
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });
    });
    describe('as filter target', () => {
        it('parse skip param as 0', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.skip).eq(0);
            let params = {
                skip: 100,
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.skip).eq(0);
        });
        it('parse takeRowCount as sum of skip and take if both specified', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);

            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.skip).eq(0);
            let params = {
                skip: 100,
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.takeRowCount).eq(params.skip + params.take);
        });
        it('parse takeRowCount as defaultRowCount if skip or take not specified', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);
            let params = {
                take: 100
            };
            filtersService.applyParams(params);
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });
        it('parse nulls as zeroes for takeRowCount', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);
            filtersService.applyParams({
                skip: 100,
                take: null
            });
            expect(pager.takeRowCount).eq(100);
            filtersService.applyParams({
                skip: null,
                take: 100
            });
            expect(pager.takeRowCount).eq(100);
        });
        it('parse takeRowCount to defaultRowCount if parsed value is invalid', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);
            filtersService.applyParams({
                skip: null,
                take: null
            });
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });
        it('sets takeRowCount to defaultRowCount on reset', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);
            pager.takeRowCount = 40;
            expect(pager.takeRowCount).eq(40);
            filtersService.resetValues();
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });

        it('can have own defaultRowCount', () => {
            let pager = new BufferedPager();
            let filtersService = new FiltersService(pager);
            pager.defaultRowCount = 5;
            filtersService.resetValues();
            expect(pager.takeRowCount).eq(5);
            expect(BufferedPager.settings.defaultRowCount).not.eq(pager.defaultRowCount);
        });

    });
    describe('internal state', () => {
        it('sets rowCount to maxRowCount when try to set bigger value', () => {
            let pager = new BufferedPager();
            pager.takeRowCount = BufferedPager.settings.maxRowCount + 100;
            expect(pager.takeRowCount).eq(BufferedPager.settings.maxRowCount);
        });

        it('can have own maxRowCount', () => {
            let pager = new BufferedPager();
            pager.maxRowCount = BufferedPager.settings.maxRowCount + 100;
            pager.takeRowCount = pager.maxRowCount + 100;
            expect(pager.takeRowCount).eq(pager.maxRowCount);
            expect(pager.maxRowCount).not.eq(BufferedPager.settings.maxRowCount);
        });

        it('sets rowCount to defaultRowCount when try to set less then minRowCount', () => {
            let pager = new BufferedPager();
            pager.takeRowCount = BufferedPager.settings.minRowCount - 1;
            expect(pager.takeRowCount).eq(BufferedPager.settings.defaultRowCount);
        });

        it('can have own minRowCount', () => {
            let pager = new BufferedPager();
            pager.minRowCount = BufferedPager.settings.minRowCount + 10;
            pager.takeRowCount = pager.minRowCount - 1;
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.minRowCount).not.eq(BufferedPager.settings.minRowCount);
        });

        it('sets takeRowCount to unloaded records count when totalCount specified and setted value is bigger', () => {
            let pager = new BufferedPager();
            pager.processResponse(toResponseObject());
            pager.takeRowCount = pager.totalCount;
            expect(pager.takeRowCount).eq(pager.totalCount - pager.skip);
        });

        it('sets takeRowCount when totalCount specified and setted value is not bigger', () => {
            let pager = new BufferedPager();
            pager.processResponse(toResponseObject());
            pager.takeRowCount = pager.totalCount - pager.skip - 10;
            expect(pager.takeRowCount).eq(pager.totalCount - pager.skip - 10);
        });
        it('canLoadMore is false if not all records loaded', () => {
            let pager = new BufferedPager();
            pager.processResponse(toResponseObject());
            expect(pager.canLoadMore).true;
        });
        it('canLoadMore is true if all records loaded', () => {
            let pager = new BufferedPager();
            pager.processResponse(toResponseObject());
            pager.skip = pager.totalCount;
            expect(pager.canLoadMore).false;
        });
    });
});
