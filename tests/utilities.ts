import { expect } from 'chai';
import * as sinon from 'sinon';
import { disposeAll, cloneAsLiteral, coerceValue } from '../src/utilities';

describe('Utilities', () => {
    describe('disposeAll', () => {
        it('disposeAll sync', () => {
            const disposeSpy = sinon.spy();
            const collection = [{ dispose: disposeSpy }];

            disposeAll(collection, false);
            expect(disposeSpy.calledOnce).eql(true);
        });

        it('disposeAll async', (done: () => void) => {
            const disposeSpy = sinon.spy();
            const collection = [{ dispose: disposeSpy }];

            disposeAll(collection);
            setTimeout(() => {
                expect(disposeSpy.calledOnce).eql(true);
                done();
            }, 0);
        });

        it('doesn\'t break on invalid collections sync', () => {
            let callFn = (): void => {
                disposeAll(null, false);
            };
            expect(callFn).not.throw();
        });

        it('doesn\'t break on invalid collections async', () => {
            let callFn = (): void => {
                disposeAll(null);
            };
            expect(callFn).not.throw();
        });

        it('ignore items without dispose sync', () => {
            const collection = [{ id: 1 }];
            disposeAll(collection, false);
            expect(collection.length).equals(0);
        });

        it('ignore items without dispose async', (done: () => void) => {
            const collection = [{ id: 1 }];

            disposeAll(collection);
            setTimeout(() => {
                expect(collection.length).equals(0);
                done();
            }, 0);
        });
    });
    describe('cloneLiteral', () => {
        it('clones simple values', () => {
            expect(cloneAsLiteral(5)).equals(5);
            expect(cloneAsLiteral('Hello world')).equals('Hello world');
            expect(cloneAsLiteral(null)).null;
            expect(cloneAsLiteral(undefined)).undefined;
        });

        it('clones arrays', () => {
            let toClone = ['Hello world', 5, null];
            let cloned = cloneAsLiteral(toClone);
            expect(cloned).to.not.equal(toClone);
            expect(cloned).to.deep.equal(toClone);
        });

        it('clones object literals', () => {
            let toClone = {
                arrayProperty: ['Hello world', 5, null],
                literalProperty: {
                    innerArrayProperty: ['Hello world', 5, null],
                    innerNullProperty: null,
                    innerNumberProperty: 5,
                    innerStringProperty: 'Hello world'
                },
                nullProperty: null,
                numberProperty: 5,
                stringProperty: 'Hello world'
            };
            let cloned = cloneAsLiteral(toClone);
            expect(cloned).to.not.equal(toClone);
            expect(cloned).to.deep.equal(toClone);
        });
        it('clones only properties', () => {
            let toClone = {
                arrayProperty: ['Hello world', 5, null],
                functionProperty: function (): void {
                    return;
                }
            };
            let cloned = cloneAsLiteral(toClone);
            expect(cloned).to.not.equal(toClone);
            expect(cloned).to.not.deep.equal(toClone);
            expect(cloned.functionProperty).undefined;
        });
    });
    describe('coerceValue', () => {
        it('doesn\'t modify regular string', () => {
            expect(coerceValue('just a string')).equal('just a string');
        });
        it('doesn\'t parse NaN string to number', () => {
            expect(coerceValue('5.5tst')).not.equal(5.5);
        });
        it('parse number strings to numbers', () => {
            expect(coerceValue('5')).eql(5);
            expect(coerceValue('5.5')).eql(5.5);
            expect(coerceValue('0.5')).eql(0.5);
        });
        it('handles null and undefined', () => {
            expect(coerceValue(null)).null;
            expect(coerceValue(undefined)).undefined;
        });
        it('parse \'undefined\' to undefined', () => {
            expect(coerceValue('undefined')).eql(undefined);
        });
        it('parse \'null\' to null', () => {
            expect(coerceValue('null')).eql(null);
        });
        it('parse \'false\' to false', () => {
            expect(coerceValue('false')).eql(false);
        });
        it('parse \'true\' to true', () => {
            expect(coerceValue('true')).eql(true);
        });
        it('doesn\'t parse \'False\' as boolean', () => {
            expect(coerceValue('False')).not.eql(false);
        });
        it('doesn\'t parse \'True\' as boolean', () => {
            expect(coerceValue('True')).not.eql(true);
        });
        it('supports complex objects', () => {
            expect(coerceValue({
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
            expect(coerceValue(['true', 'false', 'null', 'undefined', '5', 'just a string']
            )).eql([true, false, null, undefined, 5, 'just a string']);
        });
        it('works only with own properties', () => {
            class ParentRequest {
                public parentProperty: string = 'just a string';
                public parentMethod(): void { return; }
            }
            class ChildRequest extends ParentRequest {
                public childProperty: string = 'just a string';
            }
            expect(coerceValue(new ChildRequest()).hasOwnProperty('parentMethod')).false;
        });
    });
});
