"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//Variables for Ball
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

//Var for paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//var for paddle
let rightPressed = false;
let leftPressed = false;

//var for bricks:
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickheight = 20;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickPadding = 10;

//Eventlistners:
document.addEventListener("keydown", downListner, false);
document.addEventListener("keyup", upListner, false);

function downListner(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function upListner(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

//2d Array for bricks:
var bricks = [];
for (var c = 0; c < brickColCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

//All Functions:

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let i = 0; i < brickColCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      var brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
      var brickY = j * (brickheight + brickPadding) + brickOffsetTop;
      bricks[(i, j)].x = brickX;
      bricks[(i, j)].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickheight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  // collisionDetection();

  x += dx; //moving left-right
  y += dy; //moving top-bottom

  //left-right
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }

  //top-bottom
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("game over");
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed) {
    paddleX = Math.min(canvas.width - paddleWidth, paddleX + 7);
  } else if (leftPressed) {
    paddleX = Math.max(0, paddleX - 7);
  }
}

// var interval = setInterval(draw, 10);
