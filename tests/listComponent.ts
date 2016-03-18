import { expect } from 'chai';
import * as sinon from 'sinon';
import {ListComponent} from '../src/ListComponent';

let helperResolve;

class TestListComponent extends ListComponent {
    getDataReadPromise(): Promise<Object> {
        const promise = new Promise(function(resolve: Function, reject: Function): void{
            helperResolve = resolve;
        });
        return promise;
    }
}
xdescribe('ListComponent', () => {
    let list;
    before(() => {
        list = new TestListComponent();
    });
    describe('newly created component', () => {
        it(' is not inited', () => {
            expect(list.inited).eql(false);
        });

        it('newly created component is ready', () => {
            expect(list.ready).eql(true);
        });

        it('newly created component is not busy', () => {
            expect(list.busy).eql(false);
        });
    });

    describe('after init', () => {
        before(() => {
            list.init({});
        });

        it('is inited', () => {
            expect(list.inited).eql(true);
        });
    });
});
