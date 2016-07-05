import { expect } from 'chai';
import { KeyCodes } from '../src/common/keyCodes';
import { MouseButtons } from '../src/common/mouseButtons';
import { SelectionEventsHelper } from '../src/selectionEventsHelper';
import { SelectionManager } from '../src/selectionManager';
import { ISelectionConfig } from '../src/contracts/ISelectionConfig';
import { ISelectable } from '../src/contracts/ISelectable';
import * as sinon from 'sinon';

const notPressedShift = false;
const pressedShift = true;
const notPressedCtrl = false;
const pressedCtrl = true;

function toSelectionManager(): SelectionManager {
    let selectionManager = new SelectionManager();
    selectionManager.itemsSource = [
        { selected: false, title: 'one' } as ISelectable,
        { selected: false, title: 'two' } as ISelectable,
        { selected: false, title: 'three' } as ISelectable,
        { selected: false, title: 'four' } as ISelectable,
        { selected: false, title: 'five' } as ISelectable
    ];

    return selectionManager;
}

function toDefaultSelectionHelper(): SelectionEventsHelper {
    return new SelectionEventsHelper({
        allowMultipleSelection: true,
        horizontal: false,
        selectionManager: toSelectionManager(),
        toggleOnly: false
    } as ISelectionConfig);
}

describe('SelectionEventsHelper', () => {
    describe('keyboard', () => {
        it('selects all items on exact Ctrl+A combination', () => {
            let helper = toDefaultSelectionHelper();
            let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectAll');
            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.Enter);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.A);
            expect(selectAllSpy.calledOnce).true;
        });

        describe('horizontal behaviour', () => {
            it('calls onPreviousKey for ArrowUp or horizontal and ArrowLeft', () => {
                let helper = toDefaultSelectionHelper();
                let onPreviousKeySpy = sinon.spy(helper, 'onPreviousKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.called).true;

                onPreviousKeySpy.reset();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.notCalled).true;

                helper.selectionConfig.horizontal = true;
                onPreviousKeySpy.reset();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.notCalled).true;
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.called).true;
            });
            it('calls onNextKey for ArrowDown or horizontal and ArrowRight', () => {
                let helper = toDefaultSelectionHelper();
                let onNextKeySpy = sinon.spy(helper, 'onNextKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.called).true;

                onNextKeySpy.reset();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.notCalled).true;

                helper.selectionConfig.horizontal = true;
                onNextKeySpy.reset();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.notCalled).true;
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.called).true;
            });
        });
        describe('onPreviousKey', () => {
            it('selects first item on previous key when nothing\'s selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects first item on Ctrl+ArrowUp combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to first item on Ctrl+Shift+ArrowUp combination', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(helper.selectionConfig.selectionManager.itemsSource.length - 1, 0)).true;

                selectAllSpy.reset();
                helper.selectionConfig.selectionManager.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 0)).true;
            });

            it('selects two items on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(2);
                helper.selectionConfig.selectionManager.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 1)).true;
            });
            it('resets previous selections on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectAll();
                helper.selectionConfig.selectionManager.deselectIndex(2);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1, 2]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(2);
                helper.selectionConfig.selectionManager.selectIndex(3, true);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2, 3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(2);
            });
            it('moves to previous item on ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(3);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1]);
            });
            it('moves to previous item and save on Shift+ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(3);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3, 2, 1]);
            });
            it('don\'t do anything when first index selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectFirst();
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(0);
            });
        });

        describe('onNextKey', () => {
            it('selects first item on ArrowDown when nothings selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects last item on Ctrl+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectLast');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectFirst();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(0, helper.selectionConfig.selectionManager.itemsSource.length - 1)).true;

                selectAllSpy.reset();
                helper.selectionConfig.selectionManager.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, helper.selectionConfig.selectionManager.itemsSource.length - 1)).true;
            });

            it('selects two items on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(2);
                helper.selectionConfig.selectionManager.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 3)).true;
            });
            it('resets previous selections on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectAll();
                helper.selectionConfig.selectionManager.deselectIndex(2);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2, 3]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(3);
                helper.selectionConfig.selectionManager.selectIndex(2, true);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(3);
            });
            it('moves to next item on ArrowDown when not last item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(1);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
            });
            it('moves to next item and save on Shift+ArrowDown when not last item selected', () => {

                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectIndex(1);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1, 2, 3]);
            });
            it('don\'t do anything when last index selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionManager.selectLast();
                let lastIndex = helper.selectionConfig.selectionManager.lastProcessedIndex;

                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionManager.lastProcessedIndex).eql(lastIndex);
            });
        });
        describe('allowMultipleSelection setted to false', () => {
            it('selects previous item on Ctrl?+Shift+ArrowUp combination and allowMultipleSelection setted to false', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.allowMultipleSelection = false;
                helper.selectionConfig.selectionManager.selectLast();
                let lastItemIndex = helper.selectionConfig.selectionManager.itemsSource.length - 1;
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastItemIndex - 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([lastItemIndex - 2]);
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.allowMultipleSelection = false;
                helper.selectionConfig.selectionManager.selectFirst();
                let firstItemIndex = 0;

                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([firstItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([firstItemIndex + 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([firstItemIndex + 2]);
            });

            it('moves to previous item on Shift+ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.allowMultipleSelection = false;
                helper.selectionConfig.selectionManager.selectIndex(3);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1]);
            });

            it('moves to next item on Shift+ArrowDown when not last item selected', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.allowMultipleSelection = false;
                helper.selectionConfig.selectionManager.selectIndex(1);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3]);
            });
        });
    });
    describe('mouse', () => {
        it('selects item on click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);

            helper.selectionConfig.selectionManager.deselectAll();
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);

            helper.selectionConfig.selectionManager.deselectAll();
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
        });
        it('deselects already selected item on click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([]);
        });

        it('add item to seletions on ctrl+click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
        });
        it('removes item from seletions on ctrl+click selected item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
        });
        it('resets previous seletions on click item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([2]);
        });
        it('resets previous seletions on click already selected item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
        });
        it('select range of items on shift+click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 1, 2, 3]);
        });
        it('prevents deselection of selected item on non-left button click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Right, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
        });

        it('saves selection on regular click when toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 1);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 1]);
        });
        it('doesn\'t reset previous seletions on click item with toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4, 2]);
        });

        it('doesn\'t reset previous seletions on click already selected item with toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionManager.getSelectedIndexex()).eql([3, 4]);
        });

    });
});
