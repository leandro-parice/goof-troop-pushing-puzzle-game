const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

// Start the frame count at 1
let frameCount = 1;
// Set the number of obstacles to match the current "level"
let obCount = frameCount;
// Create a collection to hold the generated x coordinates
const obXCoors = [];

const square = {
  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0,
};

// Create the obstacles for each frame
const nextFrame = () => {
  // increase the frame / "level" count
  frameCount++;

  for (let i = 0; i < obCount; i++) {
    // Randomly generate the x coordinate for the top corner start of the triangles
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }
};

const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    }
  },
};

const loop = function () {
  if (controller.up && square.jumping == false) {
    square.yVelocity -= 20;
    square.jumping = true;
  }

  if (controller.left) {
    square.xVelocity -= 0.5;
  }

  if (controller.right) {
    square.xVelocity += 0.5;
  }

  square.yVelocity += 1.5; // gravity
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9; // friction
  square.yVelocity *= 0.9; // friction

  // if square is falling below floor line
  if (square.y > 386 - 16 - 32) {
    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;
  }

  // if square is going off the left of the screen
  if (square.x < -20) {
    square.x = 1220;
  } else if (square.x > 1220) {
    // if square goes past right boundary

    square.x = -20;
    nextFrame();
  }
  // Creates the backdrop for each frame
  context.fillStyle = "#201A23";
  context.fillRect(0, 0, 1220, 400); // x, y, width, height

  // Creates and fills the cube for each frame
  context.fillStyle = "#8DAA9D"; // hex for cube color
  context.beginPath();
  context.rect(square.x, square.y, square.width, square.height);
  context.fill();

  // Create the obstacles for each frame
  // Set the standard obstacle height
  const height = 200 * Math.cos(Math.PI / 6);

  context.fillStyle = "#FBF5F3"; // hex for triangle color
  obXCoors.forEach((obXCoor) => {
    context.beginPath();

    context.moveTo(obXCoor, 385); // x = random, y = coor. on "ground"
    context.lineTo(obXCoor + 20, 385); // x = ^random + 20, y = coor. on "ground"
    context.lineTo(obXCoor + 10, 510 - height); // x = ^random + 10, y = peak of triangle

    context.closePath();
    context.fill();
  });

  // Creates the "ground" for each frame
  context.strokeStyle = "#2E2532";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
