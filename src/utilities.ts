/**
 * Выполняет копирование всех свойств переданного объекта в новый объект. В случае, если свойство так же является объектом, то выполняется рекурсивное копирование всех его свойств. 
 * Функции при переборе свойств игнорируются.
 * @param value значение, которое необходимо склонировать.
 * @returns полученный результат клонирования. 
 */
export function cloneAsLiteral(value: any): any {
    if (value === null) {
        return null;
    }
    if (value === undefined) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.map((i: any) => cloneAsLiteral(i));
    }
    if (typeof value === 'object') {
        let result = {};
        for (let index in value) {
            if (value.hasOwnProperty(index) && (typeof value[index] !== 'function')) {
                result[index] = cloneAsLiteral(value[index]);
            }
        }
        return result;
    }
    return value;
}

/**
 * Коллекция значений, которые используются для принудительного приведения типов методом {@link coerceValue}. 
 */
export var coerceTypes: any = { 'true': !0, 'false': !1, 'null': null };

/**
 * Выполняет принудительное приведение типа для переданного параметра.
 * Например, строка 'null' будет преобразована в значение null, 'true' в булево значение true, '1.0' в число 1.0 и т.д.
 * В случае, если передан составной объект или массив, метод будет вызван рекурсивно для всех вложенных свойств или элементов массива.
 * @param value значение для обработки.
 * @returns полученный результат приведения типа.
 * @see {@link coerceTypes}
 */
export function coerceValue(value: any): any {
    if (value === null) {
        return null;
    }
    if (value === undefined) {
        return undefined;
    }
    if (typeof value === 'object' || Array.isArray(value)) {
        for (let index in value) {
            if (value.hasOwnProperty(index)) {
                value[index] = coerceValue(value[index]);
            }
        }
    } else if (value && !isNaN(value)) {
        value = +value;
    } else if (value === 'undefined') {
        value = undefined;
    } else if (coerceTypes[value] !== undefined) {
        value = coerceTypes[value];
    }
    return value;
}
/**
 * Выполняет splice переданного массива, тем самым очищая его.
 * Далее, каждый элемент исходного массива оценивается на наличие метода dispose и, если таковой имеется, то он вызывается.
 * @param collection массив, элементы которого необходимо уничтожить.
 * @param async если true, то перебор элементов и вызов dispose будет вызван через setTimeout (,0).
 */
export function disposeAll(collection: any[], async: boolean = true): void {
    if (!Array.isArray(collection)) {
        return;
    }
    let items = collection.splice(0, collection.length);

    if (async) {
        setTimeout(() => {
            items.forEach((item: any) => {
                if (item.dispose) {
                    item.dispose();
                }
            });
            items = null;
        }, 0);

    } else {
        items.forEach((item: any) => {
            if (item.dispose) {
                item.dispose();
            }
        });
    }
}
