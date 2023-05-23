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
    this.bufferLength = this.width * this.height * 4;
  }
   reset() {
     this.data.fill(0);
     for (let i = 3; i < this.data.length; i += 4) {
       this.data[i] = 255;
     }
  }
  merge = (buffer, x, y) => {
    if (
      x >= this.rowLen ||
      y >= this.height ||
      y < -buffer.height ||
      x < -buffer.width
    ) {
      return;
    }
    const bufferData = buffer.data;
    const rowIndex = x * 4;
    const pixelsTimeHeight = y * this.rowLen;
    const origin = pixelsTimeHeight + rowIndex;
    let i = buffer.bufferLength - 1;
    while (i > 3) {
      if (bufferData[i]) {
        const devided = (i / buffer.rowLen) >>> 0;
        const innerTimeLen = (devided * this.rowLen);
        const pxIndex = origin + innerTimeLen + (i - buffer.rowLen * devided);
        const prev = pixelsTimeHeight + innerTimeLen;

        if (pxIndex > prev && pxIndex < prev + this.rowLen) {
          this.data[pxIndex] = bufferData[i];
          this.data[pxIndex - 3] = bufferData[i - 3];
          this.data[pxIndex - 2] = bufferData[i - 2];
          this.data[pxIndex - 1] = bufferData[i - 1];
        }
      }
      i -= 4;
    }
  };
  get() {
    return temp;
  }
  set() {}
}
export { Buffer };
