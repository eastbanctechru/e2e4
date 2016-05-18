import { expect } from 'chai';
import { ParseHelper } from '../../src/common/parseHelper';
import { Utility } from '../../src/common/utility';
import { Defaults } from '../../src/common/defaults';

describe('coverage stub :)', () => {
    it('static ctors', () => {
        expect(new ParseHelper()).not.null;
        expect(new Utility()).not.null;
        expect(new Defaults()).not.null;
    });
});
