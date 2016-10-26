import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import { Link } from 'react-router'

class Container extends Component {
    static propTypes = {};

    static childContextTypes = {
        username: PropTypes.string
    }

    state = {
        username: ''
    }

    handleChange = ev => this.setState({
        username: ev.target.value
    })

    getChildContext() {
        return {
            username: this.state.username
        }
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <input value = {this.state.username} onChange = {this.handleChange} />
                    <ul>
                        <li><Link to="/articles" activeClassName = "active" activeStyle = {{color: 'red'}}>articles</Link></li>
                        <li><Link to="/articles/1234" activeClassName = "active" activeStyle = {{color: 'red'}}>wrong article</Link></li>
                        <li><Link to="/filters" activeClassName = "active" activeStyle = {{color: 'red'}}>filters</Link></li>
                        <li><Link to="/counter" activeClassName = "active" activeStyle = {{color: 'red'}}>counter</Link></li>
                        <li><Link to="/comments/1" activeClassName = "active" activeStyle = {{color: 'red'}}>comments pagination</Link></li>
                        <li><Link to="/articles/new" activeClassName = "active" activeStyle = {{color: 'red'}}>new article</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}

export default Container
