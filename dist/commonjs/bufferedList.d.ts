import { SimpleList } from './simpleList';
import { BufferedPager } from './bufferedPager';
import { IStateManager } from './contracts/IStateManager';
export declare abstract class BufferedList extends SimpleList {
    constructor(stateManager: IStateManager, pager: BufferedPager);
}
