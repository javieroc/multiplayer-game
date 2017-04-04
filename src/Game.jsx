import React, { Component } from 'react'

import CanvasReact from './CanvasReact'
import Chat from './Chat'

class Game extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let socket = this.props.socket

    return(
      <div>
        <CanvasReact socket={socket} />
        <Chat socket={socket} />
      </div>
    )
  }
}

export default Game
