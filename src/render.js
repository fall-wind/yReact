import { getNodeProps, isClass, setNodeAttr } from './utils'

export default function render(element, parent) {
    renderSub(element, parent)
}

function renderTextElement(element, oldDom) {
    console.error(element, oldDom)
    if (oldDom && element != oldDom.nodeValue) {
        oldDom.nodeValue = element
        return oldDom
    } else {
        const node = document.createTextNode(element)
        return node
    }
}

// 真实节点的prevProps 与 nextProps
function renderHostElement(element, oldDom) {
    let node = oldDom
    if (node) {
        console.error('?????', node, element.props)
        setNodeAttr(node, element.props)
        const vchildren = element.props.children
        console.error(node, node.childNodes)
        vchildren.map((child, index) => {
            return renderSub(child, node, node.childNodes[index])
        })
    } else {
        node = document.createElement(element.type)
        setNodeAttr(node, element.props)
        const vchildren = element.props.children
        vchildren.map(child => {
            return renderSub(child, node, oldDom)
        })
    }
    return node
}

function createComponent() {

}

export function renderComponentElement(component, parent, isChild) {
    let base = component.base
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
    console.error(element, 'ssss')
    if (typeof element === 'string') {
        node = renderTextElement(element, oldDom)
    } else if (typeof element.type === 'string') {
        node = renderHostElement(element, oldDom)
    } else if (typeof element.type === 'function') {
        const props = element.props
        const type = element.type
        const component = new type(props)
        renderComponentElement(component, parent)
        node = component.base
    }
    if (oldDom) {
        oldDom.parentNode.replaceChild(node, oldDom)
    } else {
        parent.appendChild(node)
    }
    return node
}