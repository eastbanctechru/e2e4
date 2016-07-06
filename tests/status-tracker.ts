import { expect } from 'chai';
import * as sinon from 'sinon';

import { StatusTracker } from '../src/status-tracker';
import { Defaults } from '../src/common/defaults';
import { ProgressState } from '../src/common/progress-state';

describe('StatusTracker', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        StatusTracker.statusList = [];
        clock.restore();
    });

    it('tracks if status is displayed', () => {
        expect(StatusTracker.statusDisplayed).eq(false);
    });

    it('tracks if status is active', () => {
        expect(StatusTracker.isActive).eq(false);
    });

    it('async switches to Progress, when tracking status', () => {
        StatusTracker.trackStatus('new status');
        expect(StatusTracker.statusList.length).eq(0);
        // To the future;
        clock.tick(Defaults.uiSettings.progressDelayInterval);
        expect(StatusTracker.isActive).eq(true);
        expect(StatusTracker.statusList.length).eq(1);
    });

    it('resolves single status. Tracked status becomes Done', function (): void {

        const sid = StatusTracker.trackStatus('new status 1');
        expect(StatusTracker.statusList.length).eq(0);
        // Get to the time maschine!
        clock.tick(Defaults.uiSettings.progressDelayInterval);
        expect(StatusTracker.isActive).eq(true);
        expect(StatusTracker.statusList.length).eq(1);
        StatusTracker.resolveStatus(sid, ProgressState.Done);
        // One more time travel
        clock.tick(Defaults.uiSettings.elementVisibilityInterval);
        expect(StatusTracker.statusList.length).eq(0);
        expect(StatusTracker.status).eql(ProgressState.Done);

    });

    it('Handles duplicate resolve normally', function (): void {

        const sid = StatusTracker.trackStatus('new status 1');
        clock.tick(Defaults.uiSettings.progressDelayInterval);
        StatusTracker.resolveStatus(sid, ProgressState.Done);
        StatusTracker.resolveStatus(sid, ProgressState.Done);
        clock.tick(Defaults.uiSettings.elementVisibilityInterval);
        expect(StatusTracker.statusList.length).eq(0);
        expect(StatusTracker.status).eql(ProgressState.Done);
        StatusTracker.resolveStatus(sid, ProgressState.Done);
    });

    it('resolves one of several status. Tracked status stays Progress', function (): void {

        const sid = StatusTracker.trackStatus('new status 1');
        StatusTracker.trackStatus('new status 2');
        expect(StatusTracker.statusList.length).eq(0);

        clock.tick(Defaults.uiSettings.progressDelayInterval);

        expect(StatusTracker.isActive).eq(true);
        expect(StatusTracker.statusList.length).eq(2);
        StatusTracker.resolveStatus(sid, ProgressState.Done);

        clock.tick(Defaults.uiSettings.elementVisibilityInterval);
        expect(StatusTracker.statusList.length).eq(1);
        expect(StatusTracker.status).eql(ProgressState.Progress);
    });
});
