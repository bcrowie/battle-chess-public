const { COLORS, RANK, FILE, STATUS } = require("../constants");
const { getRank, kingCopy } = require("../utils");
const chalk = require("chalk");
const Pawn = require("./pieces/Pawn");
const Rook = require("./pieces/Rook");
const Knight = require("./pieces/Knight");
const Bishop = require("./pieces/Bishop");
const Queen = require("./pieces/Queen");
const King = require("./pieces/King");

class Board {
  constructor(state) {
    this._gameBoard = state ? this._createBoard(state) : this._createBoard();
    this._message = state ? state._board._message : "";
    this._pieces;
    this._captures;
    this._checkmate = null;
  }

  movePiece(to, from, turn, space) {
    const toLoc = this._getPieceAt(to);
    const fromLoc = this._getPieceAt(from);

    if (fromLoc[0] === null) {
      this.setMessage(
        STATUS.INVALID,
        `Invalid move: No piece exists at ${from[0].toUpperCase()}${from[1]}`
      );
      return false;
    }

    const getMoveSet = (to, from, space) => {
      const handleMove = (to, from, space) => {
        if (from.getName() === "King") {
          const kingTest = kingCopy(from);
          kingTest.setLocation(to[1]);

          if (this.isCheck(kingTest)) {
            this.setMessage(
              STATUS.CHECK,
              "This move will put your king in check."
            );
            return false;
          }
        }

        if (from.getName() === "Pawn") from.setFirstMove();

        from.setLocation(to[1]);
        this.setMessage(STATUS.CONFIRM, `Moved: ${space.toUpperCase()}`);
        this.isCheck(from);
        this.updateBoard(space, from.getUnicode());
        return true;
      };

      const checkTurn = (to, from, space) => {
        if (from.move(to[1]) && from.getColor() === turn)
          return handleMove(to, from, space);
        else {
          if (from.getColor() !== turn) {
            this.setMessage(
              STATUS.INVALID,
              `Invalid move: Please select your own color.`
            );
            return false;
          }

          if (!from.move(to[1])) {
            this.setMessage(
              STATUS.INVALID,
              `Invalid move: This ${from.getName()} cannot move there.`
            );
            return false;
          }

          return false;
        }
      };

      const isMovePossible = (to, from, space) => {
        if (!this._isPathObstructed(to, from)) {
          if (!isNewLocOccupied(to, from)) {
            return checkTurn(to, from, space);
          } else if (isNewLocOccupied(to, from) && to.getColor() !== turn) {
            if (from.attack(to, from)) {
              handleAttack(to, from, space);
              return true;
            } else {
              this.setMessage(STATUS.INVALID, `Invalid attack.`);
              return false;
            }
          }
        } else {
          if (from.getName() === "King") {
            handleAttack(to, from, space);
            return true;
          } else {
            this.setMessage(STATUS.INVALID, "Invalid move: Path is not clear.");
            return false;
          }
        }
      };
      const confirmPiece = (to, from, space) => {
        if (space[0].toUpperCase() === from.getName()[0]) {
          return isMovePossible(to, from, space);
        } else {
          this.setMessage(STATUS.INVALID, `Invalid: Wrong piece specified.`);
          return false;
        }
      };
      return confirmPiece(to, from, space);
    };

    const isNewLocOccupied = (to, from) => {
      if (isPiecePresent(to, from)) return to[0] !== null;
    };

    const isPiecePresent = (to, from) => {
      if (to !== null && from.getColor() === turn) {
        return true;
      } else {
        this.setMessage(STATUS.INVALID, `Invalid selection.`);
        return false;
      }
    };

    const handleAttack = (to, from, space) => {
      to.setHealth(from.getDamage());
      const captured = to.getHealth() < 1 ? to : false;
      if (captured) {
        from.setLocation(to.getLocation());
        to.setLocation([0, 0]);
        this.isCheck(from);
        this.updateBoard(space, from.getUnicode(), captured);
        this.setMessage(
          STATUS.CONFIRM,
          `${from.getColor()} ${from.getName()} captured ${to.getColor()} ${to.getName()}`
        );
        return true;
      } else {
        this.setMessage(
          STATUS.CONFIRM,
          `${from.getColor()} ${from.getName()} attacked ${to.getColor()} ${to.getName()}`
        );
        return true;
      }
    };

    return getMoveSet(toLoc, fromLoc, space);
  }

  _isPathObstructed(to, from) {
    let toLoc = to[1];
    let fromLoc = from.getLocation();

    if (to instanceof Object && !(to instanceof Array))
      toLoc = to.getLocation();

    const testPiece = from => {
      // Right
      if (toLoc[1] > fromLoc[1]) {
        for (let i = fromLoc[1] + 1; i < toLoc[1]; i++) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
      // Left
      if (toLoc[1] < fromLoc[1]) {
        for (let i = fromLoc[1] - 1; i > toLoc[1]; i--) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
      // Down
      if (toLoc[0] > fromLoc[0]) {
        for (let i = fromLoc[0] + 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, fromLoc[1]]))) {
            return from;
          }
        }
      }
      // Up
      if (toLoc[0] < fromLoc[0]) {
        for (let i = fromLoc[0] - 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
      return false;
    };

    const testBishop = from => {
      // Down Right
      if (toLoc[0] > fromLoc[0] && toLoc[1] > fromLoc[1]) {
        let j = fromLoc[1] + 1;
        for (let i = fromLoc[0] + 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j++;
        }
      }
      // Up Left
      if (toLoc[0] < fromLoc[0] && toLoc[1] < fromLoc[1]) {
        let j = fromLoc[1] - 1;
        for (let i = fromLoc[0] - 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j--;
        }
      }
      // Down Left
      if (toLoc[0] > fromLoc[0] && toLoc[1] < fromLoc[1]) {
        let j = fromLoc[1] - 1;
        for (let i = fromLoc[0] + 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j--;
        }
      }
      // Up right
      if (toLoc[0] < fromLoc[0] && toLoc[1] > fromLoc[1]) {
        let j = fromLoc[1] + 1;
        for (let i = fromLoc[0] - 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j++;
        }
      }
      return false;
    };

    if (from.getName() === "Knight" || from.getName() === "Pawn") {
      return false;
    } else if (from.getName() === "Bishop") {
      return testBishop(from);
    } else if (from.getName() === "Queen") {
      return testBishop(from) === from || testPiece(from) === from;
    } else if (from.getName() === "King") {
      const test = testLoc(this._getPieceAt(toLoc));
      let color = from.getColor();
      if (!test) {
        if (toLoc[0] < 1 || toLoc[1] < 1 || toLoc[1] > 8) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this._getPieceAt(toLoc).getColor() !== color) {
          return this._getPieceAt(toLoc);
        }
        return true;
      }
    } else {
      return testPiece(from);
    }
    // Returns Piece object if checked space is occupied, returns array of null
    // and [x,y] if space is empty
    function testLoc(loc) {
      return loc instanceof Object && !(loc instanceof Array);
    }
  }

  // From a string "A4", "H2" etc.. this converts to [x,y] and locates piece on the board.
  _getPieceAt(loc) {
    let x;
    let y;

    if (typeof loc === "string") {
      x = FILE.indexOf(loc[0].toUpperCase()) + 1;
      y = Number(loc[1]);
      if (x === -1) {
        return;
      }
    } else {
      x = loc[0];
      y = loc[1];
    }

    let coords = [x, y];
    let result;

    Object.entries(this.getPieces()).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        if (
          coords[0] === v.getLocation()[0] &&
          coords[1] === v.getLocation()[1]
        ) {
          result = v;
        }
      });
    });

    if (result === undefined) result = [null, coords];
    return result;
  }

  // Return either WHITE or BLACK if their king is in check, null otherwise
  isCheck(piece) {
    let color = piece.getColor();
    let kingLoc = [];
    if (color === COLORS.WHITE)
      kingLoc = this.getPieces().BLACK.King.getLocation();
    else kingLoc = this.getPieces().WHITE.King.getLocation();

    // If moving King, a copy is passed with the new desired location, this checks all pieces on the board with health > 0, if the moving king is within the movement abilities
    // of any piece on the board this returns true as check has been found, movement is declined.
    if (piece.getName() === "King") {
      let result = null;

      let checkCheck = pieces => {
        Object.entries(pieces).forEach(([key, value]) => {
          if (
            value.getHealth() > 0 &&
            !this._isPathObstructed(piece, value) &&
            value.attack(piece, value)
          ) {
            result = true;
          }
        });
      };
      color === COLORS.WHITE
        ? checkCheck(this.getPieces().BLACK)
        : checkCheck(this.getPieces().WHITE);
      return result;
    } else if (piece.getName() !== "King") {
      const to = [null, kingLoc];

      if (!this._isPathObstructed(to, piece)) {
        const sendCheckMessage = color => {
          this.setMessage(STATUS.CHECK, `Warning: ${color} King is in check.`);
        };

        color === COLORS.WHITE
          ? (color = COLORS.BLACK)
          : (color = COLORS.WHITE);

        if (piece.attack(this.getPieces()[color].King, piece)) {
          sendCheckMessage(color);
          return true;
        }
      } else {
        return false;
      }
    }
  }

  // Return either WHITE or BLACK if their king is in checkmate, null otherwise
  isCheckmate() {
    const whiteCopy = kingCopy(this.getPieces().WHITE.King);
    const blackCopy = kingCopy(this.getPieces().BLACK.King);

    const findCheckmate = copy => {
      const orig = kingCopy(copy);
      const kingLoc = copy.getLocation();
      let availableMoves = 0;
      let isCheck = false;
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          copy.setLocation([kingLoc[0] + y, kingLoc[1] + x]);
          if (!this._isPathObstructed(copy, orig)) {
            availableMoves = availableMoves + 1;
            if (this.isCheck(copy)) {
              availableMoves = availableMoves - 1;
              if (availableMoves === 0) {
                isCheck = true;
              }
            }
          }
          if (
            availableMoves === 0 &&
            this._isPathObstructed(copy, orig) instanceof Object
          ) {
            isCheck = true;
          }
        }
      }

      return isCheck;
    };

    if (findCheckmate(whiteCopy) || whiteCopy.getHealth() < 1)
      return COLORS.WHITE;
    if (findCheckmate(blackCopy) || blackCopy.getHealth() < 1)
      return COLORS.BLACK;
  }

  _createBoard(state) {
    let board = {};
    let armies = [];

    // Creates board coordinates from RANK/FILE
    setBoard(FILE, RANK);
    function setBoard(file, rank) {
      file.map(f => {
        rank.forEach(r => {
          board[f + r] = " ";
        });
      });
    }

    // Sets board with default piece location, default (0) captures
    const setBoardDefaults = () => {
      const setUnicode = pieces => {
        Object.entries(pieces).forEach(([key, value]) => {
          for (let i in value) {
            if (board.hasOwnProperty(value[i].getStartLoc()))
              board[value[i].getStartLoc()] = value[i].getUnicode();
            else return setUnicode(piece[i]);
          }
        });
        return board;
      };

      const setCaptures = () => {
        this._captures = [];
        for (let i = 0; i < 2; i++) {
          this._captures.push([]);
          for (let j = 0; j < 16; j++) {
            this._captures[i].push(" ");
          }
        }
        return this._captures;
      };

      setCaptures();
      return setUnicode(this._pieces);
    };

    // Creates two armies, sets them to BLACK/WHITE accordingly
    const createArmies = () => {
      Object.entries(COLORS).forEach(([color]) => {
        const x = color === COLORS.WHITE ? 1 : 8;
        const y = color === COLORS.WHITE ? 2 : 7;
        armies.push(
          (color = {
            PawnOne: new Pawn([1, y], color, "A" + y),
            PawnTwo: new Pawn([2, y], color, "B" + y),
            PawnThree: new Pawn([3, y], color, "C" + y),
            PawnFour: new Pawn([4, y], color, "D" + y),
            PawnFive: new Pawn([5, y], color, "E" + y),
            PawnSix: new Pawn([6, y], color, "F" + y),
            PawnSeven: new Pawn([7, y], color, "G" + y),
            PawnEight: new Pawn([8, y], color, "H" + y),
            RookOne: new Rook([1, x], color, "A" + x),
            RookTwo: new Rook([8, x], color, "H" + x),
            KnightOne: new Knight([2, x], color, "B" + x),
            KnightTwo: new Knight([7, x], color, "G" + x),
            BishopOne: new Bishop([3, x], color, "C" + x),
            BishopTwo: new Bishop([6, x], color, "F" + x),
            King: new King([5, x], color, "E" + x),
            Queen: new Queen([4, x], color, "D" + x)
          })
        );
      });

      this._pieces = {
        WHITE: armies[0],
        BLACK: armies[1]
      };
      return true;
    };

    // After all pieces are instantiated above, this overrides all fields with data loaded from save state file
    const loadSaveState = state => {
      const statePieces = state._board._pieces;
      board = state._board._gameBoard;
      this._captures = state._board._captures;
      this._checkmate = state._checkmate;
      this._message = state._message;

      // This overrides all piece data (health, location) with loaded save state data
      const loadPieces = piece => {
        for (let i in piece) {
          if (piece[i] === this._pieces[i]) {
            this._pieces[i] = piece[i];
            return loadPieces(piece[i]);
          } else {
            return piece;
          }
        }
      };
      loadPieces(statePieces);
    };

    if (createArmies()) {
      if (state) loadSaveState(state);
      else setBoardDefaults();
    }
    return board;
  }

  updateBoard(space, unicode, capture) {
    const to = getRank(space, "to");
    const from = getRank(space, "from");
    const board = this.getGameBoard();

    if (capture) this.setCaptures(capture);

    if (board.hasOwnProperty(to)) {
      board[to] = unicode;
      if (from === undefined) {
        return;
      }
      board[from] = " ";
    }
    return;
  }

  getGameBoard() {
    return this._gameBoard;
  }

  getPieces() {
    return this._pieces;
  }

  getCheckmate() {
    return this._checkmate;
  }

  getCaptures(color) {
    return color === COLORS.WHITE ? this._captures[0] : this._captures[1];
  }

  setCaptures(capture) {
    if (capture.getColor() === COLORS.BLACK) {
      this._captures[0].pop();
      this._captures[0].unshift(capture.getUnicode());
    } else {
      this._captures[1].shift();
      this._captures[1].push(capture.getUnicode());
    }
  }

  getMessage() {
    return this._message === " " ? false : this._message;
  }

  setMessage(type, message) {
    return type === STATUS.CONFIRM
      ? (this._message = chalk.green(message))
      : type === STATUS.INVALID
      ? (this._message = chalk.red(message))
      : (this._message = chalk.yellowBright.bgRed(message));
  }
}

module.exports = Board;
