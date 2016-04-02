import {IStateManager} from './IStateManager';
export interface IObjectWithState {
    stateManager: IStateManager;
    useModelState: boolean;
    saveRequestState(): void;
    saveLocalState(): void;
}
