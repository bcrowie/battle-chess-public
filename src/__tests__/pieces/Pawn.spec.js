const Pawn = require("../../objects/pieces/Pawn");
const { COLORS } = require("../../constants");

describe("Moving White Pawn One", () => {
  const testPawnWhiteOne = new Pawn([2, 2], COLORS.WHITE, "B2");

  it("White Pawn is at B2", () => {
    expect(testPawnWhiteOne.getLocation()).toStrictEqual([2, 2]);
  });
  it("White Pawn can move from B2 to B4", () => {
    expect(testPawnWhiteOne.move([2, 4])).toBe(true);
  });
  it("White Pawn is set to B4", () => {
    expect(testPawnWhiteOne.setLocation([2, 4])).toBe(true);
  });
  it("White Pawn is confirmed at B4", () => {
    expect(testPawnWhiteOne.getLocation()).toStrictEqual([2, 4]);
  });
});

describe("Moving Black Pawn One", () => {
  const testPawnBlackOne = new Pawn([1, 7], COLORS.BLACK, "A7");

  it("Can move from A7 to A5", () => {
    expect(testPawnBlackOne.move([1, 5])).toBe(true);
  });
  it("Is set to A5", () => {
    expect(testPawnBlackOne.setLocation([1, 5])).toBe(true);
  });
  it("Is confirmed at A5", () => {
    expect(testPawnBlackOne.getLocation()).toStrictEqual([1, 5]);
  });
});

describe("White Pawn One attacks Black Pawn One", () => {
  const testPawnWhiteOne = new Pawn([2, 4], COLORS.WHITE, "B2");
  const testPawnBlackOne = new Pawn([1, 5], COLORS.BLACK, "A7");
  it("Can attack A5", () => {
    expect(testPawnWhiteOne.attack(testPawnBlackOne, testPawnWhiteOne)).toBe(
      true
    );
  });
  it("Is set to A5", () => {
    expect(testPawnWhiteOne.setLocation([1, 5])).toBe(true);
  });
  it("Is confirmed at A5", () => {
    expect(testPawnWhiteOne.getLocation()).toStrictEqual([1, 5]);
  });
  it("Cant attack straight forward", () => {
    testPawnWhiteOne.setLocation([2, 4]);
    testPawnBlackOne.setLocation([2, 5]);
    expect(testPawnWhiteOne.attack(testPawnBlackOne, testPawnWhiteOne)).toBe(
      false
    );
  });
});

describe("Moving Black Pawn Two", () => {
  const testPawnBlackTwo = new Pawn([2, 7], COLORS.BLACK, "B7");
  it("Can move from B7 to B6", () => {
    expect(testPawnBlackTwo.move([2, 6])).toBe(true);
  });
  it("Is set to B6", () => {
    expect(testPawnBlackTwo.setLocation([2, 6])).toBe(true);
  });
  test("Is confirmed at B6", () => {
    expect(testPawnBlackTwo.getLocation()).toStrictEqual([2, 6]);
  });
});

function loopPawnMove(pawn) {
  availableMoves = 0;
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (pawn.move([x, y])) {
        availableMoves++;
      }
    }
  }
  return availableMoves;
}

describe("Looping White Pawn", () => {
  const testPawnWhiteOne = new Pawn([2, 2], COLORS.WHITE, "B2");

  test("Pawn can only move 2 spaces forward", () => {
    testPawnWhiteOne.setLocation([4, 3]);
    expect(loopPawnMove(testPawnWhiteOne)).toBe(2);
  });
});

describe("Looping Black Pawn", () => {
  const testPawnBlackOne = new Pawn([1, 7], COLORS.BLACK, "A7");
  test("Pawn can only move 2 spaces forward", () => {
    testPawnBlackOne.setLocation([5, 6]);
    expect(loopPawnMove(testPawnBlackOne)).toBe(2);
  });
});
