import { Buffer } from './Rendering/Buffer.js'
import { GameEntity } from './Entities/GameEntity.js'
import { Scene } from './Scene/Scene.js'
import { ParallaxBackground } from './Scene/Background.js'
import { RadialLight } from './Entities/LightEntity.js'

window.onload = () => {}
let resolution = { x: 1024, y: 128 }
let canvas = document.getElementById('canvas')
canvas.width = resolution.x
canvas.height = resolution.y
const offscreen = canvas.transferControlToOffscreen()
const worker = new Worker('./Rendering/Renderer.js')

worker.postMessage({ msg: 'offscreen', canvas: offscreen }, [offscreen])
if (window.innerWidth > window.innerHeight) {
  canvas.style.height = window.innerHeight
} else {
  canvas.style.width = window.innerWidth
}

//const BackgroundB = new ParallaxBackground("./background.png",0,0,191,64,0,2)
const player = new GameEntity(
  './among.png',
  0,
  resolution.y - 32,
  32,
  32,
  2,
  0,
  1,
  new RadialLight(64, { r: 255, g: 255, b: 255, a: 225 }),
)
const moon = new GameEntity('./Moon.png', 32, 32, 32, 32, 1, 0, true)
//const player = new GameEntity("./Son_Goku.webp", 0, 108 - 32, 120,204, 1);
const Background = new ParallaxBackground('./castle.jpg', 0, 0, 256, 128, 0, 0)

let buffer = new Buffer(resolution.x, resolution.y)
let scene = new Scene([player, moon, Background], 1, null, buffer)
let image = new ImageData(buffer.data, resolution.x)
let pressedKeys = {}
window.onkeyup = (e) => {
  pressedKeys[e.keyCode] = false
}
window.onkeydown = (e) => {
  pressedKeys[e.keyCode] = true
}

//BackgroundB.speed = .1
Background.speed = 1
canvas.addEventListener('mousemove', (e) => {})

// let f = 0;
// const start = Date.now();
// const stop = start + 5000;

// function raf() {
//   requestAnimationFrame(() => {
//     const now = Date.now();
//     if (now < stop){
//       f++;
//       raf();
//     }else{
//       const elapsedSeconds = (now - start) / 1000;
//       console.log('Frame rate is: %f fps', f / elapsedSeconds);
//     }
//   });
// }

//console.log('Testing frame rate...')
//raf();
let i = 0
let momentum = 2
let dirs = [0, 0]
document.addEventListener('keydown', (e) => {
  if (e.key == 'e') {
    console.log(player.border)
  }
  if (e.key == 'Escape' && !openMenus.has('settingsMenu')) {
    openMenu('settingsMenu')
    playSound('optionClick', 0.25)
  }
})

openMenu('mainMenu')

let updateImagedata = (data, res) => {
  image = new ImageData(data, res)
  image.data.set(data)
  scene.buffer = buffer
  resolution = { x: res, y: (res / 8) >>> 0 }
  Background.resetRes(resolution)
  worker.postMessage({ msg: 'resize', res: resolution })
  worker.postMessage({ msg: 'offscreen', canvas: offscreen }, [offscreen])
}
let jumpCooldown = 1000
let dashCooldown = 1000
let gjH = 10 ** 1 + 0.001
let gameLoop = setInterval(() => {
    if (gjH > 10.1) {
      gjH = (gjH / Math.log(gjH)) * 1.5
    } else {
      //clearInterval(jump)
    }
    if (player.y < resolution.y - player.height ) {
      player.y += Math.log(gjH)
    } else {
    }
}, 10)
Math.log = (function () {
  var log = Math.log
  return function (n, base) {
    return log(n) / (base ? log(base) : 1)
  }
})()
setInterval(() => {
  if (player.y < resolution.y - player.height) {
    i += 5
    player.setRotation(i)
  }else{
    if(player.rotation%180 != 0 || (player.rotation%180==0 && (player.rotation/180)%2 == 1)){
    i += 5
    player.setRotation(i)
    }
  }
  moon.setRotation(i)
  if (pressedKeys[87]) {
    dirs[1] = 1
    //player.y -= momentum/(dirs[0]+dirs[1]);
    if (player.y >= resolution.y - player.height && (player.rotation%180==0 && (player.rotation/180)%2 == 0)) {
      let jH = 10 ** 7 + 0.001
      let jump = setInterval(() => {
        if (jH > 10.1) {
          jH = (jH / Math.log(jH)) * 1.5
        } else {
          clearInterval(jump)
        }
        player.y -= Math.log(jH)
      })
      console.log(player.rotation%180)
      player.setRotation(180)
      jumpCooldown = 0
    }
    gjH=10 **2 + 0.001
    Background.directionY = 1
    //Background.scrollY()
    player.mirror()
  }
  if (pressedKeys[83]) {
    dirs[1] = 1
    if (player.y < resolution.y - player.height) {
      let jH = 10 ** 3 + 0.001
      let jump = setInterval(() => {
        if (jH > 10.1) {
          jH = (jH / Math.log(jH)) * 1.5
        } else {
          clearInterval(jump)
        }
        if (player.y < resolution.y - player.height - Math.log(jH)) {
          player.y += Math.log(jH)
        }
      })
      player.setRotation(180)
      jumpCooldown = 0
      pressedKeys[83] = false
    }
    Background.directionY = -1
    //Background.scrollY()
    player.setRotation(0)
  }
  if (pressedKeys[65]) {
    dirs[0] = 1
    player.mirror()
    if (player.x > 0) {
      player.x -= momentum / (dirs[0] + dirs[1])
    }
    //player.x = 0;
    Background.directionX = 1
    Background.scrollX()
  }
  if (pressedKeys[68]) {
    dirs[0] = 1
    player.unMirror()
    if (player.x < resolution.x - player.width) {
      player.x += momentum / (dirs[0] + dirs[1])
    }
    Background.directionX = -1
    Background.scrollX()
  }
  if (pressedKeys[16] && dashCooldown > 1000) {
    player.x += player.width * 1.5 * -Background.directionX
    dashCooldown = 0
  }
  dirs = [0, 0]
}, 1000 / 240)
function animate() {
  worker.postMessage({ msg: 'render', image: image })
  requestAnimationFrame(animate)
}
animate()
export { image, resolution, buffer, updateImagedata }
