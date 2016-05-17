import { expect, assert } from 'chai';

import { ISortManager } from '../src/contracts/ISortManager';
import { SortParameter } from '../src/common/sortParameter';
import { SortDirection } from '../src/common/sortDirection';
import { SortManager } from '../src/sortManager';

interface ISortableObject {
    sortManager: ISortManager;
}

class SortableObject implements ISortableObject {
    sortManager = null;
    constructor() {
        this.sortManager = new SortManager();
    }
}

class ObjectWithDefaultSortings implements ISortableObject {
    sortManager = null;
    constructor() {
        this.sortManager = new SortManager();
        this.sortManager.defaultSortings = [{
            direction: SortDirection.Asc,
            fieldName: 'id'
        } as SortParameter];
    }
}

function toTarget(): ISortableObject {
    return new SortableObject();
}

function toTargetWithDefault(): ISortableObject {
    return new ObjectWithDefaultSortings();
}

const savePrevious = true;
const doNotSavePrevious = false;

describe('SortManager', () => {
    it('has empty default sortings by default', () => {
        const target = toTarget();
        const {sortManager} = target;
        expect(sortManager.defaultSortings.length).eql(0);
    });

    it('can have default sorting', () => {
        const target = toTargetWithDefault();
        const {sortManager} = target;
        expect(sortManager.defaultSortings).eql([{ direction: 0, fieldName: 'id' }]);
        sortManager.setSort('id', doNotSavePrevious);

        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Desc);
    });

    it('can add sorting', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', doNotSavePrevious);
        expect(sortManager.sortings[0].fieldName).eql('id');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Asc);
    });

    it('change empty sortings to setted default sortings', () => {
        const target = toTarget();
        const {sortManager} = target;

        sortManager.defaultSortings = [{
            direction: SortDirection.Desc,
            fieldName: 'name'
        } as SortParameter];

        expect(sortManager.sortings.length).eql(1);
        expect(sortManager.sortings[0].fieldName).eql('name');
        expect(sortManager.sortings[0].direction).eql(SortDirection.Desc);
    });

    it('doesn\'t change provided sorting after default sortings setted', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', doNotSavePrevious);

        sortManager.defaultSortings = [{
            direction: SortDirection.Asc,
            fieldName: 'name'
        } as SortParameter];

        expect(sortManager.sortings.length).eql(1);
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

    it('push newly added sort to the end of sortings array', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', savePrevious);
        sortManager.setSort('name', savePrevious);
        expect(sortManager.sortings.length).eql(2);
        expect(sortManager.sortings[1].fieldName).eql('name');
    });
    it('push toggled sort to the end of sortings array', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', savePrevious);
        sortManager.setSort('name', savePrevious);
        sortManager.setSort('id', savePrevious);
        expect(sortManager.sortings.length).eql(2);
        expect(sortManager.sortings[1].fieldName).eql('id');
    });

    it('set sortings to empty array on dispose', () => {
        const target = toTarget();
        const {sortManager} = target;
        sortManager.setSort('id', savePrevious);
        sortManager.setSort('name', savePrevious);
        sortManager.dispose();
        expect(sortManager.sortings.length).eql(0);
    });

    it('set defaultSortings to empty array on dispose', () => {
        const target = toTargetWithDefault();
        const {sortManager} = target;
        sortManager.dispose();
        expect(sortManager.defaultSortings.length).eql(0);
    });

});
