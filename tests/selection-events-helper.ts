import { expect } from 'chai';
import { SelectionEventsHelper, KeyCodes, MouseButtons } from '../src/selection-events-helper';
import { DefaultSelectionService } from '../src/default-selection-service';
import { SelectionAreaConfig } from '../src/contracts/selection-area-config';
import { SelectableItem } from '../src/contracts/selectable-item';
import * as sinon from 'sinon';

const notPressedShift = false;
const pressedShift = true;
const notPressedCtrl = false;
const pressedCtrl = true;

function toSelectionService(): DefaultSelectionService {
    let selectionService = new DefaultSelectionService();
    selectionService.itemsSource = [
        { selected: false, title: 'one' } as SelectableItem,
        { selected: false, title: 'two' } as SelectableItem,
        { selected: false, title: 'three' } as SelectableItem,
        { selected: false, title: 'four' } as SelectableItem,
        { selected: false, title: 'five' } as SelectableItem
    ];

    return selectionService;
}

function toDefaultSelectionHelper(): SelectionEventsHelper {
    return new SelectionEventsHelper({
        horizontal: false,
        multiple: true,
        selectionService: toSelectionService(),
        toggleOnly: false
    } as SelectionAreaConfig);
}

describe('SelectionEventsHelper', () => {
    describe('keyboard', () => {
        it('selects all items on exact Ctrl+A combination', () => {
            let helper = toDefaultSelectionHelper();
            let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectAll');
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

                helper.selectionConfig.selectionService.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectFirst');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects first item on Ctrl+ArrowUp combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectFirst');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to first item on Ctrl+Shift+ArrowUp combination', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.selectionService.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(helper.selectionConfig.selectionService.itemsSource.length - 1, 0)).true;

                selectAllSpy.reset();
                helper.selectionConfig.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 0)).true;
            });

            it('selects two items on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(2);
                helper.selectionConfig.selectionService.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 1)).true;
            });
            it('resets previous selections on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectAll();
                helper.selectionConfig.selectionService.deselectIndex(2);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1, 2]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(2);
                helper.selectionConfig.selectionService.selectIndex(3, true);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2, 3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(2);
            });
            it('moves to previous item on ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(3);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1]);
            });
            it('moves to previous item and save on Shift+ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(3);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3, 2, 1]);
            });
            it('don\'t do anything when first index selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectFirst();
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(0);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(0);
            });
        });

        describe('onNextKey', () => {
            it('selects first item on ArrowDown when nothings selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects last item on Ctrl+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectLast');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectFirst();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(0, helper.selectionConfig.selectionService.itemsSource.length - 1)).true;

                selectAllSpy.reset();
                helper.selectionConfig.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, helper.selectionConfig.selectionService.itemsSource.length - 1)).true;
            });

            it('selects two items on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(2);
                helper.selectionConfig.selectionService.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 3)).true;
            });
            it('resets previous selections on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectAll();
                helper.selectionConfig.selectionService.deselectIndex(2);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2, 3]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(3);
                helper.selectionConfig.selectionService.selectIndex(2, true);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(3);
            });
            it('moves to next item on ArrowDown when not last item selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(1);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
            });
            it('moves to next item and save on Shift+ArrowDown when not last item selected', () => {

                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectIndex(1);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1, 2, 3]);
            });
            it('don\'t do anything when last index selected', () => {
                let helper = toDefaultSelectionHelper();

                helper.selectionConfig.selectionService.selectLast();
                let lastIndex = helper.selectionConfig.selectionService.lastProcessedIndex;

                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastIndex]);
                expect(helper.selectionConfig.selectionService.lastProcessedIndex).eql(lastIndex);
            });
        });
        describe('allowMultipleSelection setted to false', () => {
            it('selects previous item on Ctrl?+Shift+ArrowUp combination and allowMultipleSelection setted to false', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.multiple = false;
                helper.selectionConfig.selectionService.selectLast();
                let lastItemIndex = helper.selectionConfig.selectionService.itemsSource.length - 1;
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastItemIndex - 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([lastItemIndex - 2]);
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.multiple = false;
                helper.selectionConfig.selectionService.selectFirst();
                let firstItemIndex = 0;

                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([firstItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([firstItemIndex + 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([firstItemIndex + 2]);
            });

            it('moves to previous item on Shift+ArrowUp when not first item selected', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.multiple = false;
                helper.selectionConfig.selectionService.selectIndex(3);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1]);
            });

            it('moves to next item on Shift+ArrowDown when not last item selected', () => {
                let helper = toDefaultSelectionHelper();
                helper.selectionConfig.multiple = false;
                helper.selectionConfig.selectionService.selectIndex(1);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3]);
            });
        });
    });
    describe('mouse', () => {
        it('selects item on click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);

            helper.selectionConfig.selectionService.deselectAll();
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);

            helper.selectionConfig.selectionService.deselectAll();
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('deselects already selected item on click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([]);
        });

        it('add item to seletions on ctrl+click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
        });
        it('removes item from seletions on ctrl+click selected item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('resets previous seletions on click item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([2]);
        });
        it('resets previous seletions on click already selected item', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
        });
        it('select range of items on shift+click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 1, 2, 3]);
        });
        it('prevents deselection of selected item on non-left button click', () => {
            let helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Right, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
        });

        it('saves selection on regular click when toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 1);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 1]);
        });
        it('doesn\'t reset previous seletions on click item with toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4, 2]);
        });

        it('doesn\'t reset previous seletions on click already selected item with toggleOnly=true', () => {
            let helper = toDefaultSelectionHelper();
            helper.selectionConfig.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionConfig.selectionService.getSelectedIndexes()).eql([3, 4]);
        });

    });
});
