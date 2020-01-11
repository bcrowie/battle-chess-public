const Piece = require("../Piece");
const chalk = require("chalk");

class Pawn extends Piece {
  constructor(health, location, color) {
    super(health, 1, location, color);
    this._unicode = this.getUnicode(color);
    this._firstMove = true;
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
    this.attack = this.attack;
  }

  // Gets unicode based on parameter passed
  getUnicode(color) {
    if (color === "WHITE") {
      return chalk.bold(`\u2659`);
    }
    if (color === "BLACK") {
      return chalk.bold(`\u265F`);
    }
  }
  // Movement capabilities. loc is an array [x, y] to check against this._location.
  moveSet(loc) {
    if (!this._firstMove) {
      return this.move(loc, 1);
    } else if (this._firstMove) {
      this.firstMove = false;
      return this.move(loc, 2);
    }
  }

  move(loc, amount) {
    if (
      loc[1] <= this._location[1] + amount &&
      loc[1] > this._location[1] &&
      loc[0] === this._location[0] &&
      this._color === "WHITE"
    ) {
      this._location = loc;
      return true;
    }
    if (
      loc[1] >= this._location[1] - amount &&
      loc[1] < this._location[1] &&
      loc[0] === this._location[0] &&
      this._color === "BLACK"
    ) {
      this._location = loc;
      return true;
    } else {
      return false;
    }
  }

  attack(to, from) {
    const toLoc = to._location;
    const fromLoc = from._location;

    if (this._color === "WHITE") {
      if (
        toLoc[1] === fromLoc[1] + 1 &&
        (toLoc[0] === fromLoc[0] + 1 || toLoc[0] === fromLoc[0] - 1)
      ) {
        this._location = to._location;
        return true;
      }
    }
    if (this._color === "BLACK") {
      if (
        toLoc[1] === fromLoc[1] - 1 &&
        (toLoc[0] === fromLoc[0] - 1 || toLoc[0] === fromLoc[0] + 1)
      ) {
        this._location = to._location;
        return true;
      }
    } else {
      return false;
    }
  }
}

module.exports = Pawn;
