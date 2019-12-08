const promptly = require("promptly");
const Game = require("./objects/Game");

(async () => {
  const game = new Game();
  while (true) {
    const input = await promptly.prompt("Enter your next move: ");

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
