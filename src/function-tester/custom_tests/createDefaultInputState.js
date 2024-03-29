/**
 * Creates a default object with empty content based on the supplied object.
 * @param object where every primitive field is replaced with the empty string.
 * @return {Object}
 */
export function createDefaultInputState(object) {
    const newObj = {};
    for (let field in object) {
        if (typeof object[field] === 'object') {
            // field is array or object
            if (Array.isArray(object[field])) {
                // the first element in the input structure contains the type of elements the array should have
                newObj[field] = [createDefaultInputState(object[field][0])];
            } else {
                newObj[field] = createDefaultInputState(object[field]);
            }
        } else {
            //field is primitive
            if (object[field] === 'boolean') {
                newObj[field] = false;
            } else {
                newObj[field] = '';
            }
        }
    }
    return newObj;
}

/**
 * Creates a default output state.
 * @param variable
 * @return {{}|([(*|{}|boolean|string)]|{}|boolean|string)[]|string|boolean} 😳
 */
export function createDefaultOutputState(variable) {
    if (typeof variable === 'object') {
        if (Array.isArray(variable)) {
            return [createDefaultOutputState(variable[0])];
        } else {
            const newObj = {};
            for (let field in variable) {
                newObj[field] = createDefaultOutputState(variable[field]);
            }
            return newObj;
        }
    } else {
        // variable is primitive
        if (variable === 'boolean') {
            return false;
        } else {
            return '';
        }
    }
}