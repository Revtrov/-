import { Buffer } from "./Buffer.js";
class GameEntity {
  constructor(
    _spriteSrc,
    _x,
    _y,
    _width,
    _height,
    _zHeight,
    _rotation,
    _controllable
  ) {
    this.imageLoader = document.createElement("canvas");
    this.imageLoaderCtx = this.imageLoader.getContext("2d");
    this.x = _x;
    this.y = _y;
    this.rotation = _rotation;
    this.width = _width;
    this.height = _height;
    this.imageLoader.height = this.height;
    this.imageLoader.width = this.width;
    this.zHeight = _zHeight;
    this.buffer = new Buffer(this.width, this.height);
    this.sprite = new Image();
    this.sprite.src = _spriteSrc;
    let imageData;
    this.imageLoaderCtx.imageSmoothingEnabled = false;
    this.sprite.onload = () => {
      this.imageLoader.imageSmoothingEnabled = false;
      this.imageLoaderCtx.drawImage(this.sprite, 0, 0, this.width, this.height);
      imageData = this.imageLoaderCtx.getImageData(
        0,
        0,
        this.width,
        this.height
      );
      this.buffer.data = imageData.data;
    };
  }
  updateEntity(buffer) {
    buffer.merge(this.buffer, ~~this.x, ~~this.y);
  }
  rotateEntity(deg) {
    let imageData;
      this.imageLoader.imageSmoothingEnabled = false;
      this.imageLoaderCtx.save();
      var rad = (deg * Math.PI) / 180;
      this.imageLoaderCtx.translate(this.width/2,this.height/2);
      this.imageLoaderCtx.rotate(rad);
      
    this.imageLoaderCtx.translate(-this.width/2, -this.height/2);
    this.imageLoaderCtx.clearRect(0,0,this.width,this.height)
      this.imageLoaderCtx.drawImage(this.sprite, 0, 0, this.width, this.height);
      this.imageLoaderCtx.restore();
      imageData = this.imageLoaderCtx.getImageData(
        0,
        0,
        this.width,
        this.height
      );
      //this.buffer.data = []
      this.buffer.data = imageData.data;
  }
}
export { GameEntity };
