import { ISelectionManager } from './contracts/ISelectionManager';
import { ISelectableItemClickedEventArgs } from './contracts/ISelectableItemClickedEventArgs';
export declare class SelectionEventsHelper {
    selectionManager: ISelectionManager;
    constructor(selectionManager: ISelectionManager);
    trySelectAll(evt: KeyboardEvent): void;
    onArrowUp(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    onArrowDown(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    keyDownHandler(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    onMouseUp(eventArgs: ISelectableItemClickedEventArgs, toggleOnly: boolean, allowMultipleSelection: boolean): void;
    clearWindowSelection(): void;
}
