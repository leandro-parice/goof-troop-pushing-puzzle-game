import Maps from "./Maps.js";
import TileMap from "./TileMap.js";

export default class Game {
  constructor() {
    this.stage = 0;
    this.map = Maps[this.stage];
    this.tileSize = 16;
    this.content = null;
    this.canvas = null;
    this.ctx = null;
    this.tileMap = null;
    this.player = null;

    this.drawCanvas();

    window.addEventListener("resize", (event) => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    this.canvas.width = this.map.structure[0].length * this.tileSize;
    this.canvas.height = this.map.structure.length * this.tileSize;
  }

  drawCanvas() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();

    this.tileMap = new TileMap(this.ctx, this.map, this.tileSize, this);
    this.player = this.tileMap.getPlayer();
  }

  draw() {
    this.tileMap.draw();
    this.player.draw();
  }

  nextStage() {
    if (this.stage < Maps.length - 1) {
      this.stage += 1;
      this.map = Maps[this.stage];
      this.drawCanvas();
    }
  }

  hasWon() {
    for (let y = 0; y < this.map.goalPositions.length; y++) {
      for (let x = 0; x < this.map.goalPositions[0].length; x++) {
        if (this.map.goalPositions[y][x] === 2) {
          if (this.map.structure[y][x] !== 3) {
            return false;
          }
        }
      }
    }

    this.nextStage();
  }
}
