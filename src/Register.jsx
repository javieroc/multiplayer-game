import React, { Component } from 'react'
import firebase from 'firebase'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerMessage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()

    firebase.auth()
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
        this.setState({
          registerMessage: error.message
        })
      })
  }

  render() {
    return(
      <div className="col-sm-6 col-sm-offset-3">
        <div className="parallelogram">REGISTER</div>
        <div className="fluorescent-panel">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control custom-input" placeholder="Email" ref={(email) => {this.email = email;}} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control custom-input" placeholder="Password" ref={(password) => {this.password = password;}} />
            </div>
            <button type="submit" className="btn btn-primary custom-button">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Register

