//* DRY stuff
//create element shortcut
const create = element => document.createElement(element)

//put 'na' string for sides you dont want to set.
const makeAbsolute = (element, top, right, bottom, left) => {
  element.style.position = "absolute"
  if (top != "na") element.style.top = top
  if (right != "na") element.style.right = right
  if (bottom != "na") element.style.bottom = bottom
  if (left != "na") element.style.left = left
}

//who`s a Daddy here, hah? => adding signature
const copyRight = whosYourDaddy => {
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

//creating dart image over cursor
const setPointer = id => {
  let pointer = create("img")
  pointer.src = "images/point.png"
  pointer.style.width = "50px"
  pointer.style.position = "absolute"
  pointer.style.display = "none"
  pointer.id = id
  document.body.appendChild(pointer)
}

//* LOCALSTORAGE
let playerName = "Unknown"
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
//menu holder div. Will become display none once game starts
let createMenu = id => {
  let menu = create("div")
  menu.id = id
  menu.style.display = "flex"
  menu.style.flexFlow = "column"
  menu.style.alignItems = "center"
  menu.style.padding = "5%"
  menu.style.margin = "0 auto"
  document.body.appendChild(menu)
}

//to show currnet player name
let createLabel = (id, forId) => {
  let label = create("label")
  label.id = id
  label.for = forId
  label.innerText = `Current Player name - ${playerName}`
  label.style.color = "white"
  label.style.margin = "10px"
  label.style.fontSize = "1.6em"
  menu.appendChild(label)
}

let createInput = id => {
  let input = create("input")
  input.id = id
  input.style.fontSize = "1.6em"
  input.placeholder = "Enter your nickname"
  menu.appendChild(input)
}

let createBtn = id => {
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
  //mousedown mouseup instead of btn:active
  btn.onmousedown = e => {
    e.target.style.transform = "translateY(5px)"
    e.target.style.borderBottom = "none"
  }
  btn.onmouseup = e => {
    e.target.style.transform = "translateY(-5px)"
    e.target.style.borderBottom = "solid 10px #475472"
  }
  //let the mortal kombat begin!
  btn.onclick = () => daGame()
  menu.appendChild(btn)
}

//only creating table and head cells. Td will be recreated each time depending on LocalStorage
const createLeaderboard = id => {
  let table = create("table")
  table.id = id
  table.style.border = "2px solid white"
  table.style.marginTop = "20px"
  table.style.fontSize = "2rem"
  let headKey = create("th")
  headKey.style.color = "white"
  headKey.innerText = "Player Name"
  headKey.style.border = "2px solid white"
  headKey.style.padding = "1rem 3rem"
  let headValue = create("th")
  headValue.style.color = "white"
  headValue.innerText = "Best Score"
  headValue.style.border = "2px solid white"
  headValue.style.padding = "1rem 3rem"
  table.appendChild(headKey)
  table.appendChild(headValue)
  menu.appendChild(table)
}

// this guy will recreate score board filling after each game
let adjustLeaderBoard = id => {
   //removing old rows first
  let oldData = [...document.getElementsByTagName("tr")]
  for (let elem of oldData) id.removeChild(elem)
  //then re-filling the table
  let keys = Object.keys(localStorage)
  for (elem of keys) {
    let tr = create("tr")
    let tdKey = create("td")
    let tdValue = create("td")
    tdKey.innerText = elem
    tdKey.style.padding = "1rem 3rem"
    tdKey.style.color = "white"
    tdValue.innerText = localStorage[elem]
    tdValue.style.padding = "1rem 3rem"
    tdValue.style.color = "white"
    tr.appendChild(tdKey)
    tr.appendChild(tdValue)
    id.appendChild(tr)
  }
}

createMenu("menu")
createLabel("nickLabel", "nickname")
createInput("nickname")
createBtn("playBtn")
createLeaderboard("leaderScores")
adjustLeaderBoard(leaderScores)

//* GAME INTERFACE
// div which we will use to display/hide ingame interface
let createInterface = id => {
  let gameInterface = create("div")
  gameInterface.id = id
  gameInterface.style.display = "none"
  gameInterface.style.textAlign = "center"
  document.body.appendChild(gameInterface)
}

createInterface("gameHolder")

let showScore = id => {
  let scoreSpan = create("span")
  scoreSpan.id = id
  scoreSpan.style.display = "inline-block"
  scoreSpan.style.fontSize = "6rem"
  scoreSpan.style.color = "white"
  scoreSpan.innerText = score
  gameHolder.appendChild(scoreSpan)
}

showScore("gameScore")

// Vader = Target, it was createDartsTarget, but i could not hold myself down
let createDartVader = (circlesNumber, outerRange) => {
  for (let i = 1; i <= circlesNumber; i++) {
    let elem = create("div")
    elem.id = `vader${i}`
    //math expression for 1 2 4 8 series =)
    //we will use series to have 320 become 320, 160, 80, 40 inside the for
    elem.style.width = `${outerRange / 2 ** (i - 1)}px`
    elem.style.height = `${outerRange / 2 ** (i - 1)}px`
    //same but divided by 2. Placing elem in the middle of the screen
    let elemOffset = `calc(50% - ${outerRange / 2 / 2 ** (i - 1)}px)`
    makeAbsolute(elem, elemOffset, "na", "na", elemOffset)
    elem.style.borderRadius = "50%"
    elem.style.border = "3px solid black"
    elem.onclick = e => {
       //getting one of three hit sounds randomly
      hitSounds[Math.floor(Math.random() * 3)].play()
      // math expression to set 2 5 8 10 points as elem scores
      i !== 4 ? (score += (i - 1) * 2 + i + 1) : (score += (i - 1) * 2 + i)
      //updating score indicator for player
      gameScore.innerText = score
    }
    gameHolder.appendChild(elem)
  }
}

//create Dart Vader!! tam-tam-tam tam-tadam tam-tadam
createDartVader(4, 320)
vader1.style.background = "rgb(40, 109, 63)"
vader2.style.background = "rgb(245, 205, 27)"
vader3.style.background = "rgb(27, 96, 245)"
vader4.style.background = "rgb(240, 30, 30)"

//* BIRDS
let createBird = (id, src, size) => {
  let bird = create("img")
  bird.id = id
  bird.src = src
  bird.style.width = `${size}px`
  bird.style.transition = "3s all"
  bird.style.position = "absolute"
  //a lovely bird singing
  bird.onclick = () => chickSnd.play()
  gameHolder.appendChild(bird)
}

let moveBird = id => {
  setInterval(() => {
     //birds fly inside inner 80% of doc to cover aim a bit more often
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
setPointer("pointer")

//* PLAY CLICKED
let changeCursor = () => {
  pointer.style.display = "block"
  document.body.onmousemove = e => {
    pointer.style.top = `${e.clientY + 1}px`
    pointer.style.left = `${e.clientX + 1}px`
  }
  document.body.onclick = e => {
    pointer.src = "images/dart.gif"
    pointer.style.width = "100px"
    pointer.style.top = `${e.clientY - 50}px`
    setTimeout(() => {
      pointer.src = "images/point.png"
      pointer.style.width = "50px"
      pointer.style.top = `${e.clientY + 1}px`
    }, 800)
  }
}

//once game finished we need to switch everything to default state, hide game and sjow menu
let resetGame = () => {
  pointer.style.display = "none"
  menu.style.display = "flex"
  gameHolder.style.display = "none"
  document.body.onmousemove = null
  gameScore.innerText = "0"
}

let checkGameResults = () => {
   //if player typed his name we will save him in localstorage
   //if current score is not a new highscore - we should not overwrite the old one
  if (playerName != "Unknown" && +localStorage.getItem(playerName) < score) {
    localStorage.setItem(playerName, score)
    //re-filling leaderboard
    adjustLeaderBoard(leaderScores)
    alert(
      `Great job ${playerName}, you beat your previous highscore. New highscore ${score}`
    )
  } else
    alert(
      `No luck ${playerName}, you did not manage to beat your previous highscore. Current score is ${score}, your highscore was ${localStorage.getItem(playerName)}`
    )
}

//hiding menu, showing game interface, setting 30sec game session
let daGame = () => {
  score = 0
  menu.style.display = "none"
  gameHolder.style.display = "block"
  bgdSound.play()
  nickname.value ? (playerName = nickname.value) : null
  nickLabel.innerText = `Current Player name - ${playerName}`
  changeCursor()
  setTimeout(() => {
    resetGame()
    checkGameResults()
  }, 30000)
}