import { expect } from 'chai';
import { SimplePager } from '../src/simple-pager';

interface ResponseObject {
    loadedCount: number;
    totalCount: number;
}

function toResponseObject(): ResponseObject {
    return { loadedCount: 20, totalCount: 100 } as ResponseObject;
}
describe('SimplePager', () => {

    it('created with good state', () => {
        let pager = new SimplePager();
        expect(pager.totalCount).eq(0);
        expect(pager.loadedCount).eq(0);
    });

    it('process response values', () => {
        let pager = new SimplePager();
        let response = toResponseObject();
        pager.processResponse(response);
        expect(pager.totalCount).eq(response.totalCount);
        expect(pager.loadedCount).eq(response.loadedCount);
    });

    it('process incorrect values as 0', () => {
        let pager = new SimplePager();
        let response = toResponseObject();
        pager.processResponse(response);

        expect(pager.totalCount).eq(response.totalCount);
        expect(pager.loadedCount).eq(response.loadedCount);

        response.loadedCount = null;
        response.totalCount = null;
        pager.processResponse(response);

        expect(pager.totalCount).eq(0);
        expect(pager.loadedCount).eq(0);
    });

    it('resets contract properties', () => {
        let pager = new SimplePager();
        let response = toResponseObject();
        pager.processResponse(response);
        pager.reset();
        expect(pager.totalCount).eq(0);
    });
});
