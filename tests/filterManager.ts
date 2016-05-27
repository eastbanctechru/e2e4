import { expect } from 'chai';
import * as sinon from 'sinon';
import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';
import { FilterConfig } from '../src/filterConfig';
import { IFilterConfig } from '../src/contracts/IFilterConfig';

describe('FilterManager', () => {
    afterEach(() => {
        FilterManager.filterPropertiesMap.clear();
    });

    describe('configs registration', () => {

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
    describe('persistance management', () => {
        it('includes only \'persisted\' filters to persisted state', () => {
            class TargetType {
                @filter({ persisted: true } as IFilterConfig)
                first = 'first';
                @filter
                second = 'second';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let persistedState = filterManager.getPersistedState();
            expect(persistedState.first).eq(target.first);
            expect(persistedState.second).undefined;
        });

        it('calls \'toRequest\' method on filter if defined', () => {

            class TargetType {
                @filter({ persisted: true } as IFilterConfig)
                first = { toRequest: sinon.spy(() => { return 'first'; }) };
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let persistedState = filterManager.getPersistedState();
            expect(target.first.toRequest.calledOnce).true;
            expect(persistedState.first).eq(target.first.toRequest());
        });

        it('calls \'serializeFormatter\' method of config if defined', () => {
            let serializeSpy = sinon.spy(() => { return 'first'; });
            class TargetType {
                @filter({ persisted: true, serializeFormatter: serializeSpy } as IFilterConfig)
                first = 'first';
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let persistedState = filterManager.getPersistedState();
            expect(serializeSpy.calledOnce).true;
            expect(persistedState.first).eq(serializeSpy());
        });

        it('handles emptyIsNullFlag', () => {
            let cfg = { emptyIsNull: true, persisted: true } as IFilterConfig;
            class TargetType {
                @filter(cfg)
                zero = 0;

                @filter(cfg)
                emptyString = '';

                @filter(cfg)
                nullProperty = null;

                @filter(cfg)
                undefinedProperty = undefined;

                @filter(cfg)
                falseProperty = false;
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let requestState = filterManager.getPersistedState();
             expect(requestState.zero).null;
             expect(requestState.emptyString).null;
             expect(requestState.nullProperty).null;
             expect(requestState.undefinedProperty).null;
             expect(requestState.falseProperty).null;
        });
    });
});
