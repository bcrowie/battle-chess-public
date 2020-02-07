const Knight = require("../../objects/pieces/Knight");
const { COLORS } = require("../../constants");

function loopKnightMove(knight) {
  let availableMoves = 0;
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      if (knight.move([x, y])) {
        availableMoves++;
      }
    }
  }
  return availableMoves;
}

describe("Moving Knight", () => {
  const WhiteKnight = new Knight([5, 5], COLORS.WHITE, "E5");

  it("can move to G4", () => {
    expect(WhiteKnight.move([7, 4])).toBe(true);
  });
  it("only has max 8 moves at any given time", () => {
    expect(loopKnightMove(WhiteKnight)).toBe(8);
  });
});

describe("Attacking knight", () => {
  const WhiteKnight = new Knight([5, 5], COLORS.WHITE, "E5");
  const BlackKnight = new Knight([3, 4], COLORS.BLACK, "C4");
  it("can attack C4", () => {
    expect(WhiteKnight.attack(BlackKnight)).toBe(true);
  });
});
