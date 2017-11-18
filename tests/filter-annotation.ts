// tslint:disable:max-classes-per-file no-unused-expression
import { DefaultFilterConfig, filter, FilterConfig, FiltersService, getDefaultFilterConfig } from '../index';

import { expect } from 'chai';

function parseStub(value: object): object {
    return value;
}
function serializeStub(rawValue: object): object {
    return rawValue;
}
function checkConfigsEquality(expected: FilterConfig, actual: FilterConfig): void {
    expect(actual.coerce).eql(expected.coerce);
    expect(actual.defaultValue).eql(expected.defaultValue);
    expect(actual.emptyIsNull).eql(expected.emptyIsNull);
    expect(actual.ignoreOnAutoMap).eql(expected.ignoreOnAutoMap);
    expect(actual.parameterName).eql(expected.parameterName);
    expect(actual.parseFormatter).eql(expected.parseFormatter);
    expect(actual.propertyName).eql(expected.propertyName);
    expect(actual.serializeFormatter).eql(expected.serializeFormatter);
}

describe('getDefaultFilterConfig', () => {
    it('builds config based on DefaultFilterConfig with applied propertyName', () => {
        const actualConfig = getDefaultFilterConfig('requestProperty');

        const expectedConfig = {
            coerce: DefaultFilterConfig.coerce,
            defaultValue: DefaultFilterConfig.defaultValue,
            emptyIsNull: DefaultFilterConfig.emptyIsNull,
            ignoreOnAutoMap: DefaultFilterConfig.ignoreOnAutoMap,
            parameterName: 'requestProperty',
            parseFormatter: DefaultFilterConfig.parseFormatter,
            propertyName: 'requestProperty',
            serializeFormatter: DefaultFilterConfig.serializeFormatter
        } as FilterConfig;

        checkConfigsEquality(actualConfig, expectedConfig);
    });
    it('When DefaultFilterConfig properties are changed it builds config with corresponding value', () => {
        let config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).equal(DefaultFilterConfig.coerce);

        DefaultFilterConfig.coerce = !DefaultFilterConfig.coerce;
        config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).equal(DefaultFilterConfig.coerce);

        DefaultFilterConfig.coerce = !DefaultFilterConfig.coerce;
        config = getDefaultFilterConfig('requestProperty');
        expect(config.coerce).equal(DefaultFilterConfig.coerce);
    });
});
describe('filterAnnotation', () => {
    it('registers config in filtersService', () => {
        class RequestObject {
            @filter() public requestProperty: string;
        }
        expect(FiltersService.filterPropertiesMap.has(RequestObject)).true;
        expect(FiltersService.filterPropertiesMap.get(RequestObject).length).equal(1);
    });
    it('registers default config if no args', () => {
        class RequestObject {
            @filter() public requestProperty: string;
        }
        const actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = getDefaultFilterConfig('requestProperty');
        checkConfigsEquality(actualConfig, expectedConfig);
    });

    it('registers default config with custom parameter name when gets string param', () => {
        class RequestObject {
            @filter('changedName') public requestProperty: string;
        }
        const actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = getDefaultFilterConfig('requestProperty');
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
                propertyName: 'customName',
                serializeFormatter: serializeStub
            } as FilterConfig)
            public requestProperty: string;
        }

        const actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        const expectedConfig = {
            coerce: false,
            defaultValue: 1,
            emptyIsNull: true,
            ignoreOnAutoMap: true,
            parameterName: 'customName',
            parseFormatter: parseStub,
            propertyName: 'customName',
            serializeFormatter: serializeStub
        };
        checkConfigsEquality(actualConfig, expectedConfig);
    });
    it('overrides all properties on create', () => {
        const config = getDefaultFilterConfig('propertyName');
        config.coerce = !config.coerce;
        config.defaultValue = 'defaultValue';
        config.emptyIsNull = !config.emptyIsNull;
        config.ignoreOnAutoMap = !config.ignoreOnAutoMap;
        config.parameterName = 'parameterName';
        config.parseFormatter = (proposedValue: any) => proposedValue;
        config.propertyName = 'propertyName';
        config.serializeFormatter = () => '';

        class RequestObject {
            @filter(config) public requestProperty: string;
        }

        const actualConfig = FiltersService.filterPropertiesMap.get(RequestObject)[0];
        expect(config.coerce).eq(actualConfig.coerce);
        expect(config.defaultValue).eq(actualConfig.defaultValue);
        expect(config.emptyIsNull).eq(actualConfig.emptyIsNull);
        expect(config.ignoreOnAutoMap).eq(actualConfig.ignoreOnAutoMap);
        expect(config.parameterName).eq(actualConfig.parameterName);
        expect(config.parseFormatter).eq(actualConfig.parseFormatter);
        expect(config.propertyName).eq(actualConfig.propertyName);
        expect(config.serializeFormatter).eq(actualConfig.serializeFormatter);
    });
});
