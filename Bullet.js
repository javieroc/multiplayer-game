const Entity = require('./Entity');

class Bullet extends Entity{

  constructor(parent, angle, x, y){
    super(Math.random());
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.speedX = Math.cos(angle/180*Math.PI) * 10;
    this.speedY = Math.sin(angle/180*Math.PI) * 10;
    this.timer = 0;
    this.toRemove = false;
  }

  update(){
    if(this.timer++ > 100)
      this.toRemove = true;
    super.update();
  }
}

module.exports = Bullet;
