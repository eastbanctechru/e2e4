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
