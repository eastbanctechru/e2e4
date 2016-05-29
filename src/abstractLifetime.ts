import {ProgressState} from './common/progressState';
import {IPager} from './contracts/IPager';

export abstract class AbstractLifetime {
    disposed = false;
    inited = false;
    state: ProgressState = ProgressState.Initial;

    get busy(): boolean {
        return this.state === ProgressState.Progress;
    }

    get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }

    init(): void {
        this.inited = true;
    }
    dispose(): void {
        this.disposed = true;
    }
}
