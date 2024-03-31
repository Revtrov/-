import { Buffer } from "../Rendering/Buffer.js";
import { resolution } from "../script.js";
class ParallaxBackground {
  constructor(
    _spriteSrc,
    _x,
    _y,
    _width,
    _height,
    _animationPosition,
    _zHeight = 0
  ) {
    this.height = _height;
    this.width = _width;
    this.x = _x;
    this.y = _y;
    const imageLoader = document.createElement("canvas");
    const imageLoaderCtx = imageLoader.getContext("2d");
    imageLoader.height = this.height;
    imageLoader.width = this.width;
    this.direction = 1;
    this.wrap = true;
    this.repeatsX = ((resolution.x / this.width) >>> 0) +2;
    this.repeatsY = ((resolution.y / this.height) >>> 0) +2;
    // if (this.repeatsX > this.repeatsY) {
    //   if (!(this.repeatsX & 1)) {
    //     this.repeatsX+=1;
    //   }
    //   this.repeatsY = this.repeatsX;
    // } else {
    //   if (!(this.repeatsY & 1)) {
    //     this.repeatsY+=1;
    //   }
    //   this.repeatsX = this.repeatsY;
    // }
    this.buffer = new Buffer(this.width, this.height);
    this.sprite = new Image();
    this.sprite.src = _spriteSrc;
    let imageData;
    imageLoaderCtx.imageSmoothingEnabled = false;
    this.sprite.onload = () => {
      imageLoader.imageSmoothingEnabled = false;
      imageLoaderCtx.drawImage(this.sprite, 0, 0, this.width, this.height);
      imageData = imageLoaderCtx.getImageData(0, 0, this.width, this.height);
      this.buffer.data = imageData.data;
    };
    this.speed = 0;
  }
  resetRes(resolution){
    this.repeatsX = ((resolution.x / this.width) >>> 0) +2;
    this.repeatsY = ((resolution.y / this.height) >>> 0) +2;
  }
  repeat(buffer) {
    // let xAbs = ((this.x ^ (xShift)) - (xShift));
    // let yAbs = ((this.y ^ (yShift)) - (yShift));
    let xShift = this.x >> 31;
    let yShift = this.y >> 31;
    let xSign = this.x >> 63;
    let ySign = this.y >> 63;
    let x = ((this.x ^ (xShift)) - (xShift)) *  -((-1^xSign + 1^xSign) + 1);
    let y = ((this.y ^ (yShift)) - (yShift)) * -((-1^ySign + 1^ySign) + 1) ;
    for (let j = -this.repeatsX + 1; j < this.repeatsX; j++) {
      for (let i = 0; i < this.repeatsY; i++) {
        if((i>-this.height)&&(j>-this.width)&&(j<this.width*2)&&(i<this.height)){
          buffer.merge(
            this.buffer,
            x + this.width * j,
            y + this.height * i
          );
        }else{continue}
      }
    }
  }
  repeatY(buffer) {}
  scrollX() {
    this.x += (this.directionX * this.speed);
    if (this.x >= resolution.x) {
      this.x -= this.width;
    }
    if (this.x <= -this.width) {
      this.x = 0;
    }
  }
  scrollY() {
    this.y += this.directionY * this.speed;
    if (this.y >= resolution.y) {
      this.y -= this.height;
    }
    if (this.y <= -this.height) {
      this.y = 0;
    }
  }
  updateEntity(buffer) {
    this.repeat(buffer);
  }
}
export { ParallaxBackground };
