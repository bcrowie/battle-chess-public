const Piece = require("../Piece");
const chalk = require("chalk");

class Knight extends Piece {
  constructor(location, color) {
    super(10, 5, location, color);
    this._unicode = this.getUnicode(color);
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
  }

  getUnicode(color) {
    if (color === "BLACK") {
      return; // black knight unicode
    }
    if (color === "WHITE") {
      return; //white knight unicode
    }
  }

  moveSet(loc, attack) {
    // Knight moveset
  }
}

module.exports = Knight;
