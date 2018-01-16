import { renderComponentElement } from './render'
import { getComponetDom } from './utils'
class Component {
    constructor(props) {
        this.props = props
        this.setState = this.setState.bind(this)
    }


    setState(state, callback) {
        let newStateObj = state
        if (typeof state === 'function') {
            newStateObj = state(this.state)
        }
        this.prevState = this.state
        this.state = {
            ...this.state,
            ...newStateObj,
        }
        renderComponentElement(this, this.base.parentNode)
        callback && callback(this.props, state)
    }

    // setState(state, callback) {
    //     console.error(this, state, this.state, this.prototype)
    // }

    render() {

    }
}

Component.prototype.isReactComponent = true

// Component.prototype.setState = function(state, callback) {
//     let newStateObj = state
//     if (typeof state === 'function') {
//         newStateObj = state(this.state)
//     }
//     this.state = {
//         ...this.state,
//         ...newStateObj,
//     }
//     console.error(this, this.parentNode)
// }

export default Component