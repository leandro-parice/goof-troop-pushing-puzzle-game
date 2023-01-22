import Player from "./Player.js";

export default class TileMap {
  constructor(ctx, map, tileSize, game) {
    this.ctx = ctx;
    this.map = map;
    this.tileSize = tileSize;
    this.game = game;

    this.imageWall = new Image();
    this.imageWall.src = "images/wall.png";

    this.imageGround = new Image();
    this.imageGround.src = "images/ground.png";

    this.imageGoalPosition = new Image();
    this.imageGoalPosition.src = "images/goal-position.png";

    this.imageBox = new Image();
    this.imageBox.src = "images/box.png";

    this.imageBoxRight = new Image();
    this.imageBoxRight.src = "images/box-right.png";
  }

  draw() {
    for (let row = 0; row < this.map.structure.length; row++) {
      for (let column = 0; column < this.map.structure[row].length; column++) {
        let tile = this.map.structure[row][column];
        let tileGoalPosition = this.map.goalPositions[row][column];
        this.#drawGround(this.ctx, column, row, this.tileSize);
        if (tile === 1) {
          this.#drawWall(this.ctx, column, row, this.tileSize);
        } else if (tile === 3) {
          this.#drawStone(
            this.ctx,
            column,
            row,
            this.tileSize,
            tileGoalPosition === 2
          );
        } else if (tileGoalPosition === 2) {
          this.#drawGoalPosition(this.ctx, column, row, this.tileSize);
        }
      }
    }
  }

  getPlayer() {
    for (let row = 0; row < this.map.structure.length; row++) {
      for (let column = 0; column < this.map.structure[row].length; column++) {
        let tile = this.map.structure[row][column];
        if (tile === 4) {
          this.map.structure[row][column] = 0;
          return new Player(
            this.ctx,
            this,
            this.tileSize,
            column,
            row,
            this.game
          );
        }
      }
    }
  }

  didCollideWithEnvironment(x, y) {
    if (this.map.structure[y][x] === 0 || this.map.structure[y][x] === 2) {
      return false;
    }
    return true;
  }

  didCollideWithStone(x, y, direction) {
    if (this.map.structure[y][x] === 3) {
      let newX = x;
      let newY = y;
      //left
      if (direction == 0) {
        newX -= 1;
      }
      //up
      if (direction == 1) {
        newY -= 1;
      }
      //right
      if (direction == 2) {
        newX += 1;
      }
      //down
      if (direction == 3) {
        newY += 1;
      }
      if (
        this.map.structure[newY][newX] === 0 ||
        this.map.structure[newY][newX] === 2
      ) {
        this.map.structure[y][x] = 0;
        this.map.structure[newY][newX] = 3;
        return false;
      }
    }
    return true;
  }

  #drawGround(ctx, column, row, size) {
    ctx.drawImage(this.imageGround, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(this.imageWall, column * size, row * size, size, size);
  }

  #drawGoalPosition(ctx, column, row, size) {
    ctx.drawImage(
      this.imageGoalPosition,
      column * size,
      row * size,
      size,
      size
    );
  }

  #drawStone(ctx, column, row, size, right = false) {
    if (right) {
      ctx.drawImage(this.imageBoxRight, column * size, row * size, size, size);
    } else {
      ctx.drawImage(this.imageBox, column * size, row * size, size, size);
    }
  }
}
