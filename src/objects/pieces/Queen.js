const Piece = require("../Piece");
const { COLORS } = require("../../constants");
const chalk = require("chalk");

class Queen extends Piece {
  constructor(location, color, startLoc) {
    super(20, 5, location, color, startLoc);
    this._unicode = this._setUnicode();
  }

  _setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2655`)
      : chalk.black(`\u265B`);
  }

  _canMove(loc) {
    const current = this.getLocation();
    const x = loc[1];
    const y = loc[0];
    let result = false;
    for (let i = 1; i < 9; i++) {
      if (
        (x === current[1] + i && y === current[0] + i) ||
        (x === current[1] - i && y === current[0] - i) ||
        (x === current[1] - i && y === current[0] + i) ||
        (x === current[1] + i && y === current[0] - i)
      ) {
        result = true;
      }
    }
    if (
      ((y === current[0] && x > current[1]) ||
        (x === current[1] && y > current[0]) ||
        (y === current[0] && x < current[1]) ||
        (x === current[1] && y < current[0])) &&
      result === false
    ) {
      result = true;
    }
    return result;
  }

  _canAttack(to, from) {
    return this._canMove(to.getLocation()) ? true : false;
  }
}

module.exports = Queen;
