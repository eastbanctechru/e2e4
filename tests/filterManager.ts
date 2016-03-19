import { expect, assert } from 'chai';

import { IComponentWithFilter } from '../src/contracts/IComponentWithFilter';

import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';

interface IComponent extends IComponentWithFilter {
    items: IItem[];
}

interface IItem {
    name: string;
}
function toItem(name: string): IItem {
    return {name};
}

class Component implements IComponent {
    filterManager = null;

    @filter({defaultValue: 'first'})
    items = ['first', 'second', 'third'].map(toItem);
}

function toTarget(): IComponent {
    return new Component();
}

describe('FilterManager', () => {
    it('injects in target object', () => {
        const target = toTarget();
        FilterManager.includeIn(target);
        assert.isDefined(target.filterManager);
        assert.isNotNull(target.filterManager);
    });

    it('builds filter value for target object', () => {
        const target = toTarget();

        FilterManager.includeIn(target);

        const value = FilterManager.buildFilterValue(target, '', null);
        expect(value).eql('');

    });
    // TODO: Write meaningful tests
});
