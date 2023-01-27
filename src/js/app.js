import Game from "./Game.js";

const btnMenu = document.querySelector(".hamburger-lines");
btnMenu.addEventListener("click", () => {
  const el = document.querySelector(".menu-items");
  el.classList.toggle("active");
  btnMenu.classList.toggle("active");
});

const game = new Game();

function animate() {
  game.draw();
  requestAnimationFrame(animate);
}

addEventListener("load", (event) => {
  animate();
});
