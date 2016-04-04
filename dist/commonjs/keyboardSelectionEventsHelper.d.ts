import { ISelectionManager } from './contracts/ISelectionManager';
export declare class KeyboardSelectionEventsHelper {
    selectionManager: ISelectionManager;
    constructor(selectionManager: ISelectionManager);
    trySelectAll(evt: KeyboardEvent): void;
    onArrowUp(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    onArrowDown(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    keyDownHandler(evt: KeyboardEvent, allowMultipleSelection: boolean): void;
    clearWindowSelection(): void;
}
