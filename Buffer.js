class Buffer {
  constructor(_width, _height, _merge) {
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
  }
  reset(){
    this.data.fill(40)
  }
  merge = (buffer, x, y) => {
    for (let j = 0; j < buffer.height; j++) {
      for (let i = 0; i < buffer.width*4; i++) {
        if(buffer.data[((j*(buffer.width*4))+(i))] == 0){
        }else{
          this.data[((y*(this.width*4))+(x*4))+((j*(this.width*4))+(i))] = buffer.data[((j*(buffer.width*4))+(i))]
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
