import { Renderer } from "./Renderer.js";
import { Buffer } from "./Buffer.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imageLoader = document.getElementById("imageLoader");
let imageLoaderCtx = imageLoader.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (window.innerWidth > window.innerHeight) {
  canvas.style.height = window.innerHeight;
} else {
  canvas.style.width = window.innerWidth;
}
let size = 128;
let bufferB = new Buffer(size, size);
const face = new Image();
face.src = "./moon.png";
let imageData;
imageLoaderCtx.imageSmoothingEnabled = false;
face.onload = () => {
  imageLoader.imageSmoothingEnabled = false;
  imageLoaderCtx.drawImage(face, 0, 0, size, size);
  imageData = imageLoaderCtx.getImageData(0, 0, size, size);
  bufferB.data = imageData.data;
};

window.onresize = () => {};
let buffer = new Buffer(192, 144);
let image = new ImageData(buffer.data, 192, 144);
let x, y;
canvas.addEventListener("mousemove", (e) => {
  var rect = e.target.getBoundingClientRect();
  x = Math.floor(((e.clientX - rect.left) / canvas.clientWidth) * canvas.width);
  y = Math.floor(
    ((e.clientY - rect.top) / canvas.clientHeight) * canvas.height
  );
});

let renderer = new Renderer(ctx, image, 240, canvas);
setInterval(() => {
  imageLoader.width = size;
  imageLoader.height = size;
  size -= 4;
  imageLoaderCtx.webkitImageSmoothingEnabled = false;
  imageLoaderCtx.mozImageSmoothingEnabled = false;
  imageLoaderCtx.imageSmoothingEnabled = false;
  imageLoader.imageSmoothingEnabled = false;
  imageLoaderCtx.drawImage(face, 0, 0, size, size);
  imageData = imageLoaderCtx.getImageData(0, 0, size, size);
  bufferB.data = imageData.data;
  bufferB.width = size;
  bufferB.height = size;
  buffer.reset();
  buffer.merge(bufferB, x - bufferB.width / 2, y - bufferB.height / 2);

  renderer.buffer = image;
}, 1000 / 10);
