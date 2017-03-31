import React, { Component } from 'react'

const styles = {
  border: "1px solid #000000"
}


class CanvasReact extends Component {

  constructor(){
    super()
  }

  componentDidMount(){
    let ctx = this.refs.canvas.getContext('2d')
    ctx.font = '30px Arial';

    let socket = this.props.socket

    socket.on('newPositions', (data) => {
      ctx.clearRect(0, 0, 500, 500)
      data.players.forEach((elem) => {
        ctx.fillText(elem.number, elem.x, elem.y)
      })

      data.bullets.forEach((elem) => {
        ctx.fillRect(elem.x-5, elem.y-5, 10, 10)
      })
    })

    document.onkeydown = function(event){
      if(event.keyCode === 87 || event.keyCode === 38)
        socket.emit('keyPress', {inputId: 'up', state: true});
      else if(event.keyCode === 83 || event.keyCode === 40)
        socket.emit('keyPress', {inputId: 'down', state: true});
      else if(event.keyCode === 68 || event.keyCode === 39)
        socket.emit('keyPress', {inputId: 'right', state: true});
      else if(event.keyCode === 65 || event.keyCode === 37)
        socket.emit('keyPress', {inputId: 'left', state: true});
    }

    document.onkeyup = function(event){
      if(event.keyCode === 87 || event.keyCode === 38)
        socket.emit('keyPress', {inputId: 'up', state: false});
      else if(event.keyCode === 83 || event.keyCode === 40)
        socket.emit('keyPress', {inputId: 'down', state: false});
      else if(event.keyCode === 68 || event.keyCode === 39)
        socket.emit('keyPress', {inputId: 'right', state: false});
      else if(event.keyCode === 65 || event.keyCode === 37)
        socket.emit('keyPress', {inputId: 'left', state: false});
    }
  }

  render(){
    return(
      <canvas ref="canvas" width="500" height="500" style={styles}></canvas>
    )
  }
}

export default CanvasReact
