import { y, mount, Component } from '../../index'
import render from '../../src/render'
const containerNode = document.getElementById('app')

function App(props) {
    return (
        <div style={{ color: 'red' }}>{props.name}</div>
    )
}

class TopApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: 'hello world',
        }
    }

    componentWillMount(props) {
        console.error(props, 'componentWillMount...')
    }

    componentWillUpdate(props){
        console.info('componentWillUpdate:')
    }

    render() {
        const { children } = this.props
        const { name } = this.state
        return (
            <div onClick={(e) => {
                this.setState({
                    name: 'hello'
                })
            }}>
                <App name={name} />
            </div>
        )
    }
}

render(<TopApp />, containerNode)
// mount(<TopApp />, containerNode)
// mount(<App name="a hah" />, containerNode)
