import { expect } from 'chai';
import { SortParameter } from '../../src/common/sortParameter';
import { SortDirection } from '../../src/common/sortDirection';

describe('SortParameter', () => {
    it('creates new SortParameter with default ASC direction', () => {
        const parameter = new SortParameter('field');

        expect(parameter.fieldName).eql('field');
        expect(parameter.direction).eql(SortDirection.Asc);
    });

    it('creates new SortParameter with arbitrary direction', () => {
        const descParam = new SortParameter('field', SortDirection.Desc);
        const ascParam = new SortParameter('field', SortDirection.Asc);

        expect(descParam.fieldName).eql('field');
        expect(descParam.direction).eql(SortDirection.Desc);

        expect(ascParam.fieldName).eql('field');
        expect(ascParam.direction).eql(SortDirection.Asc);
    });

    it('toggles direction', () => {
        const parameter = new SortParameter('field');
        expect(parameter.direction).eql(SortDirection.Asc);

        parameter.toggleDirection();
        expect(parameter.direction).eql(SortDirection.Desc);

        parameter.toggleDirection();
        expect(parameter.direction).eql(SortDirection.Asc);
    });

    it('returns request object', () => {
        const parameter = new SortParameter('field');
        const requestObj = parameter.toRequest();

        expect(requestObj).eql({ direction: SortDirection.Asc, fieldName: 'field' });
    });
});
