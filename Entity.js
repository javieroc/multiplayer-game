class Entity {

  constructor(id){
    this.x = 250;
    this.y = 250;
    this.width = 0;
    this.height = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.id = id;
  }

  update(){
    this.updatePosition();
  }

  updatePosition(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  getDistance(entity){
    return Math.sqrt(Math.pow(this.x-entity.x, 2) +  Math.pow(this.y-entity.y, 2));
  }
}

module.exports = Entity;
