export interface IFilterManager {
    dispose(): void;
    resetFilters(): void;
    parseParams(params: Object): void;
    buildRequest(result?: Object): Object;
    buildPersistedState(result?: Object): Object;
    registerFilterTarget(target: Object): void;
}
