import {SelectionService} from './selection-service';
export interface SelectionAreaConfig {
    selectionService: SelectionService;
    toggleOnly: boolean;
    allowMultipleSelection: boolean;
    horizontal: boolean;
}
