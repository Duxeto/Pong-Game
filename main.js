let cnv = document.getElementById("cvs");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

// Global vars
let X = 500;
let Y = 400;
let dx = 7;
let dy = 7;
let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = 0;
let paddleX2 = 980;
let paddleY = 300;
let paddleY2 = 300;
let rightPressed = false;
let leftPressed = false;
let rightPressed2 = false;
let leftPressed2 = false;
let score = 0;
let score2 = 0;
let level = 1;
let gameStart = true;



//Keys
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler2);
document.addEventListener("keyup", keyUpHandler2);
function keyDownHandler(event) {
    if (event.code == "ArrowUp") {
        rightPressed2 = true;
    } else if (event.code == "ArrowDown") {
        leftPressed2 = true;
    }
}

function keyUpHandler(event) {
    if (event.code == "ArrowUp") {
        rightPressed2 = false;
    } else if (event.code == "ArrowDown") {
        leftPressed2 = false;
    }
}

function keyDownHandler2(event) {
    if (event.code == "KeyW") {
        rightPressed = true;
    } else if (event.code == "KeyS") {
        leftPressed = true;
    }
}

function keyUpHandler2(event) {
    if (event.code == "KeyW") {
        rightPressed = false;
    } else if (event.code == "KeyS") {
        leftPressed = false;
    }
}

//Draw items on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(X, Y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.fillRect(paddleX, paddleY, paddleHeight, paddleWidth);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle2() {
    ctx.beginPath();
    ctx.fillRect(paddleX2, paddleY2, paddleHeight, paddleWidth);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function gameOver() {
    if (score2 == 10) {
        dy = 0;
        dx = 0;
        rightPressed = false;
        rightPressed2 = false;
        leftPressed = false;
        leftPressed2 = false;
        ctx.font = "100px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over!", 250, 400);
    }
}

function gameWon() {
    if (score == 10) {
        dy = 0;
        dx = 0;
        rightPressed = false;
        rightPressed2 = false;
        leftPressed = false;
        leftPressed2 = false;
        ctx.font = "100px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Round Complete!", 130, 400);
        level++;
    }
}

function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawScore2();
    drawPaddle2();
    gameOver();
    gameWon();

    // Score 
    if (X - 15 < 0) {
        score2++;
    }
    if (X + 15 > cnv.width) {
        score++;
    }

    // Collison detection paddle
    if (X - 13.5 <= 25 && X - 13.5 > 20 && Y - 13.5 >= paddleY - 20 && Y - 12 <= paddleY + 100) {
        dx = -dx;
        dy = Math.random() * 10 - 5;
    }
    if (X + 13.5 >= cnv.width - 25 && Y + 13.5 >= paddleY2 && Y + 12 <= paddleY2 + 100) {
        dx = -dx;
        dy = Math.random() * 10 - 5;
    }

    //Controls
    if (rightPressed) {
        paddleY -= 9;
    } else if (leftPressed) {
        paddleY += 9;
    }

    if (rightPressed2) {
        paddleY2 -= 9;
    } else if (leftPressed2) {
        paddleY2 += 9;
    }

    // Ball Physics
    if (X - 15 < 0 || X + 15 > cnv.width) dx = -dx

    if (Y - 15 < 0 || Y + 15 > cnv.height) dy = -dy;

    X += dx;
    Y += dy;

    //Levels


    requestAnimationFrame(draw);
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawScore2() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Score: " + score2, 920, 20);
}
requestAnimationFrame(draw);