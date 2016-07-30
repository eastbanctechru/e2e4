import {ProgressState} from './progress-state';

export class Status {
    public sid: number;
    constructor(public status: ProgressState, public title: string) {
        this.status = status;
        this.title = title;
    }
    public get className(): string {
        switch (this.status) {
            case ProgressState.Done:
                return 'status status-resolved';
            case ProgressState.Progress:
                return 'status status-progress';
            case ProgressState.Fail:
                return 'status status-fail';
            default:
                return '';
        }
    }
}

export class StatusTracker {
    public static elementVisibilityInterval: number = 500;
    public static progressDelayInterval: number = 500;
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
        }, StatusTracker.progressDelayInterval);
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
        }, StatusTracker.elementVisibilityInterval);
    };
}
