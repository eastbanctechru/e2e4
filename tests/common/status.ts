import { expect } from 'chai';
import { Status } from '../../src/common/status';
import { ProgressState } from '../../src/common/progress-state';

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
        expect(model.className).eql('status status-resolved');

        model.status = ProgressState.Fail;
        expect(model.className).eql('status status-fail');

        model.status = ProgressState.Progress;
        expect(model.className).eql('status status-progress');

        model.status = ProgressState.Cancelled;
        expect(model.className).eql('');
    });

});
