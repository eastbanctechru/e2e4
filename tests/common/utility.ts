import { expect } from 'chai';
import * as sinon from 'sinon';
import { Utility } from '../../src/common/utility';

describe('Utility', () => {

    it('disposeAll sync', () => {
        const disposeSpy = sinon.spy();
        const collection = [{ dispose: disposeSpy }];

        Utility.disposeAll(collection, false);
        expect(disposeSpy.calledOnce).eql(true);
    });

    it('disposeAll async', (done) => {
        const disposeSpy = sinon.spy();
        const collection = [{ dispose: disposeSpy }];

        Utility.disposeAll(collection);
        setTimeout(() => {
            expect(disposeSpy.calledOnce).eql(true);
            done();
        }, 0);
    });

    it('doesn\'t break on invalid collections sync', () => {
        let callFn = () => {
            Utility.disposeAll(null, false);
        };
        expect(callFn).not.throw();
    });

    it('doesn\'t break on invalid collections async', () => {
        let callFn = () => {
            Utility.disposeAll(null);
        };
        expect(callFn).not.throw();
    });

    it('ignore items without dispose sync', () => {
        const collection = [{ id: 1 }];
        Utility.disposeAll(collection, false);
        expect(collection.length).equals(0);
    });

    it('ignore items without dispose async', (done) => {
        const collection = [{ id: 1 }];

        Utility.disposeAll(collection);
        setTimeout(() => {
            expect(collection.length).equals(0);
            done();
        }, 0);
    });
});
