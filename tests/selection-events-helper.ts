// tslint:disable no-unused-expression max-file-line-count
import { DefaultSelectionService, KeyCodes, MouseButtons, SelectionEventsHelper } from '../index';

import { expect } from 'chai';
import * as sinon from 'sinon';

const notPressedShift = false;
const pressedShift = true;
const notPressedCtrl = false;
const pressedCtrl = true;

function toSelectionService(): DefaultSelectionService {
    const selectionService = new DefaultSelectionService();
    selectionService.items = [
        { selected: false, title: 'one' },
        { selected: false, title: 'two' },
        { selected: false, title: 'three' },
        { selected: false, title: 'four' },
        { selected: false, title: 'five' }
    ];

    return selectionService;
}

function toDefaultSelectionHelper(): SelectionEventsHelper {
    const helper = new SelectionEventsHelper(toSelectionService());
    helper.horizontal = false;
    helper.multiple = true;
    helper.toggleOnly = false;
    return helper;
}

describe('SelectionEventsHelper', () => {
    describe('keyboard', () => {
        it('calls trySelectNextItem for Tab key', () => {
            const helper = toDefaultSelectionHelper();
            const trySelectNextItemSpy = sinon.spy(helper as any, 'trySelectNextItem');
            helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.Tab);
            expect(trySelectNextItemSpy.calledOnce).true;
        });
        it('calls trySelectPreviousItem for Shift+Tab key', () => {
            const helper = toDefaultSelectionHelper();
            const trySelectPreviousItemSpy = sinon.spy(helper as any, 'trySelectPreviousItem');
            helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.Tab);
            expect(trySelectPreviousItemSpy.calledOnce).true;
        });
        it('skips handling of Ctrl+Tab key', () => {
            const helper = toDefaultSelectionHelper();
            let handled = helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.Tab);
            expect(handled).false;
            handled = helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.Tab);
            expect(handled).false;
        });
        it('selects all items on exact Ctrl+A combination', () => {
            const helper = toDefaultSelectionHelper();
            const selectAllSpy = sinon.spy(helper.selectionService, 'selectAll');
            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.Enter);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.A);
            expect(selectAllSpy.calledOnce).true;
        });
        it("Doesn't handle Ctrl+A combination if multiple is false", () => {
            const helper = toDefaultSelectionHelper();
            helper.multiple = false;
            const trySelectAllSpy = sinon.spy(helper as any, 'trySelectAll');
            helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.A);
            expect(trySelectAllSpy.calledOnce).true;
            expect(trySelectAllSpy.returnValues[0]).false;
            expect(helper.selectionService.getSelectedIndexes()).empty;
        });

        describe('horizontal behavior', () => {
            it('calls onPreviousKey for ArrowUp or horizontal and ArrowLeft', () => {
                const helper = toDefaultSelectionHelper();
                const onPreviousKeySpy = sinon.spy(helper as any, 'onPreviousKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.called).true;

                onPreviousKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.notCalled).true;

                helper.horizontal = true;
                onPreviousKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.notCalled).true;
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.called).true;
            });
            it('calls onNextKey for ArrowDown or horizontal and ArrowRight', () => {
                const helper = toDefaultSelectionHelper();
                const onNextKeySpy = sinon.spy(helper as any, 'onNextKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.called).true;

                onNextKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.notCalled).true;

                helper.horizontal = true;
                onNextKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.notCalled).true;
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.called).true;
            });
        });
        describe('onPreviousKey', () => {
            it("selects first item on previous key when nothing's selected", () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.deselectAll();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects first item on Ctrl+ArrowUp combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to first item on Ctrl+Shift+ArrowUp combination', () => {
                const helper = toDefaultSelectionHelper();
                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(helper.selectionService.items.length - 1, 0)).true;

                selectAllSpy.resetHistory();
                helper.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 0)).true;
            });

            it('selects two items on Shift+ArrowUp combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.deselectIndex(2);

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 1)).true;
            });
            it('resets previous selections on Shift+ArrowUp combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectAll();
                helper.selectionService.deselectIndex(2);
                expect(helper.selectionService.getSelectedIndexes()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([1, 2]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.selectIndex(3, true);
                expect(helper.selectionService.getSelectedIndexes()).eql([2, 3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([2]);
                expect(helper.selectionService.lastProcessedIndex).eql(2);
            });
            it('moves to previous item on ArrowUp when not first item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([1]);
            });
            it('moves to previous item and save on Shift+ArrowUp when not first item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([3, 2, 1]);
            });
            it("don't do anything when first index selected", () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectFirst();
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionService.lastProcessedIndex).eql(0);
            });
        });

        describe('onNextKey', () => {
            it('selects first item on ArrowDown when nothings selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.deselectAll();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects last item on Ctrl+ArrowDown combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectLast');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectFirst();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(0, helper.selectionService.items.length - 1)).true;

                selectAllSpy.resetHistory();
                helper.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, helper.selectionService.items.length - 1)).true;
            });

            it('selects two items on Shift+ArrowDown combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.deselectIndex(2);

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 3)).true;
            });
            it('resets previous selections on Shift+ArrowDown combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectAll();
                helper.selectionService.deselectIndex(2);
                expect(helper.selectionService.getSelectedIndexes()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([2, 3]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                helper.selectionService.selectIndex(2, true);
                expect(helper.selectionService.getSelectedIndexes()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
                expect(helper.selectionService.lastProcessedIndex).eql(3);
            });
            it('moves to next item on ArrowDown when not last item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
            });
            it('moves to next item and save on Shift+ArrowDown when not last item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([1, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([1, 2, 3]);
            });
            it("don't do anything when last index selected", () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();
                const lastIndex = helper.selectionService.lastProcessedIndex;

                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).eql(lastIndex);
            });
        });
        describe('allowMultipleSelection setted to false', () => {
            it('selects previous item on Ctrl?+Shift+ArrowUp combination and allowMultipleSelection setted to false', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectLast();
                const lastItemIndex = helper.selectionService.items.length - 1;
                expect(helper.selectionService.getSelectedIndexes()).eql([lastItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastItemIndex - 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([lastItemIndex - 2]);
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectFirst();
                const firstItemIndex = 0;

                expect(helper.selectionService.getSelectedIndexes()).eql([firstItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([firstItemIndex + 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([firstItemIndex + 2]);
            });

            it('moves to previous item on Shift+ArrowUp when not first item selected', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).eql([1]);
            });

            it('moves to next item on Shift+ArrowDown when not last item selected', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).eql([3]);
            });
        });
    });
    describe('mouse', () => {
        it('selects item on click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);

            helper.selectionService.deselectAll();
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);

            helper.selectionService.deselectAll();
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('deselects already selected item on click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([]);
        });

        it('add item to seletions on ctrl+click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
        });
        it('removes item from seletions on ctrl+click selected item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('resets previous seletions on click item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionService.getSelectedIndexes()).eql([2]);
        });
        it('resets previous seletions on click already selected item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('select range of items on shift+click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 1, 2, 3]);
        });
        it('prevents deselection of selected item on non-left button click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Right, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
        });

        it('saves selection on regular click when toggleOnly=true', () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 1);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 1]);
        });
        it("doesn't reset previous seletions on click item with toggleOnly=true", () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4, 2]);
        });

        it("doesn't reset previous seletions on click already selected item with toggleOnly=true", () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).eql([3, 4]);
        });
    });
});
