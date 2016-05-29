export interface IFilterManager {
    dispose(): void;
    resetValues(): void;
    applyParams(params: Object): void;
    getRequestState(result?: Object): any;
    getPersistedState(result?: Object): any;
    registerFilterTarget(target: Object): void;
}
