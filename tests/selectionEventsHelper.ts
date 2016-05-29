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

function toDefaultSelectionConfig(): ISelectionConfig {
    return {
        allowMultipleSelection: true,
        selectionManager: toSelectionManager(),
        toggleOnly: false
    } as ISelectionConfig;
}

describe('SelectionEventsHelper', () => {
    describe('keyboard', () => {
        it('selects all items on exact Ctrl+A combination', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
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

        describe('onArrowUp', () => {
            it('selects first item on ArrowUp when nothings selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects first item on Ctrl+ArrowUp combination', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to first item on Ctrl+Shift+ArrowUp combination', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(config.selectionManager.itemsSource.length - 1, 0)).true;

                selectAllSpy.reset();
                config.selectionManager.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 0)).true;
            });

            it('selects two items on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(2);
                config.selectionManager.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 1)).true;
            });
            it('resets previous selections on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectAll();
                config.selectionManager.deselectIndex(2);
                expect(config.selectionManager.getSelectedIndexex()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([1, 2]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(2);
                config.selectionManager.selectIndex(3, true);
                expect(config.selectionManager.getSelectedIndexex()).eql([2, 3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([2]);
                expect(config.selectionManager.lastProcessedIndex).eql(2);
            });
            it('moves to previous item on ArrowUp when not first item selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(3);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([1]);
            });
            it('moves to previous item and save on Shift+ArrowUp when not first item selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(3);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([3, 2, 1]);
            });
            it('don\'t do anything when first index selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectFirst();
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([0]);
                expect(config.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([0]);
                expect(config.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([0]);
                expect(config.selectionManager.lastProcessedIndex).eql(0);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([0]);
                expect(config.selectionManager.lastProcessedIndex).eql(0);
            });
        });

        describe('onArrowDown', () => {
            it('selects first item on ArrowDown when nothings selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.deselectAll();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects last item on Ctrl+ArrowDown combination', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectLast();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectLast');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectFirst();

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(0, config.selectionManager.itemsSource.length - 1)).true;

                selectAllSpy.reset();
                config.selectionManager.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, config.selectionManager.itemsSource.length - 1)).true;
            });

            it('selects two items on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(2);
                config.selectionManager.deselectIndex(2);

                let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).true;
                expect(selectAllSpy.calledWith(2, 3)).true;
            });
            it('resets previous selections on Shift+ArrowDown combination when last operation is unselection of item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectAll();
                config.selectionManager.deselectIndex(2);
                expect(config.selectionManager.getSelectedIndexex()).eql([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([2, 3]);
            });
            it('deselects last selected item in range and sets last processed index to previous item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(3);
                config.selectionManager.selectIndex(2, true);
                expect(config.selectionManager.getSelectedIndexex()).eql([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
                expect(config.selectionManager.lastProcessedIndex).eql(3);
            });
            it('moves to next item on ArrowDown when not last item selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(1);
                expect(config.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
            });
            it('moves to next item and save on Shift+ArrowDown when not last item selected', () => {

                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(1);
                expect(config.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([1, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([1, 2, 3]);
            });
            it('don\'t do anything when last index selected', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectLast();
                let lastIndex = config.selectionManager.lastProcessedIndex;

                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(config.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(config.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(config.selectionManager.lastProcessedIndex).eql(lastIndex);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastIndex]);
                expect(config.selectionManager.lastProcessedIndex).eql(lastIndex);
            });
        });
        describe('allowMultipleSelection setted to false', () => {
            it('selects previous item on Ctrl?+Shift+ArrowUp combination and allowMultipleSelection setted to false', () => {
                let config = toDefaultSelectionConfig();
                config.allowMultipleSelection = false;
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectLast();
                let lastItemIndex = config.selectionManager.itemsSource.length - 1;
                expect(config.selectionManager.getSelectedIndexex()).eql([lastItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastItemIndex - 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([lastItemIndex - 2]);
            });

            it('selects up to last item on Ctrl+Shift+ArrowDown combination', () => {
                let config = toDefaultSelectionConfig();
                config.allowMultipleSelection = false;
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectFirst();
                let firstItemIndex = 0;

                expect(config.selectionManager.getSelectedIndexex()).eql([firstItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([firstItemIndex + 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([firstItemIndex + 2]);
            });

            it('moves to previous item on Shift+ArrowUp when not first item selected', () => {
                let config = toDefaultSelectionConfig();
                config.allowMultipleSelection = false;
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(3);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(config.selectionManager.getSelectedIndexex()).eql([1]);
            });

            it('moves to next item on Shift+ArrowDown when not last item selected', () => {
                let config = toDefaultSelectionConfig();
                config.allowMultipleSelection = false;
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(1);
                expect(config.selectionManager.getSelectedIndexex()).eql([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(config.selectionManager.getSelectedIndexex()).eql([3]);
            });
        });
    });
    describe('mouse', () => {
        it('selects item on click', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(config.selectionManager.getSelectedIndexex()).eql([0]);
        });
        it('deselects already selected item on click', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(config.selectionManager.getSelectedIndexex()).eql([]);
        });
        it('add item to seletions on ctrl+click', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(config.selectionManager.getSelectedIndexex()).eql([0]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(config.selectionManager.getSelectedIndexex()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(config.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
        });
        it('removes item from seletions on ctrl+click selected item', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(config.selectionManager.getSelectedIndexex()).eql([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(config.selectionManager.getSelectedIndexex()).eql([0]);
        });
        it('resets previous seletions on click item', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(config.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(config.selectionManager.getSelectedIndexex()).eql([2]);
        });
        it('resets previous seletions on click already selected item', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(config.selectionManager.getSelectedIndexex()).eql([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(config.selectionManager.getSelectedIndexex()).eql([0]);
        });
    });
});
