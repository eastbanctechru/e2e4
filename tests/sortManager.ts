import { expect, assert } from 'chai';

import { IComponentWithSort } from '../src/contracts/IComponentWithSort';
import { SortParameter } from '../src/common/sortParameter';
import { SortDirection } from '../src/common/sortDirection';
import { SortManager } from '../src/sortManager';

interface IComponent extends IComponentWithSort {
}

class Component implements IComponent {
    sortManager = null;
    constructor () {
        SortManager.includeIn(this);
    }
}

class ComponentWithDefault implements IComponent {
    sortManager = null;
    constructor () {
        SortManager.includeIn(this);
        this.sortManager.defaultSortings = [{
            direction: SortDirection.Asc,
            fieldName: 'id'
        } as SortParameter];
    }
}

function toTarget(): IComponent {
    return new Component();
}

function toTargetWithDefault(): IComponent {
    return new ComponentWithDefault();
}

const savePrevious = true;
const doNotSavePrevious = false;

describe('FilterManager', () => {
    it('injects in target object', () => {
        const target = toTarget();
        const {sortManager} = target;
        assert.isDefined(sortManager);
        assert.isNotNull(sortManager);
    });

    it('can have default sorting', () => {
        const target = toTargetWithDefault();
        const {sortManager} = target;
        expect(sortManager.defaultSortings).eql([ { direction: 0, fieldName: 'id' } ]);
        sortManager.setSort('id', doNotSavePrevious);

        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Desc);
    });

    it('can set add sorting', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', doNotSavePrevious);
        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Asc);
    });

    it('can save previous sorting', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', doNotSavePrevious);
        sortManager.setSort('name', savePrevious);
        expect(sortManager.sortings.length).eql(2);
        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Asc);
        expect(sortManager.sortings[1].fieldName).eql('name');
        expect(sortManager.sortings[1].direction).eql(SortDirection.Asc);
    });

    it('can ignore previous sorting', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', savePrevious);
        sortManager.setSort('name', doNotSavePrevious);
        expect(sortManager.sortings.length).eql(1);
        expect(sortManager.sortings[0].fieldName).eql('name');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Asc);
    });

    it('repeated set sort toggle sort direction', () => {
        const target = toTarget();
        const {sortManager} = target;

        sortManager.setSort('id', savePrevious);
        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Asc);

        sortManager.setSort('id', savePrevious);
        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Desc);
    });

});
