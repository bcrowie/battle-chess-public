const { COLORS } = require("../constants");

class Board {
  constructor() {}

  /**
   * Attempts to move the piece at position `from` to position `to`.
   * If there is a piece at `to`, attack the piece at that location
   *
   * Returns true if the move was valid, false otherwise.
   */
  movePiece(from, to) {
    // implement me
    return true;
  }

  // Return either WHITE or BLACK if their king is in check, null otherwise
  isCheck() {
    // implement me
    return null;
  }

  // Return either WHITE or BLACK if their king is in checkmate, null otherwise
  isCheckmate() {
    // implement me
    return null;
  }
}

module.exports = Board;
