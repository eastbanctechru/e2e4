import {StatusModel} from './StatusModel';
import {Defaults} from './Defaults';
import {ProgressState} from './ProgressState';
import * as _ from 'lodash';

export class StatusTracker {
    static status = ProgressState.Done;
    static modalDisplayed = false;
    static statusList = new Array<StatusModel>();

    static get statusDisplayed(): boolean {
        return StatusTracker.status !== ProgressState.Done;
    }
    static get isActive(): boolean {
        return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
    }
    static trackStatus(title: string): number {
        const sid = setTimeout(() => {
            StatusTracker.status = ProgressState.Progress;
            if (title) {
                const statusModel = new StatusModel(ProgressState.Progress, title);
                statusModel.sid = sid;
                StatusTracker.statusList.push(statusModel);
            }
        }, Defaults.uiSettings.progressDelayInterval);
        return sid;
    }
    static resolveStatus(sid: number, status: ProgressState): void {
        if (sid) {
            clearTimeout(sid);
            const current = StatusTracker.statusList.find(item => {
                return item.sid === sid;
            });
            if (current) {
                current.status = status;
            }
        }
        setTimeout((): void => {
            const undone = StatusTracker.statusList.find(item => {
                return item.status === ProgressState.Progress;
            });
            if (undone === null) {
                StatusTracker.statusList.length = 0;
                StatusTracker.status = ProgressState.Done;
            } else {
                _.remove(StatusTracker.statusList, item => {
                    return item.sid === sid;
                });
            }
        }, Defaults.uiSettings.elementVisibilityInterval);
    };
}
