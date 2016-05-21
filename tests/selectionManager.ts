import { expect, assert } from 'chai';

import * as sinon from 'sinon';
import { ISelectable } from '../src/contracts/ISelectable';
import { SelectionManager } from '../src/selectionManager';

const savePrevious = true;
const doNotSavePrevious = false;

interface ISelectionableObject {
    items: IItem[];
    selectionManager: SelectionManager;
}

interface IItem extends ISelectable {
    name: string;
}
function toItem(name: string): IItem {
    return { name, selected: false };
}

function toItemWithHooks(name: string): IItem {
    return {
        name,
        onDeselected: sinon.spy(),
        onSelected: sinon.spy(),
        onSelectionChanged: sinon.spy(),
        selected: false
    };
}

function toTargetWithHooks(): ISelectionableObject {
    return {
        items: ['first', 'second'].map(toItemWithHooks),
        selectionManager: null
    };
}
function toTarget(): ISelectionableObject {
    return {
        items: ['first', 'second', 'third'].map(toItem),
        selectionManager: null
    };
}

function toEmptyTarget(): ISelectionableObject {
    return {
        items: [],
        selectionManager: null
    };
}

describe('SelectionManager', () => {
    describe('getSelections', () => {
        it('returns empty array if nothing is selected', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.getSelections()).eql([]);
        });

        it('returns selections array', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectFirst();
            expect(target.selectionManager.getSelections()).eql([{ name: 'first', selected: true }]);
        });
    });

    describe('selectFirst', () => {
        it('set first element selected', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectFirst();

            expect(target.selectionManager.getSelections()).eql([{ name: 'first', selected: true }]);
        });

        it(`doesn't affect previously selected items`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.items[2].selected = true;
            target.selectionManager.selectFirst();

            expect(target.selectionManager.getSelections()).eql([{ name: 'first', selected: true }]);

            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't throw on empty collection`, () => {
            const target = toEmptyTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            assert.doesNotThrow(function (): void {
                target.selectionManager.selectFirst();
            });
        });
    });

    describe('selectLast', () => {
        it('set last element selected', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectLast();

            expect(target.selectionManager.getSelections()).eql([{ name: 'third', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't affect previously selected items`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.items[0].selected = true;
            target.selectionManager.selectLast();

            expect(target.selectionManager.getSelections()).eql([{ name: 'third', selected: true }]);
            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it(`doesn't throw on empty collection`, () => {
            const target = toEmptyTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            assert.doesNotThrow(function (): void {
                target.selectionManager.selectLast();
            });
        });
    });

    describe('selectIndex', () => {
        it('set element at index selected', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectIndex(1, savePrevious);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it(`can save previously selected`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectFirst();
            target.selectionManager.selectIndex(1, savePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'first', selected: true }, { name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it(`can clear previously selected`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectFirst();
            target.selectionManager.selectIndex(1, doNotSavePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it(`ignores incorrect values`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectIndex(-20);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.selectIndex(null);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.selectIndex(150);
            expect(target.selectionManager.getSelections()).empty;
        });
    });

    describe('deselectIndex', () => {
        it('set element at index deselected', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectIndex(1, savePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.deselectIndex(1);
            expect(target.selectionManager.getSelections()).eql([]);
            expect(target.items[1].selected).eql(false);
        });
        it(`ignores incorrect values`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.deselectIndex(-20);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.deselectIndex(null);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.deselectIndex(150);
            expect(target.selectionManager.getSelections()).empty;
        });

    });

    describe('toggleSelection', () => {
        it('toggle element selection at index', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getSelections()).eql([]);
            expect(target.items[1].selected).eql(false);
        });

        it('toggle element selection at index, single item mode', () => {
            const target = toTarget();

            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, doNotSavePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(2, doNotSavePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'third', selected: true }]);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it('toggle element selection at index, multi item mode', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getSelections()).eql([{ name: 'second', selected: true }]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionManager.toggleSelection(2, savePrevious);
            expect(target.selectionManager.getSelections())
                .eql([
                    { name: 'second', selected: true },
                    { name: 'third', selected: true }
                ]);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(true);
        });

        it(`ignores incorrect values`, () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.toggleSelection(-20);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.toggleSelection(null);
            expect(target.selectionManager.getSelections()).empty;

            target.selectionManager.toggleSelection(150);
            expect(target.selectionManager.getSelections()).empty;
        });

    });

    describe('getMinSelectedIndex', () => {
        it('for single selected item', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getMinSelectedIndex()).eql(1);
        });

        it('for multiple selected item', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(0, savePrevious);
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getMinSelectedIndex()).eql(0);
        });

    });

    describe('getMaxSelectedIndex', () => {
        it('for single selected item', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getMaxSelectedIndex()).eql(1);
        });

        it('for multiple selected item', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(0, savePrevious);
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.getMaxSelectedIndex()).eql(1);
        });

    });

    describe('isIndexSelected', () => {
        it('return selection state for index in valid range', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.isIndexSelected(1)).eql(true);
        });

        it('return false for index in out of range', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.isIndexSelected(-1)).eql(false);
            expect(target.selectionManager.isIndexSelected(4)).eql(false);
        });
    });
    describe('getItemIndex', () => {
        it('return index for item in items source', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.getItemIndex(target.items[0])).eq(0);
            expect(target.selectionManager.getItemIndex(target.items[1])).eq(1);
            expect(target.selectionManager.getItemIndex(target.items[2])).eq(2);
        });

        it('return -1 for item that not from items source', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.getItemIndex(
                {
                    name: 'four',
                    selected: false
                } as ISelectable)).eq(-1);
        });
    });
    describe('itemsSource', () => {
        it('remove deleted item from selections on set', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectAll();
            expect(target.selectionManager.getSelections().length).eq(3);
            target.items.pop();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.getSelections().length).eq(2);
        });
        it('remove shifted items from selections on set', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectAll();
            target.items.unshift(target.items.pop());
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.getSelections().length).eq(0);
        });
    });

    describe('hasSelections', () => {
        it('return boolean', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            expect(target.selectionManager.hasSelections()).eql(false);
            target.selectionManager.toggleSelection(1, savePrevious);
            expect(target.selectionManager.hasSelections()).eql(true);
        });
    });

    describe('selectRange', () => {
        it('ignore invalid indexes', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectRange(-1, 5);

            expect(target.selectionManager.getSelections())
                .eql([]);
        });

        it('select all items in range', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectRange(0, 1);

            expect(target.selectionManager.getSelections())
                .eql([
                    { name: 'first', selected: true },
                    { name: 'second', selected: true }
                ]);
        });

        it('doesn`t preserve previous selections', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.toggleSelection(2, savePrevious);

            target.selectionManager.selectRange(0, 1);

            expect(target.selectionManager.getSelections())
                .eql([
                    { name: 'first', selected: true },
                    { name: 'second', selected: true }
                ]);
        });
    });
    describe('selection hooks', () => {
        it('onSelected hook called if defined', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectIndex(0);
            let processed = target.items[0] as ISelectable;
            let untouched = target.items[1] as ISelectable;

            expect((<any>processed.onSelected).calledOnce).true;
            expect((<any>untouched.onSelected).notCalled).true;
        });
        it('onDeselected hook called if defined', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectIndex(0);
            target.selectionManager.deselectIndex(0);
            let processed = target.items[0] as ISelectable;
            let untouched = target.items[1] as ISelectable;

            expect((<any>processed.onDeselected).calledOnce).true;
            expect((<any>untouched.onDeselected).notCalled).true;
        });

        it('onSelectionChanged hook called on every manipulation if defined', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectIndex(0);
            target.selectionManager.deselectIndex(0);
            let processed = target.items[0] as ISelectable;
            let untouched = target.items[1] as ISelectable;

            expect((<any>processed.onSelectionChanged).calledTwice).true;
            expect((<any>untouched.onSelectionChanged).notCalled).true;
        });
        it('onDeselected hook not called when deselect item that not selected', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.deselectIndex(0);
            let processed = target.items[0] as ISelectable;
            let untouched = target.items[1] as ISelectable;

            expect((<any>processed.onDeselected).notCalled).true;
            expect((<any>untouched.onDeselected).notCalled).true;
        });

        it('onSelectionChanged hook not called when deselect item that not selected', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.deselectIndex(0);
            let processed = target.items[0] as ISelectable;
            let untouched = target.items[1] as ISelectable;

            expect((<any>processed.onSelectionChanged).notCalled).true;
            expect((<any>untouched.onSelectionChanged).notCalled).true;
        });
    });
    describe('dispose', () => {
        it('clears selections list and last processed index', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.selectAll();
            expect(target.selectionManager.getSelections().length).equal(3);
            target.selectionManager.dispose();
            expect(target.selectionManager.getSelections().length).equal(0);
            expect(target.selectionManager.lastProcessedIndex).null;
        });
        it('removes items source', () => {
            const target = toTarget();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.dispose();
            expect(target.selectionManager.itemsSource).undefined;
        });

        it('but keep initial collection untouched', () => {
            const target = toTarget();
            const tempItems = target.items.slice();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;
            target.selectionManager.dispose();
            expect(target.items).eql(tempItems);
        });
        it('doesn\'t call onDeselected hook', () => {
            const target = toTargetWithHooks();
            target.selectionManager = new SelectionManager();
            target.selectionManager.itemsSource = target.items;

            target.selectionManager.selectAll();
            expect(target.items.map(i => (<any>i.onDeselected).notCalled).reduce((p, c) => p && c, true)).true;
        });
    });
});
