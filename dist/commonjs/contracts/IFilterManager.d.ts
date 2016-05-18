export interface IFilterManager {
    dispose(): void;
    resetValues(): void;
    parseParams(params: Object): void;
    getRequestState(result?: Object): Object;
    getPersistedState(result?: Object): Object;
    registerFilterTarget(target: Object): void;
}
