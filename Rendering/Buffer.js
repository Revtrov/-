class Buffer {
  constructor(_width, _height) {
    this.width = _width
    this.height = _height
    this.data = []
    let temp = new Uint8ClampedArray(
      Array(this.width * this.height * 4).fill(0),
    )

    for (let i = 3; i < temp.length; i += 4) {
      temp[i] = 255
    }
    this.data = temp
    this.rowLen = this.width * 4
    this.imageLoader = document.createElement('canvas')
    this.imageLoaderCtx = this.imageLoader.getContext('2d')
    this.imageLoader.height = this.height
    this.imageLoader.width = this.width
    this.bufferLength = this.width * this.height * 4
    this.oneOverRowLen = 1 / this.rowLen
  }
  reset() {
    this.data.fill(0)
    for (let i = 3; i < this.data.length; i += 4) {
      this.data[i] = 255
    }
  }
  reInit(width, height) {
    this.data = new Uint8ClampedArray(Array(width * height * 4).fill(0))
    this.width = width
    this.height = height
    this.rowLen = this.width * 4
    this.imageLoader.height = this.height
    this.imageLoader.width = this.width
    this.bufferLength = this.width * this.height * 4
    this.oneOverRowLen = 1 / this.rowLen
  }
   merge = (buffer, x, y) => {
     if (
       x >= this.rowLen ||
       y >= this.height ||
       y < -buffer.height ||
       x < -buffer.width && buffer?.data
     ) {
       return
     }
     const bufferData = buffer.data
     const rowIndex = x * 4
     const pixelsTimeHeight = y * this.rowLen
     const origin = pixelsTimeHeight + rowIndex
     let i = buffer.bufferLength - 1
     while (i > 3) {
       if (bufferData?bufferData[i]:false) {
         const devided = (i * buffer.oneOverRowLen) >>> 0
         const innerTimeLen = devided * this.rowLen
         const pxIndex = origin + innerTimeLen + (i - buffer.rowLen * devided)
         const prev = pixelsTimeHeight + innerTimeLen
         const r = pxIndex - 3
         const g = pxIndex - 2
         const b = pxIndex - 1
         const ai = pxIndex
         if (pxIndex > prev && pxIndex < prev + this.rowLen) {
           if (bufferData[i] == 255) {
             this.data[ai] = bufferData[i]
             this.data[r] = bufferData[i - 3]
             this.data[g] = bufferData[i - 2]
             this.data[b] = bufferData[i - 1]
           } else {
              let a = bufferData[i];
              this.data[r] = ((bufferData[i - 3]* (a))>>8) + ((this.data[r] * (255-a))>>8)
              this.data[g] = ((bufferData[i - 2]* (a))>>8) + ((this.data[g] * (255-a))>>8)
              this.data[b] = ((bufferData[i - 1]* (a))>>8) + ((this.data[b] * (255-a))>>8)
              this.data[ai] = 255
           }
         }
       }
       i -= 4
     }
   }
//    merge = (buffer, x, y) => {
//     // Early return if out of bounds
//     if (
//         x >= this.rowLen ||
//         y >= this.height ||
//         y < -buffer.height ||
//         x < -buffer.width && buffer?.data
//     ) {
//         return;
//     }

//     const bufferData = buffer.data;
//     const bufferWidth = buffer.width;
//     const bufferHeight = buffer.height;
//     const bufferRowLen = buffer.rowLen;
//     const targetData = this.data;
//     const targetRowLen = this.rowLen;

//     // Iterate over the buffer pixels, moving backwards
//     for (let i = buffer.bufferLength - 1; i > 3; i -= 4) {
//         const alpha = bufferData?bufferData[i]:0;
//         if (alpha > 0) {
//             // Calculate the position in the buffer
//             const bufferPixelIndex = i / 4;
//             const bufferY = Math.floor(bufferPixelIndex / bufferWidth);
//             const bufferX = bufferPixelIndex % bufferWidth;

//             // Calculate the corresponding position in the target
//             const targetX = x + bufferX;
//             const targetY = y + bufferY;

//             // Ensure the target pixel is within bounds
//             if (targetX >= 0 && targetX < this.rowLen / 4 && targetY >= 0 && targetY < this.height) {
//                 const targetPixelIndex = (targetY * targetRowLen) + (targetX * 4);

//                 if (alpha === 255) {
//                     // Direct copy if fully opaque
//                     targetData[targetPixelIndex] =alpha;
//                     targetData[targetPixelIndex + 1] = bufferData[i + 1];
//                     targetData[targetPixelIndex + 2] = bufferData[i + 2];
//                     targetData[targetPixelIndex + 3] =  bufferData[i + 3];
//                 } else {
//                     // // Blend if partially transparent
//                     // const invAlpha = 255 - alpha;
//                     // targetData[targetPixelIndex] = ((bufferData[i - 3] * alpha) + (targetData[targetPixelIndex] * invAlpha)) >> 8;
//                     // targetData[targetPixelIndex + 1] = ((bufferData[i - 2] * alpha) + (targetData[targetPixelIndex + 1] * invAlpha)) >> 8;
//                     // targetData[targetPixelIndex + 2] = ((bufferData[i - 1] * alpha) + (targetData[targetPixelIndex + 2] * invAlpha)) >> 8;
//                     // targetData[targetPixelIndex + 3] = 255;
//                 }
//             }
//         }
//     }
// };

  
  get() {
    return temp
  }
  set() {}
}
export { Buffer }
