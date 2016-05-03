import { SimpleList } from './simpleList';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class BufferedList extends SimpleList {
    constructor(stateManager: IStateManager);
}
