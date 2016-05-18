export class ParseHelper {
    static coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    static coerceValue(value: any): Object {
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = ParseHelper.coerceValue(value[index]);
                }
            }
        } else if (value && !isNaN(value)) {
            value = +value;
        } else if (value === 'undefined') {
            value = undefined;
        } else if (ParseHelper.coerceTypes[value] !== undefined) {
            value = ParseHelper.coerceTypes[value];
        }
        return value;
    }
}
