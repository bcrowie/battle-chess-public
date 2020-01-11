const Piece = require("../Piece");
const chalk = require("chalk");

class Rook extends Piece {
  constructor(health, location, color) {
    super(health, 1, location, color);
    this._unicode = this.getUnicode(color);
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
    this.attack = this.attack;
  }

  getUnicode(color) {
    if (color === "BLACK") {
      return chalk.bold(`\u265C`);
    }
    if (color === "WHITE") {
      return chalk.bold(`\u2656`);
    }
  }

  moveSet(loc) {
    const x = loc[1];
    const y = loc[0];
    const from = this._location;

    if (
      (y === from[0] && x > from[1]) ||
      (x === from[1] && y > from[0]) ||
      (y === from[0] && x < from[1]) ||
      (x === from[1] && y < from[0])
    ) {
      return true;
    } else {
      return false;
    }
  }

  attack(to, from) {
    const x = to._location[1];
    const y = to._location[0];
    const fromLoc = this._location;
    if (
      (y === fromLoc[0] && x > fromLoc[1]) ||
      (x === fromLoc[1] && y > fromLoc[0]) ||
      (y === fromLoc[0] && x < fromLoc[1]) ||
      (x === fromLoc[1] && y < fromLoc[0])
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Rook;
