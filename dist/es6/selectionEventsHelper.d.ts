import { ISelectionConfig } from './contracts/ISelectionConfig';
export declare class SelectionEventsHelper {
    selectionConfig: ISelectionConfig;
    constructor(selectionConfig: ISelectionConfig);
    trySelectAll(browserEvent: KeyboardEvent): void;
    onArrowUp(browserEvent: KeyboardEvent): void;
    onArrowDown(browserEvent: KeyboardEvent): void;
    keyboardHandler(browserEvent: KeyboardEvent): void;
    mouseHandler(browserEvent: MouseEvent, itemIndex: number): void;
    clearWindowSelection(): void;
}
