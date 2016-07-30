import {Pager} from './contracts/pager';

export class RegularPager implements Pager {
    public static settings: any =
    {
        loadedCountParameterName: 'loadedCount',
        totalCountParameterName: 'totalCount'
    };
    public appendedOnLoad: boolean = false;
    public totalCount: number = 0;
    public loadedCount: number = 0;

    public processResponse(result: Object): void {
        this.loadedCount = result[RegularPager.settings.loadedCountParameterName] || 0;
        this.totalCount = result[RegularPager.settings.totalCountParameterName] || 0;
    }
    public reset(): void {
        this.totalCount = 0;
    }
}
