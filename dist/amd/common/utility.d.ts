export declare class Utility {
    static disposeAll(collection: any[], async?: boolean): void;
    static cloneLiteral(value: any): any;
    static coerceTypes: {
        'true': boolean;
        'false': boolean;
        'null': any;
    };
    static coerceValue(value: any): Object;
}
