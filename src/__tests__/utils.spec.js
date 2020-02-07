const { COLORS } = require("../constants");
const { checkInput, getRank, kingCopy } = require("../utils");
const King = require("../objects/pieces/King");

describe("checking input", () => {
  test("input > 5 in length", () => {
    expect(checkInput("B2", "A5", "abcdefg")).toBe(true);
  });
  test("input contains 0's", () => {
    expect(checkInput("B0", "A0", "PB0A0")).toBe(true);
  });
  test("input contains no numbers", () => {
    expect(checkInput("AA", "BB", "CCCCC")).toBe(true);
  });
  test("input is empty strings", () => {
    expect(checkInput("", "", "")).toBe(true);
  });
  test("input has no args", () => {
    expect(checkInput()).toBe(true);
  });
});

describe("getting Rank", () => {
  test("to KB8A6", () => {
    expect(getRank("KB8A6", "to")).toStrictEqual("A6");
  });
  test("from BF1H3", () => {
    expect(getRank("BF1H3", "from")).toStrictEqual("F1");
  });
});

describe("creating king copy", () => {
  const WhiteKing = new King([5, 1], COLORS.WHITE, "E1");
  it("is instance of King", () => {
    expect(WhiteKing).toBeInstanceOf(King);
  });
});
