
/**
 * 
 * @param {*} type 
 */
export function isClass(type) {
    return type.prototype && type.prototype.isReactComponent
}