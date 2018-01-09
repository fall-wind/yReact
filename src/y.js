/**
 * 
 * @param {*} type 
 * @param {*} props 
 */
export default function y(type, props = {}, ...args) {
    let children = [].concat(args)
    if (!Array.isArray(children)) {
        children = [children]
    }
    children = children.filter(Boolean)
    return {
        type,
        props: {
            ...props,
            children,
        },
        children,
    }
}