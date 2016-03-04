import {ProgressState} from './ProgressState';
export abstract class BaseComponent {
    disposed = false;
    inited = false;
    title: string = null;
    state: ProgressState = null;

    get busy(): boolean {
        return this.state === ProgressState.Progress;
    }

    get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }

    init(...args: Object[]): void {
        this.inited = true;
    }
    dispose(): void {
        this.disposed = true;
    }
};
