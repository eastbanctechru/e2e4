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
    public totalCountParameterName: string = RegularPager.settings.totalCountParameterName;
    public loadedCountParameterName: string = RegularPager.settings.loadedCountParameterName;

    public processResponse(result: Object): void {
        this.loadedCount = result[this.loadedCountParameterName] || 0;
        this.totalCount = result[this.totalCountParameterName] || 0;
    }
    public reset(): void {
        this.totalCount = 0;
    }
}
