export default class Player {
  constructor(ctx, map, tileSize, x, y, game) {
    this.ctx = ctx;
    this.tileMap = map;
    this.tileSize = tileSize;
    this.x = x;
    this.y = y;
    this.game = game;
    this.direction = "down";

    this.imageDown = new Image();
    this.imageDown.src = "../images/player-down.png";

    this.imageUp = new Image();
    this.imageUp.src = "../images/player-up.png";

    this.imageLeft = new Image();
    this.imageLeft.src = "../images/player-left.png";

    this.imageRight = new Image();
    this.imageRight.src = "../images/player-right.png";

    this.gameSize = 16;
    this.imageWidth = 16;
    this.imageHeight = 28;

    this.width = this.imageWidth * (this.tileSize / this.gameSize);
    this.height = this.imageHeight * (this.tileSize / this.gameSize);

    this.xDifference = this.tileSize - this.width;
    this.yDifference = this.tileSize - this.height;

    document.addEventListener("keydown", this.#keydown);
  }

  draw() {
    if (this.direction == "left") {
      this.ctx.drawImage(
        this.imageLeft,
        this.x * this.tileSize + this.xDifference,
        this.y * this.tileSize + this.yDifference,
        this.width,
        this.height
      );
    }
    if (this.direction == "up") {
      this.ctx.drawImage(
        this.imageUp,
        this.x * this.tileSize + this.xDifference,
        this.y * this.tileSize + this.yDifference,
        this.width,
        this.height
      );
    }
    if (this.direction == "right") {
      this.ctx.drawImage(
        this.imageRight,
        this.x * this.tileSize + this.xDifference,
        this.y * this.tileSize + this.yDifference,
        this.width,
        this.height
      );
    }
    if (this.direction == "down") {
      this.ctx.drawImage(
        this.imageDown,
        this.x * this.tileSize + this.xDifference,
        this.y * this.tileSize + this.yDifference,
        this.width,
        this.height
      );
    }
  }

  #keydown = (event) => {
    let newX = this.x;
    let newY = this.y;

    //left
    if (event.keyCode == 37) {
      newX -= 1;
      this.direction = "left";
    }
    //up
    if (event.keyCode == 38) {
      newY -= 1;
      this.direction = "up";
    }
    //right
    if (event.keyCode == 39) {
      newX += 1;
      this.direction = "right";
    }
    //down
    if (event.keyCode == 40) {
      newY += 1;
      this.direction = "down";
    }

    if (!this.tileMap.didCollideWithEnvironment(newX, newY)) {
      this.x = newX;
      this.y = newY;
    } else if (!this.tileMap.didCollideWithStone(newX, newY, this.direction)) {
      this.x = newX;
      this.y = newY;
    }

    this.game.hasWon();
  };

  // constructor(ctx, x, y, tileSize, tileMap) {
  //   this.ctx = ctx;
  //   this.x = x;
  //   this.y = y;
  //   this.tileSize = tileSize;
  //   this.tileMap = tileMap;

  //   this.player = new Image();
  //   this.player.src = "../images/player.png";

  //   document.addEventListener("keydown", this.#keydown);

  //   // this.moviments = [
  //   //   [20, 2, 15, 28],
  //   //   [36, 2, 15, 28],
  //   //   [52, 2, 15, 28],
  //   //   [68, 2, 15, 28],
  //   //   [85, 2, 15, 28],
  //   //   [101, 2, 15, 28],
  //   // ];
  //   // this.currentMoviment = 0;
  //   // this.gameFrame = 0;
  //   // this.staggerFrames = 7;

  //   this.positions = {
  //     left: [3, 31, 15, 28],
  //     up: [3, 61, 15, 28],
  //     right: [3, 31, 15, 28],
  //     down: [3, 2, 15, 28],
  //   };
  //   this.currentPosition = this.positions.down;
  //   this.dirX = 1; //1 = right | -1 = left
  // }

  // draw() {
  //   this.ctx.save();

  //   if (this.dirX == 1) {
  //     this.ctx.drawImage(
  //       this.player,
  //       this.currentPosition[0],
  //       this.currentPosition[1],
  //       this.currentPosition[2],
  //       this.currentPosition[3],
  //       this.x * this.tileSize,
  //       this.y * this.tileSize - 12 * 4,
  //       this.tileSize,
  //       28 * 4
  //     );
  //   } else {
  //     this.ctx.translate(
  //       this.x * this.tileSize + this.tileSize / 2,
  //       this.y * this.tileSize - 12 * 4 + (28 * 4) / 2
  //     );

  //     this.ctx.scale(this.dirX, 1);

  //     this.ctx.drawImage(
  //       this.player,
  //       this.currentPosition[0],
  //       this.currentPosition[1],
  //       this.currentPosition[2],
  //       this.currentPosition[3],
  //       -this.tileSize / 2,
  //       -((28 * 4) / 2),
  //       this.tileSize,
  //       28 * 4
  //     );

  //     this.ctx.restore();
  //   }

  //   // if (this.gameFrame % this.staggerFrames == 0) {
  //   //   this.currentMoviment += 1;
  //   //   if (this.currentMoviment >= this.moviments.length) {
  //   //     this.currentMoviment = 0;
  //   //   }
  //   // }
  //   // this.gameFrame += 1;

  //   // this.ctx.drawImage(
  //   //   this.player,
  //   //   this.moviments[this.currentMoviment][0],
  //   //   this.moviments[this.currentMoviment][1],
  //   //   this.moviments[this.currentMoviment][2],
  //   //   this.moviments[this.currentMoviment][3],
  //   //   this.x * this.tileSize,
  //   //   this.y * this.tileSize - 12 * 4,
  //   //   this.tileSize,
  //   //   28 * 4
  //   // );
  // }

  // #keydown = (event) => {
  //   let newX = this.x;
  //   let newY = this.y;
  //   let direction = null;

  //   //left
  //   if (event.keyCode == 37) {
  //     newX -= 1;
  //     direction = "left";
  //     this.currentPosition = this.positions.left;
  //     this.dirX = -1;
  //   }
  //   //up
  //   if (event.keyCode == 38) {
  //     newY -= 1;
  //     direction = "up";
  //     this.currentPosition = this.positions.up;
  //     this.dirX = 1;
  //   }
  //   //right
  //   if (event.keyCode == 39) {
  //     newX += 1;
  //     direction = "right";
  //     this.currentPosition = this.positions.right;
  //     this.dirX = 1;
  //   }
  //   //down
  //   if (event.keyCode == 40) {
  //     newY += 1;
  //     direction = "down";
  //     this.currentPosition = this.positions.down;
  //     this.dirX = 1;
  //   }

  //   if (!this.tileMap.didCollideWithEnvironment(newX, newY)) {
  //     this.x = newX;
  //     this.y = newY;
  //   } else if (!this.tileMap.didCollideWithStone(newX, newY, direction)) {
  //     this.x = newX;
  //     this.y = newY;
  //   }

  //   if (
  //     this.#hasWon(this.tileMap.map.goalPositions, this.tileMap.map.structure)
  //   ) {
  //     console.log("ganhou");
  //   }
  // };

  // #hasWon(goals, stones) {
  //   for (let y = 0; y < goals.length; y++) {
  //     for (let x = 0; x < goals[0].length; x++) {
  //       if (goals[y][x] === 2) {
  //         if (stones[y][x] !== 3) {
  //           return false;
  //         }
  //       }
  //     }
  //   }

  //   return true;
  // }
}
