import { expect } from 'chai';
import { AbstractLifetime } from '../src/abstractLifetime';
import { ProgressState } from '../src/common/progressState';

class Lifetime extends AbstractLifetime {
}
function totarget(): AbstractLifetime {
    return new Lifetime();
}

describe('List', () => {
    describe('lifecycle', () => {
        it('init set inited to true', () => {
            let list = totarget();
            expect(list.inited).false;
            list.init();
            expect(list.inited).true;
        });
        it('dispose set disposed to true', () => {
            let list = totarget();
            expect(list.disposed).false;
            list.dispose();
            expect(list.disposed).true;
        });
        it('ready and busy reflects state property', () => {
            let list = totarget();
            expect(list.state).eq(ProgressState.Initial);
            expect(list.ready).true;
            expect(list.busy).false;

            list.state = ProgressState.Progress;
            expect(list.ready).false;
            expect(list.busy).true;

            list.state = ProgressState.Done;
            expect(list.ready).true;
            expect(list.busy).false;
            list.state = ProgressState.Cancelled;
            expect(list.ready).true;
            expect(list.busy).false;
            list.state = ProgressState.Fail;
            expect(list.ready).true;
            expect(list.busy).false;

        });
    });
});
