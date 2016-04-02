import { Status } from './common/status';
import { ProgressState } from './common/progressState';
export declare class StatusTracker {
    static status: ProgressState;
    static modalDisplayed: boolean;
    static statusList: Status[];
    static statusDisplayed: boolean;
    static isActive: boolean;
    static trackStatus(title: string): number;
    static resolveStatus(sid: number, status: ProgressState): void;
}
