import { Buffer } from "../Rendering/Buffer";
class RadialLight {
  #buffer
  constructor(_r = 1, rgba = { r: 0, g: 0, b: 0, a: 1 }) {
    this.r = _r
    this.rgba = _rgba;
    this.#buffer = new Buffer((this.r**2) *4)
    for(let i = 0;i<this.#buffer.bufferLength;i+=4){
      this.buffer.data[i]=this.rgba.r
      this.buffer.data[i]=this.rgba.g
      this.buffer.data[i]=this.rgba.b
      this.buffer.data[i]=this.rgba.a
    }
  }
}
class DiamondLight {}
class SquareLight {}
