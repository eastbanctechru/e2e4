import {SelectionAreaConfig} from './contracts/selection-area-config';
/**
 * Используется классом {@link SelectionEventsHelper} в обработчиках событий клавиатуры вместо использования magic numbers.  
 */
export enum KeyCodes {
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Esc = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40,
    A = 65
}

/**
 * Используется классом {@link SelectionEventsHelper} в обработчиках событий мыши вместо использования magic numbers.  
 */
export enum MouseButtons {
    None = 0,
    Left = 1,
    Middle = 2,
    Right = 3
}
/**
 * Вспомогательный класс, который может быть использован в конечных реализациях визуальных компонент для обработки событий мыши и клавиатуры для работы с selection.
 * Реализует модель selection, схожую с поведением таблиц Excel или Google Sheets. Описание конкретных обрабатываемых шаблонов действий вы можете увидеть в документации методов.
 * Класс не привязан к конкретным событиям браузера и не использует специфичное для браузеров API.  
 */
export class SelectionEventsHelper {
    /**
     * @param selectionConfig используется для декларативного взаимодействия с конечной реализацией визуального компонента, доступа к его настройкам selection
     * а так же к объекту, реализующему контракт {@link SelectionService} именно в конечном компоненте.
     */
    constructor(public selectionConfig: SelectionAreaConfig) {
    }
    /**
     * Попытка выбора всех элементов при нажатии Ctrl+A.
     * @param ctrlKeyPressed - признак, была ли зажата  клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift (при нажатом Shift команда не срабатывает).
     * @returns признак, была ли выполнена команда.
     */
    protected trySelectAll(ctrlPressed: boolean, shiftPressed: boolean): boolean {
        if (ctrlPressed && !shiftPressed) {
            this.selectionConfig.selectionService.selectAll();
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора предыдущего элемента при нажатии Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). 
     * При зажатой клавише Shift и {@link SelectionAreaConfig.multiple} выбранные прежде элементы остаются выбранными.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда.
     */
    protected trySelectPreviousItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex > 0) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex - 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора предыдущего элемента при нажатии Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). 
     * При зажатой клавише Shift и {@link SelectionAreaConfig.multiple} выбранные прежде элементы остаются выбранными.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected trySelectNextItem(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex < this.selectionConfig.selectionService.itemsSource.length - 1) {
            this.selectionConfig.selectionService.selectIndex(this.selectionConfig.selectionService.lastProcessedIndex + 1, shiftKeyPressed && this.selectionConfig.multiple);
            return true;
        }
        return false;
    }
    /**
     * Попытка снятия выбора с последнего элемента, добавленного в коллекцию выбранных элементов при нажатии Shift+Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). 
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected tryDeselectLastItemInRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex > 0 && shiftKeyPressed) {
            if (this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex - 1)) {
                this.selectionConfig.selectionService.deselectIndex(this.selectionConfig.selectionService.lastProcessedIndex);
                this.selectionConfig.selectionService.lastProcessedIndex = this.selectionConfig.selectionService.lastProcessedIndex - 1;
                return true;
            }
        }
        return false;
    }
    /**
     * Попытка снятия выбора с последнего элемента, добавленного в коллекцию выбранных элементов при помощи зажатого Shift. 
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected tryDeselectLastItemInReversedRange(shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex < this.selectionConfig.selectionService.itemsSource.length && shiftKeyPressed) {
            if (this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex + 1)) {
                this.selectionConfig.selectionService.deselectIndex(this.selectionConfig.selectionService.lastProcessedIndex);
                this.selectionConfig.selectionService.lastProcessedIndex = this.selectionConfig.selectionService.lastProcessedIndex + 1;
                return true;
            }
        }
        return false;
    }
    /**
     * Попытка выбора элемента предыдущего от последнего обработанного при условии, что предыдущим действием было снятие выбора. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex - 1);
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора элемента следующего за последним обработанным при условии, что предыдущим действием было снятие выбора. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (!ctrlKeyPressed && shiftKeyPressed && false === this.selectionConfig.selectionService.isIndexSelected(this.selectionConfig.selectionService.lastProcessedIndex)) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.lastProcessedIndex + 1);
            return true;
        }
        return false;
    }
    /**
     * Попытка первой обработки события. Если пока еще не выполнялось никаких действий, то выбирает первый элемент в коллекции. 
     * @returns признак, была ли выполнена команда
     */
    protected tryInitialSelectionOfFirstItem(): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex === null) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора всех элементов от последнего выбранного, до первого в коллекции при нажатых Crl+Shift+Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected trySelectAllItemsUpToFirst(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, 0);
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора всех элементов от последнего выбранного, до последнего в коллекции при нажатых Crl+Shift+Arrow Down (Arrow Right при установленном {@link SelectionAreaConfig.horizontal}). 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена команда
     */
    protected trySelectAllItemsUpToLast(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (this.selectionConfig.selectionService.lastProcessedIndex !== null && ctrlKeyPressed && shiftKeyPressed && this.selectionConfig.multiple) {
            this.selectionConfig.selectionService.selectRange(this.selectionConfig.selectionService.lastProcessedIndex, this.selectionConfig.selectionService.itemsSource.length - 1);
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора первого элемента в коллекции при нажатых Crl+Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift (при зажатом Shift команда не срабатывает).
     * @returns признак, была ли выполнена команда
     */
    protected trySelectFirstItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectFirst();
            return true;
        }
        return false;
    }
    /**
     * Попытка выбора последнего элемента в коллекции при нажатых Crl+Arrow Down (Arrow Right при установленном {@link SelectionAreaConfig.horizontal}). 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift (при зажатом Shift команда не срабатывает).
     * @returns признак, была ли выполнена команда
     */
    protected trySelectLastItem(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        if (ctrlKeyPressed && !shiftKeyPressed) {
            this.selectionConfig.selectionService.selectLast();
            return true;
        }
        return false;
    }
    /**
     * Общий обработчик нажатия Arrow Up (Arrow Left при установленном {@link SelectionAreaConfig.horizontal}). По очереди вызывает обработчики соответствующих команд. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена какая-либо команда из вызванных.
     */
    protected onPreviousKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectFirstItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToFirst(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithPreviousItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInRange(shiftKeyPressed) ||
            this.trySelectPreviousItem(shiftKeyPressed);
    }
    /**
     * Общий обработчик нажатия Arrow Down (Arrow Right при установленном {@link SelectionAreaConfig.horizontal}). По очереди вызывает обработчики соответствующих команд. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @returns признак, была ли выполнена какая-либо команда из вызванных.
     */
    protected onNextKey(ctrlKeyPressed: boolean, shiftKeyPressed: boolean): boolean {
        return this.tryInitialSelectionOfFirstItem() ||
            this.trySelectLastItem(ctrlKeyPressed, shiftKeyPressed) ||
            this.trySelectAllItemsUpToLast(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryBuildRangeWithNextItemWhenLastItemWasUnselected(ctrlKeyPressed, shiftKeyPressed) ||
            this.tryDeselectLastItemInReversedRange(shiftKeyPressed) ||
            this.trySelectNextItem(shiftKeyPressed);
    }
    /**
     * Общий обработчик событий клавиатуры. По очереди вызывает обработчики соответствующих команд. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @param keyCode - код нажатой клавиши. Обрабатываются {@link KeyCodes.ArrowUp}, {@link KeyCodes.ArrowLeft}, {@link KeyCodes.ArrowDown}, {@link KeyCodes.ArrowRight} и {@link KeyCodes.A}
     * @returns признак, была ли выполнена какая-либо команда из вызванных.
     */
    public keyboardHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, keyCode: KeyCodes): boolean {
        switch (keyCode) {
            case KeyCodes.ArrowUp:
                return !this.selectionConfig.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowLeft:
                return this.selectionConfig.horizontal && this.onPreviousKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowDown:
                return !this.selectionConfig.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.ArrowRight:
                return this.selectionConfig.horizontal && this.onNextKey(ctrlKeyPressed, shiftKeyPressed);
            case KeyCodes.A:
                return this.trySelectAll(ctrlKeyPressed, shiftKeyPressed);
            default:
                return false;
        }
    }
    /**
     * Общий обработчик событий мыши. По очереди вызывает обработчики соответствующих команд. 
     * @param ctrlKeyPressed - признак, была ли зажата клавиша Ctrl.
     * @param shiftKeyPressed - признак, была ли зажата клавиша Shift.
     * @param mouseButton нажатая клавиша мыши
     * @param itemIndex индекс кликнутого элемента  в коллекции {@link SelectionService.itemsSource}
     * @returns признак, была ли выполнена какая-либо команда из вызванных.
     */
    public mouseHandler(ctrlKeyPressed: boolean, shiftKeyPressed: boolean, mouseButton: MouseButtons, itemIndex: number): boolean {
        const isItemSelected = this.selectionConfig.selectionService.isIndexSelected(itemIndex);
        if (isItemSelected !== false && mouseButton !== MouseButtons.Left) {
            return false;
        }
        if (shiftKeyPressed && this.selectionConfig.multiple) {
            const minIndex = this.selectionConfig.selectionService.getMinSelectedIndex();
            this.selectionConfig.selectionService.selectRange(minIndex === -1 ? itemIndex : minIndex, itemIndex);
        } else {
            let multiple = (ctrlKeyPressed || this.selectionConfig.toggleOnly) && this.selectionConfig.multiple;
            this.selectionConfig.selectionService.toggleSelection(itemIndex, multiple);
        }
        return true;
    }
}
