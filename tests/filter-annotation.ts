import { expect } from 'chai';
import { filter, getDefaultFilterConfig } from '../src/filter-annotation';
import { FiltersService } from '../src/filters-service';
import { FilterConfig } from '../src/contracts/filter-config';

function parseStub(value: Object): Object { return value; }
function serializeStub(rawValue: Object): Object { return rawValue; }
function checkConfigsEquality(expected: FilterConfig, actual: FilterConfig): void {
    expect(actual.coerce).eql(expected.coerce);
    expect(actual.defaultValue).eql(expected.defaultValue);
    expect(actual.emptyIsNull).eql(expected.emptyIsNull);
    expect(actual.ignoreOnAutoMap).eql(expected.ignoreOnAutoMap);
    expect(actual.parameterName).eql(expected.parameterName);
    expect(actual.parseFormatter).eql(expected.parseFormatter);
    expect(actual.persisted).eql(expected.persisted);
    expect(actual.propertyName).eql(expected.propertyName);
    expect(actual.serializeFormatter).eql(expected.serializeFormatter);
}

describe('filterAnnotation', () => {
    it('registers config in filtersService', () => {
        class RequestObject {
            @filter()
            public requestProperty: string;
        }
        expect(FiltersService.filterPropertiesMap.has(RequestObject)).true;
        expect(FiltersService.filterPropertiesMap.get(RequestObject).length).equal(1);
    });
    it('registers default config if no args', () => {
        class RequestObject {
            @filter
            public requestProperty: string;
        }
        let actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = getDefaultFilterConfig('requestProperty');
        checkConfigsEquality(actualConfig, expectedConfig);
    });

    it('registers default config with custom parameter name when gets string param', () => {
        class RequestObject {
            @filter('changedName')
            public requestProperty: string;
        }
        let actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = getDefaultFilterConfig('requestProperty');
        expectedConfig.parameterName = 'changedName';
        checkConfigsEquality(actualConfig, expectedConfig);
    });
    it('registers custom config with object parameter', () => {
        class RequestObject {
            @filter({
                coerce: false,
                defaultValue: 1,
                emptyIsNull: true,
                ignoreOnAutoMap: true,
                parameterName: 'customName',
                parseFormatter: parseStub,
                persisted: true,
                propertyName: 'customName',
                serializeFormatter: serializeStub
            } as FilterConfig)
            public requestProperty: string;
        }

        let actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = {
            coerce: false,
            defaultValue: 1,
            emptyIsNull: true,
            ignoreOnAutoMap: true,
            parameterName: 'customName',
            parseFormatter: parseStub,
            persisted: true,
            propertyName: 'customName',
            serializeFormatter: serializeStub
        };
        checkConfigsEquality(actualConfig, expectedConfig);
    });
    it('overrides all properties on create', () => {

        let config = getDefaultFilterConfig('propertyName');
        config.coerce = !config.coerce;
        config.defaultValue = 'defaultValue';
        config.emptyIsNull = !config.emptyIsNull;
        config.ignoreOnAutoMap = !config.ignoreOnAutoMap;
        config.parameterName = 'parameterName';
        config.parseFormatter = function (proposedValue: any): any { return proposedValue; };
        config.persisted = !config.persisted;
        config.propertyName = 'propertyName';
        config.serializeFormatter = function (): any { return ''; };

        class RequestObject {
            @filter(config)
            public requestProperty: string;
        }

        let actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        expect(config.coerce).eq(actualConfig.coerce);
        expect(config.defaultValue).eq(actualConfig.defaultValue);
        expect(config.emptyIsNull).eq(actualConfig.emptyIsNull);
        expect(config.ignoreOnAutoMap).eq(actualConfig.ignoreOnAutoMap);
        expect(config.parameterName).eq(actualConfig.parameterName);
        expect(config.parseFormatter).eq(actualConfig.parseFormatter);
        expect(config.persisted).eq(actualConfig.persisted);
        expect(config.propertyName).eq(actualConfig.propertyName);
        expect(config.serializeFormatter).eq(actualConfig.serializeFormatter);
    });
});
