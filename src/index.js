import { isClass } from './utils'

class VNode {
    constructor(nodeName, props, children) {
        this.nodeName = nodeName
        this.props = props
        this.children = children
    }
}
/**
 * type
 * 1. host element
 * 2. function
 *   1. ReactComponent
 *   2. function elment
 * @param {*} element 
 */

function mountComposite(element) {
    const type = element.type
    const props = element.props
    let renderElement;
    if (isClass(type)) {
        const instance = new type()
        if (instance.componentWillMount) {
            instance.componentWillMount()
        }
        instance.render()
        instance.props = props
    } else if (typeof type === 'function') {
        renderElement = type(props)
    }
    return mount(renderElement)
}

/**
 * 
 * @param {*} element 
 */
function mountHost(element) {
    const type = element.type
    const props = element.props
    let children = props.children || []
    if (Array.isArray(children)) {
        children = [children]
    }
    children = children.filter(item => item)
    const node = document.createElement(type)
    Object.keys(props).forEach(propsName => {
        if (propsName !== 'children') {
            node.setAttribute(propsName, props[propsName])
        }
    })
    children.forEach(childElement => {
        const childNode = mount(childElement)
        node.appendChild(childNode)
    })
    return node;
}

function mount(element) {
    const type = element.type
    const props = element.props
    if (typeof type === 'function') {
        mountComposite(element)
    } else if (typeof type === 'string') {
        mountHost(element);
    }
}

export default {
    mount,
}

export {
    mount,
}