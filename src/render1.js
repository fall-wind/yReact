// temporarily discarded
import { isClass, setNodeAttr, setOldDomProps } from './utils'

// just render
// 想在element设置一个属性放置一个属性 可以找到最终的节点；在改变状态的时候去更改状态;
// 发现不行；实例上访问不到这个属性 JSX语法给转了一遍这个，这个element不是实例！！！

// 通过setState方法把实例的引用传递过来， 对这个this设置属性
export function renderSub(element, containerNode, instance, oldDom) {
    
    const type = element.type
    const props = element.props
    // console.error(element, 'ssss')
    if (typeof element === 'string') {
        // console.error(oldDom)
        if (oldDom && oldDom.splitText) {
            oldDom.nodeValue = element
            return oldDom
        } else {
            let node = document.createTextNode(element)
            containerNode.appendChild(node)
            return node
        }
    } else if (typeof type == "string") {
        let node
        if (!oldDom) {
            node = document.createElement(type)
            setNodeAttr(node, props)
            containerNode.appendChild(node)
        } else {
            const pervProps = instance.props
            const nextProps = element.props
            console.error(element.type, instance.type, instance)
            if (element.type === instance.type) {
                node = oldDom
                console.error(oldDom, node)
                setOldDomProps(node, nextProps, nextProps)
            } else {
                node = document.createElement(type)
                setNodeAttr(node, nextProps)
                console.error(node, oldDom, nextProps)
            }
            console.error(oldDom.__renderedChildren)
            // return
        }
            // node.__renderedChildren = []
        containerNode.__renderedChildren = node
        const children = props.children
        const childrenElement = children.map((child, index) => {
            return renderSub(child, node, null, oldDom && oldDom.__renderedChildren[index])
        })
        console.error(node, '????')
        node.__renderedChildren = childrenElement
        return node
        // 这样只会在真实节点才获得到element的实例
        // 所以这是一个递归的过程 一个component组件需要更新，向子树遍历将调用他们的生命周期
        // 一个父组件的state可能会作为子组件的实例向下传递，state发生变化 子组件props会变化
        // element.__node = node
        // console.error(node, 'node:')
        // console.error(node.__instance)
    } else if (typeof type === 'function') {
        console.error(oldDom)
        if (isClass(type)) {
            if (!instance) {
                const inst = new type(props)
                if (inst.componentWillMount) {
                    inst.componentWillMount()
                }
                const subElement = inst.render()
                const subElementNode = renderSub(subElement, containerNode)
                inst.__renderedChildren = subElementNode
                return subElementNode
            } else {
                console.error('l am here')
            }
        } else {
            console.error('???')
            const subElement = type(props)
            const subElementNode = renderSub(subElement, containerNode)
            subElement.__renderedChildren = subElementNode
            return subElementNode
        }
    }
}

export function renderVDom(element) {
    const type = element.type
    const props = element.props
    if (typeof element === 'string') {
        return element
    }
    else if (typeof type === 'string') {
        const children = (props.children || []).filter(Boolean)
        const childrenEle = {
            type,
            props,
            children: [],
        }
        for (let i = 0; i< children.length; i++) {
            childrenEle.children.push(renderVDom(children[i]))
        }
        return childrenEle
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

export default function render(element, containerNode) {
    containerNode.__renderedChildren = []
    console.error(element)
    renderSub(element, containerNode, null)
}