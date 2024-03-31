import { buffer, updateImagedata } from '../script.js'
let settingsInit = () => {
  const stop = function (e) {
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  document.getElementById('resSlider').value = buffer.width
  document.getElementsByClassName(
    'range-text',
  )[0].innerHTML = document.getElementById('resSlider').value
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    input.draggable = true
    input.addEventListener('dragstart', stop)
  })

  let resUpdate = (res) => {
    buffer.reInit(res, res/2)
    updateImagedata(buffer.data, res)
  }
  document.getElementById('resSlider').addEventListener('input', (e) => {
    document.getElementsByClassName('range-text')[0].innerHTML = e.target.value
    console.log(buffer)
    resUpdate(parseInt(e.target.value))
  })
  document.getElementById('resSlider').addEventListener('click', (e) => {
    resUpdate(parseInt(e.target.value))
  })
}
settingsInit()
