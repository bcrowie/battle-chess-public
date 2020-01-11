const { COLORS, RANK, FILE } = require("../constants");
const chalk = require("chalk");
const Pawn = require("./pieces/Pawn");
const Rook = require("./pieces/Rook");
// const Knight = require("./pieces/Knight");
// const Bishop = require("./pieces/Bishop");
// const Queen = require("./pieces/Queen");
// const King = require("./pieces/King");

class Board {
  constructor(state) {
    this._gameBoard = state ? this.createBoard(state) : this.createBoard();
    this._message = state ? state._board._message : "";
    this._pieces;
  }

  /**
   * Attempts to move the piece at position `from` to position `to`.
   * If there is a piece at `to`, attack the piece at that location
   *
   * Returns true if the move was valid, false otherwise.
   */
  movePiece(to, from, turn) {
    const toLoc = this.getPieceAt(to);
    const fromLoc = this.getPieceAt(from);

    if (fromLoc[0] === null) {
      this._message = chalk.red(
        "Invalid move: No piece exists at " + from[0].toUpperCase() + from[1]
      );
      return;
    }

    // Checks Piece moveSet to see if capabilities match to/from locations
    const getMove = () => {
      if (isNewLocOccupied() === null) {
        if (fromLoc.moveSet(toLoc[1])) {
          /**
           * Need to factor in toLoc and fromLoc to determine * if pieces exist
           * between toLoc and fromLoc
           */

          return [fromLoc, toLoc];
        } else if (!fromLoc.moveSet(toLoc[1])) {
          this._message = chalk.red(
            "Invalid move: This " +
              fromLoc.constructor.name +
              " cannot move there."
          );
          return false;
        }
      } else if (isNewLocOccupied() && toLoc._color.toUpperCase() !== turn) {
        if (fromLoc.attack(toLoc, fromLoc)) {
          toLoc._health = toLoc._health - fromLoc._damage;
          this._message = chalk.green(
            `${fromLoc._color} ${fromLoc.constructor.name} ${
              toLoc._health <= 0 ? "captured" : "attacked"
            } ${toLoc._color} ${toLoc.constructor.name} at ${to}`
          );
          return [fromLoc, toLoc];
        } else {
          this._message = chalk.red("Invalid attack.");
          return false;
        }
      } else if (isNewLocOccupied() && toLoc._color.toUpperCase() === turn) {
        this._message = chalk.red(
          "Invalid move: You cannot attack your own color."
        );
        return false;
      }
    };

    // Checks new location for occupancy, returns true if new space is occupied, false if it is empty
    const isNewLocOccupied = loc => {
      if (loc === undefined) loc = toLoc;
      if (isPiecePresent() === true) {
        if (loc[0] === null) {
          return null;
        } else if (loc[0] !== null) {
          return true;
        }
      } else {
        return false;
      }
    };

    // Checks if piece is present at at the current location
    const isPiecePresent = () => {
      if (fromLoc !== null && fromLoc._color.toUpperCase() === turn) {
        return true;
      } else {
        this._message = chalk.red(
          "Invalid move: Please select your own color."
        );
        return false;
      }
    };

    return getMove();
  }

  getPieceAt(loc) {
    let x = loc[0];
    let y = Number(loc[1]);

    switch (loc[0].toUpperCase()) {
      case "A":
        x = 1;
        break;
      case "B":
        x = 2;
        break;
      case "C":
        x = 3;
        break;
      case "D":
        x = 4;
        break;
      case "E":
        x = 5;
        break;
      case "F":
        x = 6;
        break;
      case "G":
        x = 7;
        break;
      case "H":
        x = 8;
        break;
      default:
        break;
    }

    // Array to combine x, y -- meant for comparison
    let coords = [x, y];

    // Final object after comparing coords[1] with results[i]._location[1], returned
    let result;

    // First loop through White/Black objects
    Object.entries(this._pieces).forEach(([key, value]) => {
      // Second loop of Pieces within White/Black objects
      Object.entries(value).forEach(([k, v]) => {
        if (coords[0] === v._location[0]) {
          if (coords[1] == v._location[1]) {
            result = v;
          }
        }
      });
    });

    // If no checks passed, set result to array to indicate the 'to' location is null, but retaining the original [x,y] location for use if moving to an empty space
    if (result === undefined) {
      result = [null, coords];
    }
    return result;
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

  // Will refactor this into cleaner code
  createBoard(state) {
    let board = {};
    let armies = [];

    FILE.map(f => {
      RANK.forEach(r => {
        board[f + r] = " ";
      });
    });

    // loop to instantiate pieces for each color
    Object.entries(COLORS).forEach(([key]) => {
      let x;
      let y;
      if (key === "WHITE") {
        x = 1;
        y = 2;
      } else {
        x = 8;
        y = 7;
      }

      armies.push(
        (key = {
          PawnOne: new Pawn(1, [1, y], key),
          PawnTwo: new Pawn(1, [2, y], key),
          PawnThree: new Pawn(1, [3, y], key),
          PawnFour: new Pawn(1, [4, y], key),
          PawnFive: new Pawn(1, [5, y], key),
          PawnSix: new Pawn(1, [6, y], key),
          PawnSeven: new Pawn(1, [7, y], key),
          PawnEight: new Pawn(1, [8, y], key),
          RookOne: new Rook(20, [1, x], key),
          RookTwo: new Rook(20, [8, x], key)
        })
      );
    });

    this._pieces = {
      WHITE: armies[0],
      BLACK: armies[1]
    };

    if (state) {
      const loadedPieces = state._board._pieces;
      board = state._board._gameBoard;

      Object.entries(loadedPieces).forEach(([key]) => {
        Object.entries(loadedPieces[key]).forEach(([pieces, pieceProps]) => {
          // [pieces] holds individual class objects, [pieceProps] are the collection of properties for those classes
          Object.entries(pieceProps).forEach(([k, v]) => {
            // [k] is each key in pieceProps, [v] is the value for each [k] in pieceProps
            if (this._pieces[key][pieces].hasOwnProperty(k)) {
              this._pieces[key][pieces][k] = v;
            }
          });
        });
      });
    } else {
      // This will be rewritten. Only directly setting these properties to get the main functionality of the game built
      board.A2 = this._pieces.WHITE.PawnOne._unicode;
      board.B2 = this._pieces.WHITE.PawnTwo._unicode;
      board.C2 = this._pieces.WHITE.PawnThree._unicode;
      board.D2 = this._pieces.WHITE.PawnFour._unicode;
      board.E2 = this._pieces.WHITE.PawnFive._unicode;
      board.F2 = this._pieces.WHITE.PawnSix._unicode;
      board.G2 = this._pieces.WHITE.PawnSeven._unicode;
      board.H2 = this._pieces.WHITE.PawnEight._unicode;
      board.A1 = this._pieces.WHITE.RookOne._unicode;
      board.H1 = this._pieces.WHITE.RookTwo._unicode;
      board.A7 = this._pieces.BLACK.PawnOne._unicode;
      board.B7 = this._pieces.BLACK.PawnTwo._unicode;
      board.C7 = this._pieces.BLACK.PawnThree._unicode;
      board.D7 = this._pieces.BLACK.PawnFour._unicode;
      board.E7 = this._pieces.BLACK.PawnFive._unicode;
      board.F7 = this._pieces.BLACK.PawnSix._unicode;
      board.G7 = this._pieces.BLACK.PawnSeven._unicode;
      board.H7 = this._pieces.BLACK.PawnEight._unicode;
      board.A8 = this._pieces.BLACK.RookOne._unicode;
      board.H8 = this._pieces.BLACK.RookTwo._unicode;
    }
    return board;
  }
}

module.exports = Board;
