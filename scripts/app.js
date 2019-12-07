document.addEventListener('DOMContentLoaded', () => {
  const width = 20  //amend width here
  const grid = document.querySelector('.grid') //links css to grid in JS
  const cells = []
  let snakeArray = [201, 200, 199] //starts squares 199 - 201
  let direction = 'right'
  let speedSnake = 400 //speed at start
  // //  COUNTDOWN TIMER
  const timeRemaining = document.querySelector('.timeRemaining')
  const currentCountdown = document.querySelector('#currentCountdown') //whole bar
  let timerNumber = 50 //timer starts at 50
  let timerId = 0
  // SCORE PROGRESS BAR
  const userScore = document.querySelector('.userScore')
  const scoreDisplay = document.querySelector('#scoreDisplay') //whole bar
  let score = 0 //score starts at 0
  // START BUTTON
  const startButton = document.querySelector('.startButton')
  // RESET BUTTON
  const resetButton = document.querySelector('.resetButton')

  // MAKE GRID
  function addGrid() {
    for (let i = 0; i < width ** 2; i++) {    // start 0, if cell is less than (not equal to) 400 (20x20), add 1
      const cell = document.createElement('DIV')    // creates a cell to class ".grid div"
      grid.appendChild(cell)    // adds cell to grid
      cells.push(cell)    // adds cell to array 
    }
  }
  addGrid()

  // ADD SNAKE
  function drawSnake() {
    snakeArray.forEach(index => cells[index].classList.add('snake')) // add snake styling to each snakeArray element
  }
  
  // ERASE SNAKE
  function eraseSnake() {
    snakeArray.forEach(index => cells[index].classList.remove('snake'))
    snakeArray.forEach(index => cells[index].classList.remove('snakeDead'))
  }

  // GAME OVER
  function gameOver() {
    clearInterval(timerId)
    snakeArray.forEach(index => cells[index].classList.add('snakeDead'))
    console.log('game over')
  }

  // KILL SNAKE
  // SNAKE BITES ITSELF GAME OVER
  function killSnake() {
    if (snakeArray.slice(1).includes(snakeArray[0])) { // if snake body includes snake head game over
      console.log('snake bites itself')
      // return gameOver()
    }
  }

  // ADDS FOOD
  food()

  // =====================================================================

  // MOVE SNAKE
  function moveSnake() {
    // IF COLLIDES WITH WALL GAME OVER
    if (snakeArray[0] % width === 0 && direction === 'left' ||
      snakeArray[0] % width === width - 1 && direction === 'right' ||
      snakeArray[0] - width < 0 && direction === 'up' ||
      snakeArray[0] >= width * (width - 1) && direction === 'down') {
      return gameOver()
    }
    killSnake()

    // DIRECTION OF KEYS
    switch (direction) {
      case 'right': moveSnakeRight()
        console.log( 'Move Right')
        break
      case 'left': moveSnakeLeft()
        console.log('Move Left')
        break
      case 'up': moveSnakeUp()
        console.log('Move Up')
        break
      case 'down': moveSnakeDown()
        console.log('Move Down')
    }
    
    // SNAKE EATS FOOD
    if (cells[snakeArray[0]].classList.contains('food')) {   // if head cell matches food cell
      score++
      speedSnake -= 10 //increases speed of snake
      console.log('snake speed', speedSnake)
      cells[snakeArray[0]].classList.remove('food') // remove food
      cells[snakeArray[0]].style.backgroundImage = '' //
      snakeArray.unshift(snakeArray[0]) // add cell to snakeArray
      scoreDisplay.innerHTML = score // push score into progress bar
      // SCORE PROGRESS BAR
      if (score <= 10) {
        userScore.style.width = (score * 5) + '%'
      } else {
        userScore.style.width = 100 + '%'
      }
      food() // create more food
    }

    drawSnake() // redraw snake with additional cell

    const timer = setTimeout(moveSnake, speedSnake)
    return timer
  }

  // ==================================================================

  // //  COUNTDOWN TIMER
  function countdownTimer() {
    timerId = setInterval(() => {
      timerNumber = timerNumber - 1
      currentCountdown.innerHTML = timerNumber
      // COUNTDOWN PROGRESS BAR
      if (timerNumber <= 50000) {
        timeRemaining.style.width = (timerNumber * 2) + '%' //as start 50, 2%=1sec
      } else {
        timeRemaining.style.width = 100 + '%'
      }
    }, 1000)

    setTimeout(() => {
      clearInterval(timerId)
    }, 50000)  //runs for 50 seconds before stopping
  }

  // ====================================================

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

  // ==========================================================

  // DON'T RETRACE STEPS (DIRECTION)
  document.addEventListener('keyup', (e) => {
    e.preventDefault()
    switch (e.keyCode) {
      case 37: if (direction !== 'right') direction = 'left'
        console.log('left key pressed')
        break
      case 38: if (direction !== 'down') direction = 'up'
        console.log('up key pressed')
        break
      case 39: if (direction !== 'left') direction = 'right'
        console.log('right key pressed')
        break
      case 40: if (direction !== 'up') direction = 'down'
        console.log('down key pressed')
        break   
    }
  })

  // =====================================================================

  // CHANGE FOOD ITEM
  function changeFoodItem() {
    const foodArrayURL = [
      './assets/apple.png',
      './assets/pear.png',
      './assets/pear.png',
      './assets/plum.png',
      './assets/plum.png',
      './assets/plum.png',
      './assets/strawberry.png',
      './assets/strawberry.png',
      './assets/strawberry.png',
      './assets/strawberry.png',
      './assets/orange.png',
      './assets/orange.png',
      './assets/orange.png',
      './assets/orange.png',
      './assets/orange.png',
      './assets/chocolateCake.png',
      './assets/iceCreamCone.png',
      './assets/pickle.png',
      './assets/swissCheese.png',
      './assets/sliceOfSalami.png',
      './assets/lolly.png',
      './assets/cherryPie.png',
      './assets/sausage.png',
      './assets/cupcake.png',
      './assets/watermelon.png'
    ]
    foodArrayURL.forEach(element => element)
    document.querySelector('.food').style.backgroundImage = `url('${foodArrayURL[score]}')`
  }


  // ADD FOOD TO RANDOM CELL
  function food() {
    let selectRandomCell = Math.floor(Math.random() * cells.length)
    while (cells[selectRandomCell].classList.contains('snake')) {
      selectRandomCell = Math.floor(Math.random() * cells.length)
    }
    cells[selectRandomCell].classList.add('food') // add food to random cell
    console.log('add food to random cell')
    changeFoodItem()
  }


  // // RESET BUTTON
  resetButton.addEventListener('click', () => {
    console.log('reset button clicked')
    gameOver()
    eraseSnake()
    timerNumber = 50
    timerId = 0
    currentCountdown.innerHTML = timerNumber
    timeRemaining.style.width = 100 + '%'
    score = 0
    scoreDisplay.innerHTML = score
    // REMOVE FOOD
    // cells.forEach(index => cells[index].classList.remove('food'))
    // grid.forEach(index => cells[index].classList.remove('food'))

    // foods start from the begining
    grid.classList.remove('food')
  })

  // START BUTTON
  startButton.addEventListener('click', () => {
    console.log('start button clicked')
    snakeArray = [201, 200, 199]
    direction = 'right'
    speedSnake = 400
    moveSnake() //(includes collide with tail, direction, eating food)
    countdownTimer()
  })


  // STOP DEFAULT SCROLLING
  window.addEventListener('keydown', function (e) {
    // space and arrow keys
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
  }, false)


})


