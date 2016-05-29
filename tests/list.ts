import { expect } from 'chai';
import { List } from '../src/list';

class UselessList extends List {
    getDataReadPromise(): Promise<Object> {
        return null;
    }
}

describe('List', () => {
    describe('display real coverage', () => {
        it('not any meaningfull', () => {
            let list = new UselessList(null);
        });
    });
});
