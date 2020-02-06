const Piece = require("../Piece");
const { COLORS } = require("../../constants");
const chalk = require("chalk");

class Rook extends Piece {
  constructor(location, color, startLoc) {
    super(20, 1, location, color, startLoc);
    this._unicode = this.setUnicode();
  }

  setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2656`)
      : chalk.black(`\u265C`);
  }

  _canMove(loc) {
    const x = loc[1];
    const y = loc[0];
    const current = this.getLocation();

    if (
      (y === current[0] && x > current[1]) ||
      (x === current[1] && y > current[0]) ||
      (y === current[0] && x < current[1]) ||
      (x === current[1] && y < current[0])
    ) {
      return true;
    } else {
      return false;
    }
  }

  _canAttack(to, from) {
    return this._canMove(to.getLocation()) ? true : false;
  }
}

module.exports = Rook;
