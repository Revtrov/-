let soundBuffer = 0
let playSound = (soundName, volume = 1) => {
  if (soundBuffer <= 0) {
    let audio = new Audio(`./sfx/${soundName}.mp3`)
    audio.volume = volume
    audio.play()
    soundBuffer = 50
    setTimeout(() => {
      soundBuffer = 0
    }, soundBuffer)
  }
}

let openMenus = new Set([])
let closeMenu = (menuName) => {
  soundBuffer = 0
  document
    .getElementById('menuCss')
    .removeChild(document.getElementById(menuName + 'css'))
  document
    .getElementById('menuContainerContainer')
    .removeChild(document.getElementById(menuName + 'html'))
  document.body.removeChild(document.getElementById(menuName + 'js'))
  openMenus.delete(menuName)
}
let openMenu = (menuName) => {
  soundBuffer = 0

  if (!openMenus.has(menuName)) {
    if (!document.getElementById(menuName + 'css')) {
      let css = document.createElement('link')
      css.setAttribute('id', `${menuName}css`)
      css.setAttribute('rel', 'stylesheet')
      css.setAttribute('href', `./menuStylesheets/${menuName}.css`)
      document.getElementById('menuCss')
      document.getElementById('menuCss').appendChild(css)
    }
    if (document.getElementById(menuName + 'js')) {
      document.body.removeChild(document.getElementById(menuName + 'js'))
    }
    let menuScript = document.createElement('script')
    menuScript.setAttribute(
      'src',
      `./menuScripts/${menuName}.js?` + Math.random(),
    )
    menuScript.setAttribute('id', menuName + 'js')
    menuScript.setAttribute('type', 'module')
    document.body.insertBefore(menuScript, document.getElementById('mainJs'))
    fetch(`./menus/${menuName}.html`)
      .then((res) => res.text())
      .then((text) => {
        if (!document.getElementById(menuName + 'html')) {
          document.getElementById(
            'menuContainerContainer',
          ).innerHTML += `<div class="menuContainer" id="${menuName}html">${text}</div>`
        }
      })
      .catch((e) => console.error(e))
    openMenus.add(menuName)
  }
}
let hideMenu = (menuName) => {
  document.getElementById(menuName + 'html').style.visibility = 'hidden'
}
let unHideMenu = (menuName) => {
  try {
    document.getElementById(menuName + 'html').style.visibility = 'visible'
  } catch {
    console.log('nomenu')
  }
}
