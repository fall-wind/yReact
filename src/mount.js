import { isClass } from './utils'

function instantiateComponent(element) {
    const type = element.type
    if (typeof type === 'function') {
        return new CompositeComponent(element)
    } else if (typeof type === 'string') {
        return new DOMComponent(element)
    } else if (typeof element === 'string') {
        return element
    }
}

class StringComponent {
    constructor(element) {
        this.currentElement = element
    }

    mount() {

    }
}

class CompositeComponent {
    constructor(element) {
        console.error(element,'jjjj')
        this.currentElement = element
        this.renderedComponent = null
        this.publicInstance = null
    }

    getHostNode() {
        return this.renderedComponent.getHostNode()
    }

    receive(nextElement) {
        const prevProps = this.currentElement.props
        const publicInstance = this.publicInstance
        const prevRenderedComponent = this.renderedComponent
        const prevRenderedElement = prevRenderedComponent.currentElement;
        
        this.currentElement = nextElement
        const type = nextElement.type
        const nextProps = nextElement.props

        let nextRenderedElement

        if (isClass(type)) {
            if (publicInstance.componentWillUpdate) {
                publicInstance.componentWillUpdate(nextProps)
            }

            publicInstance.props = nextProps
            nextRenderedElement = publicInstance.render()
        } else if (typeof type === 'function') {
            nextRenderedElement = type(nextProps)
        }

        if (prevRenderedElement.type === nextRenderedElement.type) {
            prevRenderedComponent.receive(nextRenderedElement);
            return
        }

        const prevNode = prevRenderedComponent.getHostNode()
        prevRenderedComponent.unmount()
        const nextRenderedComponent = instantiateComponent(nextRenderedComponent.type)
        const nextNode = nextRenderedComponent.mount()
        this.renderedComponent = nextRenderedComponent
        prevNode.parentNode.replaceChild(nextNode, prevNode)
    }

    getPublicInstance() {
        return this.publicInstance
    }

    unmount() {
        const publicInstance = this.publicInstance
        if (publicInstance.componentWillUnmount) {
            publicInstance.componentWillUnmount()
        }
        const renderedComponent = this.renderedComponent
        renderedComponent.unmount()
    }

    mount() {
        const element = this.currentElement
        const type = element.type
        const props = element.props
        let publicInstance
        let renderedElement
        console.log(element, 'mount: ')
        if (isClass(element)) {
            console.error('?????', element)
            publicInstance = new type(props)
            publicInstance.props = props
            if (publicInstance.componentWillMount) {
                publicInstance.componentWillMount()
            }
            renderedElement = publicInstance.render()
        } else {
            publicInstance = null
            renderedElement = type(props)
        }
        this.publicInstance = publicInstance
        this.renderedComponent = instantiateComponent(renderedElement)
        return this.renderedComponent.mount()
    }
}

class DOMComponent {
    constructor(element) {
        this.currentElement = element
        this.renderedChildren = []
        this.node = null
    }

    getPublicInstance() {
        return this.node
    }

    getHostNode() {
        return this.node
    }

    receive(nextElement) {
        const selfNode = this.node
        const prevElement = this.currentElement
        const prevProps = prevElement.props
        const nextProps = nextElement.props
        this.currentElement = nextElement

        // remove old attr
        Object.keys(prevProps).forEach(propsName => {
            if (prevProps !== 'children' && !nextProps.hasOwnProperty(propsName)) {
                node.removeAttribute(propsName)
            }
        })

        // set new attr
        Object.keys(nextProps).forEach(propName => {
            if (propName !== 'children') {
              node.setAttribute(propName, nextProps[propName]);
            }
        });

        // update children
        let prevChildren = prevProps.children || []
        let nextChildren = nextProps.children
        if (!Array.isArray(prevRenderedChildren)) {
            prevRenderedChildren = [prevRenderedChildren]
        }
        if (!Array.isArray(nextRenderedChildren)) {
            nextRenderedChildren = [nextRenderedChildren]
        }
        let prevRenderedChildren = this.renderedChildren
        let nextRenderedChildren = []
        const operationQueue = []
        for(let i = 0; i < nextRenderedChildren.length; i++) {
            const prevChild = prevRenderedChildren[i]
            // 之前不存在 则新增
            if (!prevChild) {
                const nextChild = instantiateComponent(nextRenderedChildren[i]);
                const node = nextChild.mount()
                operationQueue.push({type: 'ADD',node})
                nextRenderedChildren.push(nextChild)
                continue
            }
            const canUpdate = prevRenderedChildren[i].type === nextRenderedChildren[i].type
            // type not same, replace
            if (!canUpdate) {
                const prevNode = perv.getHostNode()
                prevChild.unmount()
                const nextChild = instantiateComponent(nextRenderedChildren[i])
                const node = nextChild.mount()
                operationQueue.push({type: 'REPLACE', prevChild, nextChild})
                continue
            }
            prevChild.receive(nextChildren[i])
            nextRenderedChildren.push(prevChild)
        }
        //unmounted don't exist children
        for (let j = nextChildren.length; j < prevChildren.length; j++) {
            const prevChild = prevRenderedChildren[i]
            const node = prevChild.getHostNode()
            prevChild.unmount()
            operationQueue.push({type: 'REMOVE', node})
        }
        this.renderedChildren = nextRenderedChildren

        // handle queue
        while(operationQueue.length > 0) {
            const operation = operationQueue.shift()
            switch(child.type) {
                case 'REMOVE':
                    selfNode.removeChild(operation.node)
                    break
                case 'ADD':
                    selfNode.appendChild(operation.node)
                    break
                case 'REPLACT':
                    selfNode.replaceChild(operation.nextChild, operation.prevChildren)
                    break
            }
        }
    }

    // ???
    // why not need unmount self
    unmount() {
        const renderedChildren = this.renderedChildren
        renderedChildren.forEach(child => child.mount())
    }

    mount() {
        const element = this.currentElement
        const type = element.type
        const props = element.props
        let children = props.children
        if (!Array.isArray(children)) {
            children = [children]
        }
        children = children.filter(item => item)
        const node = document.createElement(type)
        Object.keys(props).forEach(propsKey => {
            if (propsKey !== 'children') {
                if (propsKey == 'className') {
                    node.setAttribute('class', props[propsKey])
                } else {
                    node.setAttribute(propsKey, props[propsKey])
                }
            }
        })
        const renderedChildren = children.map(instantiateComponent)
        this.renderedChildren = renderedChildren
        const childNodes = renderedChildren.map(child => {
            console.error(child, '????')
            if (typeof child === 'string') {
                return document.createTextNode(child)
            } else {
                child.mount()
            }
        })
        childNodes.forEach(childNode => node.appendChild(childNode))
        return node
    }
}

function mount(element) {
    const type = element.type
    if (typeof type === 'function') {
        return new CompositeComponent(element)
    } else if (typeof type === 'string') {
        return new DOMComponent(element)
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