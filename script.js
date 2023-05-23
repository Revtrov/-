import { Buffer } from "./Buffer.js";
import { GameEntity } from "./GameEntity.js";
import { Scene } from "./Scene.js";
import { ParallaxBackground } from "./Background.js";

window.onload= () => {};
let resolution = { x: 682, y: 312 };
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


const face = new GameEntity("./face.png",0,0,64,64)
//const face = new GameEntity("./Son_Goku.webp", 0, 108 - 32, 120,204, 1);
const Background = new ParallaxBackground("./grizzy.png",0,0,96,76,0,0)
//const BackgroundB = new ParallaxBackground("./background.png",0,0,191,64,0,2)


let buffer = new Buffer(resolution.x, resolution.y);
let scene = new Scene([face, Background], 1000/240, null, buffer);
let image = new ImageData(buffer.data, resolution.x, resolution.y,);


let pressedKeys = {};
window.onkeyup =  (e) =>{
  pressedKeys[e.keyCode] = false;
};
window.onkeydown =  (e) =>{
  pressedKeys[e.keyCode] = true;
};

//BackgroundB.speed = .1
Background.speed = 1
canvas.addEventListener("mousemove", (e) => {});
let f = 0;
const start = Date.now();
const stop = start + 5000;

function raf() {
  requestAnimationFrame(() => {
    const now = Date.now();
    if (now < stop){
      f++;
      raf();
    }else{
      const elapsedSeconds = (now - start) / 1000;
      console.log('Frame rate is: %f fps', f / elapsedSeconds);
    }
  });
}

//console.log('Testing frame rate...')
//raf();
let i =0;
let momentum= .3
let dirs = [0,0]
document.addEventListener("keydown",(e)=>{
  if(e.key == "e"){
    //console.log( face.border)
  }
})
setInterval(()=>{
  face.setRotation(i)
  if (pressedKeys[87]) {
    dirs[1] = 1
    i++
    face.y -= momentum/(dirs[0]+dirs[1]);
    Background.directionY = 1
    Background.scrollY()
  }
  if (pressedKeys[83]) {
    i++
    dirs[1] = 1
    face.y += momentum/(dirs[0]+dirs[1]);
    Background.directionY = -1
    Background.scrollY()
  }
  if (pressedKeys[65]) {
    i++
    dirs[0] = 1
    face.unMirror()
    face.x -= momentum/(dirs[0]+dirs[1]);
    //BackgroundB.direction = 1
    //BackgroundB.scroll()
    Background.directionX = 1
    Background.scrollX()
  }
  if (pressedKeys[68]) {
    i++
    dirs[0] = 1
    face.mirror()
    face.x += momentum/(dirs[0]+dirs[1]);
    //BackgroundB.direction = -1
    //BackgroundB.scroll()
    Background.directionX = -1
    Background.scrollX()
  }
  dirs=[0,0]
},1000/240)
function animate(){
  worker.postMessage({ msg: "render", image:image});
  requestAnimationFrame(animate)
}
animate()
export { image,resolution, buffer };
