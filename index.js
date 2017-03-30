'use strict'

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/client', express.static(__dirname + '/client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

const Player = require('./Player');
const PlayerHandler = require('./PlayerHandler');
const BulletHandler = require('./BulletHandler');

let SOCKET_LIST = [];
let playerHandler = new PlayerHandler();
let bulletHandler = new BulletHandler();

io.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  let player = new Player(socket.id);
  playerHandler.add(player);
  player.onConnect(socket);

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    playerHandler.onDisconnect(socket);
  });

});

// Game Loop
setInterval(() => {
  let pack = {
    players: playerHandler.update(),
    bullets: bulletHandler.update(),
  }

  for (let i in SOCKET_LIST){
    let socket = SOCKET_LIST[i];
    socket.emit('newPositions', pack);
  }

}, 1000/25);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
