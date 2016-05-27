import { expect } from 'chai';
import * as sinon from 'sinon';
import { FilterManager } from '../src/filterManager';
import { filter } from '../src/filterAnnotation';
import { FilterConfig } from '../src/filterConfig';
import { IFilterConfig } from '../src/contracts/IFilterConfig';
import { Utility } from '../src/common/utility';

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
                anotherProperty = 'another property';
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

        it('applies default values on registration', () => {
            class TargetType {
                @filter
                property = 'property';
            }
            class AnotherTargetType {
                @filter
                anotherProperty = 'another property';
            }

            let target = new TargetType();
            let anotherTarget = new AnotherTargetType();
            let filterManager = new FilterManager(target);
            filterManager.registerFilterTarget(anotherTarget);

            expect(filterManager.appliedFiltersMap.get(target)[0].defaultValue).eq(target.property);
            expect(filterManager.appliedFiltersMap.get(anotherTarget)[0].defaultValue).eq(anotherTarget.anotherProperty);
        });

        it('clones default values on registrtaion', () => {
            class TargetType {
                @filter
                property = ['one', 'two', 'three'];
            }

            let target = new TargetType();
            let filterManager = new FilterManager(target);
            expect(filterManager.appliedFiltersMap.get(target)[0].defaultValue).eql(target.property);
            expect(filterManager.appliedFiltersMap.get(target)[0].defaultValue).not.eq(target.property);
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
    describe('parameters building', () => {
        it('includes \'persisted\' filters to persisted state and all filters to requestState', () => {
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
            let requestState = filterManager.getRequestState();
            expect(requestState.first).eq(target.first);
            expect(requestState.second).eq(target.second);
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

            let requestState = filterManager.getRequestState();
            expect(target.first.toRequest.calledTwice).true;

            expect(persistedState.first).eq(target.first.toRequest());
            expect(requestState.first).eq(target.first.toRequest());
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

            let persistedState = filterManager.getPersistedState();
            expect(persistedState.zero).null;
            expect(persistedState.emptyString).null;
            expect(persistedState.nullProperty).null;
            expect(persistedState.undefinedProperty).null;
            expect(persistedState.falseProperty).null;

            let requestState = filterManager.getRequestState();
            expect(requestState.zero).null;
            expect(requestState.emptyString).null;
            expect(requestState.nullProperty).null;
            expect(requestState.undefinedProperty).null;
            expect(requestState.falseProperty).null;
        });
        it('handles arrays', () => {
            let toRequestSpy = sinon.spy(() => { return 'first'; });
            class TargetType {
                @filter({ persisted: true } as IFilterConfig)
                arrayProperty = [{ toRequest: toRequestSpy }, 'first'];
            }

            let target = new TargetType();
            let filterManager = new FilterManager(target);

            let persistedState = filterManager.getPersistedState();
            expect(persistedState.arrayProperty).eql(['first', 'first']);
            expect(toRequestSpy.calledOnce).true;

            let requestState = filterManager.getRequestState();
            expect(requestState.arrayProperty).eql(['first', 'first']);
            expect(toRequestSpy.calledTwice).true;
        });
    });
    describe('parameters parsing', () => {
        it('apply coerced values by default', () => {
            class TargetType {
                @filter
                booleanProperty: any;
                @filter
                nullProperty: any;
                @filter
                numberProperty: number;
                @filter
                stringProperty: string;
                @filter
                undefinedProperty: any;
            }

            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let params = {
                booleanProperty: 'false',
                nullProperty: 'null',
                numberProperty: '5',
                stringProperty: 'value',
                undefinedProperty: 'undefined'
            };
            let coercedParams = Utility.coerceValue(Utility.cloneLiteral(params));
            filterManager.parseParams(params);
            expect(target).eql(coercedParams);
        });

        it('doesn\'t coerce values if specified', () => {
            let cfg = { coerce: false } as IFilterConfig;
            class TargetType {
                @filter(cfg)
                booleanProperty: any;
                @filter(cfg)
                nullProperty: any;
                @filter(cfg)
                numberProperty: number;
                @filter(cfg)
                stringProperty: string;
                @filter(cfg)
                undefinedProperty: any;
            }

            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let params = {
                booleanProperty: 'false',
                nullProperty: 'null',
                numberProperty: '5',
                stringProperty: 'value',
                undefinedProperty: 'undefined'
            };
            filterManager.parseParams(params);
            expect(target).eql(params);
        });

        it('skip if ignoreOnAutoMap setted to true', () => {
            class TargetType {
                @filter({ ignoreOnAutoMap: true } as IFilterConfig)
                ignoredProperty: 'old value';
                @filter
                mappedProperty: 'old value';
            }

            let target = new TargetType();
            let filterManager = new FilterManager(target);
            let params = {
                ignoredProperty: 'new value',
                mappedProperty: 'new value'
            };
            filterManager.parseParams(params);
            expect(target.ignoredProperty).not.eql(params.ignoredProperty);
            expect(target.mappedProperty).eql(params.mappedProperty);
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
                falseProperty = false;
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);

            let params = {
                emptyString: '',
                falseProperty: false,
                nullProperty: null,
                zero: 0
            };

            filterManager.parseParams(params);
            expect(target.zero).null;
            expect(target.emptyString).null;
            expect(target.nullProperty).null;
            expect(target.falseProperty).null;
        });
        it('calls parseFormatter', () => {
            let parseSpy = sinon.spy((value) => { return 'parsed ' + value; });

            class TargetType {
                @filter({ parseFormatter: parseSpy } as IFilterConfig)
                value: string;
            }
            let target = new TargetType();
            let filterManager = new FilterManager(target);

            let params = {
                value: 'value'
            };
            filterManager.parseParams(params);

            expect(parseSpy.calledOnce).true;
            expect(target.value).eql(parseSpy(params.value));
        });
    });
});
