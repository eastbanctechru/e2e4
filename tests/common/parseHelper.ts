import { expect } from 'chai';
import { ParseHelper } from '../../src/common/parseHelper';

describe('ParseHelper', () => {
    it('doesn\'t modify regular string', () => {
        expect(ParseHelper.coerceValue('just a string')).equal('just a string');
    });
    it('doesn\'t parse NaN string to number', () => {
        expect(ParseHelper.coerceValue('5.5tst')).not.equal(5.5);
    });
    it('parse number strings to numbers', () => {
        expect(ParseHelper.coerceValue('5')).eql(5);
        expect(ParseHelper.coerceValue('5.5')).eql(5.5);
        expect(ParseHelper.coerceValue('0.5')).eql(0.5);
    });
    it('parse \'undefined\' to undefined', () => {
        expect(ParseHelper.coerceValue('undefined')).eql(undefined);
    });
    it('parse \'null\' to null', () => {
        expect(ParseHelper.coerceValue('null')).eql(null);
    });
    it('parse \'false\' to false', () => {
        expect(ParseHelper.coerceValue('false')).eql(false);
    });
    it('parse \'true\' to true', () => {
        expect(ParseHelper.coerceValue('true')).eql(true);
    });
    it('doesn\'t parse \'False\' as boolean', () => {
        expect(ParseHelper.coerceValue('False')).not.eql(false);
    });
    it('doesn\'t parse \'True\' as boolean', () => {
        expect(ParseHelper.coerceValue('True')).not.eql(true);
    });
    it('supports complex objects', () => {
        expect(ParseHelper.coerceValue({
            a: 'true',
            b: 'false',
            c: 'null',
            d: 'undefined',
            e: '5',
            f: 'just a string'
        })).eql({
            a: true,
            b: false,
            c: null,
            d: undefined,
            e: 5,
            f: 'just a string'
        });
    });
    it('supports arrays', () => {
        expect(ParseHelper.coerceValue(['true', 'false', 'null', 'undefined', '5', 'just a string']
        )).eql([true, false, null, undefined, 5, 'just a string']);
    });
    it('works only with simple objects', () => {
        class ParentRequest {
            parentProperty: string = 'just a string';
            parentMethod(): void { }
        }
        class ChildRequest extends ParentRequest {
            childProperty: string = 'just a string';
        }
        let toParse = {};
        expect(ParseHelper.coerceValue(new ChildRequest())).eql({ childProperty: 'just a string', parentProperty: 'just a string'});
        expect(ParseHelper.coerceValue(new ChildRequest()).hasOwnProperty('parentMethod')).false;
    });
});
