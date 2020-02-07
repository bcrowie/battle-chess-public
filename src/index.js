const promptly = require("promptly");
const Game = require("./objects/Game");
const SavedStateLoader = require("./objects/SavedStateLoader");

const [, , savedFileName] = process.argv;

(async () => {
  let game;
  if (savedFileName) {
    const loader = new SavedStateLoader(savedFileName);
    const state = await loader.load();
    game = new Game(state);
  } else {
    game = new Game();
  }

  while (true) {
    game.printBoard();

    const input = await promptly.prompt(
      `Enter your move, ${game.getCurrentTurn()}:`
    );

    if (input === "quit") process.exit(0);

    if (input === "save") {
      const saver = new SavedStateLoader();
      saver.save(game);
    } else {
      game.makeMove(input);
    }

    if (game.isWon()) {
      console.log(`${game.getWinner()} wins the game!`);
      process.exit(0);
    }
  }
})();
