const Piece = require("../Piece");
const { COLORS } = require("../../constants");
const chalk = require("chalk");

class Pawn extends Piece {
  constructor(location, color, startLoc) {
    super(1, 1, location, color, startLoc);
    this._unicode = this._setUnicode();
    this._firstMove = true;
  }

  _setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2659`)
      : chalk.black(`\u265F`);
  }

  move(loc) {
    return !this._firstMove ? this._canMove(loc, 1) : this._canMove(loc, 2);
  }

  setFirstMove() {
    this._firstMove = false;
    return;
  }

  _canMove(loc, amount) {
    const current = this.getLocation();
    if (
      loc[1] <= current[1] + amount &&
      loc[1] > current[1] &&
      loc[0] === current[0] &&
      this.getColor() === COLORS.WHITE
    ) {
      return true;
    }
    if (
      loc[1] >= current[1] - amount &&
      loc[1] < current[1] &&
      loc[0] === current[0] &&
      this.getColor() === COLORS.BLACK
    ) {
      return true;
    } else {
      return false;
    }
  }

  _canAttack(to, from) {
    const toLoc = to.getLocation();
    const fromLoc = from.getLocation();

    if (this.getColor() === COLORS.WHITE) {
      if (
        toLoc[1] === fromLoc[1] + 1 &&
        (toLoc[0] === fromLoc[0] + 1 || toLoc[0] === fromLoc[0] - 1)
      ) {
        return true;
      }
    }
    if (this.getColor() === COLORS.BLACK) {
      if (
        toLoc[1] === fromLoc[1] - 1 &&
        (toLoc[0] === fromLoc[0] - 1 || toLoc[0] === fromLoc[0] + 1)
      ) {
        return true;
      }
    } else {
      return false;
    }
  }
}

module.exports = Pawn;
