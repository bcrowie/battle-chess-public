import Piece from '../Piece.js'
import { COLORS } from '../../constants.js'
import chalk from 'chalk'

class King extends Piece {
  constructor(location, color, startLoc) {
    super(1, 5, location, color, startLoc);
    this._unicode = this._setUnicode();
  }

  _setUnicode() {
    return this.getColor() === COLORS.WHITE
      ? chalk.white(`\u2654`)
      : chalk.black(`\u265A`);
  }

  _canMove(loc) {
    const x = loc[1];
    const y = loc[0];
    const current = this.getLocation();

    if (
      (x === current[1] + 1 && y === current[0] + 1) || // down right
      (x === current[1] - 1 && y === current[0] + 1) || // down left
      (x === current[1] - 1 && y === current[0]) || // left
      (x === current[1] + 1 && y === current[0]) || //right
      (x === current[1] + 1 && y === current[0] - 1) || // up right
      (y === current[0] - 1 && x === current[1] - 1) || // up left
      (y === current[0] - 1 && x === current[1]) || // up
      (y === current[0] + 1 && x === current[1]) // down
    ) {
      return true;
    }
    return false;
  }

  _canAttack(to, from) {
    return this._canMove(to.getLocation()) ? true : false;
  }
}

export default King;
