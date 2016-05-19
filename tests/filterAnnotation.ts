import { expect } from 'chai';
import { filter } from '../src/filterAnnotation';
import { FilterManager } from '../src/filterManager';
import { FilterConfig } from '../src/filterConfig';
import { IFilterConfig } from '../src/contracts/IFilterConfig';

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
    it('registers default config without params', () => {
        class RequestObject {
            @filter
            requestProperty: string;
        }
        let requestObject = new RequestObject();
        FilterManager.filterPropertiesMap.get(RequestObject);

        expect(FilterManager.filterPropertiesMap.has(RequestObject)).true;
        expect(FilterManager.filterPropertiesMap.get(RequestObject).length).equal(1);

        let actualConfig = FilterManager.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = FilterConfig.getDefaultConfig('requestProperty');
        checkConfigsEquality(actualConfig, expectedConfig);
    });

    it('registers default config without custom parameter name when gets string param', () => {
        class RequestObject {
            @filter('changedName')
            requestProperty: string;
        }
        let requestObject = new RequestObject();
        FilterManager.filterPropertiesMap.get(RequestObject);

        expect(FilterManager.filterPropertiesMap.has(RequestObject)).true;
        expect(FilterManager.filterPropertiesMap.get(RequestObject).length).equal(1);

        let actualConfig = FilterManager.filterPropertiesMap.get(RequestObject)[0];
        let expectedConfig = FilterConfig.getDefaultConfig('requestProperty');
        expectedConfig.parameterName = 'changedName';
        checkConfigsEquality(actualConfig, expectedConfig);
    });
});
