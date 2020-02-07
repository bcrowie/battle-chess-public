const Rook = require("../../objects/pieces/Rook");
const { COLORS } = require("../../constants");

function loopRookMove(rook) {
  availableMoves = 0;
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      if (rook.move([x, y])) {
        availableMoves++;
      }
    }
  }
  return availableMoves;
}

// Testing Horizontal moves then every space on board
describe("Moving rook", () => {
  const RookWhite = new Rook([5, 5], COLORS.WHITE, "E5");

  it("can move to H5", () => {
    expect(RookWhite.move([8, 5])).toBe(true);
  });
  it("can move to E1", () => {
    expect(RookWhite.move([5, 1])).toBe(true);
  });
  it("can move to E8", () => {
    expect(RookWhite.move([5, 8])).toBe(true);
  });
  it("can move to A5", () => {
    expect(RookWhite.move([1, 5])).toBe(true);
  });
  it("can only move vertically and horizontally", () => {
    expect(loopRookMove(RookWhite)).toBe(14);
  });
});

// If a rook cannot move to a location it cannot attack so no need to test attack at multiple locations
describe("Attacking rook", () => {
  const RookWhite = new Rook([5, 5], COLORS.WHITE, "E5");
  const RookBlack = new Rook([1, 5], COLORS.BLACK, "A5");
  it("can attack rook at A5", () => {
    expect(RookWhite.attack(RookBlack)).toBe(true);
  });
});
