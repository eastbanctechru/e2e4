import {ProgressState} from './progress-state';

export class Status {
    public static settings: any = {
        statusDoneClassName: 'status-done',
        statusFailClassName: 'status-fail',
        statusProgressClassName: 'status-progress'
    };
    public sid: number;
    constructor(public status: ProgressState, public title: string) {
        this.status = status;
        this.title = title;
    }
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

export class StatusTracker {
    public static elementVisibilityInterval: number = 500;
    public static progressDelayInterval: number = 500;
    public static status: ProgressState = ProgressState.Done;
    public static statusList: Array<Status> = new Array<Status>();

    public static get isActive(): boolean {
        return StatusTracker.status !== ProgressState.Done;
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
