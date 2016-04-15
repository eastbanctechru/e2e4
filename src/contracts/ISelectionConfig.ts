import {ISelectionManager} from './ISelectionManager';
export interface ISelectionConfig {
    selectionManager: ISelectionManager;
    toggleOnly: boolean;
    allowMultipleSelection: boolean;
}
