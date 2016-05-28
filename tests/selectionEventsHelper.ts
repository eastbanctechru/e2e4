import { expect } from 'chai';
import { KeyCodes } from '../src/common/keyCodes';
import { MouseButtons } from '../src/common/mouseButtons';
import { SelectionEventsHelper } from '../src/selectionEventsHelper';
import { SelectionManager } from '../src/selectionManager';
import { ISelectionConfig } from '../src/contracts/ISelectionConfig';
import { ISelectable } from '../src/contracts/ISelectable';
import * as sinon from 'sinon';

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
        it('selects all on exact Ctrl+A combination', () => {
            let config = toDefaultSelectionConfig();
            let helper = new SelectionEventsHelper(config);
            let selectAllSpy = sinon.spy(helper.selectionConfig.selectionManager, 'selectAll');
            helper.keyboardHandler(true, true, KeyCodes.Enter);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(true, true, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(false, true, KeyCodes.A);
            expect(selectAllSpy.notCalled).true;

            helper.keyboardHandler(true, false, KeyCodes.A);
            expect(selectAllSpy.calledOnce).true;
        });
    });
});
