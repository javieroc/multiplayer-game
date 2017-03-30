'use strict';

const Entity = require('./Entity');

class Player extends Entity{

  constructor(id){
    super(id);
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.maxSpeed = 10;
  }

  update(){
    this.updateSpeed();
    super.update();
  }

  updateSpeed(){
    if(this.pressingUp)
      this.speedY -= this.maxSpeed;
    else if(this.pressingDown)
      this.speedY += this.maxSpeed;
    else
      this.speedY = 0;

    if(this.pressingRight)
      this.speedX += this.maxSpeed;
    else if(this.pressingLeft)
      this.speedX -= this.maxSpeed;
    else
      this.speedX = 0;
  }

}

module.exports = Player;
