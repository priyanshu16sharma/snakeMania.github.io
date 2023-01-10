const backgroundSound = new Audio('/items/gameBg.mp3');
const foodSound = new Audio('/items/foodeat.mp3');
const gameOverSound = new Audio('/items/gameOver.mp3');
let currentTime = 0;
let snakeArr = [{ x: 15, y: 13 }];
let foodloc = { x: 12, y: 9 };
let movdirection = { x: 0, y: 0 };

const main = (ctime) => {

    window.requestAnimationFrame(main);
    if (((ctime - currentTime) / 1000) < 0.3) {
        return;
    }
    currentTime = ctime;
    console.log(ctime);
    gameEngine()
}

let gameOver = () => {

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            return true;
        }
    }
    if (snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y > 18 || snakeArr.y < 0) {
        return true;
    }
    return false;

}

//game body
const gameEngine = () => {
    if (gameOver()) {
        gameOverSound.play();
        backgroundSound.pause();
        movdirection = { x: 0, y: 0 };
        snakeArr = [{ x: 15, y: 13 }];
        const foodloc = { x: 12, y: 9 };
        alert("Game Over!!! Press Any Key to play again")
        gameOverSound.pause();
        return
    }
    //after snake has eaten its foood
    if (snakeArr[0].x == foodloc.x && snakeArr[0].y == foodloc.y) {
        foodSound.play();
        snakeArr.unshift({ x: (snakeArr[0].x + movdirection.x), y: (snakeArr[0].y + movdirection.y) })
        let a = 2, b = 16;
        foodloc = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //for moving snake
    for (let i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i] = { ...snakeArr[i - 1] };
    }
    snakeArr[0].x += movdirection.x % 18;
    snakeArr[0].y += movdirection.y % 18;

    //snakeBody
    gameArea.innerHTML = "";
    snakeArr.forEach((data, index) => {
        let snakeElement = document.createElement('div');
        if (index == 0) {
            snakeElement.className = "snakeHead";
        } else {
            snakeElement.className = "snakeBody";
        }
        snakeElement.style.gridColumnStart = data.x;
        snakeElement.style.gridRowStart = data.y;
        gameArea.appendChild(snakeElement);
    })

    //snakefood

    let foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = foodloc.x;
    foodElement.style.gridRowStart = foodloc.y;
    foodElement.className = "food";
    gameArea.appendChild(foodElement);

}

let workingLogic = (e) => {
    backgroundSound.play();
    movdirection = { x: 0, y: 1 };
    console.log(e.key);
    switch (e.key) {
        case "ArrowDown": {
            movdirection.x = 0;
            movdirection.y = 1;
            break;
        }

        case "ArrowUp": {
            movdirection.x = 0;
            movdirection.y = -1;
            break;
        }

        case "ArrowRight": {
            movdirection.x = 1;
            movdirection.y = 0;
            break;
        }

        case "ArrowLeft": {
            movdirection.x = -1;
            movdirection.y = 0;
            break;
        }

        default: {
            break;
        }
    }
}

document.body.addEventListener("keydown", workingLogic);

window.requestAnimationFrame(main);
