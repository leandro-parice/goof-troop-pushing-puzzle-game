export default class Score {
  constructor(ctx, stage) {
    this.ctx = ctx;
    this.stage = stage;
    this.moviments = 0;
  }

  addMoviment() {
    this.moviments += 1;
  }

  draw() {
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.fillRect(10, 5, 90, 40);
    this.ctx.font = "normal 10px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(`Level: ${this.stage}`, 15, 20);
    this.ctx.fillText(`Movimentos: ${this.moviments}`, 15, 35);
  }
}
