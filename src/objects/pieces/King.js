const Piece = require("../Piece");
const chalk = require("chalk");

class King extends Piece {
  constructor(location, color) {
    super(1, 5, location, color);
    this._unicode = this.getUnicode(color);
    this.getUnicode = this.getUnicode;
    this.moveSet = this.moveSet;
  }

  getUnicode(color) {
    if (color === "BLACK") {
      return; // black king unicode
    }
    if (color === "WHITE") {
      return; //white king unicode
    }
  }

  moveSet(loc, attack) {
    // king moveset
  }
}

module.exports = King;
