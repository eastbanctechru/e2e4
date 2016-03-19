import { expect } from 'chai';

import { StatusTracker } from '../src/statusTracker';
import { Defaults } from '../src/common/defaults';
import { ProgressState } from '../src/common/progressState';

function wait(time: number): Promise<{}> {
    return new Promise(function(resolve: Function, reject: Function): void {
        setTimeout(resolve, time);
    });
}

describe('StatusTracker', () => {
    afterEach(() => {
        StatusTracker.statusList = [];
    });

    it('tracks if status is displayed', () => {
        expect(StatusTracker.statusDisplayed).eq(false);
    });

    it('tracks if status is active', () => {
        expect(StatusTracker.isActive).eq(false);
    });

    it('async switches to Progress, when tracking status', (done: Function) => {
        const sid = StatusTracker.trackStatus('new status');
        expect(StatusTracker.statusList.length).eq(0);

        setTimeout(() => {
            expect(StatusTracker.isActive).eq(true);
            expect(StatusTracker.statusList.length).eq(1);
            done();
        }, Defaults.uiSettings.progressDelayInterval);

    });

    it('resolves single status. Tracked status becomes Done', function(done: Function): void {

        const sid = StatusTracker.trackStatus('new status 1');
        expect(StatusTracker.statusList.length).eq(0);

        wait(Defaults.uiSettings.progressDelayInterval)
            .then(() => {
                expect(StatusTracker.isActive).eq(true);
                expect(StatusTracker.statusList.length).eq(1);
                StatusTracker.resolveStatus(sid, ProgressState.Done);
            })
            .then(() => wait(Defaults.uiSettings.elementVisibilityInterval))
            .then(() => {
                expect(StatusTracker.statusList.length).eq(0);
                expect(StatusTracker.status).eql(ProgressState.Done);
            })
            .then(() => done());
    });

    it('resolves one of several status. Tracked status stays Progress', function(done: Function): void {

        const sid = StatusTracker.trackStatus('new status 1');
        StatusTracker.trackStatus('new status 2');
        expect(StatusTracker.statusList.length).eq(0);

        wait(Defaults.uiSettings.progressDelayInterval)
            .then(() => {
                expect(StatusTracker.isActive).eq(true);
                expect(StatusTracker.statusList.length).eq(2);
                StatusTracker.resolveStatus(sid, ProgressState.Done);
            })
            .then(() => wait(Defaults.uiSettings.elementVisibilityInterval))
            .then(() => {
                expect(StatusTracker.statusList.length).eq(1);
                expect(StatusTracker.status).eql(ProgressState.Progress);
            })
            .then(() => done());

    });
});
