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
    static formatString(format: string, ...args: any[]): string {
        let s = arguments[0];
        for (let i = 0; i < arguments.length - 1; i++) {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
}
