export default class Score {
  constructor(stage, best) {
    this.stage = stage;
    this.best = best;
    this.moviments = 0;
    this.txtLevel = document.getElementById("txt-level");
    this.txtMoviments = document.getElementById("txt-moviments");
    this.txtBest = document.getElementById("txt-best");
  }

  addMoviment() {
    this.moviments += 1;
  }

  draw() {
    this.txtLevel.innerHTML = this.stage;
    this.txtMoviments.innerHTML = this.moviments;
    this.txtBest.innerHTML = this.best != 0 ? this.best : "-";
  }
}
