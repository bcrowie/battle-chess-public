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
    console.log(this.getBoard().getColors())
    const board = this.getBoard().getGameBoard();
    const { dark, light } = this.getBoard().getColors();
    

    console.log(`Battle-Chess
                 ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}
White          A ${dark(`  ${board.A1}  `)}${light(`  ${board.A2}  `)}${dark(`  ${board.A3}  `)}${light(`  ${board.A4}  `)}${dark(`  ${board.A5}  `)}${light(`  ${board.A6}  `)}${dark(`  ${board.A7}  `)}${light(`  ${board.A8}  `)}          Black
Health:          ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}   Health:
King: ${this.getBoard().getPieces().WHITE.King.getHealth()}         ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}        King: ${this.getBoard().getPieces().BLACK.King.getHealth()}
Queen: ${this.getBoard().getPieces().WHITE.Queen.getHealth()}      B ${light(`  ${board.B1}  `)}${dark(`  ${board.B2}  `)}${light(`  ${board.B3}  `)}${dark(`  ${board.B4}  `)}${light(`  ${board.B5}  `)}${dark(`  ${board.B6}  `)}${light(`  ${board.B7}  `)}${dark(`  ${board.B8}  `)}      Queen: ${this.getBoard().getPieces().BLACK.Queen.getHealth()}
Bishop: ${this.getBoard().getPieces().WHITE.BishopOne.getHealth()}       ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}      Bishop: ${this.getBoard().getPieces().BLACK.BishopOne.getHealth()}
Bishop: ${this.getBoard().getPieces().WHITE.BishopTwo.getHealth()}       ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}      Bishop: ${this.getBoard().getPieces().BLACK.BishopTwo.getHealth()}
Knight: ${this.getBoard().getPieces().WHITE.KnightOne.getHealth()}     C ${dark(`  ${board.C1}  `)}${light(`  ${board.C2}  `)}${dark(`  ${board.C3}  `)}${light(`  ${board.C4}  `)}${dark(`  ${board.C5}  `)}${light(`  ${board.C6}  `)}${dark(`  ${board.C7}  `)}${light(`  ${board.C8}  `)}     Knight: ${this.getBoard().getPieces().BLACK.KnightOne.getHealth()}
Knight: ${this.getBoard().getPieces().WHITE.KnightTwo.getHealth()}       ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}     Knight: ${this.getBoard().getPieces().BLACK.KnightTwo.getHealth()}
Rook: ${this.getBoard().getPieces().WHITE.RookOne.getHealth()}         ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}       Rook: ${this.getBoard().getPieces().BLACK.RookOne.getHealth()}      
Rook: ${this.getBoard().getPieces().WHITE.RookTwo.getHealth()}       D ${light(`  ${board.D1}  `)}${dark(`  ${board.D2}  `)}${light(`  ${board.D3}  `)}${dark(`  ${board.D4}  `)}${light(`  ${board.D5}  `)}${dark(`  ${board.D6}  `)}${light(`  ${board.D7}  `)}${dark(`  ${board.D8}  `)}       Rook: ${this.getBoard().getPieces().BLACK.RookTwo.getHealth()}
                 ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}
                 ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}     
               E ${dark(`  ${board.E1}  `)}${light(`  ${board.E2}  `)}${dark(`  ${board.E3}  `)}${light(`  ${board.E4}  `)}${dark(`  ${board.E5}  `)}${light(`  ${board.E6}  `)}${dark(`  ${board.E7}  `)}${light(`  ${board.E8}  `)}               
                 ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}
                 ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}
               F ${light(`  ${board.F1}  `)}${dark(`  ${board.F2}  `)}${light(`  ${board.F3}  `)}${dark(`  ${board.F4}  `)}${light(`  ${board.F5}  `)}${dark(`  ${board.F6}  `)}${light(`  ${board.F7}  `)}${dark(`  ${board.F8}  `)}
                 ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}
                 ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}
               G ${dark(`  ${board.G1}  `)}${light(`  ${board.G2}  `)}${dark(`  ${board.G3}  `)}${light(`  ${board.G4}  `)}${dark(`  ${board.G5}  `)}${light(`  ${board.G6}  `)}${dark(`  ${board.G7}  `)}${light(`  ${board.G8}  `)}               
                 ${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}
                 ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}
               H ${light(`  ${board.H1}  `)}${dark(`  ${board.H2}  `)}${light(`  ${board.H3}  `)}${dark(`  ${board.H4}  `)}${light(`  ${board.H5}  `)}${dark(`  ${board.H6}  `)}${light(`  ${board.H7}  `)}${dark(`  ${board.H8}  `)}      
                 ${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')}${light(`     `)}${dark('     ')} 
Captures:          1    2    3    4    5    6    7    8         Captures:
${this._board.getCaptures(COLORS.WHITE).join("")}                                         ${this._board.getCaptures(COLORS.BLACK).join("")} 
${this.getBoard().getMessage()}`)
    return true
  }
}

module.exports = Game;
