const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FE0620', '#F53A0C', '#F5EA0C', '#2D9C19','#0EEED2','#044FC3','#8204F1']

let time = 0
let score = 0
startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
  if (time === 0) {
     finishGame()
  } else {
      let current = --time;
      if (current < 10) {
      current = `0${current}`
  }
  setTime(current)
}
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove() 
    board.innerHTML = 
    `<h1>Your score: <span class='primary'>${score}</span></h1>
    <button value="Refresh Page" onClick="history.go(0);">Start again</button>`
   
}

function getRandomColor() { 
    return colors[Math.floor(Math.random() * colors.length)]
  }
 
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle')
    circle.style.background = getRandomColor()
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min,max) {
    return Math.round(Math.random()* (max-min) + min)
}