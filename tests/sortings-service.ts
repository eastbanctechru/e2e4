import { FilterConfig } from '../src/contracts/filter-config';
import { FiltersService } from '../src/filters-service';
import { SortDirection, SortParameter, SortingsService } from '../src/sortings-service';

import { expect } from 'chai';

class SortableObject {
    public sortingsService: SortingsService = null;
    constructor() {
        this.sortingsService = new SortingsService();
    }
}

class ObjectWithDefaultSortings implements SortableObject {
    public sortingsService: SortingsService = null;
    constructor() {
        this.sortingsService = new SortingsService();
        this.sortingsService.defaultSortings = [{ direction: SortDirection.Asc, fieldName: 'id' }];
    }
}

function toTarget(): SortableObject {
    return new SortableObject();
}

function toTargetWithDefault(): SortableObject {
    return new ObjectWithDefaultSortings();
}

const savePrevious = true;
const doNotSavePrevious = false;

describe('SortingsService', () => {
    describe('work with sortings', () => {
        it('has empty default sortings by default', () => {
            const target = toTarget();
            const {sortingsService} = target;
            expect(sortingsService.defaultSortings.length).eql(0);
        });

        it('can have default sorting', () => {
            const target = toTargetWithDefault();
            const {sortingsService} = target;
            expect(sortingsService.defaultSortings).eql([{ direction: SortDirection.Asc, fieldName: 'id' }]);
            sortingsService.setSort('id', doNotSavePrevious);

            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Desc);
        });

        it('can add sorting', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', doNotSavePrevious);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);
        });

        it('change empty sortings to setted default sortings', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.defaultSortings = [{
                direction: SortDirection.Desc,
                fieldName: 'name'
            } as SortParameter];

            expect(sortingsService.sortings.length).eql(1);
            expect(sortingsService.sortings[0].fieldName).eql('name');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Desc);
        });

        it('doesn\'t change provided sorting after default sortings setted', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', doNotSavePrevious);

            sortingsService.defaultSortings = [{
                direction: SortDirection.Asc,
                fieldName: 'name'
            } as SortParameter];

            expect(sortingsService.sortings.length).eql(1);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);
        });

        it('set default sortings to empty array instead of null', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.defaultSortings = null;
            expect(sortingsService.defaultSortings.length).eql(0);
        });
        it('deeply clone default sortings to sortings', () => {
            const target = toTargetWithDefault();
            const {sortingsService} = target;

            expect(sortingsService.defaultSortings).not.equal(sortingsService.sortings);
            expect(sortingsService.defaultSortings).eql(sortingsService.sortings);

            let filtersService = new FiltersService(sortingsService);
            sortingsService.setSort('name', doNotSavePrevious);
            filtersService.resetValues();

            expect(sortingsService.defaultSortings).not.equal(sortingsService.sortings);
            expect(sortingsService.defaultSortings).eql(sortingsService.sortings);
        });

        it('can persist sortings', () => {
            const target = toTargetWithDefault();
            const {sortingsService} = target;
            const filtersService = new FiltersService(sortingsService);
            sortingsService.persistSortings = true;
            let persistedState = filtersService.getRequestState((config: FilterConfig) => !!config.persisted);
            expect(persistedState).eql(filtersService.getRequestState());
            sortingsService.persistSortings = false;
            persistedState = filtersService.getRequestState((config: FilterConfig) => !!config.persisted);
            expect(persistedState).eql({});
        });

        it('can save previous sorting', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', doNotSavePrevious);
            sortingsService.setSort('name', savePrevious);
            expect(sortingsService.sortings.length).eql(2);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);
            expect(sortingsService.sortings[1].fieldName).eql('name');
            expect(sortingsService.sortings[1].direction).eql(SortDirection.Asc);
        });

        it('can reset previous sorting', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', doNotSavePrevious);
            expect(sortingsService.sortings.length).eql(1);
            expect(sortingsService.sortings[0].fieldName).eql('name');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);
        });

        it('repeated set sort toggles sort direction', () => {
            const target = toTarget();
            const {sortingsService} = target;

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Desc);

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).eql('id');
            expect(sortingsService.sortings[0].direction).eql(SortDirection.Asc);
        });

        it('push newly added sort to the end of sortings array', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            expect(sortingsService.sortings.length).eql(2);
            expect(sortingsService.sortings[1].fieldName).eql('name');
        });
        it('push toggled sort to the end of sortings array', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings.length).eql(2);
            expect(sortingsService.sortings[1].fieldName).eql('id');
        });
    });
    describe('on destroy', () => {
        it('set sortings to empty array on destroy', () => {
            const target = toTarget();
            const {sortingsService} = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            sortingsService.destroy();
            expect(sortingsService.sortings.length).eql(0);
        });

        it('set defaultSortings to empty array on destroy', () => {
            const target = toTargetWithDefault();
            const {sortingsService} = target;
            sortingsService.destroy();
            expect(sortingsService.defaultSortings.length).eql(0);
        });
    });

    describe('as filter target', () => {
        it('parse invalid params object as empty array', () => {
            const target = toTarget();
            const {sortingsService} = target;
            let filtersService = new FiltersService(sortingsService);
            let params = { sortings: { direction: SortDirection.Desc, fieldName: 'id' } };
            filtersService.applyParams(params);
            expect(sortingsService.sortings.length).equal(0);
        });
        it('parse params object to correct sortings array', () => {
            const target = toTarget();
            const {sortingsService} = target;
            let filtersService = new FiltersService(sortingsService);
            let params = { sortings: [{ direction: SortDirection.Desc, fieldName: 'id' }, { direction: SortDirection.Desc, fieldName: 'name' }] };
            filtersService.applyParams(params);
            expect(sortingsService.sortings.length).equal(2);
            expect(sortingsService.sortings[0].fieldName).eql(params.sortings[0].fieldName);
            expect(sortingsService.sortings[0].direction).eql(params.sortings[0].direction);
            expect(sortingsService.sortings[1].fieldName).eql(params.sortings[1].fieldName);
            expect(sortingsService.sortings[1].direction).eql(params.sortings[1].direction);
            expect(sortingsService.sortings).not.equal(params.sortings);
        });
    });
});
