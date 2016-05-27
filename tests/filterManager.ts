import { expect, assert } from 'chai';
import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';
import { FilterConfig } from '../src/filterConfig';

describe('FilterManager', () => {
    afterEach(() => {
        FilterManager.filterPropertiesMap.clear();
    });

    describe('Configs rgistration', () => {

        it('registers filter config for type', () => {
            class TargetType { };
            const config = FilterConfig.getDefaultConfig('propertyName');
            FilterManager.registerFilter(TargetType, config);
            expect(FilterManager.filterPropertiesMap.has(TargetType)).true;
            expect(FilterManager.filterPropertiesMap.get(TargetType)).eql([config]);

        });

        it('registers multiple filter configs for type', () => {
            class TargetType { };
            const config = FilterConfig.getDefaultConfig('propertyName');
            const anotherConfig = FilterConfig.getDefaultConfig('anotherPropertyName');

            FilterManager.registerFilter(TargetType, config);
            FilterManager.registerFilter(TargetType, anotherConfig);

            expect(FilterManager.filterPropertiesMap.has(TargetType)).true;
            expect(FilterManager.filterPropertiesMap.get(TargetType)).eql([config, anotherConfig]);
        });

        it('builds filters map for target object', () => {
            class TargetType {
                @filter
                first = 'first';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            expect(filterManager.appliedFiltersMap.has(target)).true;
            expect(filterManager.appliedFiltersMap.get(target).length).eql(1);
        });

        it('builds filters map for target object with multiple filters', () => {
            class TargetType {
                @filter
                first = 'first';
                @filter
                second = 'second';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            expect(filterManager.appliedFiltersMap.has(target)).true;
            expect(filterManager.appliedFiltersMap.get(target).length).eql(2);
        });

        it('builds filters map for inheritant objects', () => {
            class TargetTypeParent {
                @filter
                parent = 'parent property';
            }
            class TargetTypeChild extends TargetTypeParent {
                @filter
                child = 'child property';
            }
            let target = new TargetTypeChild();
            let filterManager = new FilterManager(target);
            expect(filterManager.appliedFiltersMap.has(target)).true;
            expect(filterManager.appliedFiltersMap.get(target).length).eql(2);
            expect(filterManager.appliedFiltersMap.get(target)[0].propertyName).eql('parent');
            expect(filterManager.appliedFiltersMap.get(target)[1].propertyName).eql('child');
        });

        it('can compose additional objects in filters map', () => {
            class TargetType {
                @filter
                property = 'property';
            }
            class AnotherTargetType {
                @filter
                anotehrProperty = 'another property';
            }
            let target = new TargetType();
            let anotherTarget = new AnotherTargetType();

            let filterManager = new FilterManager(target);
            filterManager.registerFilterTarget(anotherTarget);

            expect(filterManager.appliedFiltersMap.has(target)).true;
            expect(filterManager.appliedFiltersMap.get(target).length).eql(1);

            expect(filterManager.appliedFiltersMap.has(anotherTarget)).true;
            expect(filterManager.appliedFiltersMap.get(anotherTarget).length).eql(1);
        });

        it('handles multiple registrations of same target', () => {
            class TargetType {
                @filter
                first: 'first';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);

            filterManager.registerFilterTarget(target);

            expect(filterManager.appliedFiltersMap.has(target)).true;
            expect(filterManager.appliedFiltersMap.get(target).length).eql(1);
        });

        it('ignores targets without filters', () => {
            class TargetType {
                first: 'first';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            filterManager.registerFilterTarget(target);

            expect(filterManager.appliedFiltersMap.has(target)).false;
        });

        it('clears targets on dispose', () => {
            class TargetType {
                @filter
                first: 'first';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            expect(filterManager.appliedFiltersMap.has(target)).true;
            filterManager.dispose();
            expect(filterManager.appliedFiltersMap.has(target)).false;
        });
    });
});
