let canvas, ctx;
onmessage = (ev) => {
  if (ev.data.msg === "offscreen") {
    canvas = ev.data.canvas;
    ctx = canvas.getContext("2d",{alpha:false});
  }
  if (ev.data.msg === "render") {
    //createImageBitmap(ev.data.image)
      ctx.putImageData(ev.data.image,0,0);
      ev.data = null
  }
};
