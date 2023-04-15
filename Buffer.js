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
    this.rowLen = this.width*4;
  }
  reset() {
    this.data.fill(0);
  }
  merge = (buffer, x, y) => {
    let recove = [];
    let ofFour = 0;
    let w = buffer.width;
    let h = buffer.height;
    let innerWidth = w * 4;
    let rowIndex = x * 4;
    let origin = y * this.rowLen + rowIndex;
    for (let j = 0; j < h; j++) {
      let fullHeight = y+j;
      let prevDepth = (fullHeight+1) * this.rowLen;
      let nextDepth = fullHeight* this.rowLen;
      let currentIndex = origin + j * this.rowLen;
      for (let i = 0; i < innerWidth; i++) {
        let addedIndex = j * innerWidth + i;
        let isAlpha = (addedIndex + 1) % 4 == 0;
        let currentPx = currentIndex + i;
        if (isAlpha && buffer.data[addedIndex] == 0) {
          this.data[currentPx - 3] = recove[0];
          this.data[currentPx - 2] = recove[1];
          this.data[currentPx - 1] = recove[2];
        } else {
          recove[ofFour] = this.data[currentPx];
          if (currentPx < prevDepth && currentPx >= nextDepth) {
            this.data[currentPx] = buffer.data[addedIndex];
          }
          ofFour += 1;
        }
        if (isAlpha) ofFour = 0;
      }
    }
  };
  get() {
    return temp;
  }
  set() {}
}
export { Buffer };
