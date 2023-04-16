import { Buffer } from "./Buffer.js";
import { GameEntity } from "./GameEntity.js";
import { resolution } from "./script.js";
class ParallaxBackground extends GameEntity {
  constructor(
    _spriteSrc,
    _x,
    _y,
    _width,
    _height,
    _animationPosition,
    _zHeight
  ) {
    super(_spriteSrc, _x, _y, _width, _height, _zHeight);

    const imageLoader = document.createElement("canvas");
    const imageLoaderCtx = imageLoader.getContext("2d");
    this.y = resolution.y - this.height;
    imageLoader.height = this.height;
    imageLoader.width = this.width;
    this.direction = 1;
    this.wrap = true;
    this.repeatsX = Math.ceil(resolution.x / this.width);
    this.repeatsY = Math.ceil(resolution.x / this.width);
    this.buffer = new Buffer(this.width, this.height);
    this.sprite = new Image();
    this.sprite.src = _spriteSrc;
    let imageData;
    imageLoaderCtx.imageSmoothingEnabled = false;
    console.log(imageLoader.width, imageLoader.height);
    this.sprite.onload = () => {
      imageLoader.imageSmoothingEnabled = false;
      imageLoaderCtx.drawImage(this.sprite, 0, 0, this.width, this.height);
      imageData = imageLoaderCtx.getImageData(0, 0, this.width, this.height);
      this.buffer.data = imageData.data;
    };
    this.speed = 0;
    this.fullWidth = this.width * this.repeatsX;
    this.fullHeight = this.height * this.repeatsY;
    this.flooredSpeed = Math.floor(this.speed);
    this.axis = "x";
    this.moveBy = this.flooredSpeed * this.direction;
    this.highest = this.y + this.fullHeight;
    this.furthest = this.x + this.fullWidth;
    this.ySpeed = this.directionY * this.speed;
    this.xSpeed = this.directionX * this.speed;
  }
  repeatX(buffer) {
    let x = Math.floor(this.x)
    let y = Math.floor(this.y)
    let xTakeSpeed = x - this.moveBy;
      for (let i = 1; i < this.repeatsX + 1; i++) {
        buffer.merge(
          this.buffer,
          xTakeSpeed + (this.width * i) ,
          y
        );
      }
  }
  repeatY(buffer){
    let x = Math.floor(this.x)
    let y = Math.floor(this.y)
    let yTakeSpeed = y - this.moveBy;
    for (let i = 1; i < this.repeatsY + 1; i++) {
      buffer.merge(
        this.buffer,
        x,
        yTakeSpeed + (this.height * i)
      );
    }
  }
  scrollX() {
    this.x += this.directionX * this.speed;
    if (this.x + this.fullWidth > resolution.x && this.directionX == 1) {
      this.x -= this.width;
    }
    if (this.x < 0 - this.width) {
      this.x = 0;
    }
  }
  scrollY() {
    this.y += this.directionY * this.speed;
    if (this.highest > resolution.y && this.directionY !== 1) {
      this.y -= this.height;
    }
    if (this.y < -this.height) {
      this.y = 0;
    }
  }
}
export { ParallaxBackground };
