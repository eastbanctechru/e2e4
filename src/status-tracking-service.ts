import { OperationStatus } from './contracts/operation-status';
import { Operation } from './operation';

/**
 * Used to manage operations which description must be displayed on UI.
 *
 * It can be used to implement application-defined UI component to display visual mask that hides part of UI controls until some operations aren't completed.
 *
 * The typical usage scenario is:
 *  - Operation is registered with {@link trackStatus}, which returns unique identifier of operation.
 *  - To resolve or change operation status {@link changeStatus} method can be used.
 *  - Registered operation would be added to the {@link operationsList} after {@link progressDelayInterval} timeout elapsed.
 *  - {@link status} will be equal to {@link OperationStatus.Progress} while {@link operationsList} contains any operation that is not in {@link OperationStatus.Done} status.
 *  - To set operation status to {@link OperationStatus.Done} or {@link OperationStatus.Fail} method {@link changeStatus} can be used.
 *  - When {@link elementVisibilityInterval} interval is elapsed all operations with status different than {@link OperationStatus.Progress} will be removed from {@link operationsList}.
 *  - When {@link operationsList} collection becomes empty {@link status} property becomes {@link OperationStatus.Done}.
 */
export class StatusTrackingService {
    /**
     * Global timing settings.
     *
     * These settings are static and their values are copied to the properties of the same name for each instance of {@link StatusTrackingService} type.
     *
     * So, changing of this settings will affect all instances of {@link StatusTrackingService} type that will be created after such changes.
     * If you want to change settings of concrete object you can use it the same name properties.
     */
    // tslint:disable-next-line: typedef
    public static settings = {
        /**
         * @see {@link StatusTrackingService.elementVisibilityInterval}
         */
        elementVisibilityInterval: 500,
        /**
         * @see {@link StatusTrackingService.progressDelayInterval}
         */
        progressDelayInterval: 500
    };
    /**
     * Specifies how much time must elapse from moment when operation becomes {@link OperationStatus.Done} to it's disappearing from UI.
     *
     * In fact this is minimal time of operation visibility. If operation was completed right after {@link progressDelayInterval} it will be displayed at least specified in this property amount of milliseconds.
     */
    public static elementVisibilityInterval: number = StatusTrackingService.elementVisibilityInterval;
    /**
     * Specifies how much time must elapse from start of operation to it's appearance on UI.
     *
     * This means that if operation was performed faster than that interval it wouldn't be displayed on UI at all.
     *
     * This approach helps to avoid situations when mask is hided right after it was rendered since it can be pretty irritating.
     */
    public static progressDelayInterval: number = StatusTrackingService.progressDelayInterval;
    /**
     * Current status of the service.
     *
     * It is equal to {@link OperationStatus.Progress} if {@link operationsList} contains any operation. This means that mask can be displayed on UI for example.
     *
     * When {@link operationsList} becomes empty this property becomes equal to {@link OperationStatus.Done}.
     */
    public status: OperationStatus = OperationStatus.Done;
    /**
     * Collection of operations which currently tracked by service and must be displayed on UI.
     *
     * This collection is managed by {@link trackStatus} and {@link changeStatus} methods.
     */
    public operationsList: Operation[] = new Array<Operation>();
    /**
     * `true`, if current {@link status} doesn't equal to {@link OperationStatus.Done}.
     */
    public get isActive(): boolean {
        return this.status !== OperationStatus.Done;
    }
    /**
     * Registers operation for tracking.
     * @param title operation description that must be displayed on UI.
     * @returns identifier of `setTimeout` on elapsing of which operation will be added to {@link operationsList}
     */
    public trackStatus(title: string): number {
        const sid = window.setTimeout(() => {
            this.status = OperationStatus.Progress;
            const status = new Operation(OperationStatus.Progress, title);
            status.sid = sid;
            this.operationsList.push(status);
        }, StatusTrackingService.progressDelayInterval);
        return sid;
    }
    /**
     * Changes tracked operation status.
     * @param sid operation identifier that was returned by {@link trackStatus}.
     * @param status status that must be applied to operation.
     *
     * In case when applied status doesn't equal to {@link OperationStatus.Progress}, operation will be deleted from {@link operationsList} after {@link elementVisibilityInterval} interval elapsed.
     */
    public changeStatus(sid: number, status: OperationStatus): void {
        clearTimeout(sid);
        const current = this.operationsList.find((item: Operation) => {
            return item.sid === sid;
        });
        if (current) {
            current.status = status;
        }
        setTimeout((): void => {
            const undone = this.operationsList.find((item: Operation) => {
                return item.status === OperationStatus.Progress;
            });
            if (typeof undone === 'undefined') {
                this.operationsList.length = 0;
                this.status = OperationStatus.Done;
            } else {
                for (let i = this.operationsList.length - 1; i >= 0; i--) {
                    if (this.operationsList[i].sid === sid) {
                        this.operationsList.splice(i, 1);
                    }
                }
            }
        }, StatusTrackingService.elementVisibilityInterval);
    }
}
