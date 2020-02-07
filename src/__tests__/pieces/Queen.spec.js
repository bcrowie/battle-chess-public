const Queen = require("../../objects/pieces/Queen");
const { COLORS } = require("../../constants");

function loopQueenMove(queen) {
  let availableMoves = 0;
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      if (queen.move([x, y])) {
        availableMoves++;
      }
    }
  }
  return availableMoves;
}

describe("Moving Queen", () => {
  const WhiteQueen = new Queen([5, 5], COLORS.WHITE, "E5");

  it("can only move horizontally, vertically, diagonally", () => {
    expect(loopQueenMove(WhiteQueen)).toBe(27);
  });
});

describe("Attacking Queen", () => {
  const WhiteQueen = new Queen([5, 5], COLORS.WHITE, "E5");
  const BlackQueen = new Queen([7, 4], COLORS.BLACK, "G4");
  it("Can only attack within move() limits", () => {
    expect(WhiteQueen.attack(BlackQueen)).toBe(false);
  });
});
