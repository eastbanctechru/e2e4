import { ProgressState } from './progress-state';

/**
 * Represents state of operation that must be displayed on UI inside {@link StateTrackingService}. 
 */
export class Operation {
    /**
     * Settings for names of css classes that are relevant to {@link status} value.
     * This settings is used by {@link className} property and changing of this settings affects every object of {@link Operation} type.
     */
    // tslint:disable-next-line: typedef
    public static settings = {
        /**
         * Name of css class that corresponds to {@link ProgressState.Done}.
         */
        statusDoneClassName: 'status-done',
        /**
         * Name of css class that corresponds to {@link ProgressState.Fail}.
         */
        statusFailClassName: 'status-fail',
        /**
         * Name of css class that corresponds to {@link ProgressState.Progress}.
         */
        statusProgressClassName: 'status-progress'
    };
    /**
     * Identifier that was returned by `setTimeout` method.
     * Used to track object in {@link StateTrackingService}
     */
    public sid: number;
    /**
     * Current progress state.
     */
    public status: ProgressState;
    /**
     * Description that will be displayed on UI.
     */
    public title: string;
    /**
     * @param status value for {@link status} property.  
     * @param title value for {@link title} property.
     */
    constructor(status: ProgressState, title: string) {
        this.status = status;
        this.title = title;
    }
    /**
     * Returns class name from {@link Operation.settings} that corresponds to current {@link status} value.
     */
    public get className(): string {
        switch (this.status) {
            case ProgressState.Done:
                return Operation.settings.statusDoneClassName;
            case ProgressState.Progress:
                return Operation.settings.statusProgressClassName;
            case ProgressState.Fail:
                return Operation.settings.statusFailClassName;
            default:
                return '';
        }
    }
}
