import {IStateManager} from './IStateManager';
export interface IComponentWithState {
    stateManager: IStateManager;
    useModelState: boolean;
    saveRequestState(): void;
    saveLocalState(): void;
}
