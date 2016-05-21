import {Status} from './common/status';
import {Defaults} from './common/defaults';
import {ProgressState} from './common/progressState';

export class StatusTracker {
    static status = ProgressState.Done;
    static modalDisplayed = false;
    static statusList = new Array<Status>();

    static get statusDisplayed(): boolean {
        return StatusTracker.status !== ProgressState.Done;
    }
    static get isActive(): boolean {
        return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
    }
    static trackStatus(title: string): number {
        const sid = setTimeout(() => {
            StatusTracker.status = ProgressState.Progress;
            const status = new Status(ProgressState.Progress, title);
            status.sid = sid;
            StatusTracker.statusList.push(status);
        }, Defaults.uiSettings.progressDelayInterval);
        return sid;
    }
    static resolveStatus(sid: number, status: ProgressState): void {
        clearTimeout(sid);
        const current = StatusTracker.statusList.find(item => {
            return item.sid === sid;
        });
        if (current) {
            current.status = status;
        }
        setTimeout((): void => {
            const undone = StatusTracker.statusList.find(item => {
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
