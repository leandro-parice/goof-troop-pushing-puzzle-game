import Player from "./Player.js";

export default class TileMap {
  constructor(ctx, map, tileSize) {
    this.ctx = ctx;
    this.map = map;
    this.tileSize = tileSize;

    this.ground = new Image();
    this.ground.src = "../images/ground.png";

    this.wall = new Image();
    this.wall.src = "../images/wall.png";

    this.goalPosition = new Image();
    this.goalPosition.src = "../images/goal-position.png";

    this.box = new Image();
    this.box.src = "../images/box.png";
  }

  draw() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];

        this.#drawGround(this.ctx, column, row, this.tileSize);

        if (tile === 1) {
          this.#drawWall(this.ctx, column, row, this.tileSize);
        } else if (tile === 2) {
          this.#drawGoalPosition(this.ctx, column, row, this.tileSize);
        } else if (tile === 3) {
          this.#drawStone(this.ctx, column, row, this.tileSize);
        }
      }
    }
  }

  getPlayer() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];

        if (tile === 4) {
          this.map[row][column] = 0;
          return new Player(this.ctx, column, row, this.tileSize, this);
        }
      }
    }
  }

  didCollideWithEnvironment(x, y) {
    if (this.map[y][x] === 0 || this.map[y][x] === 2) {
      return false;
    }

    return true;
  }

  didCollideWithStone(x, y, direction) {
    if (this.map[y][x] === 3) {
      let newX = x;
      let newY = y;

      //left
      if (direction == "left") {
        newX -= 1;
      }
      //up
      if (direction == "up") {
        newY -= 1;
      }
      //right
      if (direction == "right") {
        newX += 1;
      }
      //down
      if (direction == "down") {
        newY += 1;
      }

      if (this.map[newY][newX] === 0 || this.map[newY][newX] === 2) {
        this.map[y][x] = 0;
        this.map[newY][newX] = 3;
        return false;
      }
    }

    return true;
  }

  #drawGround(ctx, column, row, size) {
    ctx.drawImage(this.ground, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(this.wall, column * size, row * size, size, size);
  }

  #drawGoalPosition(ctx, column, row, size) {
    ctx.drawImage(this.goalPosition, column * size, row * size, size, size);
  }

  #drawStone(ctx, column, row, size) {
    ctx.drawImage(this.box, column * size, row * size, size, size);
  }
}
