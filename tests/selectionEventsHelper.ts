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
                helper.keyboardHandler(notPressedShift, false, KeyCodes.ArrowUp);
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
            it('and resets previous selections on Shift+ArrowUp combination when last operation is unselection of item', () => {
                let config = toDefaultSelectionConfig();
                let helper = new SelectionEventsHelper(config);

                config.selectionManager.selectIndex(2);
                config.selectionManager.deselectIndex(2);

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
        });
    });
});
