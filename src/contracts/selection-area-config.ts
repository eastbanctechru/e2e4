import {SelectionService} from './selection-service';
/**
 * Must be implemented by application-defined UI component for selection which can be used in pair with {@link SelectionEventsHelper}
 */
export interface SelectionAreaConfig {
    /**
     * `true` for shifting to next/previous item in list of items by `Left Arrow`/`Right Arrow` keys instead of `Arrow Up`/`Arrow Down` keys.
     */
    horizontal: boolean;
    /**
     * `true` for ability to pick several items in list of items (by clicking range of items with pressed `Shift` key, for example).
     */
    multiple: boolean;
    /**
     * If `true`, then next item selection doesn't clear selection of previously selected items. The only way to clean selection is second click on previously selected element.
     * This can be used to implement accordion-like behavior in application-defined UI component.
     */
    toggleOnly: boolean;
    /**
     * Any implementation of {@link SelectionService} to perform actual selection.
     * @see {@link DefaultSelectionService}
     */
    selectionService: SelectionService;
}
