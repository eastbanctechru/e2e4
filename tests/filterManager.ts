import { expect, assert } from 'chai';

import { IObjectWithFilter } from '../src/contracts/IObjectWithFilter';

import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';

interface IFilterableObject extends IObjectWithFilter {
    items: IItem[];
}

interface IItem {
    name: string;
}
function toItem(name: string): IItem {
    return { name };
}

class FilterableObject implements IFilterableObject {
    filterManager = null;

    @filter({ defaultValue: 'first' })
    items = ['first', 'second', 'third'].map(toItem);
}

function toTarget(): IFilterableObject {
    return new FilterableObject();
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
