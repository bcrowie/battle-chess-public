const Bishop = require("../../objects/pieces/Bishop");
const { COLORS } = require("../../constants");

function loopBishopMove(bishop) {
  let availableMoves = 0;
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      if (bishop.move([x, y])) {
        availableMoves++;
      }
    }
  }
  return availableMoves;
}

describe("Moving Bishop", () => {
  const WhiteBishop = new Bishop([5, 5], COLORS.WHITE, "E5");

  it("can only move diagonally", () => {
    expect(loopBishopMove(WhiteBishop)).toBe(13);
  });
  it("cannot move horizontally", () => {
    expect(WhiteBishop.move([5, 1])).toBe(false);
  });
});

// Bishop can only attack where it can move
describe("Attacking Bishop", () => {
  const WhiteBishop = new Bishop([5, 5], COLORS.WHITE, "E5");
  const BlackBishop = new Bishop([3, 5], COLORS.BLACK, "C5");
  it("cannot attack horizontally", () => {
    expect(WhiteBishop.attack(BlackBishop)).toBe(false);
  });
  it("can attack Black Bishop at A1", () => {
    BlackBishop.setLocation([1, 1]);
    expect(WhiteBishop.attack(BlackBishop)).toBe(true);
  });
});
