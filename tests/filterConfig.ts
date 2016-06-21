import { expect } from 'chai';
import { FilterConfig } from '../src/filterConfig';
import { FilterManager } from '../src/filterManager';

describe('FilterConfig', () => {
    it('overrides all properties on create', () => {
        let config = FilterConfig.getDefaultConfig('propertyName');
        config.coerce = !config.coerce;
        config.defaultValue = 'defaultValue';
        config.emptyIsNull = !config.emptyIsNull;
        config.ignoreOnAutoMap = !config.ignoreOnAutoMap;
        config.parameterName = 'parameterName';
        config.parseFormatter = function (proposedValue: any): any { return proposedValue; };
        config.persisted = !config.persisted;
        config.propertyName = 'propertyName';
        config.serializeFormatter = function (): any { return ''; };

        let target = new FilterConfig(config);
        expect(config.coerce).eq(target.coerce);
        expect(config.defaultValue).eq(target.defaultValue);
        expect(config.emptyIsNull).eq(target.emptyIsNull);
        expect(config.ignoreOnAutoMap).eq(target.ignoreOnAutoMap);
        expect(config.parameterName).eq(target.parameterName);
        expect(config.parseFormatter).eq(target.parseFormatter);
        expect(config.persisted).eq(target.persisted);
        expect(config.propertyName).eq(target.propertyName);
        expect(config.serializeFormatter).eq(target.serializeFormatter);
    });
    it('registers config in FilterManager for specified type', () => {
        class TestTarget { }
        let config = FilterConfig.getDefaultConfig('propertyName');
        let target = new FilterConfig(config);
        target.register(TestTarget);
        expect(FilterManager.filterPropertiesMap.has(TestTarget)).true;
        expect(FilterManager.filterPropertiesMap.get(TestTarget)).eql([target]);
    });
});
