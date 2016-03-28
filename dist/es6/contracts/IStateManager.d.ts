export interface IStateManager {
    flushRequestState(state: Object): void;
    persistLocalState(state: Object): void;
    mergeStates(params: Object): Object;
}
