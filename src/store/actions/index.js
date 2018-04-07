export const MOVE_PIECE = "MOVE_PIECE";

export const movePiece = (x, y, pieceId) => ({
  type: MOVE_PIECE,
  pieceId,
  position: [x, y]
});
