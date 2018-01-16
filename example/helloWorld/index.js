import { y, render, Component } from '../../index'
const containerNode = document.getElementById('app')

class SubApp extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { name = 's' } = this.props
		return (
			<div>
				<div />
				{name == 'ss' ? (
					<div>
						<div>ssss</div>
					</div>
				) : (
					<div>ssss</div>
				)}
			</div>
		)
	}
}

const arr = []
for (let i = 0; i < 15000; i++) {
	arr.push(i)
}

let date1
let date2

class TopApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'hello world'
		}
	}

	componentWillMount(props) {
		date1 = new Date().getTime()
		console.info('componentWillMount: ')
	}

	componentDidMount(props) {
		console.info('componentDidMount: ', new Date().getTime() - date1)
	}

	componentWillUpdate(props) {
		date2 = new Date().getTime()
		console.info('componentWillUpdate:')
	}

	componentDidUpdate() {
		console.info('componentDidUpdate:', new Date().getTime() - date2)
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
					{[1, 2].map(it => {
						return <div>{`${it}_${name}`}</div>
					})}
				</div>
				{/* {
                    arr.map(item => {
                        return (
                            <SubApp name={`name: ${name}`}/>            
                        )
                    })
                } */}
				{/* {
                    arr.map(item => {
                        return (
                            <div>{`${item}_${name}`}</div>
                        )
                    })
                } */}
				{/* <SubApp name={`name: ${name}`}/>
                <SubApp name={`name: ${name}`}/> */}
			</div>
		)
	}
}

const startTime = new Date().getTime()
render(<TopApp />, containerNode)

console.error(`time: ${new Date().getTime() - startTime}`)
