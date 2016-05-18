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
}
