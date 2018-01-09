class Component {
    constructor(props) {
        this.props = props
    }

    // setState(state, callback) {
    //     console.error(this, state, this.state, this.prototype)
    // }

    render() {

    }
}

Component.prototype.isReactComponent = true
// Component.isReactComponent = true

Component.prototype.setState = function(state, callback) {
    console.error(this, state, this.state, this.prototype)
}

export default Component