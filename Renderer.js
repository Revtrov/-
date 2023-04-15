let canvas, ctx;
onmessage = (ev) => {
  if (ev.data.msg === "render") {
    Promise.all([
    createImageBitmap(ev.data.image)
    ]).then((sprites) => {
      ctx.transferFromImageBitmap(sprites[0]);
    });
  }
  if (ev.data.msg === "offscreen") {
    canvas = ev.data.canvas;
    ctx = canvas.getContext("bitmaprenderer");
  }
};
