# Battle Chess Spec

## Intro

Chess takes place on an 8x8 board. Two equal teams, white and black, take turns moving one piece per
turn. The game ends when the king is left with no possible moves that don't result in the king being
in check. This is called a "checkmate". See
[the rules of chess](https://www.chesscentral.com/pages/first-moves-in-chess/the-rules-of-chess.html)
for details.

## Spec Description

Implement a NodeJS-based command-line variant of chess, called battle chess. This game has the same
general rules as chess, but each piece has a specified health and damage. When a piece attempts to
capture another piece, it must first subtract it's damage from the piece's health. If it reaches 0
or less, the piece is captured and your piece takes its position. If it doesn't, the damage is
subtracted from the piece's remaining health and your piece remains in its current position. Pieces
have the following health and damage:

| Piece  | Health | Damage |
| ------ | ------ | ------ |
| Pawn   | 1      | 1      |
| Knight | 10     | 5      |
| Rook   | 20     | 1      |
| Bishop | 5      | 10     |
| Queen  | 20     | 5      |
| King   | 1      | 5      |

Do not implement castling or pawn promotion.

## User Experience Requirements

- The game must be a node js package with a `package.json` file
- `npm start` should start the game
- The game must alternate between prompting the player for the white and black side for moves.
  Illegal or impossible moves should be rejected.
- Responses to the promp take the form of a simplified
  [algebraic notation](<https://en.wikipedia.org/wiki/Algebraic_notation_(chess)>). We simplify it
  by being explicit on rank and file numbers, and excluding "capture" moves, i.e. adding an "x" to
  the square where the capture is being made. For example, `Be5h8` moves bishop from square e5 to
  h8. Letter and number must be included in both to and from positions. Exclude any additional
  notation for check, end of game, etc
- You must display the newest state of the board after every move in stdout. How you display it is
  up to you, but it's suggested to display the position of each piece, its color, and its remaining
  health somehow.
  [Unicode characters for chess pieces](https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode) may
  be of interest here.
- If a team's king is put in check, you must notify the user. If a team's king is put in checkmate,
  you must notify the user and end the game. It is suggested that you notify the user of other
  important events as well, such as a piece being captured, but not required.
- Typing "`quit`" should exit the program.
- Typing "`save`" should save the current state of the game to a file.
- Running `npm start filename` should start the game, loading state from `filename`

## Technical Requirements

A skeleton for the top-level game calls has been provided. You are free to use that as is, or change
anything there to your liking as long as the above requirements are met.

The design must be object-oriented in nature.

You are free to use [promptly](https://www.npmjs.com/package/promptly) for user input and
[chalk](https://www.npmjs.com/package/chalk) to print to the console in color. They are already
installed for you. You can also install any other packages you want to provide utility, but you main
classes must be written by you.

For saving and loading, you are free to store the state however you want in the file. However, note
that reading the file will return a string of it's contents, so utils like
[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
could come in handy.

## Tips

- When first designing classes, try to think about objects in the game and the relationships between
  them. Will some objects have things in common? Will some objects have differences and some
  overlapping similarities? This will inform your class structure.
- For async actions, try to avoid using callbacks and instead use promises with `async` and `await`.
  The node fs api has an
  [alternative interface](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api)
  that provides all the regular filesystem APIs are promises under `require(fs).promises`. For
  example, you can read a file with:

```js
const fs = require("fs").promises;

(async () => {
  // create an async context to call await, this is the same as SavedStateLoader.load
  const contents = await fs.readFile(filePath, "utf8");
})();
```
