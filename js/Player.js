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
  }

  draw() {
    //width: 15
    //height: 28

    this.ctx.drawImage(
      this.player,
      this.x * this.tileSize,
      this.y * this.tileSize - 12 * 4,
      this.tileSize,
      28 * 4
    );
  }

  #keydown = (event) => {
    let newX = this.x;
    let newY = this.y;
    let direction = null;

    //left
    if (event.keyCode == 37) {
      newX -= 1;
      direction = "left";
    }
    //up
    if (event.keyCode == 38) {
      newY -= 1;
      direction = "up";
    }
    //right
    if (event.keyCode == 39) {
      newX += 1;
      direction = "right";
    }
    //down
    if (event.keyCode == 40) {
      newY += 1;
      direction = "down";
    }

    if (!this.tileMap.didCollideWithEnvironment(newX, newY)) {
      this.x = newX;
      this.y = newY;
    } else if (!this.tileMap.didCollideWithStone(newX, newY, direction)) {
      this.x = newX;
      this.y = newY;
    }
  };

  getPlayer() {}
}
