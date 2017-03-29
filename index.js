'use strict'

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/client', express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});


let SOCKET_LIST = [];
let PLAYER_LIST = [];

var Player = function(id){
  var self = {
    x: 250,
    y: 250,
    id: id,
    number: "" + Math.floor(10 * Math.random()),
    pressingUp: false,
    pressingDown: false,
    pressingRight: false,
    pressingLeft: false,
    maxSpeed: 10,
  }
  self.updatePosition = function(){
    if(self.pressingUp)
      self.y -= self.maxSpeed;
    if(self.pressingDown)
      self.y += self.maxSpeed;
    if(self.pressingRight)
      self.x += self.maxSpeed;
    if(self.pressingLeft)
      self.x -= self.maxSpeed;
  }

  return self;
}

io.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  let player = Player(socket.id);
  PLAYER_LIST[player.id] = player;

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  });

  socket.on('keyPress', (data) => {
    if(data.inputId === 'up')
      player.pressingUp = data.state;
    else if (data.inputId === 'down')
      player.pressingDown = data.state;
    else if (data.inputId === 'right')
      player.pressingRight = data.state;
    else if (data.inputId === 'left')
      player.pressingLeft = data.state;
  });
});

setInterval(() => {
  let playersData = [];

  for (let i in PLAYER_LIST){
    let player = PLAYER_LIST[i];
    player.updatePosition();

    playersData.push({
      x: player.x,
      y: player.y,
      number: player.number
    });
  }
  for (let i in SOCKET_LIST){
    let socket = SOCKET_LIST[i];
    socket.emit('newPositions', playersData);
  }

}, 1000/25);


server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
