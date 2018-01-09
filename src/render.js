import { isClass, setNodeAttr } from './utils'

export function render(element, containerNode) {
    
    const type = element.type
    const props = element.props
    if (typeof element === 'string') {
        let node = document.createTextNode(element)
        containerNode.appendChild(node)
    } else if (typeof type == "string") {
        let node = document.createElement(type)
        setNodeAttr(node, props)
        containerNode.appendChild(node)
        const children = props.children
        children.forEach(child => {
            render(child, node)
        })
    } else if (typeof type === 'function') {
        if (isClass(type)) {
            const instance = new type(props)
            const subElement = instance.render()
            render(subElement, containerNode)
        } else {
            const subElement = type(props)
            render(subElement, containerNode)
        }
    }
}

export function renderVDom(element) {
    const type = element.type
    const props = element.props
    // console.error(element)
    if (typeof element === 'string') {
        return element
    }
    else if (typeof type === 'string') {
        const children = (props.children || []).filter(Boolean)
        const hasChildrenEle = {
            type,
            props,
            children: [],
        }
        for (let i = 0; i< children.length; i++) {
            hasChildrenEle.children.push(renderVDom(children[i]))
        }
        return hasChildrenEle
    } else if (typeof type === 'function') {
        if (isClass(type)) {
            const instance = new type(props)
            const childElement = instance.render()
            return renderVDom(childElement)
        } else {
            return renderVDom(type(props))
        }
    } else {
        console.error('else no match')
    }
}

export default function yRender(element, containerNode) {
    render(renderVDom(element), containerNode)
}