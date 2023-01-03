export default class Player {
  constructor(ctx, x, y, tileSize, tileMap) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileMap = tileMap;

    this.player = new Image();
    this.player.src = "../images/player.png";

    document.addEventListener("keydown", this.#keydown);

    // this.moviments = [
    //   [20, 2, 15, 28],
    //   [36, 2, 15, 28],
    //   [52, 2, 15, 28],
    //   [68, 2, 15, 28],
    //   [85, 2, 15, 28],
    //   [101, 2, 15, 28],
    // ];
    // this.currentMoviment = 0;
    // this.gameFrame = 0;
    // this.staggerFrames = 7;

    this.positions = {
      left: [3, 31, 15, 28],
      up: [3, 61, 15, 28],
      right: [3, 31, 15, 28],
      down: [3, 2, 15, 28],
    };
    this.currentPosition = this.positions.down;
  }

  draw() {
    this.ctx.drawImage(
      this.player,
      this.currentPosition[0],
      this.currentPosition[1],
      this.currentPosition[2],
      this.currentPosition[3],
      this.x * this.tileSize,
      this.y * this.tileSize - 12 * 4,
      this.tileSize,
      28 * 4
    );

    // if (this.gameFrame % this.staggerFrames == 0) {
    //   this.currentMoviment += 1;
    //   if (this.currentMoviment >= this.moviments.length) {
    //     this.currentMoviment = 0;
    //   }
    // }
    // this.gameFrame += 1;

    // this.ctx.drawImage(
    //   this.player,
    //   this.moviments[this.currentMoviment][0],
    //   this.moviments[this.currentMoviment][1],
    //   this.moviments[this.currentMoviment][2],
    //   this.moviments[this.currentMoviment][3],
    //   this.x * this.tileSize,
    //   this.y * this.tileSize - 12 * 4,
    //   this.tileSize,
    //   28 * 4
    // );
  }

  #keydown = (event) => {
    let newX = this.x;
    let newY = this.y;
    let direction = null;

    //left
    if (event.keyCode == 37) {
      newX -= 1;
      direction = "left";
      this.currentPosition = this.positions.left;
    }
    //up
    if (event.keyCode == 38) {
      newY -= 1;
      direction = "up";
      this.currentPosition = this.positions.up;
    }
    //right
    if (event.keyCode == 39) {
      newX += 1;
      direction = "right";
      this.currentPosition = this.positions.right;
    }
    //down
    if (event.keyCode == 40) {
      newY += 1;
      direction = "down";
      this.currentPosition = this.positions.down;
    }

    if (!this.tileMap.didCollideWithEnvironment(newX, newY)) {
      this.x = newX;
      this.y = newY;
    } else if (!this.tileMap.didCollideWithStone(newX, newY, direction)) {
      this.x = newX;
      this.y = newY;
    }

    this.#hasWon(this.tileMap.map.goalPositions, this.tileMap.map.structure);
  };

  #hasWon(goals, stones) {
    for (let y = 0; y < goals.length; y++) {
      for (let x = 0; x < goals[0].length; x++) {
        if (goals[y][x] === 2) {
          if (stones[y][x] !== 3) {
            return false;
          }
        }
      }
    }

    console.log("Ganhou");
    return true;
  }
}
