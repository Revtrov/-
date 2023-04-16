let canvas, ctx;
onmessage = (ev) => {
  if (ev.data.msg === "offscreen") {
    canvas = ev.data.canvas;
    ctx = canvas.getContext("bitmaprenderer",{willReadFrequently: true,alpha:false});
  }
  if (ev.data.msg === "render") {
    Promise.all([
    createImageBitmap(ev.data.image)
    ]).then((sprites) => {
      ctx.transferFromImageBitmap(sprites[0]);
    });
  }
};
