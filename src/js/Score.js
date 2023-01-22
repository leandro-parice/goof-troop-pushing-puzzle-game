export default class Score {
  constructor(stage) {
    this.stage = stage;
    this.moviments = 0;
    this.txtLevel = document.getElementById("txt-level");
    this.txtMoviments = document.getElementById("txt-moviments");
  }

  addMoviment() {
    this.moviments += 1;
  }

  draw() {
    this.txtLevel.innerHTML = this.stage;
    this.txtMoviments.innerHTML = this.moviments;
  }
}
