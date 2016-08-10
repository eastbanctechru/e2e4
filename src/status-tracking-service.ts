import {ProgressState} from './progress-state';
/**
 * Represents state of operation that must be displayed on UI.
 * Used by {@link StatusTracker}. 
 */
export class Status {
    /**
     * Settings for names of css classes that are relevant to {@link status} value.
     * This settings is used by {@link className} property and changing of this settings affects every object of {@link Status} type.
     */
    public static settings: any = {
        /**
         * Name of css class that corresponds to {@link ProgressState.Done}.
         */
        statusDoneClassName: 'status-done',
        /**
         * Name of css class that corresponds to {@link ProgressState.Fail}.
         */
        statusFailClassName: 'status-fail',
        /**
         * Name of css class that corresponds to {@link ProgressState.Progress}.
         */
        statusProgressClassName: 'status-progress'
    };
    /**
     * Identifier that was returned by `setTimeout` method.
     * Used to track object in {@link StatusTrackingService}
     */
    public sid: number;
    /**
     * Current progress state.
     */
    public status: ProgressState;
    /**
     * Description that will be displayed on UI.
     */
    public title: string;
    constructor(status: ProgressState, title: string) {
        this.status = status;
        this.title = title;
    }
    /**
     * Returns class name from {@link Status.settings} that corresponds to current {@link status} value.
     */
    public get className(): string {
        switch (this.status) {
            case ProgressState.Done:
                return Status.settings.statusDoneClassName;
            case ProgressState.Progress:
                return Status.settings.statusProgressClassName;
            case ProgressState.Fail:
                return Status.settings.statusFailClassName;
            default:
                return '';
        }
    }
}

/**
 * Сервис для управления набором операций, состояние которых необходимо отобразить на UI.
 * Может быть использован в конечных реализациях как основа для, к примеру, визуальной маски, закрывающей часть компонент до окончания выполнения всех необходимых операций.
 * Общая логика использования данного сервиса следующая:
 *  - Операции регистрируются при помощи метода {@link trackStatus}, который возвращает нам идентификатор статуса.
 *  - Изменение состояния статуса выполняется при помощи метода {@link changeStatus}.
 *  - Зарегистрированный статус попадает в коллекцию выполняемых операций {@link statusList} только спустя timeout в размере {@link progressDelayInterval}.
 * То есть, если операция будет выполнена быстрее, чем указанный промежуток времени, то она не будет отображена в списке статусов. 
 * Такой подход позволяет избежать ситауций, когда маска была нарисована и тут же пропала, нервируя пользователя.
 *  - При вызове метода {@link changeStatus} состояние соответствующей операции выставляется в переданное значение.
 *  - Спустя интервал {@link elementVisibilityInterval} из коллекции {@link statusList} удаляются все операции со статусом {@link ProgressState.Done}
 */
export class StatusTrackingService {
    /**
     * Указывает, в течении какого времени после выставления статуса {@link ProgressState.Done} операция еще будет показываться на экране.
     * По сути это минимальное время отображения статуса операции (если операция завершена как раз к моменту отрисовки, то она будет вижна на экране как минимум указанное количество миллисекунд).
     */
    public static elementVisibilityInterval: number = 500;
    /**
     * Указывает, в течении какого времени операция должна выполняться, прежде чем появиться на экране.
     * То есть все операции, выполнившиеся быстрее указанного значения не будут отображаться вообще.
     */
    public static progressDelayInterval: number = 500;
    /**
     * Текущий статус всего сервиса StatusTracker
     * Как только в коллекции {@link statusList} появляется хотя бы одна операция, данное свойство выставляется в {@link ProgressState.Progress}, что означает, что можно, к примеру, нарисовать маску.
     * Когда в коллекции {@link statusList} не остается операций, свойство {@link status} выставляется в {@link ProgressState.Done}.
     */
    public status: ProgressState = ProgressState.Done;
    /**
     * Коллекция операций, отслеживаемых сервисом на текущий момент и которые необходимо отразить на UI.
     * Заполняется автоматически методами {@link trackStatus} и {@link changeStatus}.
     */
    public statusList: Array<Status> = new Array<Status>();
    /**
     * true, если текущий {@link status} не равен {@link ProgressState.Done}.
     */
    public get isActive(): boolean {
        return this.status !== ProgressState.Done;
    }
    /**
     * Метод для регистрации операции.
     * @param title описание операции, которое необходимо отобразить на UI.
     * @returns идентификатор, возвращенный методом setTimeout, через который операция попадет в список {@link statusList} 
     */
    public trackStatus(title: string): number {
        const sid = setTimeout(() => {
            this.status = ProgressState.Progress;
            const status = new Status(ProgressState.Progress, title);
            status.sid = sid;
            this.statusList.push(status);
        }, StatusTrackingService.progressDelayInterval);
        return sid;
    }
    /**
     * Метод для изменения статуса операции.
     * @param sid идентификатор операции, возвращенный методом {@link trackStatus}.
     * @param status статус, который необходимо проставить операции.
     * В случае, если был передан статус, отличный от {@link ProgressState.Progress}, то через интервал {@link elementVisibilityInterval} операция будет удалена из списка {@link statusList}.
     */
    public changeStatus(sid: number, status: ProgressState): void {
        clearTimeout(sid);
        const current = this.statusList.find((item: Status) => {
            return item.sid === sid;
        });
        if (current) {
            current.status = status;
        }
        setTimeout((): void => {
            const undone = this.statusList.find((item: Status) => {
                return item.status === ProgressState.Progress;
            });
            if (undone === undefined) {
                this.statusList.length = 0;
                this.status = ProgressState.Done;
            } else {
                for (let i = this.statusList.length - 1; i >= 0; i--) {
                    if (this.statusList[i].sid === sid) {
                        this.statusList.splice(i, 1);
                    }
                }
            }
        }, StatusTrackingService.elementVisibilityInterval);
    };
}
