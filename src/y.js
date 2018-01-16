import { REACT_ELEMENT_TYPE } from './constant'

/**
 * 
 * @param {*} type 
 * @param {*} props 
 * use {arr.map(it => (<div>{it}</div>))} can cause problems
 */
export default function y(type, props = {}, ...args) {
    let children = []
    args.forEach(child => {
        if (Array.isArray(child)) {
            children = children.concat(child)
        } else {
            children.push(child)
        }
    })
    
    if (!Array.isArray(children)) {
        children = [children]
    }
    // console.error(children, args, 'wocao???')
    // children = children.filter(Boolean)
    return {
        type,
        props: {
            ...props,
            children,
        },
        children,
        __typeof: REACT_ELEMENT_TYPE,
    }
}

