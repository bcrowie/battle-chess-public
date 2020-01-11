const Piece = require("../Piece");
const chalk = require("chalk");

class Queen extends Piece {
  constructor(location, color) {
    super(20, 5, location, color);
    this._unicode = this.getUnicode(color);
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
  }

  getUnicode(color) {
    if (color === "BLACK") {
      return; // black queen unicode
    }
    if (color === "WHITE") {
      return; // white queen unicode
    }
  }

  moveSet(loc, attack) {
    // queen moveset
  }
}

module.exports = Queen;
