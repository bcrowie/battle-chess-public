import Piece from '../Piece.js'
import { COLORS } from '../../constants.js'
import chalk from 'chalk'

class Knight extends Piece {
  constructor(location, color, startLoc) {
    super(10, 5, location, color, startLoc);
    this._unicode = this.setUnicode();
  }

  setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2658`)
      : chalk.black(`\u265E`);
  }

  _canMove(loc) {
    const current = this.getLocation();

    if (
      ((loc[1] === current[1] + 2 || loc[1] === current[1] - 2) &&
        (loc[0] === current[0] + 1 || loc[0] === current[0] - 1)) ||
      ((loc[1] === current[1] + 1 || loc[1] === current[1] - 1) &&
        (loc[0] === current[0] + 2 || loc[0] === current[0] - 2)) ||
      ((loc[0] === current[0] + 2 || loc[0] === current[0] - 2) &&
        (loc[1] === current[1] + 1 || loc[0] === current[0] - 1))
    ) {
      return true;
    }
    return false;
  }

  _canAttack(to, from) {
    return this._canMove(to.getLocation()) ? true : false;
  }
}

export default Knight;
