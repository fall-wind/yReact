## yReact
a simple react

```
git clone https://github.com/yt1520406335/yReact.git

<!-- npm run start -->

open browser
```

### use npm 

```
npm install yreact --save
```
#### babel config

```
"plugins": [
    ["transform-react-jsx", {
        "pragma":  "y"
    }],
]
```

#### use in project (l suggest you should use... a ha)
```
import { render, Component } from 'yreact'
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
                <SubApp name={`name: ${name}`}/>
                <SubApp name={`name: ${name}`}/>
            </div>
        )
    }
}

render(<TopApp />, containerNode)

```
### learn from

- [implementation notes](https://reactjs.org/docs/implementation-notes.html)
- [preact](https://github.com/developit/preact)
- [tinyreact](https://github.com/ykforerlang/tinyreact) from my old-big-borther


## update log

### 0.0.1
set up the environment to develop the project  
just support mount into dom

- not support lifecycle
- not support event
- other

### 0.0.2

- support setState
- There are still a lot of problems.
