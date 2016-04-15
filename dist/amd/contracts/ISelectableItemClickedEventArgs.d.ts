import { ISelectionManager } from './ISelectionManager';
export interface ISelectableItemClickedEventArgs {
    selectionManager: ISelectionManager;
    browserEvent: MouseEvent;
    itemIndex: number;
}
