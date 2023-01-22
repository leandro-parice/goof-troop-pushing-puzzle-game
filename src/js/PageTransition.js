export default class PageTransition {
  constructor(game, ctx, maxWidth, height) {
    this.game = game;
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = maxWidth;
    this.height = height;
    this.maxWidth = maxWidth;
    this.velocity = 10;
  }

  init() {
    if (this.width >= 0) {
      this.width -= this.velocity;
    } else {
      this.game.status = "playing";
    }

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  end() {
    if (this.width <= this.maxWidth) {
      this.width += this.velocity;
    } else {
      this.game.nextStage();
      this.game.status = "init";
    }

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
