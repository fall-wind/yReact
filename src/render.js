import { getNodeProps, isClass, setNodeAttr, setNodeAttrWithOld } from './utils'

export default function render(element, parent) {
    renderSub(element, parent)
}

function renderTextElement(element, oldDom) {
    if (oldDom && element != oldDom.nodeValue) {
        oldDom.nodeValue = element
        return oldDom
    } else {
        const node = document.createTextNode(element)
        return node
    }
}

// 真实节点的prevProps 与 nextProps
// add
// replace
// delete
// pervProps --> attr; nextProps --> element.props
function renderHostElement(element, oldDom, parent) {
    let node = oldDom
    if (node) {
        // setNodeAttr(node, element.props)
        if (node.nodeName.toLocaleLowerCase() === element.type) {
            diffNode(node, element)
        } else {
            setNodeAttr(node, element.props)
        }
    } else {
        node = document.createElement(element.type)
        setNodeAttr(node, element.props)
        // const vchildren = element.props.children
        // vchildren.map(child => {
        //     return renderSub(child, node, oldDom)
        // })
    }
    const vchildren = element.props.children
    // console.error(node, node.childNodes)
    vchildren.map((child, index) => {
        return renderSub(child, node || parent, node.childNodes[index])
    })
    return node
}

function diffInnerNodes(dom, vChildren) {
    const childNodes = dom.childNodes
    console.error(childNodes, 'diffInnerNodes: ')
}

/**
 * remove oldprop that not exist
 * set newprops
 * if event remove listener
 * // todo: children
 * @param {*} oldNode 
 * @param {*} props 
 */
function diffNode(oldNode, element) {
    const props = element.props
    const attrs = oldNode.attributes
    Object.keys(attrs).forEach(attr => {
        const val = attrs[attr]
        const { nodeName, nodeValue } = val
        if (!props.hasOwnProperty(nodeName)) {
            setNodeAttrWithOld(oldNode, nodeName, nodeValue, props[nodeName])
        }
    })
    const children = element.children
    if (children && children.length > 0) {
        // diffInnerNodes(oldNode, children)
    }

    setNodeAttr(oldNode, props)
}

export function renderComponentElement(component, parent, isChild) {
    let base = component.base
    let initBase = base
    let inst
    if (base) {
        if (component.componentWillUpdate) {
            component.componentWillUpdate()
        }
    } 
    if (component.isReactComponent) {
        if (component.componentWillMount) {
            component.componentWillMount()
        }
        const childElement = component.render()
        const childComponent = childElement && childElement.type
        if (isClass(childElement)) {
            const childProps = getNodeProps(childElement)
            component._component = inst = new type({...childProps, ...childElement.props})
            inst._parentComponent = component
            renderComponentElement(inst)
        } else {
            base = renderSub(childElement, parent, base)
        }
    }
    if (initBase) {
        if (component.componentDidUpdate) {
            component.componentDidUpdate()
        }
    } else {
        if (component.componentDidMount) {
            component.componentDidMount()
        }
    }
    component.base = base
    if (base) {
        let componentRef = component,
            t = component;
        while ((t=t._parentComponent)) {
            (componentRef = t).base = base;
        }
        base._component = componentRef;
        base._componentConstructor = componentRef.constructor;
    }
    // return base
}

export function renderSub(element, parent, oldDom) {
    // 如果为字符串
    let node
    if (element==null || typeof element==='boolean') element = ''
    if (typeof element === 'string' || typeof element === 'number') {
        node = renderTextElement(element, oldDom)
    } else if (typeof element.type === 'string') {
        node = renderHostElement(element, oldDom, parent)
    } else if (typeof element.type === 'function') {
        const props = element.props
        const type = element.type
        // console.error('l am function', type, props)
        if (isClass(type)) {
            const component = new type(props)
            renderComponentElement(component, parent)
            node = component.base
        } else {
            const component = type(props)
            node = renderSub(component, parent)
        }
    } else {
        console.log('type not exist?????')
    }
    if (oldDom) {
        oldDom.parentNode.replaceChild(node, oldDom)
    } else {
        parent.appendChild(node)
    }
    return node
}

/**
 * 
 * @param {*} component 
 */
function ummountComponent(component) {
    let base = component.base
    if (component.componentWillUnmount) {
        component.componentWillUnmount()
    }
    const inner = component._component
    if (inner) {
        ummountComponent(inner)
    } else if (base) {

    }
}