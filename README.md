# Battle Chess

## About

Battle Chess is a command-line chess game written in Javascript for NodeJS. Battle Chess has the same general rules as chess, however each piece has it's own health and damage. When a piece attempts to capture another, the health of the piece being attacked is subtracted by the damage of the attacking piece. The following specifies each piece's health and damage:

| Piece  | Health | Damage |
| ------ | ------ | ------ |
| Pawn   | 1      | 1      |
| Knight | 10     | 5      |
| Rook   | 20     | 1      |
| Bishop | 5      | 10     |
| Queen  | 20     | 5      |
| King   | 1      | 5      |

## Usage

After running the executable the first player will be presented with a prompt to move their first piece. As always in chess, white army moves first. Entering a command into the prompt is the same as many other chess games:

* PB2B4 - Moves Pawn from space B2 to B4
* RH8H5 - Moves Rook from space H8 to H5

The game will continue alternating player turns from white to black until a player's King is found to be in checkmate, at which time the game will end.

## Saving and loading

The game can be saved at anytime, preserving the state of every piece's health and location, into a json file.

To load the previous game state, load the executable in the command line with the save file entered as an argument:

* battle-chess.exe battle-chess-1234567.json
