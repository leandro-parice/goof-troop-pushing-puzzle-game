import Game from "./Game.js";

const game = new Game();

function animate() {
  game.draw();
  requestAnimationFrame(animate);
}

animate();

////////////////////////////////
// import Maps from "./Maps.js";
// import TileMap from "./TileMap.js";

// let hasWon = false;
// let stage = 0;
// let map = Maps[stage];
// const tileSize = 50;

// function nextStage() {
//   console.log("sim");
//   if (stage < Maps.length - 1) {
//     stage += 1;
//     map = Maps[stage];
//     drawCanvas();
//   }
// }

// function drawCanvas() {
//   canvas.width = map.structure[0].length * tileSize;
//   canvas.height = map.structure.length * tileSize;
// }

// function animate() {
//   tileMap.draw();
//   player.draw();
//   requestAnimationFrame(animate);
// }

// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");
// drawCanvas();

// const tileMap = new TileMap(ctx, map, tileSize);
// const player = tileMap.getPlayer();

// animate();

////////////////////////////

// import TileMap from "./TileMap.js";
// import Maps from "./Maps.js";

// const tileSize = 64; // 4 x 16

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// let stage = 0;
// let map = Maps[stage];

// const tileMap = new TileMap(ctx, map, tileSize);
// const player = tileMap.getPlayer();

// resizeCanvas();

// function resizeCanvas() {
//   canvas.width = map.structure[0].length * tileSize;
//   canvas.height = map.structure.length * tileSize;
// }

// function nextStage() {
//   stage += 1;
//   map = Maps[stage];
//   resizeCanvas();
// }

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   tileMap.draw();
//   player.draw();
//   requestAnimationFrame(animate);
// }

// animate();

// const btnNext = document.getElementById("btn-next");
// addEventListener("click", (event) => {
//   nextStage();
// });
