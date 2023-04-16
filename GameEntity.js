import {Buffer} from "./Buffer.js"
class GameEntity {
    
  constructor(_spriteSrc, _x, _y, _width, _height,_zHeight,_controllable) {
    const imageLoader = document.createElement('canvas');
    const imageLoaderCtx = imageLoader.getContext("2d");
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    imageLoader.height = this.height;
    imageLoader.width = this.width;
    this.zHeight = _zHeight;
    this.buffer = new Buffer(this.width,this.height);
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
  }
  updateEntity(buffer){
    buffer.merge(this.buffer,Math.floor(this.x),Math.floor(this.y))
  }

}
export { GameEntity };
