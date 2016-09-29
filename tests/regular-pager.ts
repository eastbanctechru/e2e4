import { ListResponse } from '../src/contracts/list-response';
import { RegularPager } from '../src/regular-pager';
import { expect } from 'chai';

function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}
describe('SimplePager', () => {

    it('created with good state', () => {
        let pager = new RegularPager();
        expect(pager.totalCount).eq(0);
        expect(pager.loadedCount).eq(0);
    });

    it('process response values', () => {
        let pager = new RegularPager();
        let response = toResponseObject();
        pager.processResponse(response);
        expect(pager.totalCount).eq(response.totalCount);
        expect(pager.loadedCount).eq(response.loadedCount);
    });

    it('process incorrect totalCount as 0', () => {
        let pager = new RegularPager();
        let response = toResponseObject();
        response.totalCount = null;
        pager.processResponse(response);
        expect(pager.totalCount).eq(0);
    });
    it('can calculate loadedCount from items array', () => {
        let pager = new RegularPager();
        let response = toResponseObject();
        response.loadedCount = null;
        response.totalCount = 20;
        pager.processResponse(response);
        expect(pager.loadedCount).eq(response.items.length);
    });

    it('resets contract properties', () => {
        let pager = new RegularPager();
        let response = toResponseObject();
        pager.processResponse(response);
        pager.reset();
        expect(pager.totalCount).eq(0);
    });
});
