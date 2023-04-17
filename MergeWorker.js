self.onmessage = (ev) => {
    let buffer = ev.data.buffer;
    let x = ev.data.x;
    let y = ev.data.y;
    let thisBuffer = ev.data.thisBuffer;
    let thisRowLen = ev.data.thisRowLen;
    let w = ev.data.bufferWidth;
    let innerWidth = w * 4;
    let rowIndex = x * 4;
    let origin = y * thisRowLen + rowIndex;
    for (let i = 3; i < buffer.length; i += 4) {
      if (buffer[i]) {
        let j = (i / innerWidth) >>> 0;
        let pxIndex = origin + j * thisRowLen + (i % innerWidth);
        let realHeight = y + j;
        let prev = realHeight *thisRowLen;
        let next = (realHeight + 1) * thisRowLen;
        if (pxIndex > prev && pxIndex < next) {
          thisBuffer[pxIndex] = buffer[i];
          thisBuffer[pxIndex - 3] = buffer[i - 3];
          thisBuffer[pxIndex - 2] = buffer[i - 2];
          thisBuffer[pxIndex - 1] = buffer[i - 1];
        }
      }
    }
    self.postMessage(thisBuffer)
    self.terminate
};
