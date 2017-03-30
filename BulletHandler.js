const Bullet = require('./Bullet');

class BulletHandler {

  constructor(){
    this.bulletList = [];
  }

  add(bullet){
    this.bulletList[bullet.id] = bullet;
  }

  update(){
    if (Math.random() < 0.1) {
      let bullet = new Bullet(Math.random()*360);
      this.add(bullet);
    }

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
