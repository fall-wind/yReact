// temporarily discarded
import { isClass } from './utils'
import { instantiateComponent } from './mount'
class CompositeComponent {
    constructor(element) {
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
        if (isClass(type)) {
            publicInstance = new type(props)
            publicInstance.props = props
            if (publicInstance.componentWillMount) {
                publicInstance.componentWillMount()
                // //可以在此处注入
                // publicInstance._fComp = this.currentElement
                // publicInstance.renderComponet = this
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

export default CompositeComponent