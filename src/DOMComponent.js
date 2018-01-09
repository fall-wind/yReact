import { setNodeAttr, eventProxy } from './utils'
// 有点像循环引用 怎么可以工作？
import { instantiateComponent } from './mount'
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
        setNodeAttr(node, props)

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
        renderedChildren.forEach(child => child.unmount())
        const currentElement = this.currentElement
        const props = currentElement.props
        const node = this.node
        // 移除绑定事件
        Object.keys(props).forEach(propKey => {
            if (propsKey[0]=='o' && propsKey[1]=='n') {
				propsKey = propsKey.toLowerCase().substring(2)
				const capture = (propsKey.indexOf("Capture") != -1)
				node.removeEventListener(propsKey, eventProxy, capture)
			}
        })
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
        setNodeAttr(node, props)
        const renderedChildren = children.map(instantiateComponent)
        this.renderedChildren = renderedChildren
        const childNodes = renderedChildren.map(child => {
            if (typeof child === 'string') {
                return document.createTextNode(child)
            } else {
                return child.mount()
            }
        })
        childNodes.forEach(childNode => node.appendChild(childNode))
        return node
    }
}

export default DOMComponent