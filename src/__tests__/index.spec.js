const Game = require("../objects/Game");
const Board = require("../objects/Board");
const { COLORS } = require("../constants");
const testGame = new Game();
const testBoard = new Board();

test("Board printed", () => {
  expect(testGame.printBoard()).toBe(true);
});

test("Try input", () => {
  expect(testGame.makeMove("pb2b4")).toBe(true);
});

describe("Move pb2b4 and pa7a5, test attack pb4a5", () => {
  test("Test move, then attack", () => {
    expect(testBoard.movePiece("b4", "b2", COLORS.WHITE, "pb2b4")).toBe(true);
    expect(testBoard.movePiece("a5", "a7", COLORS.BLACK, "pa7a5")).toBe(true);
    expect(testBoard.movePiece("a5", "b4", COLORS.WHITE, "pb4a5")).toBe(true);
  });
});

describe("Test checkmate", () => {
  let pieces = testBoard.getPieces();
  test("White King E1, no available spaces, Black Rook E2", () => {
    pieces.WHITE.PawnFive.setLocation([0, 0]);
    pieces.BLACK.RookOne.setLocation([5, 2]);
    expect(testBoard.isCheckmate()).toBe(COLORS.WHITE);
  });
  test("Black King E8, White Queen B5, D7 F7 Empty", () => {
    pieces.BLACK.PawnFour.setLocation([0, 0]);
    pieces.BLACK.PawnSix.setLocation([0, 0]);
    pieces.WHITE.Queen.setLocation([2, 5]);
    expect(testBoard.isCheckmate()).toBe(COLORS.BLACK);
  });
});
