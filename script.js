import { Buffer } from "./Buffer.js";
import { GameEntity } from "./GameEntity.js";
import { Scene } from "./Scene.js";
import { ParallaxBackground } from "./Background.js";

window.onload= () => {};
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


const face = new GameEntity("./face.png",0,0,32,32)
const moon = new GameEntity("./moon.png", 0, 108 - 64, 64, 64, 1);
//const Background = new ParallaxBackground("./background.png",0,0,968,764,0,0)
//const BackgroundB = new ParallaxBackground("./background.png",0,0,191,64,0,2)


let buffer = new Buffer(resolution.x, resolution.y);
let scene = new Scene([moon,face], 1000/240, null, buffer);
let image = new ImageData(buffer.data, resolution.x, resolution.y,);


let pressedKeys = {};
window.onkeyup =  (e) =>{
  pressedKeys[e.keyCode] = false;
};
window.onkeydown =  (e) =>{
  pressedKeys[e.keyCode] = true;
};

//BackgroundB.speed = .1
//Background.speed = .1
canvas.addEventListener("mousemove", (e) => {});

let i = 0;
setInterval(()=>{
  i+=1
  moon.rotateEntity(i)
  face.x+=0.1
  if (pressedKeys[87]) {
    moon.y -= .5;
  }
  if (pressedKeys[83]) {
    moon.y += .5;
  }
  if (pressedKeys[65]) {
    moon.x -= .5;
    //BackgroundB.direction = 1
    //BackgroundB.scroll()
    //Background.directionX = 1
    //Background.scrollX()
  }
  if (pressedKeys[68]) {
    moon.x += .5;
    //BackgroundB.direction = -1
    //BackgroundB.scroll()
    //Background.directionX = -1
    //Background.scrollX()
  }
},1000/240)
function animate(){
  worker.postMessage({ msg: "render", image:image});
  requestAnimationFrame(animate)
}
animate()
export { image,resolution };
