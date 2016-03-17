import { expect } from 'chai';
import * as sinon from 'sinon';
import {Utility} from '../src/common/Utility';

describe('Utility', () => {
    it('disposeAll sync', () => {
        const disposeSpy = sinon.spy();
        const collection = [{dispose: disposeSpy}];

        Utility.disposeAll(collection, false);
        expect(disposeSpy.calledOnce).eql(true);
    });

    it('disposeAll async', (done) => {
        const disposeSpy = sinon.spy();
        const collection = [{dispose: disposeSpy}];

        Utility.disposeAll(collection);
        setTimeout(() => {
            expect(disposeSpy.calledOnce).eql(true);
            done();
        }, 0);
    });
});
