const { COLORS } = require("../constants");
const Board = require("./board");
/**
 * An object representing the state of the game at any given time.
 */
class Game {
  constructor(/* implement optional loaded args */) {
    this._board = new Board();
    this._currentTurn = COLORS.WHITE;
    this._isWon = false;
    this._winner = null;
  }

  /**
   * Processes the next move in the game.
   */
  makeMove(move) {
    // implement me
    return;
  }

  getCurrentTurn() {
    return this._currentTurn;
  }

  isWon() {
    return this._isWon;
  }

  getWinner() {
    return this._winner;
  }
}

module.exports = Game;
