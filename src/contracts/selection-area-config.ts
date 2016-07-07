import {SelectionService} from './selection-service';
export interface SelectionAreaConfig {
    selectionService: SelectionService;
    toggleOnly: boolean;
    multiple: boolean;
    horizontal: boolean;
}
