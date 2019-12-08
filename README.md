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

## Technical Requirements

A skeleton for the top-level game calls has been provided. You are free to use that as is, or change
anything there to your liking as long as `npm start` starts the game.

The design must be object-oriented in nature.

You are free to use [promptly](https://www.npmjs.com/package/promptly) for user input and
[chalk](https://www.npmjs.com/package/chalk) to print to the console in color. They are already
installed for you. Please do not use any other npm packages.
