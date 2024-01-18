let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");

cnv.width = 800;
cnv.height = 600;

let temp = 0;
let scoreCount = 0;

// Global Variables
let obstacles = [];
for (let n = 0; n < 20; n++) {
  obstacles.push(newObstacle())
}

let player = newPlayer(360, 600, 25, "red", 8, 37, 39, 38);



window.addEventListener("load", draw);

function draw() {

  // Drawing
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  // Draw Obstacles
  for (let n = 0; n < obstacles.length; n++) {
    moveObstacles(obstacles[n])
    drawObstacle(obstacles[n])
  }

  // Draw Player
  drawPlayer(player)
  movePlayer(player)
  collision();

  // Event 
  document.addEventListener("keydown", keydownHandler);
  function keydownHandler(event) {
    jumpPlayer(player, event.keyCode);
  }
  requestAnimationFrame(draw);
}
// Drawing Obstacles
function newObstacle() {
  return {
    x: randomInt(0, cnv.width),
    y: randomInt(600, cnv.height - 20),
    r: randomInt(20, 50),
    color: randomRGB(),
    ySpeed: randomDec(-1, 5),
    xSpeed: randomDec(-1, 3)
  }
}

function drawObstacle(aObstacle) {
  ctx.stroke();
  ctx.strokeStyle = aObstacle.color;
  ctx.fillStyle = aObstacle.fill;
  ctx.beginPath();
  ctx.arc(aObstacle.x, aObstacle.y, aObstacle.r, 0, 2 * Math.PI);
}

function moveObstacles(aObstacle) {
  aObstacle.x += aObstacle.xSpeed;
  aObstacle.y += aObstacle.ySpeed;

  if (aObstacle.y + aObstacle.r > cnv.height || aObstacle < cnv.width || aObstacle.x + aObstacle.r > cnv.width) {
    aObstacle.y = 0 - aObstacle.r;
    aObstacle.x = randomInt(0, cnv.width)
  }
}

// Draw Player
function newPlayer(initX, initY, initR, initColor, initSpeed, initlKey, initrKey, inituKey) {
  return {
    x: initX,
    y: initY,
    r: initR,
    color: initColor,
    dx: initSpeed,
    dy: 0,
    a: 1,
    launchSpeed: -20,
    lKey: initlKey,
    rKey: initrKey,
    uKey: inituKey,
    viewX: initX - 200
  }
}

function drawPlayer(aPlayer) {
  ctx.stroke();
  ctx.strokeStyle = aPlayer.color;
  ctx.fillStyle = aPlayer.color;
  fill("red");
  ctx.beginPath();
  ctx.arc(aPlayer.x, aPlayer.y, aPlayer.r, 0, 2 * Math.PI);
}

function movePlayer(aPlayer) {
  // Horizontal Movement
  if (keyIsDown[aPlayer.lKey]) {
    aPlayer.x += -aPlayer.dx;
  } else if (keyIsDown[aPlayer.rKey]) {
    aPlayer.x += aPlayer.dx;
  }

  // Vertical Movement
  aPlayer.y += aPlayer.dy; // Move Vertically
  aPlayer.dy += aPlayer.a; // Apply acceleration (gravity)

  // Check Collision with Ground
  if (aPlayer.y + aPlayer.r > cnv.height) {
    aPlayer.y = cnv.height - aPlayer.r;
    aPlayer.dy = 0;
  }

}

function jumpPlayer(aPlayer, keyCode) {
  // Jump if keyCode is the player's up key
  if (aPlayer.uKey === keyCode) {
    aPlayer.dy = aPlayer.launchSpeed;
  }
}

function gameOver() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Game Over Text
  ctx.font = "64px Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("GAMEOVER", 250, 300);
  ctx.font = "24px Calibri";
}

function collision() {

  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x > 775) {
    player.x = 775
  }

  for (let n = 0; n < obstacles.length; n++) {
    let obstacle = obstacles[n];
    let distance = Math.sqrt((player.x - obstacle.x) ** 2 + (player.y - obstacle.y) ** 2);

    if (distance <= player.r + obstacle.r) {
      temp = 1;
      obstacles.splice(n, 1);
      scoreCount = -1
    } else {
      scoreCount++;
      score.innerHTML = scoreCount;
    }
    if (scoreCount === -1) {
      location.reload();
    }

    if (temp === 1) {
      gameOver();
    }

    if (scoreCount > 10000) {
      scoreCount = 10000;
      location.reload();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "64px Calibri";
      ctx.fillStyle = "white";
      ctx.fillText("YOU WIN", 275, 300);
      ctx.font = "24px Calibri";
    }
  }
}

      }
  }
}
