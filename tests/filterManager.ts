import { expect, assert } from 'chai';
import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';

interface IFilterableObject {
    items: IItem[];
}

interface IItem {
    name: string;
}
function toItem(name: string): IItem {
    return { name };
}

class FilterableObject implements IFilterableObject {
    @filter({ defaultValue: 'first' })
    items = ['first', 'second', 'third'].map(toItem);
}

function toTarget(): IFilterableObject {
    return new FilterableObject();
}

describe('FilterManager', () => {
    it('builds filter value for target object', () => {
        const target = toTarget();

        let filterManager = new FilterManager(target);

        const value = FilterManager.buildFilterValue(target, '', null);
        expect(value).eql('');

    });
    // TODO: Write meaningful tests
});
