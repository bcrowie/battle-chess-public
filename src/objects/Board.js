const { COLORS, RANK, FILE, STATUS } = require("../constants");
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
    this._captures = [
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " "
      ],
      [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " "
      ]
    ];
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
      return;
    }

    const getMoveSet = (to, from, space) => {
      const handleMove = (to, from, space) => {
        if (from.getName() === "King") {
          const kingCopy = Object.assign(
            Object.create(Object.getPrototypeOf(from)),
            from
          );
          kingCopy.setLocation(to[1]);
          if (this.isCheck(kingCopy)) {
            this.setMessage(
              STATUS.CHECK,
              "This move will put your king in check."
            );
            return false;
          }
        }
        if (from.getName() === "Pawn") {
          from.setFirstMove();
        }
        from.setLocation(to[1]);
        this.setMessage(STATUS.CONFIRM, `Moved: ${space.toUpperCase()}`);
        this.isCheck(from);
        this.updateBoard(space, from.getUnicode());
        return true;
      };

      const checkTurn = (to, from, space) => {
        if (from.move(to[1]) && from.getColor() === turn) {
          return handleMove(to, from, space);
        } else {
          if (from.getColor() !== turn) {
            this.setMessage(
              STATUS.INVALID,
              `Invalid move: Please select your own color.`
            );
          }
          if (!from.move(to[1])) {
            this.setMessage(
              STATUS.INVALID,
              `Invalid move: This ${from.getName()} cannot move there.`
            );
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
          this.setMessage(STATUS.INVALID, "Invalid move: Path is not clear.");
        }
      };
      const confirmPiece = (to, from, space) => {
        if (space[0].toUpperCase() === from.getName()[0]) {
          return isMovePossible(to, from, space);
        } else {
          this.setMessage(STATUS.CHECK, `Invalid: Wrong piece specified.`);
          return false;
        }
      };
      return confirmPiece(to, from, space);
    };

    const isNewLocOccupied = (to, from) => {
      if (isPiecePresent(to, from)) {
        return to[0] !== null;
      }
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
      } else {
        this.setMessage(
          STATUS.CONFIRM,
          `${from.getColor()} ${from.getName()} ${
            captured ? "captured" : "attacked"
          } ${to.getColor()} ${to.getName()}`
        );
      }
    };

    return getMoveSet(toLoc, fromLoc, space);
  }

  _isPathObstructed(to, from) {
    let toLoc = to[1];
    let fromLoc = from.getLocation();

    if (to instanceof Object && !(to instanceof Array)) {
      toLoc = to.getLocation();
    }

    const testPiece = from => {
      if (toLoc[1] > fromLoc[1]) {
        for (let i = fromLoc[1] + 1; i < toLoc[1]; i++) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
      if (toLoc[1] < fromLoc[1]) {
        for (let i = fromLoc[1] - 1; i > toLoc[1]; i--) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
      if (toLoc[0] > fromLoc[0]) {
        for (let i = fromLoc[0] + 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, fromLoc[1]]))) {
            return from;
          }
        }
      }
      if (toLoc[0] < fromLoc[0]) {
        for (let i = fromLoc[0] + 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([fromLoc[0], i]))) {
            return from;
          }
        }
      }
    };

    const testBishop = from => {
      if (toLoc[0] > fromLoc[0] && toLoc[1] > fromLoc[1]) {
        let j = fromLoc[1] + 1;
        for (let i = fromLoc[0] + 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j++;
        }
      }
      if (toLoc[0] < fromLoc[0] && toLoc[1] < fromLoc[1]) {
        let j = fromLoc[1] - 1;
        for (let i = fromLoc[0] - 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j--;
        }
      }
      if (toLoc[0] > fromLoc[0] && toLoc[1] < fromLoc[1]) {
        let j = fromLoc[1] + 1;
        for (let i = fromLoc[0] - 1; i < toLoc[0]; i++) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j++;
        }
      }
      if (toLoc[0] < fromLoc[0] && toLoc[1] > fromLoc[1]) {
        let j = fromLoc[1] + 1;
        for (let i = fromLoc[0] - 1; i > toLoc[0]; i--) {
          if (testLoc(this._getPieceAt([i, j]))) {
            return from;
          }
          j++;
        }
      }
    };

    if (
      from.getName() === "Knight" ||
      from.getName() === "Pawn" ||
      from.getName() === "King"
    ) {
      return false;
    } else if (from.getName() === "Bishop") {
      if (testBishop(from)) {
        return from;
      }
    } else if (from.getName() === "Queen") {
      if (testBishop(from) === from || testPiece(from) === from) {
        return from;
      }
    } else {
      if (testPiece(from)) {
        return from;
      }
    }

    function testLoc(loc) {
      if (loc instanceof Object && !(loc instanceof Array)) {
        return true;
      }
    }
  }

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
          coords[1] == v.getLocation()[1]
        ) {
          result = v;
        }
      });
    });

    if (result === undefined) {
      result = [null, coords];
    }
    return result;
  }

  // Return either WHITE or BLACK if their king is in check, null otherwise
  isCheck(piece) {
    let color = piece.getColor();
    let kingLoc = [];
    if (color === COLORS.WHITE) {
      kingLoc = this.getPieces().BLACK.King.getLocation();
    } else {
      kingLoc = this.getPieces().WHITE.King.getLocation();
    }

    if (piece.getName() === "King") {
      let result;
      // hehehe.. checkCheck.
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
        if (color === COLORS.WHITE) {
          if (piece.attack(this.getPieces().BLACK.King, piece)) {
            sendCheckMessage(COLORS.BLACK);
            return true;
          }
        }
        if (color === COLORS.BLACK) {
          if (piece.attack(this.getPieces().WHITE.King, piece)) {
            sendCheckMessage(COLORS.WHITE);
            return true;
          }
        }
      } else {
        return null;
      }
    }
  }

  // Return either WHITE or BLACK if their king is in checkmate, null otherwise
  isCheckmate() {
    const whiteCopy = Object.assign(
      Object.create(Object.getPrototypeOf(this.getPieces().WHITE.King)),
      this.getPieces().WHITE.King
    );
    const blackCopy = Object.assign(
      Object.create(Object.getPrototypeOf(this.getPieces().BLACK.King)),
      this.getPieces().BLACK.King
    );

    // Unfortuantely I was unable to find a more efficient solution for checking for checkmate.
    const checkCheckmate = copy => {
      const kingLoc = copy.getLocation();

      let isCheck = null;
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          copy.setLocation(kingLoc[0] + x, kingLoc[1] + y);
          isCheck = isCheck || this.isCheck(copy);
        }
      }
    };
    if (checkCheckmate(whiteCopy) || whiteCopy.getHealth() < 1) {
      return COLORS.WHITE;
    }
    if (checkCheckmate(blackCopy) || blackCopy.getHealth() < 1) {
      return COLORS.BLACK;
    }
  }

  // Will refactor this into cleaner code
  _createBoard(state) {
    let board = {};
    let armies = [];

    setBoard(FILE, RANK);
    function setBoard(file, rank) {
      file.map(f => {
        rank.forEach(r => {
          board[f + r] = " ";
        });
      });
    }

    const setBoardDefaults = () => {
      board.A2 = this._pieces.WHITE.PawnOne.getUnicode();
      board.B2 = this._pieces.WHITE.PawnTwo.getUnicode();
      board.C2 = this._pieces.WHITE.PawnThree.getUnicode();
      board.D2 = this._pieces.WHITE.PawnFour.getUnicode();
      board.E2 = this._pieces.WHITE.PawnFive.getUnicode();
      board.F2 = this._pieces.WHITE.PawnSix.getUnicode();
      board.G2 = this._pieces.WHITE.PawnSeven.getUnicode();
      board.H2 = this._pieces.WHITE.PawnEight.getUnicode();
      board.A1 = this._pieces.WHITE.RookOne.getUnicode();
      board.H1 = this._pieces.WHITE.RookTwo.getUnicode();
      board.B1 = this._pieces.WHITE.KnightOne.getUnicode();
      board.G1 = this._pieces.WHITE.KnightTwo.getUnicode();
      board.C1 = this._pieces.WHITE.BishopOne.getUnicode();
      board.F1 = this._pieces.WHITE.BishopTwo.getUnicode();
      board.E1 = this._pieces.WHITE.King.getUnicode();
      board.D1 = this._pieces.WHITE.Queen.getUnicode();
      board.A7 = this._pieces.BLACK.PawnOne.getUnicode();
      board.B7 = this._pieces.BLACK.PawnTwo.getUnicode();
      board.C7 = this._pieces.BLACK.PawnThree.getUnicode();
      board.D7 = this._pieces.BLACK.PawnFour.getUnicode();
      board.E7 = this._pieces.BLACK.PawnFive.getUnicode();
      board.F7 = this._pieces.BLACK.PawnSix.getUnicode();
      board.G7 = this._pieces.BLACK.PawnSeven.getUnicode();
      board.H7 = this._pieces.BLACK.PawnEight.getUnicode();
      board.A8 = this._pieces.BLACK.RookOne.getUnicode();
      board.H8 = this._pieces.BLACK.RookTwo.getUnicode();
      board.B8 = this._pieces.BLACK.KnightOne.getUnicode();
      board.G8 = this._pieces.BLACK.KnightTwo.getUnicode();
      board.C8 = this._pieces.BLACK.BishopOne.getUnicode();
      board.F8 = this._pieces.BLACK.BishopTwo.getUnicode();
      board.E8 = this._pieces.BLACK.King.getUnicode();
      board.D8 = this._pieces.BLACK.Queen.getUnicode();
    };
    Object.entries(COLORS).forEach(([key]) => {
      const x = key === COLORS.WHITE ? 1 : 8;
      const y = key === COLORS.WHITE ? 2 : 7;
      armies.push(
        (key = {
          PawnOne: new Pawn([1, y], key),
          PawnTwo: new Pawn([2, y], key),
          PawnThree: new Pawn([3, y], key),
          PawnFour: new Pawn([4, y], key),
          PawnFive: new Pawn([5, y], key),
          PawnSix: new Pawn([6, y], key),
          PawnSeven: new Pawn([7, y], key),
          PawnEight: new Pawn([8, y], key),
          RookOne: new Rook([1, x], key),
          RookTwo: new Rook([8, x], key),
          KnightOne: new Knight([2, x], key),
          KnightTwo: new Knight([7, x], key),
          BishopOne: new Bishop([3, x], key),
          BishopTwo: new Bishop([6, x], key),
          King: new King([5, x], key),
          Queen: new Queen([4, x], key)
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
      this._captures = state._captures;
      this._checkmate = state._checkmate;
      this._message = state._message;

      const loadPieces = piece => {
        for (let i in piece) {
          if (piece[i] === this._pieces[i]) {
            this._pieces[i] = piece[i];
            return loadData(piece[i]);
          } else {
            return piece;
          }
        }
      };

      loadPieces(loadedPieces);
    } else {
      setBoardDefaults();
    }
    return board;
  }

  updateBoard(space, unicode, capture) {
    const to = space.slice(3).toUpperCase() + space.slice(5);
    const from = space.slice(1, 2).toUpperCase() + space.slice(2, 3);
    const board = this.getGameBoard();
    if (capture) {
      this.setCaptures(capture);
    }

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
