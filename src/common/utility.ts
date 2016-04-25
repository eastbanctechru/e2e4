export class Utility {
    /* tslint:disable:no-any */
    static disposeAll(collection: any[], async: boolean = true): void {
        /* tslint:enable:no-any */
        if (!collection) {
            return;
        }
        async = async === undefined ? true : async;
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
    static formatString(format: string, ...args: any[]): string {
        let s = arguments[0];
        for (let i = 0; i < arguments.length - 1; i++) {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
}
