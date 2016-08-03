import {SelectionService} from './selection-service';
/**
 * Контракт, которому должен удовлетворять визуальный компонент, реализующий модель selection-а и использующий класс {@link SelectionEventsHelper}.
 */
export interface SelectionAreaConfig {
    /**
     * Если true, то перемещение по элементам выполняется про помощи клавиш Left Arrow и Right Arrow. В противном случае перемещение выполняется при помощи клавиш Up Arrow и Down Arrow.
     */
    horizontal: boolean;
    /**
     * Указывает, возможен ли выбор нескольких элементов одновременно (например, при выборе нескольких элементов с зажатой клавишей Shift).
     */
    multiple: boolean;
    /**
     * Если true, то выбор очередной записи не будет сбрасывать предыдущие выбранные элементы и единственным способ снять выделение с элемента будет повторный клик по элементу.
     * Данный признак может быть использован для реализации поведения наподобие accordion
     */
    toggleOnly: boolean;
    /**
     * Реализация контракта {@link SelectionService}, при помощи которой и будет выполняться фактический selection.
     */
    selectionService: SelectionService;
}
