import { expect } from 'chai';
import * as sinon from 'sinon';

import { StatusTrackingService, Status } from '../src/status-tracking-service';
import { ProgressState } from '../src/progress-state';
function toTarget(): StatusTrackingService {
    return new StatusTrackingService();
}
describe('Status', () => {
    it('creates new model', () => {
        const model = new Status(ProgressState.Initial, 'title');

        expect(model.status).eql(ProgressState.Initial);
        expect(model.title).eql('title');
    });

    it('expect model return proper classNames', () => {
        const model = new Status(ProgressState.Initial, 'title');
        expect(model.className).eql('');

        model.status = ProgressState.Done;
        expect(model.className).eql(Status.settings.statusDoneClassName);

        model.status = ProgressState.Fail;
        expect(model.className).eql(Status.settings.statusFailClassName);

        model.status = ProgressState.Progress;
        expect(model.className).eql(Status.settings.statusProgressClassName);

        model.status = ProgressState.Cancelled;
        expect(model.className).eql('');
    });

});

describe('StatusTracker', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });

    it('tracks if status is active', () => {
        expect(new StatusTrackingService().isActive).eq(false);
    });

    it('async switches to Progress, when tracking status', () => {
        const target = toTarget();
        target.trackStatus('new status');
        expect(target.statusList.length).eq(0);
        // To the future;
        clock.tick(StatusTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.statusList.length).eq(1);
    });

    it('resolves single status. Tracked status becomes Done', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        expect(target.statusList.length).eq(0);
        // Get to the time maschine!
        clock.tick(StatusTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.statusList.length).eq(1);
        target.changeStatus(sid, ProgressState.Done);
        // One more time travel
        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.statusList.length).eq(0);
        expect(target.status).eql(ProgressState.Done);

    });

    it('Handles duplicate resolve normally', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        clock.tick(StatusTrackingService.progressDelayInterval);
        target.changeStatus(sid, ProgressState.Done);
        target.changeStatus(sid, ProgressState.Done);
        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.statusList.length).eq(0);
        expect(target.status).eql(ProgressState.Done);
        target.changeStatus(sid, ProgressState.Done);
    });

    it('resolves one of several status. Tracked status stays Progress', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        target.trackStatus('new status 2');
        expect(target.statusList.length).eq(0);

        clock.tick(StatusTrackingService.progressDelayInterval);

        expect(target.isActive).eq(true);
        expect(target.statusList.length).eq(2);
        target.changeStatus(sid, ProgressState.Done);

        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.statusList.length).eq(1);
        expect(target.status).eql(ProgressState.Progress);
    });
});
