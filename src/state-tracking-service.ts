import { ProgressState } from './progress-state';
/**
 * Represents state of operation that must be displayed on UI inside {@link StateTrackingService}. 
 */
export class Operation {
    /**
     * Settings for names of css classes that are relevant to {@link status} value.
     * This settings is used by {@link className} property and changing of this settings affects every object of {@link Operation} type.
     */
    // tslint:disable-next-line: typedef
    public static settings = {
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
     * Used to track object in {@link StateTrackingService}
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
    /**
     * @param status value for {@link status} property.  
     * @param title value for {@link title} property.
     */
    constructor(status: ProgressState, title: string) {
        this.status = status;
        this.title = title;
    }
    /**
     * Returns class name from {@link Operation.settings} that corresponds to current {@link status} value.
     */
    public get className(): string {
        switch (this.status) {
            case ProgressState.Done:
                return Operation.settings.statusDoneClassName;
            case ProgressState.Progress:
                return Operation.settings.statusProgressClassName;
            case ProgressState.Fail:
                return Operation.settings.statusFailClassName;
            default:
                return '';
        }
    }
}

/**
 * Used to manage state of operations which description must be displayed on UI.
 * 
 * It can be used to implement application-defined UI component to display visual mask that hides part of UI controls until some operations aren't completed.
 * 
 * The typical usage scenario is:
 *  - Operation is registered with {@link trackStatus}, which returns unique identifier of operation.
 *  - To resolve or change state of operation {@link changeStatus} method can be used.
 *  - Registered operation would be added to the {@link operationsList} after {@link progressDelayInterval} timeout elapsed.
 *  - {@link status} will be equal to {@link ProgressState.Progress} while {@link operationsList} contains any operation that is not in {@link ProgressState.Done} state.
 *  - To set state of operation to {@link ProgressState.Done} or {@link ProgressState.Fail} method {@link changeStatus} can be used.
 *  - When {@link elementVisibilityInterval} interval is elapsed all operations with status different than {@link ProgressState.Progress} will be removed from {@link operationsList}.
 *  - When {@link operationsList} collection becomes empty {@link status} property becomes {@link ProgressState.Done}.
 */
export class StateTrackingService {
    /**
     * Global timing settings.
     * 
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link StateTrackingService} type.
     * 
     * So, changing of this settings will affect all instances of {@link StateTrackingService} type that will be created after such changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    // tslint:disable-next-line: typedef
    public static settings =
    {
        /**
         * @see {@link StateTrackingService.elementVisibilityInterval}
         */
        elementVisibilityInterval: 500,
        /**
         * @see {@link StateTrackingService.progressDelayInterval}
         */
        progressDelayInterval: 500
    };
    /**
     * Specifies how much time must elapse from moment when operation becomes {@link ProgressState.Done} to it's disappearing from UI.
     * 
     * In fact this is minimal time of operation visibility. If operation was completed right after {@link progressDelayInterval} it will be displayed at least specified in this property amount of milliseconds. 
     */
    public static elementVisibilityInterval: number = StateTrackingService.elementVisibilityInterval;
    /**
     * Specifies how much time must elapse from start of operation to it's appearance on UI.
     * 
     * This means that if operation was performed faster than that interval it wouldn't be displayed on UI at all.
     * 
     * This approach helps to avoid situations when mask is hided right after it was rendered since it can be pretty irritating.
     */
    public static progressDelayInterval: number = StateTrackingService.progressDelayInterval;
    /**
     * Current state of the service.
     * 
     * It is equal to {@link ProgressState.Progress} if {@link operationsList} contains any operation. This means that mask can be displayed on UI for example.
     * 
     * When {@link operationsList} becomes empty this property becomes equal to {@link ProgressState.Done}.
     */
    public status: ProgressState = ProgressState.Done;
    /**
     * Collection of operations which currently tracked by service and must be displayed on UI.
     * 
     * This collection is managed by {@link trackStatus} and {@link changeStatus} methods.
     */
    public operationsList: Array<Operation> = new Array<Operation>();
    /**
     * `true`, if current {@link status} doesn't equal to {@link ProgressState.Done}.
     */
    public get isActive(): boolean {
        return this.status !== ProgressState.Done;
    }
    /**
     * Registers operation for tracking.
     * @param title operation description that must be displayed on UI.
     * @returns identifier of `setTimeout` on elapsing of which operation will be added to {@link operationsList} 
     */
    public trackStatus(title: string): number {
        const sid = setTimeout(() => {
            this.status = ProgressState.Progress;
            const status = new Operation(ProgressState.Progress, title);
            status.sid = sid;
            this.operationsList.push(status);
        }, StateTrackingService.progressDelayInterval);
        return sid;
    }
    /**
     * Changes tracked operation status.
     * @param sid operation identifier that was returned by {@link trackStatus}.
     * @param status status that must be applied to operation.
     * 
     * In case when applied status doesn't equal to {@link ProgressState.Progress}, operation will be deleted from {@link operationsList} after {@link elementVisibilityInterval} interval elapsed.
     */
    public changeStatus(sid: number, status: ProgressState): void {
        clearTimeout(sid);
        const current = this.operationsList.find((item: Operation) => {
            return item.sid === sid;
        });
        if (current) {
            current.status = status;
        }
        setTimeout((): void => {
            const undone = this.operationsList.find((item: Operation) => {
                return item.status === ProgressState.Progress;
            });
            if (undone === undefined) {
                this.operationsList.length = 0;
                this.status = ProgressState.Done;
            } else {
                for (let i = this.operationsList.length - 1; i >= 0; i--) {
                    if (this.operationsList[i].sid === sid) {
                        this.operationsList.splice(i, 1);
                    }
                }
            }
        }, StateTrackingService.elementVisibilityInterval);
    };
}
