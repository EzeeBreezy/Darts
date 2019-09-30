//* DRY stuff
//create element shortcut
let create = element => document.createElement(element)

//put 'na' string for sides you dont want to set.
let makeAbsolute = (element, top, right, bottom, left) => {
  element.style.position = "absolute"
  if (top != "na") element.style.top = top
  if (right != "na") element.style.right = right
  if (bottom != "na") element.style.bottom = bottom
  if (left != "na") element.style.left = left
}

let copyRight = whosYourDaddy => {
  let author = create("span")
  author.innerText = whosYourDaddy
  makeAbsolute(author, "na", '20px', '0px', "na")
  author.style.fontSize = "26px"
  author.style.color = "yellow"
  document.body.appendChild(author)
}

//* DECORATIONS
document.body.style.backgroundImage = "url(images/bckgnd2.jpg)"
copyRight("Panchenko Vladyslav, FS1a")

//TODO bgnd musik should start with game
// let bgdSound = create("audio")
// bgdSound.src = "sounds/acdc.mp3"
// bgdSound.autoplay = "autoplay"
// bgdSound.loop = "loop"
// bgdSound.volume = 0.5
// // bgdSound.play()
// document.body.appendChild(bgdSound)

//* menu and leaderboards
function createMenu(id) {
  let menu = create("div")
  menu.id = id
  menu.style.display = "flex"
  menu.style.flexFlow = "column"
  menu.style.alignItems = "center"
  menu.style.padding = "5%"
  menu.style.margin = "0 auto"
  document.body.appendChild(menu)
}

function createLabel(id, forId) {
  let label = create("label")
  label.id = id
  label.for = forId
  label.innerText = "Current Player name - Unknown"
  label.style.color = "white"
  label.style.margin = "10px"
  label.style.fontSize = "1.6em"
  menu.appendChild(label)
}

function createInput(id) {
  let input = create("input")
  input.id = id
  input.style.fontSize = "1.6em"
  input.placeholder = "Enter your nickname"
  menu.appendChild(input)
}

function createBtn(id) {
  let btn = create("button")
  btn.id = id
  btn.innerText = "PLAY"
  btn.style.outline = "none"
  btn.style.margin = "20px"
  btn.style.width = "200px"
  btn.style.padding = "0.5em 1em"
  btn.style.fontSize = "1.6em"
  btn.style.background = "#a1d6a4"
  btn.style.color = "rgb(15, 146, 48)"
  btn.style.borderBottom = "solid 10px #475472"
  btn.style.borderRadius = "3px"
  btn.onmousedown = e => {
    e.target.style.transform = "translateY(5px)"
    e.target.style.borderBottom = "none"
  }
  btn.onmouseup = e => {
    e.target.style.transform = "translateY(-5px)"
    e.target.style.borderBottom = "solid 10px #475472"
  }
  btn.onclick = () => {
    menu.style.display = "none"
    gameHolder.style.display = 'block' //! block?
    nickname.value ? (playerName = nickname.value) : null
 //TODO add gamestrt function (timeout 30sec)
  }
  menu.appendChild(btn)
}

createMenu("menu")
createLabel("nickLabel", "nickname")
createInput("nickname")
createBtn("playBtn")
//TODO add leaderboard table

//* game interface

// div which we will use display/hide ingame interface
function createInterface (id) {
    let gameInterface = create('div')
    gameInterface.id = id
    gameInterface.style.display = 'none'
    document.body.appendChild(gameInterface)
}

createInterface('gameHolder')

// Vader = Target, it was createDartsTarget, but i could not hold myself down
function createDartVader(circlesNumber, outerRange) {
    for (let i = 1; i <= circlesNumber; i++) {
        let elem = create('div')
        elem.id = `vader${i}`
        elem.style.width = `${outerRange / (2**(i - 1))}px`
        elem.style.height = `${outerRange / (2**(i - 1))}px`
        let elemOffset = `calc(50% - ${(outerRange/2)/(2**(i - 1))}px)`
        makeAbsolute(elem, elemOffset, 'na', 'na', elemOffset)
        elem.style.borderRadius = '50%'
        elem.style.border = '3px solid black'
        gameHolder.appendChild(elem)
    }
}

createDartVader(4, 320)
vader1.style.background = 'rgb(40, 109, 63)'
vader2.style.background = 'rgb(245, 205, 27)'
vader3.style.background = 'rgb(27, 96, 245)'
vader4.style.background = 'rgb(240, 30, 30)'
