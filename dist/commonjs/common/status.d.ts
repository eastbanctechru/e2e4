import { ProgressState } from './progressState';
export declare class Status {
    sid: number;
    status: ProgressState;
    title: string;
    constructor(status: ProgressState, title: string);
    className: string;
}
