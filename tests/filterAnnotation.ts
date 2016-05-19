import { expect } from 'chai';
import * as sinon from 'sinon';

import { filter } from '../src/filterAnnotation';
import { FilterManager } from '../src/filterManager';
import { FilterConfig } from '../src/filterConfig';

describe('filterAnnotation', () => {
    it('registers default config', () => {
        class RequestObject {
            @filter
            requestProperty: string;
        }
        let requestObject = new RequestObject();
        let filterManager = new FilterManager(requestObject);
        expect(filterManager.appliedFiltersMap.has(requestObject)).true;
        expect(filterManager.appliedFiltersMap.get(requestObject).length).equal(1);

        let actualConfig = filterManager.appliedFiltersMap.get(requestObject)[0];
        let expectedConfig = FilterConfig.getDefaultConfig('requestProperty');

        expect(actualConfig.coerce).eql(expectedConfig.coerce);
        expect(actualConfig.defaultValue).eql(expectedConfig.defaultValue);
        expect(actualConfig.emptyIsNull).eql(expectedConfig.emptyIsNull);
        expect(actualConfig.ignoreOnAutoMap).eql(expectedConfig.ignoreOnAutoMap);
        expect(actualConfig.parameterName).eql(expectedConfig.parameterName);
        expect(actualConfig.parseFormatter).eql(expectedConfig.parseFormatter);
        expect(actualConfig.persisted).eql(expectedConfig.persisted);
        expect(actualConfig.propertyName).eql(expectedConfig.propertyName);
        expect(actualConfig.serializeFormatter).eql(expectedConfig.serializeFormatter);
    });
});