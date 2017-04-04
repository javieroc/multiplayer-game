import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import firebase from 'firebase'

import Loading from './Loading'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Game from './Game'

const socket = io();

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/game' />}
    />
  )
}

class App extends Component {

  constructor(){
    super()

    this.state = {
      authed: false,
      loading: true,
    }
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <Loading /> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Node.js Game</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/game" className="navbar-brand">Game</Link>
                </li>
                <li>
                  {
                    this.state.authed ?
                    <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          firebase.auth().signOut()
                        }}
                        className="navbar-brand">Logout</button>
                    :
                    <span>
                      <Link to="/login" className="navbar-brand">Login</Link>
                      <Link to="/register" className="navbar-brand">Register</Link>
                    </span>
                  }
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/game' component={Game} socket={socket} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
