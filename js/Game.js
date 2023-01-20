import Maps from "./Maps.js";
import TileMap from "./TileMap.js";
import Score from "./Score.js";

export default class Game {
  constructor() {
    this.stage = 0;
    this.map = JSON.parse(JSON.stringify(Maps[this.stage]));
    this.tileSize = 64;
    this.canvas = null;
    this.ctx = null;

    this.tileMap = null;
    this.player = null;
    this.score = null;

    this.drawCanvas();

    document.addEventListener("keydown", this.#keydown);

    window.addEventListener("resize", (event) => {
      this.resizeCanvas();
    });
  }

  drawCanvas() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();

    this.tileMap = new TileMap(this.ctx, this.map, this.tileSize, this);
    this.player = this.tileMap.getPlayer();
    this.score = new Score(this.ctx, this.stage + 1);
  }

  resizeCanvas() {
    this.canvas.width = this.map.structure[0].length * this.tileSize;
    this.canvas.height = this.map.structure.length * this.tileSize;
  }

  draw() {
    this.tileMap.draw();
    this.player.draw();
    this.score.draw();
  }

  nextStage() {
    if (this.stage < Maps.length - 1) {
      this.stage += 1;
      this.map = JSON.parse(JSON.stringify(Maps[this.stage]));
      this.drawCanvas();
    }
  }

  restart() {
    this.map = JSON.parse(JSON.stringify(Maps[this.stage]));
    this.drawCanvas();
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

  #keydown = (event) => {
    //restart
    if (event.key == "r") {
      this.restart();
    } else {
      let newX = this.player.x;
      let newY = this.player.y;
      let direction = null;

      //left
      if (event.key == "ArrowLeft") {
        newX -= 1;
        direction = 0;
      }
      //up
      else if (event.key == "ArrowUp") {
        newY -= 1;
        direction = 1;
      }
      //right
      else if (event.key == "ArrowRight") {
        newX += 1;
        direction = 2;
      }
      //down
      else if (event.key == "ArrowDown") {
        newY += 1;
        direction = 3;
      }

      this.player.setDirection(direction);

      if (!this.tileMap.didCollideWithEnvironment(newX, newY)) {
        this.player.x = newX;
        this.player.y = newY;
        this.score.addMoviment();
      } else if (!this.tileMap.didCollideWithStone(newX, newY, direction)) {
        this.player.x = newX;
        this.player.y = newY;
        this.score.addMoviment();
      }

      this.hasWon();
    }
  };
}
