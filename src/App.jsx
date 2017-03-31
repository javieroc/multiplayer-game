import React, { Component } from 'react'
import CanvasReact from './CanvasReact'
import Chat from './Chat'

const socket = io();

class App extends Component {

  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <CanvasReact socket={socket} />
        <Chat socket={socket} />
      </div>
    )
  }
}

export default App
