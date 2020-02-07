const Game = require("../objects/Game");
const { COLORS } = require("../constants");

describe("Creating new default game", () => {
  const game = new Game();
  test("is instance of Game", () => {
    expect(game).toBeInstanceOf(Game);
  });
  test("is _currentTurn of WHITE", () => {
    expect(game.getCurrentTurn()).toBe(COLORS.WHITE);
  });
  test("is not won", () => {
    expect(game.isWon()).toBe(false);
  });
  test("has no winner", () => {
    expect(game.getWinner()).toBe(null);
  });
  test("board printed", () => {
    expect(game.printBoard()).toBe(true);
  });
});
