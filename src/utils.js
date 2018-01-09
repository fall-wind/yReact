
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

//
export function setNodeAttr(node, props) {
	Object.keys(props).forEach(propsKey => {
		const value = props[propsKey]
		if (propsKey !== 'children') {
			if (name==='key') {
				// ignore
			} else if (propsKey === 'className') {
				node.setAttribute('class', value)
			} else if (propsKey === 'style') {
				console.error('??????XXXX')
				// node.setAttribute('cssText', props[propsKey])
				if (typeof value === 'string') {
					node.style.cssText = value
				}
				if (typeof value === 'object') {
					for (let k in value) node.style[k] = value[k]
				}
			} else if (propsKey[0]=='o' && propsKey[1]=='n') {
				propsKey = propsKey.toLowerCase().substring(2)
				const capture = (propsKey.indexOf("Capture") != -1)
				if (value) {
					node.addEventListener(propsKey, eventProxy, capture)
				} else {
					node.removeEventListener(propsKey, eventProxy, capture)
				}
				(node._listeners || (node._listeners = {}))[propsKey] = value;
			}else {
				node.setAttribute(propsKey, value)
			}
		}
	})
}

export function eventProxy(e) {
	return this._listeners[e.type](e);
}