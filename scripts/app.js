console.log('working?')


document.addEventListener('DOMContentLoaded', () => {
  const width = 20  //amend width here
  const grid = document.querySelector('.grid')
  const cells = []
  const snakeArray = [207, 206, 205] //starts square 1
  let direction = 'right'
  let score = 0
  let speedSnake = 400

  // SCORE PROGRESS BAR
  const userScore = document.querySelector('.userScore')
  const scoreDisplay = document.querySelector('#scoreDisplay')





  // MAKE GRID
  for (let i = 0; i < width ** 2; i++) {    // start 0, if cell is less than (not equal to) 400, add 1
    const cell = document.createElement('DIV')    // creates a cell to element div
    grid.appendChild(cell)    // adds cell to grid
    cells.push(cell)    // adds cell to array 
  }

  food()

  // ADDS SNAKE
  function drawSnake() {
    snakeArray.forEach(index => cells[index].classList.add('snake'))    // add snake styling to each snakeArray element
  }

  // ERASE SNAKE
  function eraseSnake() {
    snakeArray.forEach(index => cells[index].classList.remove('snake'))
  }

  // ADD RANDOM FOOD
  function food() {
    let selectRandomCell = Math.floor(Math.random() * cells.length)
    while (cells[selectRandomCell].classList.contains('snake')) {
      selectRandomCell = Math.floor(Math.random() * cells.length)
    }
    cells[selectRandomCell].classList.add('food')   // add food to random cell
  }

  // GAME OVER
  function gameOver() {
    eraseSnake()
    speedSnake = 400
  }

  // SNAKE BITES ITSELF
  function killSnake() {
    if (snakeArray.slice(1).includes(snakeArray[0])) {    // if snake body includes snake head game over
      return gameOver()
    }
  }



  // MOVE SNAKE
  function moveSnake() {
    // IF COLLIDES WITH WALL GAME OVER
    if (snakeArray[0] % width === 0 && direction === 'left' ||
      snakeArray[0] % width === width - 1 && direction === 'right' ||
      snakeArray[0] - width < 0 && direction === 'up' ||
      snakeArray[0] >= width * (width - 1) && direction === 'down') {
      return gameOver
    }
    eraseSnake()

    // DIRECTION OF KEYS
    switch (direction) {
      case 'right': moveSnakeRight()
        break
      case 'left': moveSnakeLeft()
        break
      case 'up': moveSnakeUp()
        break
      case 'down': moveSnakeDown()
    }
    killSnake()

    // EAT FOOD
    if (cells[snakeArray[0]].classList.contains('food')) {   // if head cell matches food cell
      score++
      speedSnake -= 50
      cells[snakeArray[0]].classList.remove('food')   // remove food
      snakeArray.unshift(snakeArray[0])    // add cell to snakeArray
      scoreDisplay.innerHTML = score   // push score into HTML

      if (score <= 10) {
        userScore.style.width = (score * 5) + '%'
      } else {
        userScore.style.width = 100 + '%'
      }

      food()    // create more food
    }
    drawSnake()     // redraw snake with additional cell

    const timer = setTimeout(moveSnake, speedSnake)
    return timer
  }
  moveSnake()     // calls function (includes collide with wall, direction shortcuts, eating food)

 
  // //  COUNTDOWN TIMER
  const timeRemaining = document.querySelector('.timeRemaining')
  const currentCountdown = document.querySelector('#currentCountdown')
  let timerNumber = 50
  let timerId = 0
 
  timerId = setInterval(() => {
    timerNumber = timerNumber - 1
    currentCountdown.innerHTML = timerNumber
    console.log('setInterval working')

    if (timerNumber <= 50000) {
      timeRemaining.style.width = (timerNumber * 2) + '%'
      console.log('here')
    } else {
      timeRemaining.style.width = 100 + '%'
    }

  }, 1000)

  setTimeout(() => {
    clearInterval(timerId)
  }, 50000)  //runs for 20 seconds before stopping
  
  



  // CHANGE DIRECTION OF SNAKE ARRAY
  function moveSnakeDown() {
    eraseSnake()
    snakeArray.pop()    // deletes last cell in snakeArray
    snakeArray.unshift(snakeArray[0] + width)   // adds width of grid to the head of snakeArray cell (one row down)
    drawSnake()
  }

  function moveSnakeUp() {
    eraseSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - width)   // subtracts width of grid to head cell (one row up)
    drawSnake()
  }

  function moveSnakeLeft() {
    eraseSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - 1)    // subtracts one cell from head of snakeArray
    drawSnake()
  }

  function moveSnakeRight() {
    eraseSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] + 1)    // adds one cell to head of snake array
    drawSnake()
  }

  
  // DON'T GO ON TOP OF ITSELF
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37: if (direction !== 'right') direction = 'left'
        break
      case 38: if (direction !== 'down') direction = 'up'
        break
      case 39: if (direction !== 'left') direction = 'right'
        break
      case 40: if (direction !== 'up') direction = 'down'
        break
    }
  })

})
