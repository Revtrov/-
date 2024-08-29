import { Buffer } from '../Rendering/Buffer.js'
class RadialLight {
  constructor(_r = 1, _rgba) {
    this.r = (_r >> 2) << 2
    this.rgba = _rgba
    this.d = this.r * 2
    this.buffer = new Buffer(this.d, this.d)
    this.hasMoved = true
    for (let i = 0; i < this.buffer.bufferLength; i += 4) {
      let ps = i / 4 >>> 0
      let x = ps % (this.d )
      let y = (i /4 )/(this.d) >>> 0
      if (((x-this.r)**2)+((y-this.r)**2) < this.r ** 2) {
        let dist = ((((x-this.r)**2)+((y-this.r)**2))**(1/2)) >>> 0
        this.buffer.data[i] = this.rgba.r
        this.buffer.data[i + 1] = this.rgba.g
        this.buffer.data[i + 2] = this.rgba.b
        this.buffer.data[i + 3] = this.rgba.a * (1 - dist/this.r)
      }else{
        this.buffer.data[i + 3] = 0

      }
    }
  }
}
class DiamondLight {}
class SquareLight {}
export { RadialLight }
