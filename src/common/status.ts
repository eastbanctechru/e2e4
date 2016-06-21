import {ProgressState} from './progressState';
export class Status {
    public sid: number;
    public status: ProgressState;
    public title: string;
    constructor(status: ProgressState, title: string) {
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
