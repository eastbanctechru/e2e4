export class Utility {
    static disposeAll(collection: any[], async: boolean = true): void {
        if (!Array.isArray(collection)) {
            return;
        }
        let items = collection.splice(0, collection.length);

        if (async) {
            setTimeout(() => {
                items.forEach(item => {
                    if (item.dispose) {
                        item.dispose();
                    }
                });
                items = null;
            }, 0);

        } else {
            items.forEach(item => {
                if (item.dispose) {
                    item.dispose();
                }
            });
        }
    }
    static cloneLiteral(value: any): any {
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return undefined;
        }
        if (Array.isArray(value)) {
            return value.map(i => Utility.cloneLiteral(i));
        }
        if (typeof value === 'object') {
            let result = {};
            for (let index in value) {
                if (value.hasOwnProperty(index) && (typeof value[index] !== 'function')) {
                    result[index] = Utility.cloneLiteral(value[index]);
                }
            }
            return result;
        }
        return value;
    }
    static coerceTypes = { 'true': !0, 'false': !1, 'null': null };
    static coerceValue(value: any): any {
        if (value === null) {
            return null;
        }
        if (value === undefined) {
            return undefined;
        }
        if (typeof value === 'object' || Array.isArray(value)) {
            for (let index in value) {
                if (value.hasOwnProperty(index)) {
                    value[index] = Utility.coerceValue(value[index]);
                }
            }
        } else if (value && !isNaN(value)) {
            value = +value;
        } else if (value === 'undefined') {
            value = undefined;
        } else if (Utility.coerceTypes[value] !== undefined) {
            value = Utility.coerceTypes[value];
        }
        return value;
    }
}
