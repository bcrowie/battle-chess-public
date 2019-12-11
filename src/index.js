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
    const input = await promptly.prompt(`Enter your move, ${game.getCurrentTurn()}:`);

    if (input === "quit") {
      process.exit(0);
    }

    game.makeMove(input);

    if (game.isWon()) {
      console.log(`${game.getWinner()} wins the game!`);
      process.exit(0);
    }
  }
})();
