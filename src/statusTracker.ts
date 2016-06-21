import {Status} from './common/status';
import {Defaults} from './common/defaults';
import {ProgressState} from './common/progressState';

export class StatusTracker {
    public static status: ProgressState = ProgressState.Done;
    public static modalDisplayed: boolean = false;
    public static statusList: Array<Status> = new Array<Status>();

    public static get statusDisplayed(): boolean {
        return StatusTracker.status !== ProgressState.Done;
    }
    public static get isActive(): boolean {
        return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
    }
    public static trackStatus(title: string): number {
        const sid = setTimeout(() => {
            StatusTracker.status = ProgressState.Progress;
            const status = new Status(ProgressState.Progress, title);
            status.sid = sid;
            StatusTracker.statusList.push(status);
        }, Defaults.uiSettings.progressDelayInterval);
        return sid;
    }
    public static resolveStatus(sid: number, status: ProgressState): void {
        clearTimeout(sid);
        const current = StatusTracker.statusList.find((item: Status) => {
            return item.sid === sid;
        });
        if (current) {
            current.status = status;
        }
        setTimeout((): void => {
            const undone = StatusTracker.statusList.find((item: Status) => {
                return item.status === ProgressState.Progress;
            });
            if (undone === undefined) {
                StatusTracker.statusList.length = 0;
                StatusTracker.status = ProgressState.Done;
            } else {
                for (let i = StatusTracker.statusList.length - 1; i >= 0; i--) {
                    if (StatusTracker.statusList[i].sid === sid) {
                        StatusTracker.statusList.splice(i, 1);
                    }
                }
            }
        }, Defaults.uiSettings.elementVisibilityInterval);
    };
}
