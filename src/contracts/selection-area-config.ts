import {SelectionService} from './selection-service';
export interface SelectionAreaConfig {
    horizontal: boolean;
    multiple: boolean;
    selectionService: SelectionService;
    toggleOnly: boolean;
}
