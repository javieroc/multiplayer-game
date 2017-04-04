import React, { Component } from 'react'
import firebase from 'firebase'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      loginMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()

    firebase.auth()
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
        this.setState({
          loginMessage: 'Invalid Email/Password.'
        })
      })
  }

  render(){
    return(
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="text" placeholder="Email" ref={(email) => {this.email = email;}} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" placeholder="Password" ref={(password) => {this.password = password;}} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>&nbsp;{this.state.loginMessage}
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
