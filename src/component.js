class Component {
    constructor(props, state) {
        this.props = props
        this.state = state
        this.setState = function(state) {
            this.state = {
                ...this.state,
                ...state,
            }
        }
    }

    render() {

    }
}

Component.prototype.isReactComponent = true
Component.isReactComponent = true

export default Component