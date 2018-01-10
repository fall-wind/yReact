import { y, render, Component } from '../../index'
const containerNode = document.getElementById('app')

class SubApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {name} = this.props
        return (
            <div>
                {name}
            </div>
        )
    }
}

class TopApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: 'hello world',
        }
    }

    componentWillMount(props) {
        // console.error(props, 'componentWillMount...')
    }

    componentWillUpdate(props){
        // console.info('componentWillUpdate:')
    }

    render() {
        const { children } = this.props
        const { name } = this.state
        return (
            <div>
                <input 
                    onChange={e => {
                        this.setState({
                            name: e.target.value
                        })
                    }}
                    value={name}
                    style={{ border: '1px solid black' }}
                />
                <div>
                    {name}
                </div>
                {/* <SubApp name={`name: ${name}`}/>
                <SubApp name={`name: ${name}`}/> */}
            </div>
        )
    }
}

render(<TopApp />, containerNode)
