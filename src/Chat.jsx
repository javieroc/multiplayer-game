import React, { Component } from 'react'

// TODO: change styles to css modules approach
const chatstyle = {
  width: "500px",
  height: "100px",
  overflowY: "scroll"
}

const chatinput = {
  width: "500px"
}

class Chat extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    let socket = this.props.socket

    socket.on('addMessage', (message) => {
      this.state.messages.push(message)
      this.setState({
        messages: this.state.messages
      })
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let socket = this.props.socket
    let newMessage = this.refs.message.value
    this.refs.message.value = ''
    socket.emit('sendMessage', newMessage)
    this.refs.message.focus()
  }

  render(){
    let messages = this.state.messages.map((message, index) => {
      return <div key={index}>{message}</div>
    })

    return(
      <div>
        <div id="chat-text" style={chatstyle}>{messages}</div>
        <form id="chat-form" onSubmit={this.handleSubmit}>
          <input id="chat-input" type="text" style={chatinput} ref="message" />
        </form>
      </div>
    )
  }
}

export default Chat
