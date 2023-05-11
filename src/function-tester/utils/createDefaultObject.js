/**
 * Creates a default object with empty content based on the supplied object.
 * @param object where every primitive field is replaced with the empty string
 * @return {{}}
 */
export function createDefaultObject(object) {
    const newObj = {};
    for (let field in object) {
        if (typeof object[field] === 'object') {
            // field is array or object
            if (Array.isArray(object[field])) {
                // the first element in the input structure contains the type of elements the array should have
                newObj[field] = [createDefaultObject(object[field][0])];
            } else {
                newObj[field] = createDefaultObject(object[field]);
            }
        } else {
            //field is primitive
            if (object[field] === 'number') {
                newObj[field] = 0;
            } else if (object[field] === 'boolean') {
                newObj[field] = false;
            } else {
                newObj[field] = '';
            }
        }
    }
    return newObj;
}