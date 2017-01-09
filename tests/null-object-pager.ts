import { ListResponse } from '../src/contracts/list-response';
import { NullObjectPager } from '../src/null-object-pager';

import { expect } from 'chai';

function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}
describe('NullObjectPager', () => {

    it('created with good state', () => {
        const pager = new NullObjectPager();
        expect(pager.totalCount).eq(0);
        expect(pager.loadedCount).eq(0);
    });

    it('process response values', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        pager.processResponse(response);
        expect(pager.totalCount).eq(response.totalCount);
        expect(pager.loadedCount).eq(response.loadedCount);
    });

    it('process incorrect totalCount as 0', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.totalCount = null;
        pager.processResponse(response);
        expect(pager.totalCount).eq(0);
    });
    it('can calculate loadedCount from items array', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.loadedCount = null;
        response.totalCount = 20;
        pager.processResponse(response);
        expect(pager.loadedCount).eq(response.items.length);
    });

    it('sets loadedCount to 0 if it not specified in response and items array is empty', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        response.loadedCount = null;
        response.items.length = 0;
        pager.processResponse(response);
        expect(pager.loadedCount).eq(0);
    });

    it('resets contract properties', () => {
        const pager = new NullObjectPager();
        const response = toResponseObject();
        pager.processResponse(response);
        pager.reset();
        expect(pager.totalCount).eq(0);
    });
});
