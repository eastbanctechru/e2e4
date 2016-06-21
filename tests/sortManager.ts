import { expect } from 'chai';
import { ISortManager } from '../src/contracts/ISortManager';
import { SortParameter } from '../src/common/sortParameter';
import { SortDirection } from '../src/common/sortDirection';
import { SortManager } from '../src/sortManager';
import { FilterManager } from '../src/filterManager';

interface ISortableObject {
    sortManager: ISortManager;
}

class SortableObject implements ISortableObject {
    public sortManager: ISortManager = null;
    constructor() {
        this.sortManager = new SortManager();
    }
}

class ObjectWithDefaultSortings implements ISortableObject {
    public sortManager: ISortManager = null;
    constructor() {
        this.sortManager = new SortManager();
        this.sortManager.defaultSortings = [new SortParameter('id', SortDirection.Asc)];
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
    describe('work with sortings', () => {
        it('has empty default sortings by default', () => {
            const target = toTarget();
            const {sortManager} = target;
            expect(sortManager.defaultSortings.length).eql(0);
        });

        it('can have default sorting', () => {
            const target = toTargetWithDefault();
            const {sortManager} = target;
            expect(sortManager.defaultSortings).eql([new SortParameter('id', SortDirection.Asc)]);
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

        it('set default sortings to empty array instead of null', () => {
            const target = toTarget();
            const {sortManager} = target;
            sortManager.defaultSortings = null;
            expect(sortManager.defaultSortings.length).eql(0);
        });
        it('deeply clone default sortings to sortings', () => {
            const target = toTargetWithDefault();
            const {sortManager} = target;

            expect(sortManager.defaultSortings).not.equal(sortManager.sortings);
            expect(sortManager.defaultSortings).eql(sortManager.sortings);

            let filterManager = new FilterManager(sortManager);
            sortManager.setSort('name', doNotSavePrevious);
            filterManager.resetValues();

            expect(sortManager.defaultSortings).not.equal(sortManager.sortings);
            expect(sortManager.defaultSortings).eql(sortManager.sortings);
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
    });
    describe('on dispose', () => {
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

    describe('as filter target', () => {
        it('parse invalid params object as empty array', () => {
            const target = toTarget();
            const {sortManager} = target;
            let filterManager = new FilterManager(sortManager);
            let params = { sort: { direction: SortDirection.Desc, fieldName: 'id' } };
            filterManager.applyParams(params);
            expect(sortManager.sortings.length).equal(0);
        });
        it('parse params object to correct sortings array', () => {
            const target = toTarget();
            const {sortManager} = target;
            let filterManager = new FilterManager(sortManager);
            let params = { sort: [{ direction: SortDirection.Desc, fieldName: 'id' }, { direction: SortDirection.Desc, fieldName: 'name' }] };
            filterManager.applyParams(params);
            expect(sortManager.sortings.length).equal(2);
            expect(sortManager.sortings[0].fieldName).eql(params.sort[0].fieldName);
            expect(sortManager.sortings[0].direction).eql(params.sort[0].direction);
            expect(sortManager.sortings[1].fieldName).eql(params.sort[1].fieldName);
            expect(sortManager.sortings[1].direction).eql(params.sort[1].direction);
            expect(sortManager.sortings).not.equal(params.sort);
        });
    });
});
