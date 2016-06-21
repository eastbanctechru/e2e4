import {Defaults} from './common/defaults';
import {IPager} from './contracts/IPager';

export class SimplePager implements IPager {
    public totalCount: number = 0;
    public loadedCount: number = 0;

    public processResponse(result: Object): void {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName] || 0;
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
    }
    public reset(): void {
        this.totalCount = 0;
    }
}
