import { map1, map2, map3 } from "./Maps.js";
import TileMap from "./TileMap.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tileSize = 64; // 4 x 16

//0 - chao
//1 - parede
//2 - posição de ponto
//3 - pedra
//4 - personagem

const map = map2;

canvas.width = map.structure[0].length * tileSize;
canvas.height = map.structure.length * tileSize;

const tileMap = new TileMap(ctx, map, tileSize);
const player = tileMap.getPlayer();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();
  player.draw();
  requestAnimationFrame(animate);
}

animate();
