import { expect } from 'chai';
import * as sinon from 'sinon';

import { ProgressState } from '../src/progress-state';
import { Operation, StateTrackingService } from '../src/state-tracking-service';

function toTarget(): StateTrackingService {
    return new StateTrackingService();
}
describe('Status', () => {
    it('creates new model', () => {
        const model = new Operation(ProgressState.Initial, 'title');

        expect(model.status).eql(ProgressState.Initial);
        expect(model.title).eql('title');
    });

    it('expect model return proper classNames', () => {
        const model = new Operation(ProgressState.Initial, 'title');
        expect(model.className).eql('');

        model.status = ProgressState.Done;
        expect(model.className).eql(Operation.settings.statusDoneClassName);

        model.status = ProgressState.Fail;
        expect(model.className).eql(Operation.settings.statusFailClassName);

        model.status = ProgressState.Progress;
        expect(model.className).eql(Operation.settings.statusProgressClassName);

        model.status = ProgressState.Cancelled;
        expect(model.className).eql('');
    });

});

describe('StateTrackingService', () => {
    let clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });

    it('tracks if status is active', () => {
        expect(new StateTrackingService().isActive).eq(false);
    });

    it('async switches to Progress, when tracking status', () => {
        const target = toTarget();
        target.trackStatus('new status');
        expect(target.operationsList.length).eq(0);
        // To the future;
        clock.tick(StateTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(1);
    });

    it('resolves single status. Tracked status becomes Done', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        expect(target.operationsList.length).eq(0);
        // Get to the time maschine!
        clock.tick(StateTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(1);
        target.changeStatus(sid, ProgressState.Done);
        // One more time travel
        clock.tick(StateTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(0);
        expect(target.status).eql(ProgressState.Done);

    });

    it('Handles duplicate resolve normally', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        clock.tick(StateTrackingService.progressDelayInterval);
        target.changeStatus(sid, ProgressState.Done);
        target.changeStatus(sid, ProgressState.Done);
        clock.tick(StateTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(0);
        expect(target.status).eql(ProgressState.Done);
        target.changeStatus(sid, ProgressState.Done);
    });

    it('resolves one of several status. Tracked status stays Progress', function (): void {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        target.trackStatus('new status 2');
        expect(target.operationsList.length).eq(0);

        clock.tick(StateTrackingService.progressDelayInterval);

        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(2);
        target.changeStatus(sid, ProgressState.Done);

        clock.tick(StateTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(1);
        expect(target.status).eql(ProgressState.Progress);
    });
});
