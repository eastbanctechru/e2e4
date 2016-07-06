import {ProgressState} from './common/progress-state';

export abstract class AbstractLifetime {
    public disposed: boolean = false;
    public inited: boolean = false;
    public state: ProgressState = ProgressState.Initial;

    public get busy(): boolean {
        return this.state === ProgressState.Progress;
    }

    public get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }

    public init(): void {
        this.inited = true;
    }
    public dispose(): void {
        this.disposed = true;
    }
}
