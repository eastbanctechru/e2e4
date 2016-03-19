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
}
