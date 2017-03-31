'use strict';

const Entity = require('./Entity');
const Bullet = require('./Bullet');

class Player extends Entity {

  constructor(id, bulletHandler){
    super(id);
    this.bulletHandler = bulletHandler;
    this.number = "" + Math.floor(10 * Math.random());
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingAttack = false;
    this.mouseAngle = 0;
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

    if(this.pressingAttack)
      this.shootBullet(this.mouseAngle);
  }

  onConnect(socket){
    socket.on('keyPress', (data) => {
      if(data.inputId === 'up')
        this.pressingUp = data.state;
      else if (data.inputId === 'down')
        this.pressingDown = data.state;
      else if (data.inputId === 'right')
        this.pressingRight = data.state;
      else if (data.inputId === 'left')
        this.pressingLeft = data.state;
      else if (data.inputId === 'attack')
        this.pressingAttack = data.state;
      else if (data.inputId === 'mouseAngle')
        this.mouseAngle = data.state;
    });
  }

  shootBullet(angle){
    let bullet = new Bullet(angle, this.x, this.y);
    this.bulletHandler.add(bullet);
  }

}

module.exports = Player;
