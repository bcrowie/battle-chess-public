const Piece = require("../Piece");
const { COLORS } = require("../../constants");
const chalk = require("chalk");

class Bishop extends Piece {
  constructor(location, color, startLoc) {
    super(5, 10, location, color, startLoc);
    this._unicode = this.setUnicode();
  }

  setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2657`)
      : chalk.black(`\u265D`);
  }

  _canMove(loc) {
    const current = this.getLocation();
    let result = false;
    for (let x = 1; x < 9; x++) {
      if (
        (loc[1] === current[1] + x && loc[0] === current[0] + x) ||
        (loc[1] === current[1] - x && loc[0] === current[0] - x) ||
        (loc[1] === current[1] - x && loc[0] === current[0] + x) ||
        (loc[1] === current[1] + x && loc[0] === current[0] - x)
      ) {
        return true;
      }
    }
    return result;
  }

  _canAttack(to) {
    return this._canMove(to.getLocation()) ? true : false;
  }
}

module.exports = Bishop;
