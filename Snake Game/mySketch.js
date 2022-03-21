// Displaying and canvas
const scl = 30
const gameWidth = scl*15
const gameHeight = scl*15

// Game global vars
let snake = new Snake(Math.floor(gameWidth/scl/2), Math.floor(gameHeight/scl/2), 1, 0)
let isSnakeNotEating = true
let apples = []
let GAMEOVER = false
// High Score
let highScore = JSON.parse(localStorage.getItem("highScore")) ?? 0

// Sounds
let levelSound;
let eatAppleSound;
let gameOverSound;

// 0 is nothing
// 1 is snake
// 2 is apple
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function setup() {
    createCanvas(gameWidth, gameHeight+ 50)
    frameRate(6)
    apples = [pickAppleLocation()]
    levelSound = new sound("Sounds/level-music.wav")
    eatAppleSound = new sound("Sounds/eat-apple.wav")
    gameOverSound = new sound("Sounds/gameover.wav")
    levelSound.play()
}

function draw() {
    if (!GAMEOVER) {
        levelSound.play()
        background(50)
        board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        for (let n = 0; n < apples.length; n++) {
            board[apples[n].y][apples[n].x] = 2
        }
        snake.move(isSnakeNotEating)
        for (let n = 0; n < snake.squares.length; n++) {
            if (n == snake.squares.length-1) {
                // Collide with itself
                if (snake.squares[n].y > gameHeight/scl-1 || snake.squares[n].y < 0 || snake.squares[n].x > gameWidth/scl-1 || snake.squares[n].x < 0) {
                    // Moved off screen
                    GAMEOVER = true
                    levelSound.stop()
                    gameOverSound.play()
                    break;
                }
                else if (board[snake.squares[n].y][snake.squares[n].x] == 2) {
                    isSnakeNotEating = false
                    eatAppleSound.play()
                    apples = [pickAppleLocation()]
                }
                else if (board[snake.squares[n].y][snake.squares[n].x] == 1) {
                    // Collide with itself
                    GAMEOVER = true
                    levelSound.stop()
                    gameOverSound.play()
                    break;
                }
            }
            board[snake.squares[n].y][snake.squares[n].x] = 1
        }
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                switch (board[row][col]) {
                    case 1:
                        push()
                        noStroke()
                        fill(255)
                        rect(col*scl, row*scl, scl)
                        pop()
                        break;
                    case 2:
                        push()
                        noStroke()
                        fill(225,100,100)
                        rect(col*scl+scl/10, row*scl+scl/10, scl*4/5)
                        pop()
                        break;
                    default:
                        break;
                }
            }
        }

        // Dashboard at the bottom
        fill(70)
        rect(0, gameHeight, gameWidth, 100)
        textSize((height-gameHeight)/2)
        fill(255)
        textAlign(CENTER)
        text(`Score: ${snake.length}`, width/2, gameHeight + (height-gameHeight)/1.5)
        textSize((height-gameHeight)/3)
        text(`Arctrus`, width/12, gameHeight + (height-gameHeight)/1.5)
    }
    else {
        fill(226,26,26)
        rect(gameWidth/6, gameHeight/6, 2*gameWidth/3, 2*gameHeight/3, scl)
        
        fill(0)
        textAlign(CENTER)

        textSize(gameWidth/12)
        text("Game Over!", gameWidth/2, gameHeight/2)
        textSize(gameWidth/24)
        text(`Score: ${snake.length}`, gameWidth/2, 1.2*gameHeight/2)

        // High Score
        if (snake.length > JSON.parse(highScore)) {
            highScore = snake.length
            localStorage.setItem("highScore", highScore)
        }
        textSize(gameWidth/24)
        text(`High Score: ${highScore}`, gameWidth/2, 1.3*gameHeight/2)


        textSize(gameWidth/30)
        text("Press any key to restart.", gameWidth/2, 4*gameHeight/5)
    }
}

function restart() {
    apples = [pickAppleLocation()]
    isSnakeNotEating = true
    snake = new Snake(Math.floor(gameWidth/scl/2), Math.floor(gameHeight/scl/2), 1, 0)
    GAMEOVER = false
    gameOverSound.stop()
}

function keyPressed() {
    if (!GAMEOVER) {
        switch (keyCode) {
            case UP_ARROW:
                snake.setDir(0, -1)
                break;
            case DOWN_ARROW:
                snake.setDir(0, 1)
                break;
            case RIGHT_ARROW:
                snake.setDir(1, 0)
                break;
            case LEFT_ARROW:
                snake.setDir(-1, 0)
                break;
            default:
                break;
        }
    }
    else {
        restart()
    }
}

function pickAppleLocation() {
    let x = 0
    let y = 0
    do {
        x = Math.round(Math.random()*(gameWidth/scl-1))
        y = Math.round(Math.random()*(gameHeight/scl-1))
    } while (board[y][x] == 1)

    return {x: x, y: y}
}

// w3 Schools sound constructor
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }