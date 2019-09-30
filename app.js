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
   makeAbsolute(author, "na", "20px", "0px", "na")
   author.style.fontSize = "26px"
   author.style.color = "yellow"
   document.body.appendChild(author)
}

//* DECORATIONS
document.body.style.backgroundImage = "url(images/bckgnd2.jpg)"
copyRight("Panchenko Vladyslav, FS1a")

function setPointer(id) {
let pointer = create('img')
pointer.src = 'images/point.png'
pointer.style.width = '50px'
pointer.style.position = 'absolute'
pointer.style.display = 'none'
pointer.id = id
document.body.appendChild(pointer)
}



//* LOCALSTORAGE
let playerName = 'Unknown'
let score = 0

//*SOUNDS
let bgdSound = create("audio")
bgdSound.src = "sounds/acdc.mp3"
bgdSound.volume = 0.25

let chickSnd = create("audio")
chickSnd.src = "sounds/chick.mp3"

let hitSnd1 = create("audio")
hitSnd1.src = "sounds/bams.mp3"
let hitSnd2 = create("audio")
hitSnd2.src = "sounds/dums.mp3"
let hitSnd3 = create("audio")
hitSnd3.src = "sounds/pams.mp3"
let hitSounds = [hitSnd1, hitSnd2, hitSnd3]

//* MENU AND LEADERBOARDS
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
   label.innerText = `Current Player name - ${playerName}`
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
   btn.onclick = () => daGame()
   menu.appendChild(btn)
}

createMenu("menu")
createLabel("nickLabel", "nickname")
createInput("nickname")
createBtn("playBtn")
//TODO add leaderboard table

//* GAME INTERFACE
// div which we will use display/hide ingame interface
function createInterface(id) {
   let gameInterface = create("div")
   gameInterface.id = id
   gameInterface.style.display = "none"
   document.body.appendChild(gameInterface)
}

createInterface("gameHolder")

// Vader = Target, it was createDartsTarget, but i could not hold myself down
function createDartVader(circlesNumber, outerRange) {
   for (let i = 1; i <= circlesNumber; i++) {
      let elem = create("div")
      elem.id = `vader${i}`
      elem.style.width = `${outerRange / 2 ** (i - 1)}px`
      elem.style.height = `${outerRange / 2 ** (i - 1)}px`
      let elemOffset = `calc(50% - ${outerRange / 2 / 2 ** (i - 1)}px)`
      makeAbsolute(elem, elemOffset, "na", "na", elemOffset)
      elem.style.borderRadius = "50%"
      elem.style.border = "3px solid black"
      elem.onclick = (e) => {
         hitSounds[Math.floor(Math.random() * 3)].play()
         i !== 4 
          ? score += (i - 1)*2 + i + 1
          : score += (i - 1)*2 + i
      }
      gameHolder.appendChild(elem)
   }
}

createDartVader(4, 320)
vader1.style.background = "rgb(40, 109, 63)"
vader2.style.background = "rgb(245, 205, 27)"
vader3.style.background = "rgb(27, 96, 245)"
vader4.style.background = "rgb(240, 30, 30)"


//* BIRDS
function createBird(id, src, size) {
   let bird = create("img")
   bird.id = id
   bird.src = src
   bird.style.width = `${size}px`
   bird.style.transition = "3s all"
   bird.style.position = "absolute"
   bird.onclick = e => {
      chickSnd.play()
      event.stopPropagation()
   }
   gameHolder.appendChild(bird)
}

function moveBird(id) {
   setInterval(() => {
      let randomTop = Math.floor(Math.random() * 80)
      id.style.top = `${randomTop}%`
      let randomLeft = Math.floor(Math.random() * 80)
      id.style.left = `${randomLeft}%`
   }, 3000)
}

createBird("bird1", "images/parrot.gif", 100)
moveBird(bird1)
createBird("bird2", "images/yellow.gif", 100)
moveBird(bird2)
createBird("bird3", "images/pink.gif", 130)
moveBird(bird3)
createBird("bird4", "images/original.gif", 160)
moveBird(bird4)

//pointer called the last to be over all other elems
setPointer('pointer')

//* PLAY CLICKED

function daGame () {
  score = 0
  menu.style.display = "none"
  gameHolder.style.display = "block" 
  bgdSound.play()
  nickname.value ? (playerName = nickname.value) : null 
  nickLabel.innerText = `Current Player name - ${playerName}`
  pointer.style.display = 'block'
  document.body.onmousemove = e => {
    pointer.style.top = `${e.clientY + 1}px`
    pointer.style.left = `${e.clientX + 1}px`
  }
  document.body.onclick = (e) =>{
    pointer.src = 'images/dart.gif'
    pointer.style.width = '100px'
    pointer.style.top = `${e.clientY - 50}px`
    setTimeout(() => {
    pointer.src = 'images/point.png'  
    pointer.style.width = '50px'
    pointer.style.top = `${e.clientY + 1}px`
    }, 800);
  } 
  setTimeout(() => {
    pointer.style.display = 'none'
    menu.style.display = "flex"
    gameHolder.style.display = "none"
    console.log(score)
    document.body.onmousemove = null
    //game results here (alert?) and switch back to menu
  }, 30000);
}

    //TODO backwards timer?

    //TODO show hits value

    //TODO wrap in functions, check if consts

    //TODO leave dart picture after hit?

    //TODO add comments everywhere

    //TODO split daGame