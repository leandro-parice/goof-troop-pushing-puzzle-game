import Game from "./Game.js";

const game = new Game();

function animate() {
  game.draw();
  requestAnimationFrame(animate);
}

addEventListener("load", (event) => {
  animate();
});
