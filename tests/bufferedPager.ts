import { expect } from 'chai';
import { BufferedPager } from '../src/bufferedPager';
import { Defaults } from '../src/common/defaults';
import { FilterManager } from '../src/filterManager';

interface IResponseObject {
    loadedCount: number;
    totalCount: number;
}

function toResponseObject(): IResponseObject {
    return { loadedCount: 20, totalCount: 100 } as IResponseObject;
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
        it('process incorrect values as 0', () => {
            let pager = new BufferedPager();
            let response = toResponseObject();
            response.loadedCount = null;
            response.totalCount = null;
            pager.processResponse(response);

            expect(pager.totalCount).eq(0);
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
            let filterManager = new FilterManager(pager);

            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.skip).eq(0);
            let params = {
                skip: 100,
                take: 100
            };
            filterManager.parseParams(params);
            expect(pager.skip).eq(0);
        });
        it('parse takeRowCount as sum of skip and take if both specified', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);

            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.skip).eq(0);

            let params = {
                skip: 100,
                take: 100
            };
            filterManager.parseParams(params);
            expect(pager.takeRowCount).eq(params.skip + params.take);
        });
        it('parse takeRowCount as defaultRowCount if skip or take not specified', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);
            let params = {
                take: 100
            };
            filterManager.parseParams(params);
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });
        it('parse nulls as zeroes for takeRowCount', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);
            filterManager.parseParams({
                skip: 100,
                take: null
            });
            expect(pager.takeRowCount).eq(100);
            filterManager.parseParams({
                skip: null,
                take: 100
            });
            expect(pager.takeRowCount).eq(100);
        });
        it('parse takeRowCount to defaultRowCount if parsed value is invalid', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);
            filterManager.parseParams({
                skip: null,
                take: null
            });
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });
        it('sets takeRowCount to defaultRowCount on reset', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);
            pager.takeRowCount = 40;
            expect(pager.takeRowCount).eq(40);
            filterManager.resetValues();
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
        });

        it('can have own defaultRowCount', () => {
            let pager = new BufferedPager();
            let filterManager = new FilterManager(pager);
            pager.defaultRowCount = 5;
            filterManager.resetValues();
            expect(pager.takeRowCount).eq(5);
            expect(Defaults.bufferedListSettings.defaultRowCount).not.eq(pager.defaultRowCount);
        });
    });
    describe('work with takeRowCount', () => {
        it('sets rowCount to maxRowCount when try to set bigger value', () => {
            let pager = new BufferedPager();
            pager.takeRowCount = Defaults.bufferedListSettings.maxRowCount + 100;
            expect(pager.takeRowCount).eq(Defaults.bufferedListSettings.maxRowCount);
        });

        it('can have own maxRowCount', () => {
            let pager = new BufferedPager();
            pager.maxRowCount = Defaults.bufferedListSettings.maxRowCount + 100;
            pager.takeRowCount = pager.maxRowCount + 100;
            expect(pager.takeRowCount).eq(pager.maxRowCount);
            expect(pager.maxRowCount).not.eq(Defaults.bufferedListSettings.maxRowCount);
        });

        it('sets rowCount to defaultRowCount when try to set smaller then minRowCount', () => {
            let pager = new BufferedPager();
            pager.takeRowCount = Defaults.bufferedListSettings.minRowCount - 1;
            expect(pager.takeRowCount).eq(Defaults.bufferedListSettings.defaultRowCount);
        });

        it('can have own minRowCount', () => {
            let pager = new BufferedPager();
            pager.minRowCount = Defaults.bufferedListSettings.minRowCount + 10;
            pager.takeRowCount = pager.minRowCount - 1;
            expect(pager.takeRowCount).eq(pager.defaultRowCount);
            expect(pager.minRowCount).not.eq(Defaults.bufferedListSettings.minRowCount);
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
    });
});
