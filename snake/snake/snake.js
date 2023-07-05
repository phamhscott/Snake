
const COLS = 20;
const ROWS = 20;
const INITIAL_SPEED = 200; // Milliseconds


let snake = [{ x: 10, y: 10 }];
let food = { };
let direction = 'right';
let speed = INITIAL_SPEED;
let gameLoop;


const gameBoard = document.getElementById('game-board');


function drawBoard() {
    gameBoard.innerHTML = '';

    
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}


function update() {
    const head = { x: snake[0].x, y: snake[0].y };

  
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;
    if (direction === 'left') head.x--;
    if (direction === 'right') head.x++;

   
    snake.unshift(head);

   
    if (head.x === food.x && head.y === food.y) {
      
        speed -= 10; // Increase the game speed
        generateFood();
    } else {
       
        snake.pop();
    }

    
    if (head.x < 1 || head.x > COLS || head.y < 1 || head.y > ROWS || isSnakeCollision()) {
        clearInterval(gameLoop);
        alert('Game Over!');
      
    }

    drawBoard();
}


function handleKeyPress(event) {
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';
}


function isSnakeCollision() {
    //array destructuring
    const [head, ...body] = snake;
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}


function generateFood() {
    food = {
        x: Math.floor(Math.random() * COLS) + 1,
        y: Math.floor(Math.random() * ROWS) + 1
    };


    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}


function init() {
    drawBoard();
    generateFood();
    gameLoop = setInterval(update, speed);
    document.addEventListener('keydown', handleKeyPress);
}


init();
