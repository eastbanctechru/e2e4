import {IStateManager} from './IStateManager';
export interface IComponentWithState {
    stateManager: IStateManager;
    useModelState: boolean;
    stateManagerKey: string;
    saveRequestState(): void;
    saveLocalState(): void;
}
