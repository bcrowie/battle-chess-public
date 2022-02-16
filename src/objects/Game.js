// eslint disable
const { COLORS, STATUS } = require("../constants");
const { checkInput } = require("../utils");
const chalk = require("chalk");
const Board = require("./Board");

class Game {
  constructor(state) {
    this._board = new Board(state);
    this._currentTurn = state ? state._currentTurn : COLORS.WHITE;
    this._isWon = state ? state._isWon : false;
    this._winner = state ? state._winner : null;
  }

  makeMove(move) {
    const to = move.slice(3, 5);
    const from = move.slice(1, 3);
    const board = this.getBoard();

    if (checkInput(to, from, move)) {
      board.setMessage(STATUS.INVALID, "Invalid input.");
      return false;
    } else {
      if (board.movePiece(to, from, this.getCurrentTurn(), move)) {
        this.changeTurn();
        if (board.isCheckmate()) {
          this.setWinner();
          return true;
        }
        return true;
      }
    }
  }

  changeTurn() {
    this._currentTurn =
      this._currentTurn === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK;
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

  setWinner() {
    this.getBoard().isCheckmate() === COLORS.WHITE
      ? (this._winner = COLORS.BLACK)
      : (this._winner = COLORS.WHITE);
    this._isWon = true;
  }

  getBoard() {
    return this._board;
  }

  // prettier-ignore
  printBoard() {
    console.clear()
    const board = this.getBoard().getGameBoard();
    const inv = chalk.bgGrey;

    // function addBlankLines(){
    //   let lines = process.stdout.getWindowSize()[1];
    //   for(let i = 0; i < lines; i++) {
    //     console.log('\r\n')
    //   }
    // }

    // addBlankLines()
    
    console.log(`Battle-Chess
                      ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     
White          A   ${board.A1}  ${inv(`  ${board.A2}  `)}  ${board.A3}  ${inv(`  ${board.A4}  `)}  ${board.A5}  ${inv(`  ${board.A6}  `)}  ${board.A7}  ${inv(`  ${board.A8}  `)}          Black
Health:               ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}        Health:
King: ${this.getBoard().getPieces().WHITE.King.getHealth()}         ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}             King: ${this.getBoard().getPieces().BLACK.King.getHealth()}
Queen: ${this.getBoard().getPieces().WHITE.Queen.getHealth()}      B ${inv(`  ${board.B1}  `)}  ${board.B2}  ${inv(`  ${board.B3}  `)}  ${board.B4}  ${inv(`  ${board.B5}  `)}  ${board.B6}  ${inv(`  ${board.B7}  `)}  ${board.B8}        Queen: ${this.getBoard().getPieces().BLACK.Queen.getHealth()}
Bishop: ${this.getBoard().getPieces().WHITE.BishopOne.getHealth()}       ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}           Bishop: ${this.getBoard().getPieces().BLACK.BishopOne.getHealth()}
Bishop: ${this.getBoard().getPieces().WHITE.BishopTwo.getHealth()}            ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}      Bishop: ${this.getBoard().getPieces().BLACK.BishopTwo.getHealth()}
Knight: ${this.getBoard().getPieces().WHITE.KnightOne.getHealth()}     C   ${board.C1}  ${inv(`  ${board.C2}  `)}  ${board.C3}  ${inv(`  ${board.C4}  `)}  ${board.C5}  ${inv(`  ${board.C6}  `)}  ${board.C7}  ${inv(`  ${board.C8}  `)}     Knight: ${this.getBoard().getPieces().BLACK.KnightOne.getHealth()}
Knight: ${this.getBoard().getPieces().WHITE.KnightTwo.getHealth()}            ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     Knight: ${this.getBoard().getPieces().BLACK.KnightTwo.getHealth()}
Rook: ${this.getBoard().getPieces().WHITE.RookOne.getHealth()}         ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}            Rook: ${this.getBoard().getPieces().BLACK.RookOne.getHealth()}      
Rook: ${this.getBoard().getPieces().WHITE.RookTwo.getHealth()}       D ${inv(`  ${board.D1}  `)}  ${board.D2}  ${inv(`  ${board.D3}  `)}  ${board.D4}  ${inv(`  ${board.D5}  `)}  ${board.D6}  ${inv(`  ${board.D7}  `)}  ${board.D8}         Rook: ${this.getBoard().getPieces().BLACK.RookTwo.getHealth()}
                 ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     
                      ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     
               E   ${board.E1}  ${inv(`  ${board.E2}  `)}  ${board.E3}  ${inv(`  ${board.E4}  `)}  ${board.E5}  ${inv(`  ${board.E6}  `)}  ${board.E7}  ${inv(`  ${board.E8}  `)}               
                      ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}
                 ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     
               F ${inv(`  ${board.F1}  `)}  ${board.F2}  ${inv(`  ${board.F3}  `)}  ${board.F4}  ${inv(`  ${board.F5}  `)}  ${board.F6}  ${inv(`  ${board.F7}  `)}  ${board.F8}
                 ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}
                      ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}
               G   ${board.G1}  ${inv(`  ${board.G2}  `)}  ${board.G3}  ${inv(`  ${board.G4}  `)}  ${board.G5}  ${inv(`  ${board.G6}  `)}  ${board.G7}  ${inv(`  ${board.G8}  `)}               
                      ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}
                 ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}
               H ${inv(`  ${board.H1}  `)}  ${board.H2}  ${inv(`  ${board.H3}  `)}  ${board.H4}  ${inv(`  ${board.H5}  `)}  ${board.H6}  ${inv(`  ${board.H7}  `)}  ${board.H8}        
                 ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}     ${inv(`     `)}       
Captures:          1    2    3    4    5    6    7    8         Captures:
${this._board.getCaptures(COLORS.WHITE).join("")}                                         ${this._board.getCaptures(COLORS.BLACK).join("")} 
${this.getBoard().getMessage()}`)
    return true
  }
}

module.exports = Game;
