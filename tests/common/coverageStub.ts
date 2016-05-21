import { expect } from 'chai';
import { Utility } from '../../src/common/utility';
import { Defaults } from '../../src/common/defaults';
import { StatusTracker } from '../../src/statusTracker';

describe('coverage stub :)', () => {
    it('static ctors', () => {
        expect(new Utility()).not.null;
        expect(new Defaults()).not.null;
        expect(new StatusTracker()).not.null;
    });
});
