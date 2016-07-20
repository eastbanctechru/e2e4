import {Defaults} from './common/defaults';
import {Pager} from './contracts/pager';

export class SimplePager implements Pager {
    public appendedOnLoad: boolean = false;
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
