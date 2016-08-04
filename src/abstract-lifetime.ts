import {ProgressState} from './progress-state';
/**
 * Абстракный класс, который может выступать в качестве базового для компонентов, имеющих жизненый цикл (который имеют компоненты, к примеру, в MV*-фреймворках), 
 * а так же имеют изменяемое состояние прогресса в процессе жизни. Например, обращаются за данными на сервер и важно разделять состояния когда запрос еще не выполнялся, в процессе выполнения и т.д.
 */
export abstract class AbstractLifetime {
    /**
     * True если у объекта уже был вызван метод dispose и объект больше непригоден для использования.  
     */
    public disposed: boolean = false;
    /**
     * True если у объекта уже был вызван метод init и объект готов к использованию.  
     */
    public inited: boolean = false;
    /**
     * Текущее состояние объекта.  
     */
    public state: ProgressState = ProgressState.Initial;
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get busy(): boolean {
        return this.state === ProgressState.Progress;
    }
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} НЕ равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }
    /**
     * Выставляет свойство {@link AbstractLifetime.inited} в true. Данный метод необходимо вызывать из классов-наследников после инициализации.  
     */
    public init(): void {
        this.inited = true;
    }
    /**
     * Выставляет свойство {@link AbstractLifetime.disposed} в true. Данный метод необходимо вызывать из классов-наследников при уничтожении.  
     */
    public dispose(): void {
        this.disposed = true;
    }
}
