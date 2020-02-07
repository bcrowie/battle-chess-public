const Board = require("../objects/Board");
const { COLORS } = require("../constants");
const Piece = require("../objects/Piece");

describe("testing default board", () => {
  describe("testing movePiece", () => {
    const board = new Board();
    test("moving white pawn from B2 to B4", () => {
      expect(board.movePiece("B4", "B2", COLORS.WHITE, "pb2b4")).toBe(true);
    });
    test("selecting space with no piece", () => {
      expect(board.movePiece("A5", "A6", COLORS.WHITE, "pa5a6")).toBe(false);
    });
  });

  describe("testing _isPathObstructed", () => {
    const board = new Board();
    const pieces = board.getPieces();
    describe("testing queen obstruction", () => {
      it("black queen at C3", () => {
        expect(pieces.BLACK.Queen.setLocation([3, 3])).toBe(true);
      });
      it("white pawn is at D2", () => {
        expect(pieces.WHITE.PawnFour.getLocation()).toStrictEqual([4, 2]);
      });
      it("white king is at E1", () => {
        expect(pieces.WHITE.King.getLocation()).toStrictEqual([5, 1]);
      });
      it("queen can not attack king", () => {
        expect(
          board._isPathObstructed(pieces.WHITE.King, pieces.BLACK.Queen)
        ).toBeInstanceOf(Piece);
      });
      it("black queen set to C5", () => {
        expect(pieces.BLACK.Queen.setLocation([3, 5])).toBe(true);
      });
      it("black queen at C5", () => {
        expect(pieces.BLACK.Queen.getLocation()).toStrictEqual([3, 5]);
      });
      it("queen can attack pawn at F2", () => {
        expect(
          board._isPathObstructed(pieces.WHITE.PawnSix, pieces.BLACK.Queen)
        ).toBe(false);
      });
    });
  });

  describe("testing _getPieceAt", () => {
    const board = new Board();
    const pieces = board.getPieces();
    test("invalid array [0, 0]", () => {
      expect(board._getPieceAt([0, 0])).toStrictEqual([null, [0, 0]]);
    });
    test("string of A2", () => {
      expect(board._getPieceAt("A2")).toBe(pieces.WHITE.PawnOne);
    });
    test("array of [1, 2]", () => {
      expect(board._getPieceAt([1, 2])).toBe(pieces.WHITE.PawnOne);
    });
  });

  describe("testing isCheck", () => {
    const board = new Board();
    const pieces = board.getPieces();
    describe("not with King", () => {
      describe("within opponent move but obstruced", () => {
        test("White Rook E5, Black King E8", () => {
          pieces.WHITE.RookTwo.setLocation([5, 5]);
          expect(board.isCheck(pieces.WHITE.RookTwo)).toBe(false);
        });
        test("Black Knight D3, White King E1", () => {
          pieces.BLACK.KnightTwo.setLocation([4, 3]);
          expect(board.isCheck(pieces.BLACK.KnightTwo)).toBe(true);
        });
      });
      describe("within opponent move and not obstructed", () => {
        test("Black Bishop H4, White King E1", () => {
          pieces.BLACK.BishopTwo.setLocation([8, 4]);
          pieces.WHITE.PawnSix.setLocation([6, 6]);
          expect(board.isCheck(pieces.BLACK.BishopTwo)).toBe(true);
        });
      });
    });
    describe("Kings location", () => {
      test("should be E1", () => {
        expect(pieces.WHITE.King.getLocation()).toStrictEqual([5, 1]);
      });
    });
    describe("with King", () => {
      test("Black Queen at E3, White King E1", () => {
        pieces.BLACK.Queen.setLocation([5, 3]);
        pieces.WHITE.PawnFive.setLocation([0, 0]);
        expect(board.isCheck(pieces.WHITE.King)).toBe(true);
      });
    });
  });

  describe("testing isCheckmate", () => {
    const board = new Board();
    const pieces = board.getPieces();
    pieces.BLACK.King.setLocation([5, 4]);
    pieces.WHITE.RookOne.setLocation([1, 4]);
    pieces.WHITE.RookTwo.setLocation([8, 5]);
    test("is in checkmate", () => {
      expect(board.isCheckmate()).toBe(COLORS.BLACK);
    });
  });
});

// describe("testing with save state", () => {

// })
