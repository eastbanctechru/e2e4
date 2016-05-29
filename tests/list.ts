import { expect } from 'chai';
import { List } from '../src/list';

class UselessList extends List {
    getDataReadPromise(requestParams: any): Promise<Object> {
        return null;
    }
}

describe('List', () => {
    describe('display real coverage', () => {
        it('not any meaningfull', () => {
            let list = new UselessList(null, null);
        });
    });
});
