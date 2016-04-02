import { expect, assert } from 'chai';

import { ISelectable } from '../src/contracts/ISelectable';
import { IObjectWithSelection } from '../src/contracts/IObjectWithSelection';

import { SelectionManager } from '../src/selectionManager';

const savePrevious = true;
const doNotSavePrevious = false;

const recursive = true;
const nonRecursive = false;

interface IComponent extends IObjectWithSelection {
    items: IItem[];
}

interface IItem extends ISelectable {
    name: string;
}
function toItem(name: string): IItem {
    return {name, selected: false};
}

function toTarget(): IComponent {
    return {
        items: ['first', 'second', 'third'].map(toItem),
        selectionManager: null
    };
}

function toEmptyTarget(): IComponent {
    return {
        items: [],
        selectionManager: null
    };
}

describe('SelectionManager', () => {
    it('injects in target object', () => {
        const target = toTarget();
        SelectionManager.includeIn(target, 'items');
        assert.isDefined(target.selectionManager);
        assert.isNotNull(target.selectionManager);
    });

    describe('getSelections', () => {
        it('returns empty array if nothing is selected', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            expect(target.selectionManager.getSelections(false)).eql([]);
        });

        it('returns selections array', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectFirst();
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'first', selected: true } ]);
        });
    });

    describe('selectFirst', () => {
        it('set first element selected', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectFirst();

            expect(target.selectionManager.getSelections(false)).eql([ { name: 'first', selected: true } ]);
        });

        it(`doesn't affect previously selected items`, () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.items[2].selected = true;
            target.selectionManager.selectFirst();

            expect(target.selectionManager.getSelections(false)).eql([ { name: 'first', selected: true } ]);

            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't throw on empty collection`, () => {
            const target = toEmptyTarget();
            SelectionManager.includeIn(target, 'items');
            assert.doesNotThrow(function (): void {
                target.selectionManager.selectFirst();
            });
        });
    });

    describe('selectLast', () => {
        it('set last element selected', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectLast();

            expect(target.selectionManager.getSelections(false)).eql([ { name: 'third', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't affect previously selected items`, () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.items[0].selected = true;
            target.selectionManager.selectLast();

            expect(target.selectionManager.getSelections(false)).eql([ { name: 'third', selected: true } ]);
            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't throw on empty collection`, () => {
            const target = toEmptyTarget();
            SelectionManager.includeIn(target, 'items');
            assert.doesNotThrow(function (): void {
                target.selectionManager.selectLast();
            });
        });
    });

    describe('selectIndex', () => {
        it('set element at index selected', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectIndex(1, savePrevious, nonRecursive);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it(`can save previously selected`, () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectFirst();
            target.selectionManager.selectIndex(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'first', selected: true }, { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it(`can clear previously selected`, () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectFirst();
            target.selectionManager.selectIndex(1, doNotSavePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });
    });

    describe('deselectIndex', () => {
        it('set element at index deselected', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.selectIndex(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.deselectIndex(1, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([]);
            expect(target.items[1].selected).eql(false);
        });

    });

    describe('toggleSelection', () => {
        it('toggle element selection at index', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([]);
            expect(target.items[1].selected).eql(false);
        });

        it('toggle element selection at index, single item mode', () => {
            const target = toTarget();

            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, doNotSavePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(2, doNotSavePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'third', selected: true } ]);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it('toggle element selection at index, multi item mode', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false)).eql([ { name: 'second', selected: true } ]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(2, savePrevious, nonRecursive);
            expect(target.selectionManager.getSelections(false))
                .eql([
                    { name: 'second', selected: true },
                    { name: 'third', selected: true }
                ]);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(true);
        });

    });

    describe('getMinSelectedIndex', () => {
        it('for single selected item', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getMinSelectedIndex()).eql(1);
        });

        it('for multiple selected item', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(0, savePrevious, nonRecursive);
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getMinSelectedIndex()).eql(0);
        });

    });

    describe('getMaxSelectedIndex', () => {
        it('for single selected item', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getMaxSelectedIndex()).eql(1);
        });

        it('for multiple selected item', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(0, savePrevious, nonRecursive);
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.getMaxSelectedIndex()).eql(1);
        });

    });

    describe('isIndexSelected', () => {
        it('return selection state for index in valid range', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.isIndexSelected(1)).eql(true);
        });

        it('return false for index in out of range', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            expect(target.selectionManager.isIndexSelected(-1)).eql(false);
            expect(target.selectionManager.isIndexSelected(4)).eql(false);
        });
    });

    describe('hasSelections', () => {
        it('return boolean', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');
            expect(target.selectionManager.hasSelections()).eql(false);
            target.selectionManager.toggleSelection(1, savePrevious, nonRecursive);
            expect(target.selectionManager.hasSelections()).eql(true);
        });
    });

    describe('selectRange', () => {
        it('ignore invalid indexes', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');

            target.selectionManager.selectRange(-1, 5, nonRecursive);

            expect(target.selectionManager.getSelections(false))
                .eql([]);
        });

        it('select all items in range', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');

            target.selectionManager.selectRange(0, 1, nonRecursive);

            expect(target.selectionManager.getSelections(false))
                .eql([
                    { name: 'first', selected: true },
                    { name: 'second', selected: true }
                ]);
        });

        it('doesn`t preserve previous selections', () => {
            const target = toTarget();
            SelectionManager.includeIn(target, 'items');

            target.selectionManager.toggleSelection(2, savePrevious, nonRecursive);

            target.selectionManager.selectRange(0, 1,  recursive);

            expect(target.selectionManager.getSelections(false))
                .eql([
                    { name: 'first', selected: true },
                    { name: 'second', selected: true }
                ]);
        });
    });
});
