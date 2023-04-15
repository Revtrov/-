import { Buffer } from "./Buffer.js";
import { GameEntity } from "./GameEntity.js";
import { Scene } from "./Scene.js";


let resolution = { x: 382, y: 216 };
let canvas = document.getElementById("canvas");
canvas.width =resolution.x;
canvas.height = resolution.y;
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker("Renderer.js");
worker.postMessage({ msg: "offscreen", canvas: offscreen}, [offscreen]);
if (window.innerWidth > window.innerHeight) {
  canvas.style.height = window.innerHeight;
} else {
  canvas.style.width = window.innerWidth;
}


const moon = new GameEntity("./moon.png", 0, 108 - 64, 64, 64, 2);
const face = new GameEntity("./face.png", 0, 108 - 64, 64, 64, 1);

window.onresize = () => {};
let buffer = new Buffer(resolution.x, resolution.y);
let scene = new Scene([moon, face], 100, null, buffer);
let image = new ImageData(buffer.data, resolution.x, resolution.y);

let pressedKeys = {};
window.onkeyup =  (e) =>{
  pressedKeys[e.keyCode] = false;
};
window.onkeydown =  (e) =>{
  pressedKeys[e.keyCode] = true;
};

canvas.addEventListener("mousemove", (e) => {});
setInterval(()=>{
  if (pressedKeys[87]) {
    moon.y -= .5;
  }
  if (pressedKeys[83]) {
    moon.y += .5;
  }
  if (pressedKeys[65]) {
    moon.x -= .5;
  }
  if (pressedKeys[68]) {
    moon.x += .5;
  }
},1000/144)
function animate(){
  worker.postMessage({ msg: "render", image:image});
  requestAnimationFrame(animate)
}
animate()
export { image };
