// 来自react的官方的implementation notes
// 玩不下去。。。。。
import { isClass, setNodeAttr } from './utils'
import CompositeComponent from './CompositeComponent'
import DOMComponent from './DOMComponent'


export function instantiateComponent(element) {
    const type = element.type
    if (typeof type === 'function') {
        return new CompositeComponent(element)
    } else if (typeof type === 'string') {
        return new DOMComponent(element)
    } else if (typeof element === 'string') {
        return element
    }
}

function mountTree(element, containerNode) {
    if (containerNode.firstChild) {
        const prevNode = containerNode.firstChild
        const prevRootComponent = prevNode._internalInstance
        const prevElement = prevRootComponent.currentElement

        if (prevElement.type === element.type) {
            prevRootComponent.receive(element);
            return;
        }
        unmountTree(containerNode)
    }
    const rootComponent = instantiateComponent(element)
    const node = rootComponent.mount()
    containerNode.appendChild(node)
    node._internalInstance = rootComponent
    const publicInstance = rootComponent.getPublicInstance
    return publicInstance
}

function unmountTree(containerNode) {
    // const instance = instantiateComponent(containerNode)
    const node = containerNode.firstChild
    const rootComponent = node._internalInstance
    rootComponent.unmount()
    containerNode.innerHTML = ''
}

export default mountTree