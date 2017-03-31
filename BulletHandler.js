'use strict'

class BulletHandler {

  constructor(){
    this.bulletList = [];
  }

  add(bullet){
    this.bulletList[bullet.id] = bullet;
  }

  update(){
    let pack = [];

    for (let i in this.bulletList){
      let bullet = this.bulletList[i];
      bullet.update();

      pack.push({
        x: bullet.x,
        y: bullet.y,
      });
    }

    return pack;
  }
}

module.exports = BulletHandler;
