const Piece = require("../Piece");
const chalk = require("chalk");

class Bishop extends Piece {
  constructor(location, color) {
    super(5, 10, location, color);
    this._unicode = this.getUnicode(color);
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
  }

  getUnicode(color) {
    if (color === "BLACK") {
      return; // black bishop unicode
    }
    if (color === "WHITE") {
      return; //white bishop unicode
    }
  }

  moveSet(loc, attack) {
    // bishop moveset
  }
}

module.exports = Bishop;
