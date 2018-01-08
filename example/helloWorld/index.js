import { y, mount, Component } from '../../index'
const containerNode = document.getElementById('app')

function App(props) {
    return (
        <div>{props.name}</div>
    )
}

class TopApp extends Component {
    render() {
        const { children } = this.props
        return (
            <div>
                <App name="hello" />
            </div>
        )
    }
}

// mount(<TopApp />, containerNode)
mount(<App name="a hah" />, containerNode)
