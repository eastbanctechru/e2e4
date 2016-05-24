import { expect } from 'chai';
import { SimplePager } from '../src/simplePager';

interface IResponseObject {
    loadedCount: number;
    totalCount: number;
}

function toResponseObject(): IResponseObject {
    return { loadedCount: 20, totalCount: 100 } as IResponseObject;
}
describe('SimplePager', () => {
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
