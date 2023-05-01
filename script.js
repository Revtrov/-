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


const face = new GameEntity("./face.png",0,0,32,32)
const moon = new GameEntity("./Son_Goku.webp", 0, 108 - 32, 64, 164, 1);
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
let momentum= 2
let dirs = [0,0]
document.addEventListener("keydown",(e)=>{
  if(e.key == "e"){
    console.log( moon.border)
  }
})
setInterval(()=>{
  face.setRotation(i)
  i+=1
  face.x+=0.1
  if (pressedKeys[87]) {
    dirs[1] = 1
    moon.y -= momentum/(dirs[0]+dirs[1]);
  }
  if (pressedKeys[83]) {
    dirs[1] = 1
    moon.y += momentum/(dirs[0]+dirs[1]);
  }
  if (pressedKeys[65]) {
    dirs[0] = 1
    moon.unMirror()
    moon.x -= momentum/(dirs[0]+dirs[1]);
    //BackgroundB.direction = 1
    //BackgroundB.scroll()
    //Background.directionX = 1
    //Background.scrollX()
  }
  if (pressedKeys[68]) {
    dirs[0] = 1
    moon.mirror()
    moon.x += momentum/(dirs[0]+dirs[1]);
    //BackgroundB.direction = -1
    //BackgroundB.scroll()
    //Background.directionX = -1
    //Background.scrollX()
  }
  dirs=[0,0]
},1000/240)
function animate(){
  worker.postMessage({ msg: "render", image:image});
  requestAnimationFrame(animate)
}
animate()
export { image,resolution };
