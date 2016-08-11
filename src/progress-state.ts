/**
 * Represents possible values for progress state of any operation (request to the server, for example).  
 */
export enum ProgressState {
    /**
     * Nothing was performed before.
     */
    Initial = 0,
    /**
     * Last operation completed successfully.
     */
    Done = 1,
    /**
     * Operation is performing right now.  
     */
    Progress = 2,
    /**
     * Last operation completed with failure.  
     */
    Fail = 3,
    /**
     * Last operation was cancelled.
     */
    Cancelled = 4
}
