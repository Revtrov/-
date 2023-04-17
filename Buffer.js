class Buffer {
  constructor(_width, _height) {
    this.width = _width;
    this.height = _height;
    this.data = [];
    let temp = new Uint8ClampedArray(
      Array(this.width * this.height * 4).fill(0)
    );

    for (let i = 3; i < temp.length; i += 4) {
      temp[i] = 255;
    }
    this.data = temp;
    this.rowLen = this.width * 4;
    this.imageLoader = document.createElement("canvas");
    this.imageLoaderCtx = this.imageLoader.getContext("2d");
    this.imageLoader.height = this.height;
    this.imageLoader.width = this.width;
    this.bufferLength = this.width*this.height*4;
  }
  reset() {
    this.data.fill(0);
  }
  merge = (buffer, x, y) => {
    if(x>this.width||y>this.height||y<-buffer.height||x<y<-buffer.width){
      return
    }
    let rowIndex = x*4;
    let pixelsTimeHeight = y * this.rowLen;
    let origin = pixelsTimeHeight + rowIndex;
    for (let i = buffer.bufferLength-1; i > 3; i -= 4) {
      if (buffer.data[i]) {
        let devided = (i / buffer.rowLen)>>>0;
        let innerTimeLen = devided * this.rowLen;
        let pxIndex = origin + innerTimeLen + (i-(buffer.rowLen*devided));
        let prev =  pixelsTimeHeight+innerTimeLen;
        if (pxIndex > prev && pxIndex < prev+this.rowLen) {
          this.data[pxIndex] = buffer.data[i];  
          this.data[pxIndex - 3] = buffer.data[i - 3];
          this.data[pxIndex - 2] = buffer.data[i - 2];
          this.data[pxIndex - 1] = buffer.data[i - 1];
        }
      }
    }
  };
  get() {
    return temp;
  }
  set() {}
}
export { Buffer };
