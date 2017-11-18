// tslint:disable:no-unused-expression max-file-line-count
import { DefaultSelectionService } from '../index';

import { assert, expect } from 'chai';
import * as sinon from 'sinon';

const savePrevious = true;
const doNotSavePrevious = false;

interface SelectionableObject {
    items: Item[];
    selectionService: DefaultSelectionService;
}

interface Item {
    name: string;
    selected: boolean;
}
function toItem(name: string): Item {
    return { name, selected: false };
}

function toTarget(): SelectionableObject {
    return {
        items: ['first', 'second', 'third', 'fourth', 'fifth'].map(toItem),
        selectionService: null
    };
}

function toEmptyTarget(): SelectionableObject {
    return {
        items: [],
        selectionService: null
    };
}

describe('SelectionService', () => {
    describe("can work without 'selected' property", () => {
        it('returns empty array if nothing is selected', () => {
            const items = [1, 2, 3, 4, 5];
            const selectionService = new DefaultSelectionService();
            selectionService.items = items;
            expect(selectionService.getSelectedElements()).eql([]);
            selectionService.selectAll();
            expect(selectionService.getSelectedElements()).eql([1, 2, 3, 4, 5]);
        });
    });
    describe('getSelectedElements', () => {
        it('returns empty array if nothing is selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.getSelectedElements()).eql([]);
        });

        it('returns selections array', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectFirst();
            expect(target.selectionService.getSelectedElements()).eql([target.items[0]]);
        });
    });

    describe('selectFirst', () => {
        it('set first element selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectFirst();

            expect(target.selectionService.getSelectedElements()).eql([target.items[0]]);
        });

        it("doesn't affect previously selected items", () => {
            const target = toTarget();
            const firstSelectionIndex = 2;
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.items[firstSelectionIndex].selected = true;
            target.selectionService.selectFirst();

            expect(target.selectionService.getSelectedElements()).eql([target.items[0]]);
            expect(
                target.items.every(
                    (item: Item, index: number) => !item.selected || index === firstSelectionIndex || index === 0
                )
            ).eql(true);
        });

        it("doesn't throw on empty collection", () => {
            const target = toEmptyTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            assert.doesNotThrow(() => {
                target.selectionService.selectFirst();
            });
        });
    });

    describe('selectLast', () => {
        it('set last element selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectLast();
            expect(target.selectionService.getSelectedElements()).eql([target.items[target.items.length - 1]]);
            expect(
                target.items.every(
                    (item: Item, index: number, array: Item[]) => !item.selected || index === array.length - 1
                )
            ).eql(true);
        });

        it("doesn't affect previously selected items", () => {
            const target = toTarget();
            const firstSelectionIndex = 0;
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.items[firstSelectionIndex].selected = true;
            target.selectionService.selectLast();

            expect(target.selectionService.getSelectedElements()).eql([target.items[target.items.length - 1]]);
            expect(
                target.items.every(
                    (item: Item, index: number, array: Item[]) =>
                        !item.selected || index === firstSelectionIndex || index === array.length - 1
                )
            ).eql(true);
        });

        it("doesn't throw on empty collection", () => {
            const target = toEmptyTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            assert.doesNotThrow(() => {
                target.selectionService.selectLast();
            });
        });
    });

    describe('selectIndex', () => {
        it('set element at index selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectIndex(1, savePrevious);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it('handles duplicate selection', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectIndex(1, savePrevious);
            target.selectionService.selectIndex(1, savePrevious);
            expect(target.selectionService.getSelectedIndexes()).eql([1]);
        });

        it('can save previously selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectFirst();
            target.selectionService.selectIndex(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[0], target.items[1]]);

            expect(target.items[0].selected).eql(true);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it('can clear previously selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectFirst();
            target.selectionService.selectIndex(1, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.selectIndex(-20);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.selectIndex(null);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.selectIndex(150);
            expect(target.selectionService.getSelectedElements()).empty;
        });
    });

    describe('deselectIndex', () => {
        it('set element at index deselected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectIndex(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionService.deselectIndex(1);
            expect(target.selectionService.getSelectedElements()).eql([]);
            expect(target.items[1].selected).eql(false);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.deselectIndex(-20);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.deselectIndex(null);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.deselectIndex(150);
            expect(target.selectionService.getSelectedElements()).empty;
        });
        it("normally handles deselection of itam that wasn't selected", () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.deselectAll();
            target.selectionService.deselectIndex(1);
            expect(target.selectionService.getSelectedElements()).empty;
        });
    });

    describe('toggleSelection', () => {
        it('toggle element selection at index', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([]);
            expect(target.items[1].selected).eql(false);
        });
        it('toggle element selection only at index when multiple items selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(2, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1], target.items[2]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(true);

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[2]]);
            expect(target.items[1].selected).eql(false);
        });

        it('toggle element selection at index, single item mode', () => {
            const target = toTarget();

            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionService.toggleSelection(2, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[2]]);
            expect(target.items[1].selected).eql(false);
            expect(target.items[2].selected).eql(true);
        });

        it('toggle element selection at index, multi item mode', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1]]);

            expect(target.items[0].selected).eql(false);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(false);

            target.selectionService.toggleSelection(2, savePrevious);
            expect(target.selectionService.getSelectedElements()).eql([target.items[1], target.items[2]]);
            expect(target.items[1].selected).eql(true);
            expect(target.items[2].selected).eql(true);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.toggleSelection(-20);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.toggleSelection(null);
            expect(target.selectionService.getSelectedElements()).empty;

            target.selectionService.toggleSelection(150);
            expect(target.selectionService.getSelectedElements()).empty;
        });
    });

    describe('getMinSelectedIndex', () => {
        it('works when single item  selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getMinSelectedIndex()).eql(1);
        });

        it('works when multiple items selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(0, savePrevious);
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getMinSelectedIndex()).eql(0);
        });
        it('works when selection order reversed', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(0, savePrevious);
            expect(target.selectionService.getMinSelectedIndex()).eql(0);
        });
        it('works when nothing selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.getMinSelectedIndex()).eql(-1);
        });
    });

    describe('getMaxSelectedIndex', () => {
        it('works when single item selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getMaxSelectedIndex()).eql(1);
        });

        it('works when multiple items selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(0, savePrevious);
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getMaxSelectedIndex()).eql(1);
        });

        it('works when selection order reversed', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(0, savePrevious);
            expect(target.selectionService.getMaxSelectedIndex()).eql(1);
        });
        it('works when nothing selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.getMaxSelectedIndex()).eql(-1);
        });
    });

    describe('isIndexSelected', () => {
        it('return selection state for index in valid range', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.isIndexSelected(1)).eql(true);
        });

        it('return false for index in out of range', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.isIndexSelected(-1)).eql(false);
            expect(target.selectionService.isIndexSelected(4)).eql(false);
        });
    });
    describe('getItemIndex', () => {
        it('return index for item in items source', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.getItemIndex(target.items[0])).eq(0);
            expect(target.selectionService.getItemIndex(target.items[1])).eq(1);
            expect(target.selectionService.getItemIndex(target.items[2])).eq(2);
        });

        it('return -1 for item that not from items source', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(
                target.selectionService.getItemIndex({
                    name: 'cadabra',
                    selected: false
                })
            ).eq(-1);
        });
    });
    describe('checkSelection', () => {
        it('clear selection when pass null as source', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).eq(target.items.length);
            target.items.pop();
            target.selectionService.items = null;
            target.selectionService.checkSelection();

            expect(target.selectionService.getSelectedElements().length).eq(0);
        });
        it('remove deleted item from selections on set', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).eq(target.items.length);
            target.items.pop();
            target.selectionService.items = target.items;
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).eq(target.items.length);
        });
        it('remove shifted items from selections on set', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            target.items.unshift(target.items.pop());
            target.selectionService.items = target.items;
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).eq(0);
        });
        it('use referential equals as trackBy function by default', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            target.selectionService.items = target.items.map((item: Item) => ({ name: item.name } as Item));
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).eq(0);
        });
        it('use referential equals if trackBy is undefined', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.trackByFn = undefined;
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            target.selectionService.items = target.items.map((item: Item) => ({ name: item.name } as Item));
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).eq(0);
        });
        it('can use custom trackBy function', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.trackByFn = (index: number, item: any) => item.name;
            target.selectionService.selectAll();
            target.selectionService.items = target.items.map(
                (item: Item) => ({ name: item.name, selected: false } as Item)
            );
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).eq(5);
        });
    });

    describe('hasSelections', () => {
        it('return boolean', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.hasSelections()).eql(false);
            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.hasSelections()).eql(true);
        });
    });

    describe('selectRange', () => {
        it('ignore invalid indexes', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.selectRange(-1, 5);

            expect(target.selectionService.getSelectedElements()).eql([]);
        });

        it('select all items in range', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;

            target.selectionService.selectRange(0, 1);

            expect(target.selectionService.getSelectedElements()).eql([target.items[0], target.items[1]]);
        });

        it("doesn't preserve previous selections", () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.toggleSelection(2, savePrevious);
            target.selectionService.selectRange(0, 1);
            expect(target.selectionService.getSelectedElements()).eql([target.items[0], target.items[1]]);
        });

        it('checks that range already selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            const spy = sinon.spy(target.selectionService, 'isRangeSelected');
            target.selectionService.selectRange(0, 1);
            target.selectionService.selectRange(0, 1);
            expect(spy.calledTwice).eq(true);
            expect(spy.returnValues[0]).eq(false);
            expect(spy.returnValues[1]).eq(true);
            spy.restore();
        });
    });
    describe('isRangeSelected', () => {
        it('returns false if nothing selected at all', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            expect(target.selectionService.isRangeSelected(0, 1)).eq(false);
        });
        it('returns true if all items selected', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            expect(target.selectionService.isRangeSelected(0, target.items.length - 1)).eq(true);
        });
        it('handles by element checks', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectRange(1, 3);
            expect(target.selectionService.isRangeSelected(1, 3)).eq(true);
            expect(target.selectionService.isRangeSelected(0, 2)).eq(false);
        });
    });

    describe('destroy', () => {
        it('clears selections list and last processed index', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).equal(target.items.length);
            target.selectionService.destroy();
            expect(target.selectionService.getSelectedElements().length).equal(0);
            expect(target.selectionService.lastProcessedIndex).null;
        });
        it('removes items source', () => {
            const target = toTarget();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.destroy();
            expect(target.selectionService.items).null;
        });

        it('but keep initial collection untouched', () => {
            const target = toTarget();
            const tempItems = target.items.slice();
            target.selectionService = new DefaultSelectionService();
            target.selectionService.items = target.items;
            target.selectionService.destroy();
            expect(target.items).eql(tempItems);
        });
    });
});
