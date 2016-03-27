import { ProgressState } from './common/progressState';
export declare abstract class BaseComponent {
    disposed: boolean;
    inited: boolean;
    title: string;
    state: ProgressState;
    busy: boolean;
    ready: boolean;
    init(...args: Object[]): void;
    dispose(): void;
}
