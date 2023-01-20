export default class Player {
  constructor(ctx, map, tileSize, x, y, game) {
    this.ctx = ctx;
    this.tileMap = map;
    this.tileSize = tileSize;
    this.x = x;
    this.y = y;
    this.game = game;
    this.direction = 3;

    const imageLeft = new Image();
    imageLeft.src = "../images/player-left.png";

    const imageUp = new Image();
    imageUp.src = "../images/player-up.png";

    const imageRight = new Image();
    imageRight.src = "../images/player-right.png";

    const imageDown = new Image();
    imageDown.src = "../images/player-down.png";

    this.images = [imageLeft, imageUp, imageRight, imageDown];

    this.gameSize = 16;
    this.imageWidth = 16;
    this.imageHeight = 28;

    this.width = this.imageWidth * (this.tileSize / this.gameSize);
    this.height = this.imageHeight * (this.tileSize / this.gameSize);

    this.xDifference = this.tileSize - this.width;
    this.yDifference = this.tileSize - this.height;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  draw() {
    this.ctx.drawImage(
      this.images[this.direction],
      this.x * this.tileSize + this.xDifference,
      this.y * this.tileSize + this.yDifference,
      this.width,
      this.height
    );
  }
}
