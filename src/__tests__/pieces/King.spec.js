const King = require("../../objects/pieces/King");
const { COLORS } = require("../../constants");

function loopKingMove(king) {
  let availableMoves = 0;
  let failed = 0;
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      if (king.move([x, y])) {
        availableMoves++;
      } else {
        failed++;
      }
    }
  }
  return [availableMoves, failed];
}

describe("Moving King", () => {
  const WhiteKing = new King([5, 5], COLORS.WHITE, "E5");

  it("Can only move 1 space horizontally, vertically or diagonally", () => {
    expect(loopKingMove(WhiteKing)[0]).toBe(8);
  });
  it("Should not be able to move to max of 56", () => {
    expect(loopKingMove(WhiteKing)[1]).toBe(56);
  });
});

describe("Attacking King", () => {
  const WhiteKing = new King([5, 5], COLORS.WHITE, "E5");
  const BlackKing = new King([4, 5], COLORS.BLACK, "D5");
  it("Can attack adjacent piece", () => {
    expect(WhiteKing.attack(BlackKing)).toBe(true);
  });
  it("Cannot attack outside move() limits", () => {
    BlackKing.setLocation([8, 4]);
    expect(WhiteKing.attack(BlackKing)).toBe(false);
  });
});
