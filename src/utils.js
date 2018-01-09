
/**
 * 
 * @param {*} type 
 */
export function isClass(type) {
    return type.prototype && type.prototype.isReactComponent
}

/**
 * 
 * @param {*} obj 
 * @param {*} props 
 */
export function extend(obj, props) {
	for (let i in props) obj[i] = props[i];
	return obj;
}