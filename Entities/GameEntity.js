import { Buffer } from '../Rendering/Buffer.js'
class GameEntity {
  #rotateable
  constructor(
    _spriteSrc,
    _x,
    _y,
    _width,
    _height,
    _zHeight = 0,
    _rotation,
    _rotateable = false,
    _lightEntity,
  ) {
    this.imageLoader = document.createElement('canvas')
    this.imageLoaderCtx = this.imageLoader.getContext('2d', {
      colorSpace: 'display-p3',
      willReadFrequently: true,
    })
    this.x = _x
    this.y = _y
    this.rotation = _rotation || 0
    this.width = _width
    this.height = _height
    this.dimensionOffset = 0 //((Math.hypot(this.height, this.width) / 4) >>> 0) * 4;
    this.halfDimensionOffset = this.dimensionOffset / 2
    this.imageLoader.width = this.imageLoader.height =
      Math.max(...[this.height, this.width]) + this.dimensionOffset
    this.imageLoaderHalf = this.imageLoader.width / 2
    this.zHeight = _zHeight
    this.xInset = (this.imageLoader.width - this.width) / 2
    this.yInset = (this.imageLoader.width - this.height) / 2
    this.allRotations = []
    this.allRotationsMirrored = []
    this.buffer = new Buffer(this.imageLoader.width, this.imageLoader.width)
    this.sprite = new Image()
    this.sprite.src = _spriteSrc
    let imageData
    this.imageLoaderCtx.imageSmoothingEnabled = false
    this.mirrored = false
    this.#rotateable = _rotateable
    this.lightEntity = _lightEntity
    if (this.#rotateable !== 0) {
      this.sprite.onload = () => {
        for (let i = 0; i <= 360; i += 16) {
          this.imageLoaderCtx.save()
          let rad = (i * Math.PI) / 180
          this.imageLoaderCtx.translate(
            this.imageLoaderHalf,
            this.imageLoaderHalf,
          )
          this.imageLoaderCtx.rotate(rad)
          this.imageLoaderCtx.translate(
            -this.imageLoaderHalf,
            -this.imageLoaderHalf,
          )
          this.imageLoaderCtx.drawImage(
            this.sprite,
            this.xInset,
            this.yInset,
            this.width,
            this.height,
          )
          this.imageLoaderCtx.restore()
          imageData = this.imageLoaderCtx.getImageData(
            0,
            0,
            this.imageLoader.width,
            this.imageLoader.height,
          )
          this.allRotations.push(imageData.data)

          this.imageLoaderCtx.save()
          this.imageLoaderCtx.translate(
            this.imageLoaderHalf,
            this.imageLoaderHalf,
          )
          this.imageLoaderCtx.rotate(rad)
          this.imageLoaderCtx.translate(
            -this.imageLoaderHalf,
            -this.imageLoaderHalf,
          )
          this.imageLoaderCtx.clearRect(
            0,
            0,
            this.imageLoader.width,
            this.imageLoader.height,
          )
          this.imageLoaderCtx.scale(-1, 1)
          this.imageLoaderCtx.drawImage(
            this.sprite,
            -this.xInset - this.width,
            this.yInset,
            this.width,
            this.height,
          )
          this.imageLoaderCtx.restore()
          imageData = this.imageLoaderCtx.getImageData(
            0,
            0,
            this.imageLoader.width,
            this.imageLoader.height,
          )
          //
          this.allRotationsMirrored.push(imageData.data)
          //retain pixels
          this.imageLoaderCtx.clearRect(
            0,
            0,
            this.imageLoader.width,
            this.imageLoader.height,
          )
        }
        //
        this.imageLoader.imageSmoothingEnabled = false
        this.imageLoaderCtx.drawImage(
          this.sprite,
          this.xInset,
          this.yInset,
          this.width,
          this.height,
        )
        imageData = this.imageLoaderCtx.getImageData(
          0,
          0,
          this.imageLoader.width,
          this.imageLoader.height,
        )
        this.buffer.data = imageData.data
        imageData = null
        this.sprite = null
        this.imageLoader = null
        this.imageLoaderCtx = null
        this.imageLoaderHalf = null
      }
    } else {
      this.sprite = new Image()
      this.sprite.src = _spriteSrc
      let imageData
      this.imageLoaderCtx.imageSmoothingEnabled = false
      this.sprite.onload = () => {
        this.imageLoader.imageSmoothingEnabled = false
        this.imageLoaderCtx.drawImage(
          this.sprite,
          0,
          0,
          this.width,
          this.height,
        )
        imageData = this.imageLoaderCtx.getImageData(
          0,
          0,
          this.width,
          this.height,
        )
        this.buffer.data = imageData.data
        imageData = null
        this.sprite = null
        this.imageLoader = null
        this.imageLoaderCtx = null
        this.imageLoaderHalf = null
      }
    }
  }
  updateEntity(buffer) {
    buffer.merge(this.buffer, ~~this.x, ~~this.y)
    // if (this.lightEntity) {
    //   buffer.merge(this.lightEntity.buffer, ~~this.x, ~~this.y)
    // }
  }
  toggle() {
    this.mirrored = !this.mirrored
  }
  toggleMirror() {
    this.mirrored = !this.mirrored
    this.setRotation(this.rotation)
  }
  unMirror() {
    this.mirrored = false
    this.setRotation(this.rotation)
  }
  mirror() {
    this.mirrored = true
    this.setRotation(this.rotation)
  }
  resize(newWidth, newHeight) {
    this.dimensionOffset = Math.hypot(this.height, this.width) >>> 0
    this.imageLoader.height = this.height + this.dimensionOffset
    this.imageLoader.width = this.width + this.dimensionOffset
    this.buffer.height = this.imageLoader.height
    this.buffer.width = this.imageLoader.width
  }
  setRotation(deg) {
    if (this.#rotateable) {
      this.rotation = deg
      if (deg < 0) {
        deg = 360 - (-deg - ((-deg / 360) >>> 0) * 360)
      }
      let index = (deg - ((deg / 360) >>> 0) * 360) >> 4
      if (this.mirrored) {
        this.buffer.data = this.allRotationsMirrored[index]
      } else {
        this.buffer.data = this.allRotations[index]
      }
    }
  }
}
export { GameEntity }
