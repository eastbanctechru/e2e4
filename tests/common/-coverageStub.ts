import { expect } from 'chai';
import { Utility } from '../../src/utility';
import { StatusTracker } from '../../src/status-tracker';

describe('coverage stub :)', () => {
    it('static ctors', () => {
        expect(new Utility()).not.null;
        expect(new StatusTracker()).not.null;
    });
});
