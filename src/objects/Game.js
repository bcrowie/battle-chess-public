/* eslint disable */
const { COLORS } = require("../constants");
const chalk = require("chalk");
const Board = require("./board");
/**
 * An object representing the state of the game at any given time.
 */
class Game {
  constructor(state) {
    this._board = new Board(state);
    this._currentTurn = state ? state._currentTurn : COLORS.WHITE;
    this._isWon = state ? state._isWon : false;
    this._winner = state ? state._winner : null;
  }

  /**
   * Processes the next move in the game.
   */
  makeMove(move) {
    const to = move.slice(3, 5);
    const from = move.slice(1, 3);

    if (
      typeof to[0] !== "string" ||
      isNaN(to[1]) ||
      typeof from[0] !== "string" ||
      isNaN(from[1])
    ) {
      return (this._board._message = chalk.red("Invalid input"));
    } else {
      this._board._message = chalk.green("Moved: " + move.toUpperCase());
    }

    switch (to[0].toUpperCase() || from[0].toUpperCase()) {
      case "A":
        break;
      case "B":
        break;
      case "C":
        break;
      case "D":
        break;
      case "E":
        break;
      case "F":
        break;
      case "G":
        break;
      case "H":
        break;
      default:
        return (this._board._message = chalk.red("Invalid input"));
    }

    let result = this._board.movePiece(to, from, this._currentTurn);
    if (!result) {
      return;
    } else if (result[1]._health <= 0) {
      if (result[1]._health <= 0) {
        //if health of attacked is 0
        result[0]._location = result[1]._location;
        result[1]._location = [0, 0];
        this.updateBoard(move, result[0]._unicode);
        this.changeTurn();
        return;
      } else if (result[1]._health > 0) {
        // With only minor experience with chess I did not consider the fact that pieces cannot "jump" over obstructions.
        // I need to rewrite move/attack methods to recognize obstructions between toLoc and fromLoc and prevent actions if the path is obstructed.

        return;
      }
    } else {
      // if not an attack, call updateBoard remove unicode from 'from' space and add unicode to 'to space', then changeTurn
      result[0]._location = result[1][1];
      this.updateBoard(move, result[0]._unicode);
      this.changeTurn();
      return;
    }
    return;
  }

  updateBoard(move, unicode) {
    const to = move.slice(3).toUpperCase() + move.slice(5);
    const from = move.slice(1, 2).toUpperCase() + move.slice(2, 3);
    let board = this._board._gameBoard;

    if (board.hasOwnProperty(to)) {
      board[to] = unicode;
      if (from === undefined) {
        return;
      }
      board[from] = " ";
    }
    return;
  }

  changeTurn() {
    if (this._currentTurn === COLORS.WHITE) {
      this._currentTurn = COLORS.BLACK;
    } else if (this._currentTurn === COLORS.BLACK) {
      this._currentTurn = COLORS.WHITE;
    }
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
  // prettier-ignore
  printBoard() {
    const board = this._board._gameBoard;
    const inv = chalk.bgGrey;

    // Unable to clear console to due NodeJS strict mode. This adds lines to simulate a clear command
    let lines = process.stdout.getWindowSize()[1];
    for(let i = 0; i < lines; i++) {
        console.log('\r\n');
    }

    // Could not think of any other way to display the board. This looks like garbage. Thinking of a way to write this into only 3-5 lines
    console.log("Battle-Chess")
    console.log()
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`White       A   ${board.A1}  ${inv(`  ${board.A2}  `)}  ${board.A3}  ${inv(`  ${board.A4}  `)}  ${board.A5}  ${inv(`  ${board.A6}  `)}  ${board.A7}  ${inv(`  ${board.A8}  `)}          Black`);
    console.log(`Health:            ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `        Health:`)
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            B ${inv(`  ${board.B1}  `)}  ${board.B2}  ${inv(`  ${board.B3}  `)}  ${board.B4}  ${inv(`  ${board.B5}  `)}  ${board.B6}  ${inv(`  ${board.B7}  `)}  ${board.B8}`);
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            C   ${board.C1}  ${inv(`  ${board.C2}  `)}  ${board.C3}  ${inv(`  ${board.C4}  `)}  ${board.C5}  ${inv(`  ${board.C6}  `)}  ${board.C7}  ${inv(`  ${board.C8}  `)}               `);
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`Rook: ${this._board._pieces.WHITE.RookOne._health}      ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `            Rook: ${this._board._pieces.BLACK.RookOne._health}`)
    console.log(`Rook: ${this._board._pieces.WHITE.RookTwo._health}    D ${inv(`  ${board.D1}  `)}  ${board.D2}  ${inv(`  ${board.D3}  `)}  ${board.D4}  ${inv(`  ${board.D5}  `)}  ${board.D6}  ${inv(`  ${board.D7}  `)}  ${board.D8}         Rook: ${this._board._pieces.BLACK.RookTwo._health}`);
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            E   ${board.D1}  ${inv(`  ${board.E2}  `)}  ${board.E3}  ${inv(`  ${board.E4}  `)}  ${board.E5}  ${inv(`  ${board.E6}  `)}  ${board.E7}  ${inv(`  ${board.E8}  `)}               `);
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            F ${inv(`  ${board.F1}  `)}  ${board.F2}  ${inv(`  ${board.F3}  `)}  ${board.F4}  ${inv(`  ${board.F5}  `)}  ${board.F6}  ${inv(`  ${board.F7}  `)}  ${board.F8}`);
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            G   ${board.G1}  ${inv(`  ${board.G2}  `)}  ${board.G3}  ${inv(`  ${board.G4}  `)}  ${board.G5}  ${inv(`  ${board.G6}  `)}  ${board.G7}  ${inv(`  ${board.G8}  `)}               `);
    console.log(`                   ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`            H ${inv(`  ${board.H1}  `)}  ${board.H2}  ${inv(`  ${board.H3}  `)}  ${board.H4}  ${inv(`  ${board.H5}  `)}  ${board.H6}  ${inv(`  ${board.H7}  `)}  ${board.H8}`);
    console.log(`              ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     ` + `${inv(`     `)}` + `     `)
    console.log(`                1    2    3    4    5    6    7    8`)
    console.log(this._board._message ? this._board._message : " ")

    return
  }
}

module.exports = Game;
