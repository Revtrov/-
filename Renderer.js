class Renderer {
  constructor(_ctx, _buffer, _fps,_canvas) {
    this.ctx = _ctx;
    this.buffer = _buffer;
    this.canvas = _canvas
    setInterval(() => {
      this.draw(_buffer);
    }, 1000 / _fps);
  }
  draw() {
    let status = true;
    this.canvas.width = this.buffer.width;
    this.canvas.height = this.buffer.height;
    try {
      this.ctx.putImageData(this.buffer, 0, 0);
    } catch (e) {
      status = false;
      console.error(e)
    }
    return status;
  }
}
export { Renderer };
