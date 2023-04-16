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
  }
  reset() {
    this.data.fill(0);
  }
  merge = (buffer, x, y) => {
    let w = buffer.width;
    let innerWidth = w * 4;
    let rowIndex = x * 4;
    let origin = y * this.rowLen + rowIndex;
    for (let i = 3; i < buffer.data.length; i += 4) {
      if (buffer.data[i]) {
        let j = (i / innerWidth)>>>0;
        let pxIndex = origin + j * this.rowLen + (i % innerWidth);
        let realHeight = y + j;
        let prev = realHeight * this.rowLen;
        let next = (realHeight + 1) * this.rowLen;
        if (pxIndex > prev && pxIndex < next) {
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
