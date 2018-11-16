let cnv = document.getElementById("cvs");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;



// Global vars
let X = 100;
let Y = 100;
let dx = 6;
let dy = 6;
let paddleHeight = 20;
let paddleWidth = 100;
let paddleX = 0;
let paddleX2 = 980;
let paddleY = 200;
let paddleY2 = 200;
let rightPressed = false;
let leftPressed = false;
let rightPressed2 = false;
let leftPressed2 = false;
let score = 0;
let score2 = 0
let paused = false


//Keys and pause func
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);
document.addEventListener("keydown", keyHandler);

window.addEventListener('keydown',
    function (event) {
        let key = event.keyCode;
        if (key === 80)// p key
        {
            togglePause();
        }
    });

function keyHandler(event) {
    if (event.code == "Space") {
        clearRect();
    }
}

function keyDownHandler(event) {
    if (event.code == "ArrowUp") {
        rightPressed = true;
    }
    else if (event.code == "ArrowDown") {
        leftPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.code == "ArrowUp") {
        rightPressed = false;
    }
    else if (event.code == "ArrowDown") {
        leftPressed = false;
    }
}

function keyDownHandler2(event) {
    if (event.code == "KeyW") {
        rightPressed2 = true;
    }
    else if (event.code == "KeyS") {
        leftPressed2 = true;
    }
}
function keyUpHandler2(event) {
    if (event.code == "KeyW") {
        rightPressed2 = false;
    }
    else if (event.code == "KeyS") {
        leftPressed2 = false;
    }
}
function togglePause() {
    if (!paused) {
        paused = true;
    } else if (paused) {
        paused = false;
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
    if (score == 15 || score2 == 15) {
        ctx.font = "100px Arial";
        ctx.fillStyle = "green";
        ctx.fillText("Game Over", 250, 400)
        togglePause();
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
    if (paused) {
        update();
    }
    // Score 
    if (X - 15 < 0) {
        score2++;
    }
    if (X + 15 > cnv.width) {
        score++;
    }
    


    // Collison detection paddle
    if (X - 12 <= 25 && X - 12 > 20 && Y - 12 >= paddleY - 20 && Y - 12 <= paddleY + 80) {
        dx = -dx;
    }
    if (X + 13 >= cnv.width - 25 && Y + 13 >= paddleY2 && Y + 13 <= paddleY2 + 80) {
        dx = -dx;
    }

    //Controls
    if (rightPressed) {
        paddleY -= 7;
    } else if (leftPressed) {
        paddleY += 7;
    }

    if (rightPressed2) {
        paddleY2 -= 7;
    } else if (leftPressed2) {
        paddleY2 += 7;
    }

    // Ball Physics
    if (X - 15 < 0 || X + 15 > cnv.width) dx = -dx;
    if (Y - 15 < 0 || Y + 15 > cnv.height) dy = -dy;


    X += dx;
    Y += dy;
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

setInterval(draw, 10);