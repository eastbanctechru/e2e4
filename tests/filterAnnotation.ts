import { expect } from 'chai';
import { filter } from '../src/filterAnnotation';
import { FilterManager } from '../src/filterManager';
import { FilterConfig } from '../src/filterConfig';
import { IFilterConfig } from '../src/contracts/IFilterConfig';

function parseStub(value: Object): Object { return value; }
function serializeStub(rawValue: Object, allValues?: Object): Object { return rawValue; }

function checkConfigsEquality(expected: IFilterConfig, actual: IFilterConfig): void {
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
    it('registers config in filterManager', () => {
        class RequestObject {
            @filter()
            requestProperty: string;
        }
        expect(FilterManager.filterPropertiesMap.has(RequestObject)).true;
        expect(FilterManager.filterPropertiesMap.get(RequestObject).length).equal(1);
    });
    it('registers default config if no args', () => {
        class RequestObject {
            @filter
            requestProperty: string;
        }
        let actualConfig = FilterManager.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = FilterConfig.getDefaultConfig('requestProperty');
        checkConfigsEquality(actualConfig, expectedConfig);
    });

    it('registers default config with custom parameter name when gets string param', () => {
        class RequestObject {
            @filter('changedName')
            requestProperty: string;
        }
        let actualConfig = FilterManager.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = FilterConfig.getDefaultConfig('requestProperty');
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
            } as IFilterConfig)
            requestProperty: string;
        }

        let actualConfig = FilterManager.filterPropertiesMap.get(RequestObject)[0];
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
});
