import {SelectableItem} from './selectable-item';
/**
 * Абстракция, описывающая работу с моделью selection. 
 * Реализацией в данной библиотеке является {@link DefaultSelectionService}, однако данный класс может быть расширен или заменен.
 */
export interface SelectionService {
    /**
     * Коллекция элементов, с которой будут выполняться операции выбора. Предполагается, что конечные реализации данного контракта при изменении значения данного поля 
     * будут оценивать, по прежнему ли находятся ли по выбранным ранее индексам те же элементы, что были выбраны. 
     */
    itemsSource: Array<SelectableItem>;
    /**
     * Опциональная функция, при помощи которой будут сравниваться элементы коллекции {@link itemsSource}.
     * Данная функция должна вызываться при изменении значения свойства {@link itemsSource}, а также при вызове метода {@link getItemIndex}.
     * @param index индекс элемента в коллекции {@link itemsSource}
     * @param элемент из коллекции {@link itemsSource}
     */
    trackByFn: (index: number, item: any) => any;
    /**
     * Индекс последнего обработанного (выбранного, или наоборот) элемента в коллекции {@link itemsSource}. 
     */
    lastProcessedIndex: number;
    /**
     * Отмена выбора всех элементов коллекции {@link itemsSource}.
     */
    deselectAll(): void;
    /**
     * Выбор всех элементов коллекции {@link itemsSource}. 
     */
    selectAll(): void;
    /**
     * Выбор диапазона элементов в коллекции {@link itemsSource}.
     * @param fromIndex - индекс, начиная с которого будут выбраны элементы.
     * @param toIndex - индекс, вплоть до которого будут выбраны элементы. 
     */
    selectRange(fromIndex: number, toIndex: number): void;
    /**
     * Проверяет, что все элементы внутри заданного диапазона в коллекции {@link itemsSource} выбраны.
     * @param fromIndex - индекс, начиная с которого будут выбраны элементы.
     * @param toIndex - индекс, вплоть до которого будут выбраны элементы.
     * @returns true если все элементы внутри заданного диапазона в коллекции {@link itemsSource} выбраны. 
     */
    isRangeSelected(from: number, to: number): boolean;
    /**
     * Определяет, выбран ли хотя бы один элемент в коллекции {@link itemsSource}.
     * @returns true если выбран хотя бы один элемент.
     */
    hasSelections(): boolean;
    /**
     * Определяет, выбран ли элемент в коллекции {@link itemsSource} по указанному индексу.
     * @param index - индекс элемента для проверки.
     * @returns true если элемент выбран.
     */
    isIndexSelected(index: number): boolean;
    /**
     * Возвращает индекс первого элемента коллекции {@link itemsSource}, который помечен как выбранный.
     * @returns индекс первого выбранного элемента. -1 если ничего не выбрано.
     */
    getMinSelectedIndex(): number;
    /**
     * Возвращает индекс последнего элемента коллекции {@link itemsSource}, который помечен как выбранный.
     * @returns индекс последнего выбранного элемента. -1 если ничего не выбрано.
     */
    getMaxSelectedIndex(): number;
    /**
     * Возвращает индекс, по которому размещен переданный элемент в коллекции {@link itemsSource}.
     * @param item - элемент, индекс которого требуется найти.
     * @returns индекс указанного элемента.
     */
    getItemIndex(item: SelectableItem): number;
    /**
     * Возвращает первый элемент в коллекции {@link itemsSource}.
     */
    selectFirst(): void;
    /**
     * Возвращает последний элемент в коллекции {@link itemsSource}.
     */
    selectLast(): void;
    /**
     * Выбирает элемент в коллекции {@link itemsSource} по заданному индексу.
     * @param index - номер элемента, который требуется выбрать.
     * @param savePrevious - опциональный признак, указывающий, сохранять ли предыдущие выбранные записи. По умолчанию равен false.
     */
    selectIndex(index: number, savePrevious?: boolean): void;
    /**
     * Отменяет выбор элемента в коллекции {@link itemsSource} по заданному индексу.
     * @param index - номер элемента, выбор которого необходимо отменить.
     */
    deselectIndex(index: number): void;
    /**
     * Изменяет на противоположное состояние выбора для элемента в коллекции {@link itemsSource} по заданному индексу.
     * @param index - номер элемента, состояние выбора которого требуется изменить.
     * @param savePrevious - опциональный признак, указывающий, сохранять ли предыдущие выбранные записи. По умолчанию равен false.
     */
    toggleSelection(index: number, savePrevious?: boolean): void;
    /**
     * Возвращает все элементы коллекции {@link itemsSource}, которые отмечены как выбранные.
     * @returns массив выбранных элементов.
     */
    getSelectedElements(): Array<Object>;
    /**
     * Возвращает индексы всех элементов коллекции {@link itemsSource}, которые отмечены как выбранные.
     * @returns массив индексов выбранных элементов.
     */
    getSelectedIndexes(): Array<number>;
    /**
     * В конечной реализации подготавливает класс к уничтожению.
     */
    dispose(): void;
}
