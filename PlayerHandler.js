class PlayerHandler {

  constructor(){
    this.playerList = [];
  }

  add(player){
    this.playerList[player.id] = player;
  }

  onDisconnect(socket){
    delete this.playerList[socket.id];
  }

  update(){
    let pack = [];

    for (let i in this.playerList){
      let player = this.playerList[i];
      player.update();

      pack.push({
        x: player.x,
        y: player.y,
        number: player.number
      });
    }

    return pack;
  }

}

module.exports = PlayerHandler;
