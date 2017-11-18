import { expect } from 'chai';
import * as sinon from 'sinon';

import { Operation, OperationStatus, StatusTrackingService } from '../index';

function toTarget(): StatusTrackingService {
    return new StatusTrackingService();
}
describe('Status', () => {
    it('creates new model', () => {
        const model = new Operation(OperationStatus.Initial, 'title');

        expect(model.status).eql(OperationStatus.Initial);
        expect(model.title).eql('title');
    });

    it('expect model return proper classNames', () => {
        const model = new Operation(OperationStatus.Initial, 'title');
        expect(model.className).eql('');

        model.status = OperationStatus.Done;
        expect(model.className).eql(Operation.settings.statusDoneClassName);

        model.status = OperationStatus.Fail;
        expect(model.className).eql(Operation.settings.statusFailClassName);

        model.status = OperationStatus.Progress;
        expect(model.className).eql(Operation.settings.statusProgressClassName);

        model.status = OperationStatus.Cancelled;
        expect(model.className).eql('');
    });
});

describe('StatusTrackingService', () => {
    let clock: sinon.SinonFakeTimers;
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
        expect(target.operationsList.length).eq(0);
        // To the future;
        clock.tick(StatusTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(1);
    });

    it('resolves single status. Tracked status becomes Done', () => {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        expect(target.operationsList.length).eq(0);
        // Get to the time machine!
        clock.tick(StatusTrackingService.progressDelayInterval);
        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(1);
        target.changeStatus(sid, OperationStatus.Done);
        // One more time travel
        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(0);
        expect(target.status).eql(OperationStatus.Done);
    });

    it('Handles duplicate resolve normally', () => {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        clock.tick(StatusTrackingService.progressDelayInterval);
        target.changeStatus(sid, OperationStatus.Done);
        target.changeStatus(sid, OperationStatus.Done);
        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(0);
        expect(target.status).eql(OperationStatus.Done);
        target.changeStatus(sid, OperationStatus.Done);
    });

    it('resolves one of several status. Tracked status stays Progress', () => {
        const target = toTarget();
        const sid = target.trackStatus('new status 1');
        target.trackStatus('new status 2');
        expect(target.operationsList.length).eq(0);

        clock.tick(StatusTrackingService.progressDelayInterval);

        expect(target.isActive).eq(true);
        expect(target.operationsList.length).eq(2);
        target.changeStatus(sid, OperationStatus.Done);

        clock.tick(StatusTrackingService.elementVisibilityInterval);
        expect(target.operationsList.length).eq(1);
        expect(target.status).eql(OperationStatus.Progress);
    });
});
