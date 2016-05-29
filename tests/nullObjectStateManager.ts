import { expect } from 'chai';
import { NullObjectStateManager } from '../src/nullObjectStateManager';

describe('NullObjectStateManager', () => {
    it('don\'t do any', () => {
        let stateManager = new NullObjectStateManager();
        stateManager.flushRequestState({});
        stateManager.mergeStates({});
        stateManager.persistLocalState({});
    });
});
